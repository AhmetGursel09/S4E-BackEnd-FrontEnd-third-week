import { bfetch } from "../../../_utils";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = Math.min(500, Math.max(1, Number(searchParams.get("pageSize") || 50)));

  const result = await bfetch(`/results/${params.id}`);
  const all: string[] = result?.details?.urls || [];
  const filtered = q ? all.filter(u => u.toLowerCase().includes(q)) : all;

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  return Response.json({ total, page, pageSize, rows });
}
