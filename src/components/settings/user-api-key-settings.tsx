"use client";

import { Eye, EyeOff, KeyRound, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "project-leadership-openai-key";

export function UserApiKeySettings() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY) ?? "";
      setApiKey(stored);
      setSaved(Boolean(stored));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function saveKey() {
    const nextKey = apiKey.trim();

    if (!nextKey) {
      window.localStorage.removeItem(STORAGE_KEY);
      setSaved(false);
      setApiKey("");
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, nextKey);
    setSaved(true);
  }

  function removeKey() {
    window.localStorage.removeItem(STORAGE_KEY);
    setApiKey("");
    setSaved(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eigener OpenAI API Key</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-primary/25 bg-accent">
          <KeyRound className="h-4 w-4" aria-hidden />
          <AlertTitle>Der Key bleibt auf deinem Gerät</AlertTitle>
          <AlertDescription>
            Du kannst deinen eigenen OpenAI API-Key nutzen. Er wird lokal in
            deinem Browser gespeichert und nicht in deinem Account abgelegt.
          </AlertDescription>
        </Alert>

        <div className="flex gap-2">
          <Input
            type={visible ? "text" : "password"}
            value={apiKey}
            onChange={(event) => setApiKey(event.currentTarget.value)}
            placeholder="sk-..."
            autoComplete="off"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "API Key verbergen" : "API Key anzeigen"}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" aria-hidden />
            ) : (
              <Eye className="h-4 w-4" aria-hidden />
            )}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={saveKey}>
            Key lokal speichern
          </Button>
          <Button type="button" variant="outline" onClick={removeKey}>
            <Trash2 className="h-4 w-4" aria-hidden />
            Entfernen
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Status: {saved ? "Key lokal hinterlegt" : "Kein Key hinterlegt"}
        </p>
      </CardContent>
    </Card>
  );
}
