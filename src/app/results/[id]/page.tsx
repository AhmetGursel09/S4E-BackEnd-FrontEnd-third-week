"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ResultDetails = {
  stdout?: string;
  stderr?: string;
  url?: string;
  status_code?: number;
  content_length?: number;
  urls?: string[];
};

type Result = {
  id: number;
  job_id: number;
  summary: string;
  created_at: string;
  details?: ResultDetails;
};

async function api<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function ResultDetailPage() {
  const { id } = useParams<{ id: string }>();
  const sp = useSearchParams();
  const router = useRouter();

  const page = Number(sp.get("page") || 1);
  const pageSize = Number(sp.get("pageSize") || 50);
  const q = sp.get("q") || "";

  const { data: result } = useQuery<Result>({
    queryKey: ["result", id],
    queryFn: () => api(`/api/results/${id}`),
    refetchInterval: 5000,
  });

  const { data: urls } = useQuery<{ total: number; page: number; pageSize: number; rows: string[] }>({
    queryKey: ["urls", id, page, pageSize, q],
    queryFn: () => api(`/api/results/${id}/urls?page=${page}&pageSize=${pageSize}&q=${encodeURIComponent(q)}`),
    enabled: true,
    refetchInterval: 5000,
  });

  const setParam = (key: string, value: string) => {
    const n = new URLSearchParams(sp);
    n.set(key, value);
    router.replace(`?${n.toString()}`);
  };

  const hasUrls = Array.isArray(result?.details?.urls);
  const isShell = result?.summary?.toLowerCase?.().includes("shell") || ("stdout" in (result?.details || {}));
  const isHttp  = result?.summary?.toLowerCase?.().includes("http status");

  return (
    <main className="max-w-6xl mx-auto p-6 grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Result #{id}</h1>
        <div className="text-sm text-gray-500">{result?.summary}</div>
      </div>

      <Card className="p-4 grid gap-4">
        <div className="grid gap-1 text-sm text-gray-600">
          <div>Job: #{result?.job_id}</div>
          <div>Tarih: {result ? new Date(result.created_at).toLocaleString() : "-"}</div>
        </div>

        {/* Shell çıktısı */}
        {isShell && (
          <div className="grid md:grid-cols-2 gap-4">
            <pre className="p-3 bg-gray-100 rounded overflow-auto"><code>{result?.details?.stdout || "-"}</code></pre>
            <pre className="p-3 bg-gray-100 rounded overflow-auto"><code>{result?.details?.stderr || "-"}</code></pre>
          </div>
        )}

        {/* HTTP status */}
        {isHttp && (
          <div className="text-sm">
            URL: <span className="font-mono">{result?.details?.url}</span> — Status: <b>{result?.details?.status_code}</b> — Content-Length: {result?.details?.content_length}
          </div>
        )}

        {/* Crawl URL tablosu */}
        {hasUrls ? (
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Input placeholder="URL filtre (örn: /blog, example.com)" value={q}
                     onChange={(e) => setParam("q", e.target.value)} />
              <Button variant="outline" onClick={() => setParam("page", "1")}>Filtrele</Button>
            </div>

            <div className="text-sm text-gray-600">
              Toplam: {urls?.total ?? 0} | Sayfa: {urls?.page ?? page} | Sayfa Boyutu: {urls?.pageSize ?? pageSize}
            </div>

            <div className="border rounded">
              {urls?.rows?.map((u, i) => (
                <div key={`${u}-${i}`} className="px-3 py-2 border-b last:border-0 font-mono text-sm truncate">{u}</div>
              )) ?? <div className="p-3">Yükleniyor...</div>}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setParam("page", String(Math.max(1, page - 1)))} disabled={page <= 1}>Önceki</Button>
              <Button variant="outline" onClick={() => setParam("page", String(page + 1))} disabled={urls ? page * pageSize >= urls.total : true}>Sonraki</Button>
              <select className="border rounded px-2 py-1 text-sm" value={pageSize}
                      onChange={(e) => { setParam("pageSize", e.target.value); setParam("page", "1"); }}>
                {[25,50,100,200,500].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        ) : (
          !isShell && !isHttp && <div className="text-sm text-gray-500">Detay verisi yok.</div>
        )}
      </Card>
    </main>
  );
}
