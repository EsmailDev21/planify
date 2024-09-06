"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Adjust the import path as per your project structure
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PiHouseDuotone } from "react-icons/pi";
import { CiMenuKebab } from "react-icons/ci";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface MainContentAreaProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
}

const MainContentArea: React.FC<MainContentAreaProps> = ({
  title,
  breadcrumbs,
  children,
}) => {
  return (
    <div className="flex border h-full shadow-lg border-slate-200 flex-col flex-1 p-4 sm:p-5 mt-3 sm:ml-14 transition-all duration-300 bg-white dark:bg-slate-800 rounded-xl">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2">
        <h1 className="text-base sm:text-lg font-bold text-slate-700 dark:text-white">
          {title}
        </h1>
        <div className="flex items-center mt-2 sm:mt-0 space-x-2 sm:space-x-3">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <CiMenuKebab size={18} />
          </Button>
        </div>
      </header>

      {/* Separator */}
      <Separator className="my-2 border-slate-300 dark:border-slate-700" />

      {/* Breadcrumb */}
      <Breadcrumb className="text-[0.65rem] sm:text-xs font-light text-slate-600 dark:text-slate-400">
        <BreadcrumbList className="flex flex-wrap">
          <BreadcrumbItem>
            <Link href="/" className="text-slate-700 dark:text-slate-300">
              <PiHouseDuotone />
            </Link>
          </BreadcrumbItem>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              {index !== breadcrumbs.length - 1 ? (
                <BreadcrumbItem>
                  <Link
                    href={"/app" + breadcrumb.href}
                    className="hover:underline"
                  >
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbPage>
                  <Link href={breadcrumb.href} className="hover:underline">
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbPage>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Content */}
      <main className="flex-1 p-3 sm:p-4 overflow-y-auto bg-white dark:bg-slate-900 rounded-lg shadow-sm">
        {children ? (
          children
        ) : (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Ici, vous pouvez afficher le contenu principal de la page en
            fonction de la navigation.
          </p>
        )}
      </main>
    </div>
  );
};

export default MainContentArea;
