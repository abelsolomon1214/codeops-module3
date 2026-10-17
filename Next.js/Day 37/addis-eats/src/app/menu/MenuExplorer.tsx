
"use client";

import { useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import type { Dish } from "@/data/dishes";

type MenuExplorerProps = {
  dishes: Dish[];
};

export default function MenuExplorer({ dishes }: MenuExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState("All dishes");

  return (
    <>
      <CategoryBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <DishList
        dishes={dishes}
        selectedCategory={selectedCategory}
      />
    </>
  );
}
