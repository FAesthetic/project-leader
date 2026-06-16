import { journalPrompts, quickLogs } from "@/data/mvp-mock";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Textarea } from "@/components/ui/textarea";

export default function ReflectionPage() {
  const situation = quickLogs.find((log) => log.reflectTonight);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <SectionHeader
        eyebrow="Systemische Reflexion"
        title="Unterscheide Anlass, Muster und Einflussbereich."
        description="Ein tiefer Journal-Modus für Situationen, bei denen der sichtbare Anlass nicht die ganze Wahrheit ist."
      />

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Ausgangspunkt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-surface-muted p-4">
              <Badge>{situation?.category}</Badge>
              <h2 className="mt-3 text-xl font-semibold">{situation?.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{situation?.note}</p>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Gute Reflexion trennt, was sichtbar passiert ist, von dem, was
              darunterliegen könnte. Genau dadurch wird der nächste Führungszug klarer.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reflexionsfragen</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {journalPrompts.systemic.map((prompt) => (
              <label key={prompt} className="space-y-2">
                <span className="text-sm font-medium">{prompt}</span>
                <Textarea placeholder="Kurze Notiz" />
              </label>
            ))}
            <div className="md:col-span-2">
              <Button asChild>
                <Link href="/journal">Ins Journal übernehmen</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
