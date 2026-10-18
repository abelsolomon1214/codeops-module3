import { dishes } from "@/data/dishes";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return Response.json(
      { error: "No such dish" },
      { status: 404 },
    );
  }

  const dish = dishes.find((item) => item.id === parsedId);

  if (!dish) {
    return Response.json(
      { error: "No such dish" },
      { status: 404 },
    );
  }

  return Response.json(dish, { status: 200 });
}
