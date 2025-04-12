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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "@inertiajs/react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  description: string;
  category: string;
}

interface Props {
  product: Product;
}

const breadcrumbs = [
  { title: "Admin Dashboard", href: "/admin/dashboard" },
  { title: "Products Management", href: "/admin/product/index" },
  { title: "Edit Product", href: "" }, // Akan diisi dengan route dinamis
];

export default function EditProduct({ product }: Props) {
  const { data, setData, put, errors, processing } = useForm({
    name: product.name,
    price: product.price.toString(),
    stock_quantity: product.stock_quantity.toString(),
    description: product.description || "",
    category: product.category || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route("admin.products.update", product.id));
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader title={`Edit Product : ${product.name}`} />

        <div className="p-6">
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className={errors.name && "border-destructive"}
              />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                value={data.price}
                onChange={(e) => setData("price", e.target.value)}
                className={errors.price && "border-destructive"}
              />
              {errors.price && <p className="text-destructive text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Stock Quantity */}
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
                <p className="text-destructive text-sm mt-1">{errors.stock_quantity}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                className={errors.description && "border-destructive"}
              />
              {errors.description && (
                <p className="text-destructive text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={data.category}
                onValueChange={(value) => setData("category", value)}
              >
                <SelectTrigger className={errors.category && "border-destructive"}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-destructive text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button type="submit" disabled={processing}>
                {processing ? "Updating..." : "Update Product"}
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