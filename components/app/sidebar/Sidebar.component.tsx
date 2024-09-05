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
} from "react-icons/pi"; // Phosphor duotone icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PlanifyLogo from "@/components/logo/PlanifyLogo";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"; // Assuming Shadcn Drawer
import { useMediaQuery } from "@/hooks/use-media-query";

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Get current route
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  console.log(pathname);

  // Helper function to determine if a route is active
  const isActive = (route: string) => pathname.slice(4) === route;

  const navItems = [
    { href: "#dashboard", label: "Tableau de Bord", icon: PiChartBarDuotone },
    { href: "/app/projects", label: "Projets", icon: PiHouseDuotone },
    { href: "/app/tasks", label: "Tâches", icon: PiListChecksDuotone },
    { href: "#team", label: "Équipe", icon: PiUserListDuotone },
    { href: "#equipment", label: "Équipement", icon: PiToolboxDuotone },
    { href: "#reports", label: "Rapports", icon: PiClipboardDuotone },
    { href: "#settings", label: "Paramètres", icon: PiGearSixDuotone },
  ];
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? null : (
    <aside
      className={`fixed top-3 left-3 h-screen ${
        isCollapsed ? "md:w-12 md:flex hidden " : "w-52"
      } transition-all p-1 duration-300 rounded-lg text-xs bg-white dark:bg-slate-900 shadow-lg backdrop-blur-md backdrop-brightness-90 border border-slate-200 dark:border-slate-700`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-3 h-12 border-b border-slate-300 dark:border-slate-700">
          {!isCollapsed && <PlanifyLogo />}
          <button
            onClick={toggleCollapse}
            className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
          >
            {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        {/* User Info */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-start px-3"
          } py-2 border-b border-slate-300 dark:border-slate-700`}
        >
          {/* UserButton */}
          {!isCollapsed && (
            <div className="ml-2">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Esmail Khorchani
              </p>
              <p className="text-[0.65rem] font-thin text-slate-400 dark:text-slate-500">
                esmailKhorchani.dev@gmail.com
              </p>
            </div>
          )}
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
                {!isCollapsed && <span className="ml-2">{item.label}</span>}
              </button>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="px-3 py-3 border-t border-slate-300 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              © 2024 Planify
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
