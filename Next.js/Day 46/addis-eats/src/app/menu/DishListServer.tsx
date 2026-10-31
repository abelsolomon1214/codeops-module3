
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Dish } from "@/data/dishes";

export async function loadDishes(): Promise<Dish[]> {
  const filePath = path.join(process.cwd(), "src", "data", "dishes.json");
  const fileContents = await readFile(filePath, "utf8");

  return JSON.parse(fileContents) as Dish[];
}
