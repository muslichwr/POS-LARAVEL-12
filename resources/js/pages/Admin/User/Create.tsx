import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Head, Link, router } from '@inertiajs/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from '@inertiajs/react'
import { type User } from "@/types"

const breadcrumbs = [
  { title: 'Admin Dashboard', href: '/admin/dashboard' },
  { title: 'Users Management', href: '/admin/users' },
  { title: 'Create User', href: '/admin/users/create' },
]

export default function CreateUser() {
  const { data, setData, post, errors, processing } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('admin.users.store'))
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      
      <SidebarInset>
      <SiteHeader title="Create New User" />
        
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Create New User</h1>
          
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className={errors.name && 'border-destructive'}
              />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className={errors.email && 'border-destructive'}
              />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className={errors.password && 'border-destructive'}
              />
              {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input 
                type="password"
                id="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Select 
                value={data.role}
                onValueChange={(value) => setData('role', value as 'admin' | 'cashier' | 'user')}
              >
                <SelectTrigger className={errors.role && 'border-destructive'}>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-destructive text-sm mt-1">{errors.role}</p>}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={processing}>
                {processing ? 'Creating...' : 'Create User'}
              </Button>
              <Button asChild variant="secondary">
                <Link href={route('admin.users.index')}>Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}