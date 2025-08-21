"use client";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";

type Job = { id: number; type: string; status: string; created_at: string };

async function api<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function JobsPage() {
  const { data } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: () => api("/api/jobs"),
    refetchInterval: 4000,
  });

  return (
    <main className="max-w-5xl mx-auto p-6 grid gap-4">
      <h1 className="text-xl font-semibold">Jobs</h1>
      <Card className="p-4">
        <div className="grid gap-2">
          {data?.map(j => (
            <div key={j.id} className="flex items-center justify-between border-b last:border-0 py-2">
              <div className="font-mono">#{j.id}</div>
              <div>{j.type}</div>
              <div className="text-sm">{new Date(j.created_at).toLocaleString()}</div>
              <div className="font-semibold">{j.status}</div>
            </div>
          )) ?? <div>Yükleniyor...</div>}
        </div>
      </Card>
    </main>
  );
}
