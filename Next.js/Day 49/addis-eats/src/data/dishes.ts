
import dishesData from "./dishes.json";

export type Dish = {
  id: number;
  name: string;
  category: "Vegetarian" | "Meat";
  description: string;
  detailDescription: string;
  price: number;
  image: string;
};

export const dishes = dishesData as Dish[];
