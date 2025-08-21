import { bfetch } from "../_utils";
export async function GET() { return Response.json(await bfetch("/jobs")); }
export async function POST(req: Request) {
  const body = await req.json();
  const json = await bfetch("/jobs", { method: "POST", body: JSON.stringify(body) });
  return Response.json(json, { status: 202 });
}
