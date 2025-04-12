// resources/js/pages/Cashier/Transaction/Create.tsx

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Props {
    users: any[];
    cashiers: any[];
    products: any[];
    paymentMethods: string[];
}

export default function CreateTransaction({ users, cashiers, products, paymentMethods }: Props) {
    const page = usePage().props;

    const [formData, setFormData] = useState({
        user_id: "",
        cashier_id: "",
        total_amount: 0,
        payment_status: "pending",
        payment_method: "",
        items: [] as { product_id: number; quantity: number; price: number }[],
    });

    const addItem = () => {
        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, { product_id: 0, quantity: 1, price: 0 }],
        }));
    };

    const removeItem = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    };

    const calculateTotal = () => {
        return formData.items.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route("cashier.transactions.store"), formData);
    };

    const handleChange = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    const handleItemChange = (index: number) => (key: keyof { product_id: number; quantity: number; price: number }) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => {
            const updatedItems = [...prev.items];
            updatedItems[index] = {
                ...updatedItems[index],
                [key]: e.target.value,
            };
            return {
                ...prev,
                items: updatedItems,
            };
        });
    };

    const handleProductSelect = (index: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const productId = Number(e.target.value);
        const selectedProduct = products.find((product) => product.id === productId);

        if (selectedProduct) {
            const updatedItems = [...formData.items];
            updatedItems[index] = {
                ...updatedItems[index],
                product_id: productId,
                price: selectedProduct.price,
            };

            setFormData((prev) => ({
                ...prev,
                items: updatedItems,
            }));
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />

            <SidebarInset>
                <SiteHeader title="Create New Transaction" />

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
                        <div>
                            <Label htmlFor="user_id">User ID</Label>
                            <select
                                id="user_id"
                                value={formData.user_id}
                                onChange={handleChange("user_id")}
                                className={page.errors.user_id && "border-destructive"}
                            >
                                <option value="">Select User</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            {page.errors.user_id && (
                                <p className="text-destructive text-sm">{page.errors.user_id}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="cashier_id">Cashier ID</Label>
                            <select
                                id="cashier_id"
                                value={formData.cashier_id}
                                onChange={handleChange("cashier_id")}
                                className={page.errors.cashier_id && "border-destructive"}
                            >
                                <option value="">Select Cashier</option>
                                {cashiers.map((cashier) => (
                                    <option key={cashier.id} value={cashier.id}>
                                        {cashier.name}
                                    </option>
                                ))}
                            </select>
                            {page.errors.cashier_id && (
                                <p className="text-destructive text-sm">{page.errors.cashier_id}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="total_amount">Total Amount</Label>
                            <Input
                                type="number"
                                id="total_amount"
                                value={calculateTotal()}
                                readOnly
                                className="bg-gray-100"
                            />
                        </div>

                        <div>
                            <h3 className="font-bold mb-2">Items</h3>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {formData.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <select
                                                    id={`product_${index}`}
                                                    value={item.product_id}
                                                    onChange={handleProductSelect(index)}
                                                >
                                                    <option value="">Select Product</option>
                                                    {products.map((product) => (
                                                        <option key={product.id} value={product.id}>
                                                            {product.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    id={`quantity_${index}`}
                                                    value={item.quantity}
                                                    onChange={handleItemChange(index)("quantity")}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    id={`price_${index}`}
                                                    value={item.price}
                                                    onChange={handleItemChange(index)("price")}
                                                />
                                            </TableCell>
                                            <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                                            <TableCell>
                                                <button onClick={() => removeItem(index)} type="button">
                                                    Remove
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <button onClick={addItem} type="button">
                                Add Item
                            </button>
                        </div>

                        <div>
                            <Label htmlFor="payment_method">Payment Method</Label>
                            <select
                                id="payment_method"
                                value={formData.payment_method}
                                onChange={handleChange("payment_method")}
                                className={page.errors.payment_method && "border-destructive"}
                            >
                                <option value="">Select Payment Method</option>
                                {paymentMethods.map((method) => (
                                    <option key={method} value={method}>
                                        {method}
                                    </option>
                                ))}
                            </select>
                            {page.errors.payment_method && (
                                <p className="text-destructive text-sm">{page.errors.payment_method}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="payment_status">Payment Status</Label>
                            <select
                                id="payment_status"
                                value={formData.payment_status}
                                onChange={handleChange("payment_status")}
                                className={page.errors.payment_status && "border-destructive"}
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="failed">Failed</option>
                            </select>
                            {page.errors.payment_status && (
                                <p className="text-destructive text-sm">{page.errors.payment_status}</p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={false}>
                                Create Transaction
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