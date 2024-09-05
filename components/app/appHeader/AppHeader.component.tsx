"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CiSearch } from "react-icons/ci";
import { PiBellRingingLight } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/hooks/use-sidebar";
import MobileDrawer from "../sidebar/MobileDrawer";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <header className="sticky top-4 z-50 backdrop-blur-md bg-opacity-70 transition-all duration-300 flex flex-col-reverse shadow-lg sm:flex-row items-center justify-between p-3 sm:p-4 mt-3 sm:ml-14 rounded-xl bg-transparent dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      {/* Left Side: Search Bar */}
      {isMobile && <MobileDrawer />}
      <div className="flex w-full max-w-full sm:max-w-sm items-center space-x-2 mb-2 sm:mb-0">
        <Input
          type="text"
          placeholder="Rechercher..."
          className="w-full text-sm sm:text-base"
        />
        <Button type="submit" className="text-lg p-2">
          <CiSearch size={18} />
        </Button>
      </div>

      {/* Center: Notifications and User Profile */}
      <div className="flex md:items-center items-start justify-items-center space-x-3 sm:space-x-4">
        {/* Notifications */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                className="p-2 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <PiBellRingingLight size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User Profile Avatar */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href="/profile">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>EK</AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Profil</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
}
