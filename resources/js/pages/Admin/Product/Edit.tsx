// resources/js/pages/Cashier/Transactions/Update.tsx

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const breadcrumbs = [
  { title: "Cashier Dashboard", href: "/cashier/dashboard" },
  { title: "Transaction Management", href: "/cashier/transactions" },
  { title: "Update Transaction", href: "/cashier/transactions/edit" },
];

export default function UpdateTransaction({ transaction }: { transaction: any }) {
  const { data, setData, patch, errors, processing } = useForm({
    user_id: transaction.user_id || "",
    cashier_id: transaction.cashier_id || "",
    total_amount: transaction.total_amount || 0,
    payment_status: transaction.payment_status || "pending",
    payment_method: transaction.payment_method || "",
    items: transaction.items || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route("cashier.transactions.edit", transaction.id));
  };

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData(key, e.target.value);
  };

  const handleItemChange = (index: number) => (key: keyof { product_id: number; quantity: number; price: number }) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedItems = [...data.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [key]: e.target.value,
    };
    setData("items", updatedItems);
  };

  const addItem = () => {
    setData("items", [...data.items, { product_id: 0, quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    setData("items", data.items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return data.items.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0);
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
        <SiteHeader title="Update Transaction" breadcrumbs={breadcrumbs} />

        <div className="p-6">
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
            {/* User ID */}
            <div>
              <Label htmlFor="user_id">User ID</Label>
              <Input
                id="user_id"
                value={data.user_id}
                onChange={handleChange("user_id")}
                className={errors.user_id && "border-destructive"}
              />
              {errors.user_id && <p className="text-destructive text-sm">{errors.user_id}</p>}
            </div>

            {/* Cashier ID */}
            <div>
              <Label htmlFor="cashier_id">Cashier ID</Label>
              <Input
                id="cashier_id"
                value={data.cashier_id}
                onChange={handleChange("cashier_id")}
                className={errors.cashier_id && "border-destructive"}
              />
              {errors.cashier_id && <p className="text-destructive text-sm">{errors.cashier_id}</p>}
            </div>

            {/* Total Amount */}
            <div>
              <Label htmlFor="total_amount">Total Amount</Label>
              <Input
                id="total_amount"
                type="number"
                value={calculateTotal()}
                readOnly
                className="bg-gray-100"
              />
            </div>

            {/* Payment Status */}
            <div>
              <Label htmlFor="payment_status">Payment Status</Label>
              <select
                id="payment_status"
                value={data.payment_status}
                onChange={handleChange("payment_status")}
                className={errors.payment_status && "border-destructive"}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
              {errors.payment_status && <p className="text-destructive text-sm">{errors.payment_status}</p>}
            </div>

            {/* Payment Method */}
            <div>
              <Label htmlFor="payment_method">Payment Method</Label>
              <select
                id="payment_method"
                value={data.payment_method}
                onChange={handleChange("payment_method")}
                className={errors.payment_method && "border-destructive"}
              >
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="e_wallet">E-Wallet</option>
              </select>
              {errors.payment_method && <p className="text-destructive text-sm">{errors.payment_method}</p>}
            </div>

            {/* Items */}
            <div>
              <h3 className="font-bold mb-2">Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          id={`product_${index}`}
                          value={item.product_id}
                          onChange={handleItemChange(index)("product_id")}
                          className={errors.items?.[index]?.product_id && "border-destructive"}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          id={`quantity_${index}`}
                          type="number"
                          value={item.quantity}
                          onChange={handleItemChange(index)("quantity")}
                          className={errors.items?.[index]?.quantity && "border-destructive"}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          id={`price_${index}`}
                          type="number"
                          value={item.price}
                          onChange={handleItemChange(index)("price")}
                          className={errors.items?.[index]?.price && "border-destructive"}
                        />
                      </TableCell>
                      <TableCell>${(Number(item.quantity) * Number(item.price)).toFixed(2)}</TableCell>
                      <TableCell>
                        <button onClick={() => removeItem(index)} type="button">
                          Remove
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <button onClick={addItem} type="button" className="mt-2">
                Add Item
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button type="submit" disabled={processing}>
                {processing ? "Updating..." : "Update Transaction"}
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