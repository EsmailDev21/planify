"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PiHouseDuotone,
  PiListChecksDuotone,
  PiUserListDuotone,
  PiToolboxDuotone,
  PiClipboardDuotone,
  PiChartBarDuotone,
  PiGearSixDuotone,
  PiHamburgerLight,
  PiInvoiceDuotone,
} from "react-icons/pi"; // Phosphor duotone icons
import PlanifyLogo from "@/components/logo/PlanifyLogo";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"; // Assuming Shadcn Drawer
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSidebar } from "@/hooks/use-sidebar";
const MobileDrawer = () => {
  const pathname = usePathname();
  const { isDrawerOpen, toggleDrawer } = useSidebar(); // Get current route

  console.log(pathname);

  // Helper function to determine if a route is active
  const isActive = (route: string) => pathname.slice(4) === route;

  const navItems = [
    { href: "#dashboard", label: "Tableau de Bord", icon: PiChartBarDuotone },
    { href: "/app/devis", label: "Dévis", icon: PiInvoiceDuotone },
    { href: "/app/projects", label: "Projets", icon: PiHouseDuotone },
    { href: "/app/tasks", label: "Tâches", icon: PiListChecksDuotone },
    { href: "#equipment", label: "Équipement", icon: PiToolboxDuotone },
    { href: "#reports", label: "Rapports", icon: PiClipboardDuotone },
    { href: "#settings", label: "Paramètres", icon: PiGearSixDuotone },
  ];
  return (
    <Drawer direction="bottom" open={isDrawerOpen} onOpenChange={toggleDrawer}>
      <DrawerTrigger>
        <Button variant="outline" onClick={toggleDrawer}>
          <PiHamburgerLight size={18} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 bg-white dark:bg-slate-900">
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-3 h-12 border-b border-slate-300 dark:border-slate-700">
            <PlanifyLogo />
            <Button
              variant="outline"
              onClick={toggleDrawer}
              className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            >
              <PiHamburgerLight size={24} />
            </Button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex flex-col flex-1 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href} className="block">
                <button
                  className={`flex items-center w-full px-2 py-2 rounded-md transition-all transform duration-300 ${
                    isActive(item.href)
                      ? "bg-primary text-slate-950"
                      : "text-slate-700 dark:text-slate-300"
                  } hover:scale-x-95 hover:bg-primary hover:text-slate-950`}
                >
                  <item.icon size={16} />
                  <span className="ml-2">{item.label}</span>
                </button>
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="px-3 py-3 border-t border-slate-300 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              © 2024 Planify
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
