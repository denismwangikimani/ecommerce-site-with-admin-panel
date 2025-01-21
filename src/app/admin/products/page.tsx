import Link from "next/link";
import { PageHeader } from "../_components/PageHeader";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
            <Link href="/admin/products/new">New Product</Link>
        </Button>
      </div>
    </>
  );
}
