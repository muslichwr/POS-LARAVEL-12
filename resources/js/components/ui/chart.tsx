import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { BarChart, Card, CardContent, CardHeader, CardTitle } from "@/components/ui/chart"; // Import chart dari shadcn/ui

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
                <Card className="bg-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-sm text-gray-400">Successful Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{statistics.successful_transactions}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-sm text-gray-400">Monthly Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      ${statistics.monthly_sales[0]?.total_sales.toFixed(2) || "N/A"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Grafik Penjualan Bulanan */}
              <Card className="bg-gray-800 shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Monthly Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={statistics.monthly_sales.map((item) => ({
                      label: new Date(item.month).toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      }),
                      value: item.total_sales,
                    }))}
                    xAxisKey="label"
                    yAxisKey="value"
                  />
                </CardContent>
              </Card>

              {/* Produk Paling Laris */}
              <Card className="bg-gray-800 shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Best Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {statistics.best_selling_products.map((product, index) => (
                      <li key={index} className="flex justify-between text-gray-400 mb-2">
                        <span>{product.name}</span>
                        <span>{product.total_quantity} units</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Status Stok Produk */}
              <Card className="bg-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Stock Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {statistics.stock_status.map((product, index) => (
                      <li key={index} className="flex justify-between text-gray-400 mb-2">
                        <span>{product.name}</span>
                        <span>{product.stock_quantity} in stock</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}