import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Head, usePage } from "@inertiajs/react";

interface Transaction {
  id: number;
  total_amount: number;
  payment_status: string;
  created_at: string;
}

export default function CashierDashboard() {
  const pageProps = usePage().props;
  const recentTransactions: Array<Transaction> = pageProps.recentTransactions || [];

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
        <SiteHeader title="Cashier Dashboard" />

        <div className="p-6 bg-gray-900 min-h-screen text-white">
          <Head title="Cashier Dashboard" />

          {/* Header */}
          <h1 className="text-2xl font-bold mb-8">Welcome to Cashier Dashboard</h1>

          {/* Recent Transactions */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            <ul>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <li key={transaction.id} className="flex justify-between text-gray-400 mb-2">
                    <span>Transaction #{transaction.id}</span>
                    <span>${parseFloat(transaction.total_amount).toFixed(2)}</span>
                    <span
                      className={`font-bold ${
                        transaction.payment_status === "paid"
                          ? "text-green-500"
                          : transaction.payment_status === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.payment_status.charAt(0).toUpperCase() +
                        transaction.payment_status.slice(1)}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No recent transactions found.</p>
              )}
            </ul>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}