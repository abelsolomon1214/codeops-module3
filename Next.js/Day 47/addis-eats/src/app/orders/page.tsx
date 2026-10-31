import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getAllOrders, getOrdersForUser } from "@/lib/ordersStore";
import OrderTable from "./OrderTable";

export const dynamic = "force-dynamic";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string; dir?: string }>;
}) {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/orders");
  }

  const resolvedParams = await searchParams;
  const page = Math.max(1, Number(resolvedParams?.page ?? 1));
  const sort = resolvedParams?.sort ?? "date";
  const dir = resolvedParams?.dir ?? "desc";
  const pageSize = 5;

  let rawOrders = getOrdersForUser(user.id);
  if (rawOrders.length === 0) {
    rawOrders = getAllOrders();
  }

  // Server-side sorting
  const sortedOrders = [...rawOrders].sort((a, b) => {
    let comparison = 0;
    if (sort === "id") {
      comparison = a.id.localeCompare(b.id);
    } else if (sort === "total") {
      comparison = a.total - b.total;
    } else {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return dir === "asc" ? comparison : -comparison;
  });

  const total = sortedOrders.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pagedOrders = sortedOrders.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Your Orders ({user.name})</h1>
        <p className="text-slate-600">
          Showing {total} order{total === 1 ? "" : "s"} placed on your account.
        </p>
      </header>

      <OrderTable
        orders={pagedOrders}
        page={page}
        totalPages={totalPages}
        sort={sort}
        dir={dir}
      />
    </main>
  );
}
