"use client";

import { Loader2, Mic, Square, WandSparkles } from "lucide-react";
import { useRef, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type {
  AudioCaptureMode,
  AudioSummary,
  AudioTranscriptionResponse,
} from "@/types/audio";
import { cn } from "@/lib/utils";

type VoiceTextareaProps = {
  mode: AudioCaptureMode;
  label?: string;
  placeholder?: string;
  initialValue?: string;
  className?: string;
  minHeightClassName?: string;
  onSummary?: (summary: AudioSummary) => void;
};

type VoiceState = "idle" | "recording" | "processing";

export function VoiceTextarea({
  mode,
  label,
  placeholder,
  initialValue = "",
  className,
  minHeightClassName = "min-h-32",
  onSummary,
}: VoiceTextareaProps) {
  const [value, setValue] = useState(initialValue);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState<AudioSummary | null>(null);
  const [state, setState] = useState<VoiceState>("idle");
  const [error, setError] = useState("");

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const isRecording = state === "recording";
  const isProcessing = state === "processing";

  async function startRecording() {
    setError("");
    setTranscript("");
    setSummary(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Audioaufnahme wird in diesem Browser nicht unterstützt.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedMimeType();
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined
      );

      chunksRef.current = [];
      streamRef.current = stream;
      recorderRef.current = recorder;

      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      });

      recorder.addEventListener("stop", () => {
        void submitRecording(recorder.mimeType || "audio/webm");
      });

      recorder.start();
      setState("recording");
    } catch {
      setError("Mikrofonzugriff wurde nicht erlaubt oder ist nicht verfügbar.");
      cleanupStream();
      setState("idle");
    }
  }

  function stopRecording() {
    const recorder = recorderRef.current;

    if (!recorder || recorder.state === "inactive") {
      return;
    }

    setState("processing");
    recorder.stop();
  }

  async function submitRecording(mimeType: string) {
    try {
      const blob = new Blob(chunksRef.current, { type: mimeType });

      if (blob.size <= 0) {
        setError("Die Aufnahme war leer. Bitte nochmal kurz einsprechen.");
        return;
      }

      const formData = new FormData();
      formData.append("audio", blob, `project-leadership-${Date.now()}.webm`);
      formData.append("mode", mode);
      formData.append("summarize", "true");

      const response = await fetch("/api/audio/transcribe", {
        method: "POST",
        headers: getUserOpenAIKeyHeader(),
        body: formData,
      });

      const payload = (await response.json()) as
        | AudioTranscriptionResponse
        | { error?: string };

      if (!response.ok || isErrorPayload(payload)) {
        const message = isErrorPayload(payload) ? payload.error : undefined;

        setError(
          message ?? "Die Audio-Notiz konnte gerade nicht verarbeitet werden."
        );
        return;
      }

      setTranscript(payload.transcript);

      if (payload.summary) {
        setSummary(payload.summary);
        setValue(payload.summary.cleanedNote);
        onSummary?.(payload.summary);
      } else {
        setValue(payload.transcript);
      }

      if (payload.warning) {
        setError(payload.warning);
      }
    } catch {
      setError("Die Audio-Notiz konnte gerade nicht verarbeitet werden.");
    } finally {
      cleanupStream();
      setState("idle");
    }
  }

  function cleanupStream() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    recorderRef.current = null;
    chunksRef.current = [];
  }

  return (
    <div className={cn("space-y-3", className)}>
      {label ? <p className="text-sm font-medium">{label}</p> : null}
      <div className="rounded-2xl border border-border bg-surface/70 p-3">
        <Textarea
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          placeholder={placeholder}
          className={cn("border-0 bg-transparent shadow-none focus-visible:ring-0", minHeightClassName)}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {isRecording ? (
              <>
                <span className="h-2 w-2 rounded-full bg-destructive" />
                Aufnahme läuft
              </>
            ) : isProcessing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                Wird transkribiert und verdichtet
              </>
            ) : (
              <>
                <WandSparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
                Audio wird nicht gespeichert, nur verarbeitet
              </>
            )}
          </div>
          <Button
            type="button"
            size="sm"
            variant={isRecording ? "destructive" : "outline"}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
          >
            {isRecording ? (
              <>
                <Square className="h-4 w-4" aria-hidden />
                Stoppen
              </>
            ) : (
              <>
                <Mic className="h-4 w-4" aria-hidden />
                Einsprechen
              </>
            )}
          </Button>
        </div>
      </div>

      {summary ? (
        <div className="rounded-2xl border border-primary/20 bg-accent/70 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold">{summary.title}</p>
            {summary.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {summary.leadershipSignal}
          </p>
          <p className="mt-2 text-sm font-medium">{summary.nextStep}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {summary.reflectionQuestion}
          </p>
        </div>
      ) : null}

      {transcript ? (
        <details className="rounded-xl border border-border bg-surface/55 px-4 py-3 text-sm">
          <summary className="cursor-pointer font-medium">Rohtranskript</summary>
          <p className="mt-2 leading-6 text-muted-foreground">{transcript}</p>
        </details>
      ) : null}

      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Audio nicht verarbeitet</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}

function getSupportedMimeType() {
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"];

  return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate));
}

function getUserOpenAIKeyHeader() {
  const apiKey = window.localStorage
    .getItem("project-leadership-openai-key")
    ?.trim();

  return apiKey ? { "x-openai-api-key": apiKey } : undefined;
}

function isErrorPayload(
  payload: AudioTranscriptionResponse | { error?: string }
): payload is { error?: string } {
  return "error" in payload;
}
