import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Statistics {
  monthly_sales: Array<{ month: string; total_sales: number }>;
  successful_transactions: number;
  best_selling_products: Array<{ name: string; total_quantity: number }>;
  stock_status: Array<{ name: string; stock_quantity: number }>;
}

export default function AdminDashboard() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  // Fetch data statistik dari backend saat halaman dimuat
  useEffect(() => {
    fetch("/admin/dashboard/statistics")
      .then((response) => response.json())
      .then((data) => setStatistics(data))
      .catch((error) => console.error("Error fetching statistics:", error));
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Admin Dashboard" />

        <div className="p-6 bg-gray-900 min-h-screen text-white">
          <Head title="Admin Dashboard" />

          {/* Jika data belum dimuat */}
          {!statistics && <p className="text-gray-400">Loading...</p>}

          {/* Jika data sudah dimuat */}
          {statistics && (
            <>
              {/* Kartu Statistik Utama */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <p className="text-sm text-gray-400">Successful Transactions</p>
                  <p className="text-2xl font-bold">{statistics.successful_transactions}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <p className="text-sm text-gray-400">Monthly Sales</p>
                  <p className="text-2xl font-bold">
                    {statistics.monthly_sales.length > 0
                      ? `$${parseFloat(statistics.monthly_sales[0].total_sales).toFixed(2)}`
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Grafik Penjualan Bulanan */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl font-bold mb-4">Monthly Sales</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={statistics.monthly_sales.map((item) => ({
                      month: new Date(item.month).toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      }),
                      total_sales: item.total_sales,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#ffffff" />
                    <YAxis stroke="#ffffff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Produk Paling Laris */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl font-bold mb-4">Best Selling Products</h2>
                <ul>
                  {statistics.best_selling_products.map((product, index) => (
                    <li key={index} className="flex justify-between text-gray-400 mb-2">
                      <span>{product.name}</span>
                      <span>{product.total_quantity} units</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status Stok Produk */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Stock Status</h2>
                <ul>
                  {statistics.stock_status.map((product, index) => (
                    <li key={index} className="flex justify-between text-gray-400 mb-2">
                      <span>{product.name}</span>
                      <span>{product.stock_quantity} in stock</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}