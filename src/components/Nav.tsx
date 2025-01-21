'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export function Nav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="bg-primary text-foreground h-screen w-64 fixed left-0 top-0 px-4 py-6">
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    // Get the current pathname
    const pathname = usePathname();

    return <Link {...props} className={cn("block py-3 px-4 w-full hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground rounded-md mb-1",
        pathname === props.href && "bg-background text-foreground")}/>
}