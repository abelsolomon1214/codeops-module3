"use client";

import { useState } from "react";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All dishes");

  return (
    <div className="menu-page">
      <section className="menu-hero">
        <div className="menu-hero__content">
          <span className="eyebrow">THE ADDIS EATS MENU</span>

          <h1>
            Choose something
            <span> delicious.</span>
          </h1>

          <p>
            Explore a focused selection of Ethiopian favorites, from rich
            vegetarian dishes to perfectly seasoned meat classics.
          </p>
        </div>

        <div className="menu-hero__note">
          <span>OUR APPROACH</span>
          <strong>Traditional food.</strong>
          <strong>Modern experience.</strong>
        </div>
      </section>

      <section className="menu-section">
        <div className="menu-section__header">
          <div>
            <span className="eyebrow">EXPLORE</span>
            <h2>Our dishes</h2>
          </div>

          <p>
            Four carefully selected dishes to introduce you to the Addis Eats
            experience.
          </p>
        </div>

        <CategoryBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <DishList selectedCategory={selectedCategory} />
      </section>
    </div>
  );
}