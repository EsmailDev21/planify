"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Make sure to adjust the import path based on your project structure
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PiHouseDuotone } from "react-icons/pi";

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
    <div className="flex border h-full  border-slate-200 flex-col flex-1 p-5 mt-3 ml-14 transition-all duration-300 bg-white dark:bg-slate-800 rounded-xl">
      {/* Header */}
      <header className="flex items-center justify-between py-2">
        <h1 className="text-lg font-bold text-slate-700 dark:text-white">
          {title}
        </h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            Ajouter
          </Button>
        </div>
      </header>

      {/* Separator */}
      <Separator className="my-2 border-slate-300 dark:border-slate-700" />

      {/* Breadcrumb */}
      <Breadcrumb className="text-xs font-light text-slate-600 dark:text-slate-400">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="text-slate-700 dark:text-slate-300">
              <PiHouseDuotone />
            </Link>
          </BreadcrumbItem>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator></BreadcrumbSeparator>
              {index != breadcrumbs.length ? (
                <BreadcrumbItem>
                  <Link href={breadcrumb.href} className="hover:underline">
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
      <main className="flex-1 p-4 overflow-y-auto bg-white dark:bg-slate-900 rounded-lg shadow-sm">
        {children ? (
          children
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Ici, vous pouvez afficher le contenu principal de la page en
            fonction de la navigation.
          </p>
        )}
      </main>
    </div>
  );
};

export default MainContentArea;
