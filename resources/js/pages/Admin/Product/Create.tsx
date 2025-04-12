import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";

const breadcrumbs = [
  { title: "Admin Dashboard", href: "/admin/dashboard" },
  { title: "Products Management", href: "/admin/products" },
  { title: "Create Product", href: "/admin/products/create" },
];

export default function CreateProduct() {
  const { data, setData, post, errors, processing } = useForm({
    name: "",
    price: "",
    stock_quantity: "",
    category: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("admin.products.store"));
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
        <SiteHeader title="Create New Product" />

        <div className="p-6">
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className={errors.name && "border-destructive"}
              />
              {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                className={errors.description && "border-destructive"}
              />
              {errors.description && (
                <p className="text-destructive text-sm">{errors.description}</p>
              )}
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                value={data.price}
                onChange={(e) => setData("price", e.target.value)}
                className={errors.price && "border-destructive"}
              />
              {errors.price && <p className="text-destructive text-sm">{errors.price}</p>}
            </div>

            <div>
              <Label htmlFor="stock_quantity">Stock Quantity</Label>
              <Input
                type="number"
                id="stock_quantity"
                value={data.stock_quantity}
                onChange={(e) => setData("stock_quantity", e.target.value)}
                className={errors.stock_quantity && "border-destructive"}
              />
              {errors.stock_quantity && (
                <p className="text-destructive text-sm">{errors.stock_quantity}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={data.category}
                onChange={(e) => setData("category", e.target.value)}
                className={errors.category && "border-destructive"}
              />
              {errors.category && <p className="text-destructive text-sm">{errors.category}</p>}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={processing}>
                {processing ? "Creating..." : "Create Product"}
              </Button>
              <Button asChild variant="secondary">
                <Link href={route("admin.products.index")}>Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}