"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // framed buton buradan geliyor
import { Input } from "@/components/ui/input";
import Link from "next/link";

type JobPayload =
  | { type: "shell"; params: { command: string } }
  | { type: "crawl"; params: { url: string } }
  | { type: "httpstatus"; params: { url: string } };

type HealthResponse = { status: string };

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { ...init, cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function Home() {
  const qc = useQueryClient();
  const { data: health } = useQuery<HealthResponse>({
    queryKey: ["health"],
    queryFn: () => api<HealthResponse>("/api/health"),
  });

  const [command, setCommand] = useState("ls");
  const [url, setUrl] = useState("https://example.com");

  const runJob = useMutation({
    mutationFn: (payload: JobPayload) =>
      api("/api/jobs", { method: "POST", body: JSON.stringify(payload) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["results"] });
    },
  });

  return (
    <main className="max-w-5xl mx-auto p-6 grid gap-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <Card className="p-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Backend Health</div>
          <div className="text-lg font-medium">{health?.status ?? "..."}</div>
        </div>
        <div className="flex gap-3 text-sm">
          <Link href="/jobs" className="underline">
            Jobs
          </Link>
          <Link href="/results" className="underline">
            Results
          </Link>
        </div>
      </Card>

      <Card className="p-4 grid gap-4">
        <h2 className="font-semibold">Hızlı Job Çalıştır</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-sm">Shell Komutu</label>
            <div className="flex gap-2">
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
              />
              <Button
                variant="framed"
                color="indigo"
                onClick={() =>
                  runJob.mutate({ type: "shell", params: { command } })
                }
                disabled={runJob.isPending}
              >
                Çalıştır
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm">Crawl URL</label>
            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
              />
              <Button
                variant="framed"
                color="emerald"
                onClick={() =>
                  runJob.mutate({ type: "crawl", params: { url } })
                }
                disabled={runJob.isPending}
              >
                Crawl
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Button
            variant="outline"
            onClick={() =>
              runJob.mutate({
                type: "httpstatus",
                params: { url: "https://example.com" },
              })
            }
          >
            Örnek HTTP Status
          </Button>
        </div>
      </Card>
    </main>
  );
}
