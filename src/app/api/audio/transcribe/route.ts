import { NextResponse } from "next/server";

import type { AudioCaptureMode, AudioSummary } from "@/types/audio";

export const runtime = "nodejs";

const MAX_AUDIO_BYTES = 25 * 1024 * 1024;
const TRANSCRIPTION_MODEL =
  process.env.OPENAI_TRANSCRIBE_MODEL ?? "gpt-4o-mini-transcribe";
const SUMMARY_MODEL = process.env.OPENAI_SUMMARY_MODEL ?? "gpt-5.5";

const SUPPORTED_AUDIO_TYPES = new Set([
  "audio/flac",
  "audio/mp3",
  "audio/mp4",
  "audio/mpeg",
  "audio/mpga",
  "audio/ogg",
  "audio/wav",
  "audio/webm",
]);

type OpenAITranscription = {
  text?: string;
};

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
      type?: string;
    }>;
  }>;
};

export async function POST(request: Request) {
  const apiKey =
    request.headers.get("x-openai-api-key")?.trim() || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Es ist kein OpenAI API-Key hinterlegt. Speichere deinen Key in Einstellungen > API-Key oder nutze die Notiz ohne KI-Auswertung.",
      },
      { status: 503 }
    );
  }

  const formData = await request.formData();
  const audio = formData.get("audio");
  const mode = normalizeMode(formData.get("mode"));
  const summarize = formData.get("summarize") !== "false";

  if (!(audio instanceof File)) {
    return NextResponse.json(
      { error: "Es wurde keine Audiodatei übertragen." },
      { status: 400 }
    );
  }

  if (audio.size <= 0) {
    return NextResponse.json(
      { error: "Die Audiodatei ist leer." },
      { status: 400 }
    );
  }

  if (audio.size > MAX_AUDIO_BYTES) {
    return NextResponse.json(
      { error: "Die Audiodatei ist größer als 25 MB." },
      { status: 413 }
    );
  }

  const audioType = audio.type || "audio/webm";

  if (!SUPPORTED_AUDIO_TYPES.has(audioType)) {
    return NextResponse.json(
      { error: "Dieses Audioformat wird noch nicht unterstützt." },
      { status: 415 }
    );
  }

  const transcription = await transcribeAudio(apiKey, audio);

  if (!transcription) {
    return NextResponse.json(
      { error: "Aus der Aufnahme konnte kein Text erkannt werden." },
      { status: 422 }
    );
  }

  if (!summarize) {
    return NextResponse.json({ transcript: transcription, summary: null });
  }

  try {
    const summary = await summarizeTranscript(apiKey, transcription, mode);

    return NextResponse.json({
      transcript: transcription,
      summary,
    });
  } catch {
    return NextResponse.json({
      transcript: transcription,
      summary: null,
      warning:
        "Transkription erfolgreich. Die Zusammenfassung konnte gerade nicht erstellt werden.",
    });
  }
}

async function transcribeAudio(apiKey: string, audio: File) {
  const audioForm = new FormData();
  const fileName = audio.name || `project-leadership-${Date.now()}.webm`;

  audioForm.append("file", audio, fileName);
  audioForm.append("model", TRANSCRIPTION_MODEL);
  audioForm.append("response_format", "json");
  audioForm.append("language", "de");
  audioForm.append(
    "prompt",
    "Deutschsprachige Leadership-Notiz. Begriffe können Quick Log, Abendjournal, Reflexion, Führungssituation, Erwartung, Einflussbereich, Team, Stakeholder und Gespräch enthalten."
  );

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: audioForm,
  });

  if (!response.ok) {
    throw new Error("OpenAI transcription failed");
  }

  const data = (await response.json()) as OpenAITranscription;

  return data.text?.trim() ?? "";
}

async function summarizeTranscript(
  apiKey: string,
  transcript: string,
  mode: AudioCaptureMode
): Promise<AudioSummary> {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: SUMMARY_MODEL,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "Du bist ein klarer Leadership-Sparringspartner. Verdichte deutschsprachige Audio-Notizen knapp, wertschätzend und direkt. Keine Diagnosen, keine Therapie, keine Schuldzuweisung. Antworte ausschließlich als valides JSON.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: buildSummaryPrompt(transcript, mode),
            },
          ],
        },
      ],
      text: {
        verbosity: "low",
      },
    }),
  });

  if (!response.ok) {
    throw new Error("OpenAI summary failed");
  }

  const data = (await response.json()) as OpenAIResponse;
  const rawText = extractResponseText(data);
  const parsed = parseSummary(rawText);

  return parsed;
}

function buildSummaryPrompt(transcript: string, mode: AudioCaptureMode) {
  const modeInstruction = {
    "quick-log":
      "Kontext: Der Nutzer hält eine Führungssituation schnell fest. Ziel ist eine brauchbare Notiz für späteres Journal.",
    journal:
      "Kontext: Der Nutzer spricht eine Abendreflexion ein. Ziel ist ein sauberer Tageslernpunkt und ein nächster Impuls.",
    reflection:
      "Kontext: Der Nutzer reflektiert systemisch eine Situation. Ziel ist Trennung von Anlass, Muster und Einflussbereich.",
  } satisfies Record<AudioCaptureMode, string>;

  return `${modeInstruction[mode]}

Transkript:
${transcript}

Erzeuge exakt dieses JSON:
{
  "title": "kurzer Titel mit maximal 8 Wörtern",
  "cleanedNote": "bereinigte Notiz in 2-4 Sätzen",
  "leadershipSignal": "welches Muster oder Signal sichtbar wird, maximal 1 Satz",
  "nextStep": "konkreter nächster Führungsimpuls, maximal 1 Satz",
  "reflectionQuestion": "eine klare Reflexionsfrage",
  "tags": ["2 bis 4 kurze Tags"]
}`;
}

function extractResponseText(data: OpenAIResponse) {
  if (typeof data.output_text === "string") {
    return data.output_text;
  }

  return (
    data.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text ?? "")
      .join("\n")
      .trim() ?? ""
  );
}

function parseSummary(rawText: string): AudioSummary {
  const fallback: AudioSummary = {
    title: "Audio-Notiz",
    cleanedNote: rawText || "Die Audio-Notiz wurde transkribiert.",
    leadershipSignal: "Die Situation braucht noch bewusste Einordnung.",
    nextStep: "Formuliere den nächsten Führungsimpuls konkret.",
    reflectionQuestion: "Was lag hier wirklich in deinem Einflussbereich?",
    tags: ["Audio", "Reflexion"],
  };

  try {
    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      return fallback;
    }

    const parsed = JSON.parse(rawText.slice(jsonStart, jsonEnd + 1)) as Partial<AudioSummary>;

    return {
      title: normalizeString(parsed.title, fallback.title),
      cleanedNote: normalizeString(parsed.cleanedNote, fallback.cleanedNote),
      leadershipSignal: normalizeString(
        parsed.leadershipSignal,
        fallback.leadershipSignal
      ),
      nextStep: normalizeString(parsed.nextStep, fallback.nextStep),
      reflectionQuestion: normalizeString(
        parsed.reflectionQuestion,
        fallback.reflectionQuestion
      ),
      tags: Array.isArray(parsed.tags)
        ? parsed.tags.filter((tag): tag is string => typeof tag === "string").slice(0, 4)
        : fallback.tags,
    };
  } catch {
    return fallback;
  }
}

function normalizeMode(value: FormDataEntryValue | null): AudioCaptureMode {
  if (value === "journal" || value === "reflection" || value === "quick-log") {
    return value;
  }

  return "quick-log";
}

function normalizeString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}
