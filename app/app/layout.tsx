"use client";

import React, { useState } from "react";
import Sidebar from "@/components/app/sidebar/Sidebar.component";
import MainContentArea from "@/components/app/mainContentArea/MainContentArea.component";
import Header from "@/components/app/appHeader/AppHeader.component"; // Ensure correct path

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar collapse

  // Example title and breadcrumbs; replace with your logic
  const title = "Dashboard"; // Example title
  const breadcrumbs = [
    { href: "/", label: "Accueil" },
    { href: "#dashboard", label: "Tableau de Bord" },
  ];

  return (
    <div className="flex h-screen pb-4 bg-gray-100 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 mr-4 ${
          isCollapsed ? "ml-4" : "ml-40"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex-1">
          <MainContentArea title={title} breadcrumbs={breadcrumbs}>
            {children}
          </MainContentArea>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
