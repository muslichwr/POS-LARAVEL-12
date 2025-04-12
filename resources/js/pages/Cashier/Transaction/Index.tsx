import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type Transaction } from "@/types";

interface Props {
  transactions: Transaction[];
}

export default function TransactionIndex({ transactions }: Props) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader title="Transaction Management" />

        <div className="p-6">
          <div className="flex justify-between mb-6">
            <Button asChild>
              <Link href={route("cashier.transactions.create")}>Create New Transaction</Link>
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Kasir</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.user?.name || "N/A"}</TableCell>
                  <TableCell>{transaction.cashier?.name || "N/A"}</TableCell>
                  <TableCell>${Number(transaction.total_amount).toFixed(2)}</TableCell>
                  <TableCell>
                    {/* Badge untuk Payment Status */}
                    <Badge
                      variant={
                        transaction.payment_status === "paid"
                          ? "success"
                          : transaction.payment_status === "pending"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {transaction.payment_status.charAt(0).toUpperCase() +
                        transaction.payment_status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {/* Badge untuk Payment Method */}
                    <Badge
                      variant={
                        transaction.payment_method === "cash"
                          ? "secondary"
                          : transaction.payment_method === "credit_card"
                          ? "blue"
                          : transaction.payment_method === "e_wallet"
                          ? "purple"
                          : "default"
                      }
                      className="capitalize"
                    >
                      {transaction.payment_method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="secondary">
                        <Link href={route("cashier.transactions.update_payment_status_form", transaction.id)}>
                          Update Payment Status
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <Link href={route("cashier.transactions.show", transaction.id)}>
                          Details
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the
                              transaction and remove its data from the system.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                router.delete(route("cashier.transactions.destroy", transaction.id))
                              }
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}