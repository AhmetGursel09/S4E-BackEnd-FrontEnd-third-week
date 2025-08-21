"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card } from "@/components/ui/card";

type Result = { id: number; job_id: number; summary: string; created_at: string };

async function api<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function ResultsPage() {
  const { data } = useQuery<Result[]>({
    queryKey: ["results"],
    queryFn: () => api("/api/results"),
    refetchInterval: 5000,
  });

  return (
    <main className="max-w-5xl mx-auto p-6 grid gap-4">
      <h1 className="text-xl font-semibold">Results</h1>
      <Card className="p-4 grid gap-2">
        {data?.map(r => (
          <Link key={r.id} href={`/results/${r.id}`} className="flex items-center justify-between border-b last:border-0 py-2 hover:bg-gray-50 rounded">
            <div className="font-mono">Result #{r.id}</div>
            <div className="text-sm">Job #{r.job_id}</div>
            <div className="truncate">{r.summary}</div>
            <div className="text-sm">{new Date(r.created_at).toLocaleString()}</div>
          </Link>
        )) ?? <div>Yükleniyor...</div>}
      </Card>
    </main>
  );
}
