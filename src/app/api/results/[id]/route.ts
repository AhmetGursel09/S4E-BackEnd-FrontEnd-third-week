import { bfetch } from "../../_utils";
export async function GET(_: Request, { params }: { params: { id: string } }) {
  return Response.json(await bfetch(`/results/${params.id}`));
}
