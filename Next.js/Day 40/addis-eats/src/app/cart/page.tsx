
import type { Metadata } from "next";
import CartContent from "./CartContent";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Addis Eats order.",
};

export default function CartPage() {
  return <CartContent />;
}
