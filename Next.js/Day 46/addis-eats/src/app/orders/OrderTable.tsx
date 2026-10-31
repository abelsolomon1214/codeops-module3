import Link from "next/link";

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  customerName?: string;
}

const etb = (v: number) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(v);

export default function OrderTable({
  orders,
  page,
  totalPages,
  sort,
  dir,
}: {
  orders: Order[];
  page: number;
  totalPages: number;
  sort: string;
  dir: string;
}) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border text-center space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">No orders yet</h3>
        <p className="text-slate-600 text-sm">
          Browse our authentic dishes and place your first order to get started.
        </p>
        <div>
          <Link
            href="/menu"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  const nextDir = dir === "asc" ? "desc" : "asc";

  const getAriaSort = (colName: string): "ascending" | "descending" | "none" => {
    if (sort !== colName) return "none";
    return dir === "asc" ? "ascending" : "descending";
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
        <table className="w-full border-collapse text-left text-sm">
          <caption>Your personal order history, most recent first</caption>
          <thead className="bg-slate-50 border-b text-slate-700">
            <tr>
              <th scope="col" className="p-4 font-semibold" aria-sort={getAriaSort("id")}>
                <Link href={`/orders?page=${page}&sort=id&dir=${nextDir}`} className="hover:underline">
                  Order ID {sort === "id" ? (dir === "asc" ? "↑" : "↓") : ""}
                </Link>
              </th>
              <th scope="col" className="p-4 font-semibold" aria-sort={getAriaSort("date")}>
                <Link href={`/orders?page=${page}&sort=date&dir=${nextDir}`} className="hover:underline">
                  Date {sort === "date" ? (dir === "asc" ? "↑" : "↓") : ""}
                </Link>
              </th>
              <th scope="col" className="p-4 font-semibold">Status</th>
              <th scope="col" className="p-4 font-semibold text-right" aria-sort={getAriaSort("total")}>
                <Link href={`/orders?page=${page}&sort=total&dir=${nextDir}`} className="hover:underline">
                  Total {sort === "total" ? (dir === "asc" ? "↑" : "↓") : ""}
                </Link>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-900">
                  <Link href={`/orders/${o.id}`} className="text-blue-600 hover:underline">
                    {o.id}
                  </Link>
                </td>
                <td className="p-4 text-slate-600">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    {o.status}
                  </span>
                </td>
                <td className="p-4 text-right font-medium text-slate-900">{etb(o.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="flex justify-between items-center pt-2" aria-label="Pagination">
        <p className="text-sm text-slate-600">
          Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
        </p>
        <div className="space-x-2">
          {page > 1 && (
            <Link
              href={`/orders?page=${page - 1}&sort=${sort}&dir=${dir}`}
              className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50"
            >
              Previous
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={`/orders?page=${page + 1}&sort=${sort}&dir=${dir}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Next
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
