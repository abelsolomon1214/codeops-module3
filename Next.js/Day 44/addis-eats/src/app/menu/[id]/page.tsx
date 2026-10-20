import { getDish } from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) return { title: "Dish Not Found" };

  return {
    title: dish.name,
    description: `${dish.name} — ${dish.price} ETB. ${dish.description}`,
    alternates: {
      canonical: `/menu/${dish.id}`,
    },
    openGraph: {
      title: `${dish.name} · Addis Eats`,
      description: dish.description,
      images: [`/menu/${dish.id}/opengraph-image`],
    },
  };
}

export default async function DishDetailPage({ params }: PageProps) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">{dish.name}</h1>
        <p className="text-2xl font-bold text-amber-800 mt-2">{dish.price} ETB</p>
        <p className="mt-4 text-stone-700">{dish.description}</p>
      </div>
    </>
  );
}
