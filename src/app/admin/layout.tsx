import { Nav, NavLink } from "@/components/Nav"

//we will make the layout dynamic because we do not want want to catch the pag as we want to get the most accurate data from the store
export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex">
      <Nav>
      <h2 className="text-lg font-bold px-4 mb-4">Admin Panel</h2>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>
      <div className="ml-64 w-full p-6">{children}</div>
    </div>
  )
}