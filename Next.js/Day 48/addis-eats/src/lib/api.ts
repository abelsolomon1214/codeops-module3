import { dishes, Dish } from "@/data/dishes";

export async function getDishes(): Promise<Dish[]> {
  return dishes;
}

export async function getDish(id: string | number): Promise<Dish | undefined> {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return dishes.find((dish) => dish.id === numericId);
}
