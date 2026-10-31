import { dishes } from "@/data/dishes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (!category || category === "All") {
    return Response.json(dishes, { status: 200 });
  }

  const filteredDishes = dishes.filter(
    (dish) => dish.category.toLowerCase() === category.toLowerCase(),
  );

  return Response.json(filteredDishes, { status: 200 });
}
