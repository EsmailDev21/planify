"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator"; // Assume custom icons
import { CiSearch } from "react-icons/ci";
import { PiBellRingingLight } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 mt-3 ml-14 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      {/* Left Side: Search Bar */}
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Rechercher..." />
        <Button type="submit" className="text-lg">
          <CiSearch size={18} />
        </Button>
      </div>

      {/* Center: Notifications and User Profile */}
      <div className="flex items-center space-x-4">
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
                <Avatar>
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
