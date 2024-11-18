"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  PiHouseDuotone,
  PiListChecksDuotone,
  PiUserListDuotone,
  PiToolboxDuotone,
  PiClipboardDuotone,
  PiChartBarDuotone,
  PiGearSixDuotone,
  PiInvoiceDuotone,
  PiFilesDuotone,
  PiUserDuotone,
  PiUsersFourDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import PlanifyLogo from "@/components/logo/PlanifyLogo";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";

const Sidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { href: "#dashboard", label: "Tableau de Bord", icon: PiChartBarDuotone },
    { href: "/app/quotes", label: "Mes Dévis", icon: PiInvoiceDuotone },
    { href: "/app/projects", label: "Projets", icon: PiClipboardDuotone },

    { href: "/app/tasks", label: "Tâches", icon: PiListChecksDuotone },

    {
      href: "#file-manager",
      label: "Fichiers et documents",
      icon: PiFilesDuotone,
    },
    { href: "#teams", label: "Team manager", icon: PiUsersThreeDuotone },
  ];
  console.log({ pathname });
  const isActive = (route: any) => {
    console.log({ pathname, route });
    return pathname === route;
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 flex flex-col border-r border-muted bg-background transition-all duration-300 ${
        isExpanded ? "w-56" : "w-14"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>
      <nav className=" flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#profile"
                className={`flex items-center justify-start w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground ${
                  isExpanded ? "px-4 py-2" : "justify-center h-9 w-9"
                }`}
              >
                <PiUserDuotone className="h-5 w-5" />
                {isExpanded && <span className="ml-3">Profile</span>}
              </Link>
            </TooltipTrigger>
            {!isExpanded && (
              <TooltipContent side="right">Profile</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </nav>
      <Separator className="w-5/6 self-center" />
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`flex items-center justify-start w-full rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-accent text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  } ${isExpanded ? "px-4 py-2" : "justify-center h-9 w-9"}`}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      isActive(item.href) ? "text-blue-600" : null
                    }`}
                  />
                  {isExpanded && <span className="ml-3">{item.label}</span>}
                </Link>
              </TooltipTrigger>
              {!isExpanded && (
                <TooltipContent side="right">{item.label}</TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#settings"
                className={`flex items-center justify-start w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground ${
                  isExpanded ? "px-4 py-2" : "justify-center h-9 w-9"
                }`}
              >
                <PiGearSixDuotone className="h-5 w-5" />
                {isExpanded && <span className="ml-3">Paramètres</span>}
              </Link>
            </TooltipTrigger>
            {!isExpanded && (
              <TooltipContent side="right">Paramètres</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
