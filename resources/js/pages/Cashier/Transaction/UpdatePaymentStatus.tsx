import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";

interface Props {
    transaction: any;
}

export default function UpdatePaymentStatus({ transaction }: Props) {
    const { data, setData, post, processing } = useForm({
        payment_status: transaction.payment_status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route("cashier.transactions.update_payment_status", transaction.id), data);
    };

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />

            <SidebarInset>
                <SiteHeader title={`Update Payment Status - Transaction #${transaction.id}`} />

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                        <div>
                            <Label htmlFor="payment_status">Payment Status</Label>
                            <select
                                id="payment_status"
                                value={data.payment_status}
                                onChange={(e) => setData("payment_status", e.target.value)}
                                className="mt-2 block w-full"
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? "Updating..." : "Update Payment Status"}
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