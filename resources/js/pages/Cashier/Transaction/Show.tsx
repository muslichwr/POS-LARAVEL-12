import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Head, Link } from "@inertiajs/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Props {
  transaction: {
    id: number;
    user: { name: string };
    cashier: { name: string };
    total_amount: number;
    payment_status: string;
    payment_method: string;
    created_at: string;
    transaction_items: Array<{
      product: { name: string };
      quantity: number;
      price: number;
      total: number;
    }>;
  };
}

export default function TransactionShow({ transaction }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader title={`Transaction Details - #${transaction.id}`} />

        <div className="p-6 bg-black min-h-screen text-white">
          <div className="space-y-6">
            {/* Informasi Umum Transaksi */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Transaction Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Transaction ID</p>
                  <p className="font-medium">{transaction.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">User</p>
                  <p className="font-medium">{transaction.user?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Cashier</p>
                  <p className="font-medium">{transaction.cashier?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Amount</p>
                  <p className="font-medium">${Number(transaction.total_amount).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Payment Status</p>
                  <Badge
                    variant={
                      transaction.payment_status === "paid"
                        ? "success"
                        : transaction.payment_status === "pending"
                        ? "default"
                        : "destructive"
                    }
                    className="capitalize"
                  >
                    {transaction.payment_status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Payment Method</p>
                  <p className="font-medium capitalize">{transaction.payment_method}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Created At</p>
                  <p className="font-medium">{new Date(transaction.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Daftar Item Transaksi */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Transaction Items</h3>
              {transaction.transaction_items && transaction.transaction_items.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-700">
                      <TableHead className="text-gray-400">Product</TableHead>
                      <TableHead className="text-gray-400">Quantity</TableHead>
                      <TableHead className="text-gray-400">Price</TableHead>
                      <TableHead className="text-gray-400">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transaction.transaction_items.map((item, index) => (
                      <TableRow key={index} className="border-b border-gray-700 hover:bg-gray-900 transition">
                        <TableCell>{item.product?.name || "N/A"}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${Number(item.price).toFixed(2)}</TableCell>
                        <TableCell>${Number(item.total).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-400">No items found for this transaction.</p>
              )}
            </div>

            {/* Tombol Kembali */}
            <div className="flex justify-start">
              <Link href={route("cashier.transactions.index")}>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition">
                  Back to Transactions
                </button>
              </Link>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}