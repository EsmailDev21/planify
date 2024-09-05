// hooks/useSidebar.ts

import { useState } from "react";

export function useSidebar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
}
