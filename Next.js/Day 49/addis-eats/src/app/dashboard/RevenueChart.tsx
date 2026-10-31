"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface RevenueData {
  area: string;
  revenue: number;
}

const etb = (v: number) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(v);

export default function RevenueChart({ data }: { data: RevenueData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="area" tick={{ fontSize: 12 }} />
        <YAxis
          tickFormatter={etb}
          width={90}
          domain={[0, "auto"]}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(v: any) => [etb(Number(v)), "Revenue"]}
          labelStyle={{ color: "#000" }}
        />
        <Bar dataKey="revenue" fill="#1B4D8E" name="Revenue" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
