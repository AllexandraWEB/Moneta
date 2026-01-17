"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/src/components/navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();

  const hiddenRoutes = ["/auth/login", "/auth/register"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return <Navigation />;
}
