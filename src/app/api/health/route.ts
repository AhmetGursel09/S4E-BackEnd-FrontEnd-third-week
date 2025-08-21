import { bfetch } from "../_utils";
export async function GET() { return Response.json(await bfetch("/health")); }
