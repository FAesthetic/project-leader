import { BookOpen, Search } from "lucide-react";

import { leadershipModels } from "@/data/mvp-mock";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";

export default function ModelsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <SectionHeader
        eyebrow="Modellbibliothek"
        title="Modelle sind Werkzeuge, keine Kapitel zum Abarbeiten."
        description="Der MVP zeigt eine kuratierte Bibliothek. Später empfiehlt die App Modelle passend zur Situation."
      />

      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" aria-hidden />
        <Input className="pl-9" placeholder="Modell, Situation oder Thema suchen" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {leadershipModels.map((model) => (
          <Card key={model.title}>
            <CardHeader>
              <Badge variant="outline" className="w-fit">{model.category}</Badge>
              <CardTitle>{model.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">{model.fit}</p>
              <div className="rounded-xl bg-surface-muted p-4">
                <p className="text-sm font-medium">Anwendung</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{model.use}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EmptyState
        icon={BookOpen}
        title="Kein Lexikon-Modus"
        description="Im fertigen Produkt werden Modelle nicht nur gesammelt, sondern aus konkreten Führungsfragen heraus empfohlen."
      />
    </div>
  );
}
