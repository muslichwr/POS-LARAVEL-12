import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'cashier' | 'user'
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Product {
    id: number;
    name: string;
    price: number;
    stock_quantity: number;
    category?: string | null;
    description?: string | null;
}

export interface Transaction {
    id: number;
    user_id: number; // Foreign key untuk pengguna
    cashier_id: number; // Foreign key untuk kasir
    total_amount: number;
    payment_status: 'pending' | 'paid' | 'failed'; // Enum untuk status pembayaran
    payment_method: string;
    user?: { // Relasi ke pengguna
        id: number;
        name: string;
        email: string;
        // Tambahkan properti lain sesuai kebutuhan
    };
    cashier?: { // Relasi ke kasir
        id: number;
        name: string;
        email: string;
        // Tambahkan properti lain sesuai kebutuhan
    };
    transactionItems?: TransactionItem[]; // Relasi ke item transaksi
}

export interface TransactionItem {
    id: number;
    transaction_id: number; // Foreign key ke transaksi
    product_id: number; // Foreign key ke produk
    quantity: number;
    price: number;
}