import MenuSearchAndList from "./MenuSearchAndList";
import { Suspense } from "react";

export default function MenuPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Addis Eats Menu & Search</h1>
      <Suspense fallback={<p>Loading menu...</p>}>
        <MenuSearchAndList />
      </Suspense>
    </main>
  );
}
