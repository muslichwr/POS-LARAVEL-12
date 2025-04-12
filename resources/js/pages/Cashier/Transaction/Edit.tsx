// resources/js/pages/Cashier/Transactions/Update.tsx

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";

const breadcrumbs = [
  { title: "Cashier Dashboard", href: "/cashier/dashboard" },
  { title: "Transaction Management", href: "/cashier/transactions" },
  { title: "Update Transaction", href: "/cashier/transactions/edit" },
];

export default function UpdateTransaction() {
  const { data, setData, patch, errors, processing } = useForm({
    payment_status: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route("cashier.transactions.edit", data));
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader title="Update Transaction Status" />

        <div className="p-6">
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
            <div>
              <Label htmlFor="payment_status">Payment Status</Label>
              <select
                id="payment_status"
                value={data.payment_status}
                onChange={(e) => setData("payment_status", e.target.value)}
                className={errors.payment_status && "border-destructive"}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
              {errors.payment_status && (
                <p className="text-destructive text-sm">{errors.payment_status}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={processing}>
                {processing ? "Updating..." : "Update Status"}
              </Button>
              <Button asChild variant="secondary">
                <Link href={route("cashier.transactions.index")}>Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}