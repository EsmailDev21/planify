"use client";

import React, { useCallback, useState } from "react";
import Sidebar from "@/components/app/sidebar/Sidebar.component";
import MainContentArea from "@/components/app/mainContentArea/MainContentArea.component";
import Header from "@/components/app/appHeader/AppHeader.component"; // Ensure correct path
import { usePathname } from "next/navigation";
import ScrollToTopButton from "@/components/website/utilityComponents/ScrollToTopButton";
import { Provider } from "react-redux";
import store from "@/lib/redux/store";
import { useMediaQuery } from "@/hooks/use-media-query";
type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar collapse
  const isMobile = useMediaQuery("(max-width: 768px)");
  // Example title and breadcrumbs; replace with your logic
  // Example title

  const path = usePathname();
  const getTitle = useCallback(
    (path: string) => {
      switch (path) {
        case "/app/projects":
          return "Mes Projets";

          break;
        case "/app/tasks":
          return "Mes Tâches";

          break;

        default:
          return "Tableau du bords";
          break;
      }
    },
    [path]
  );
  const title = getTitle(path);
  console.log({ path });
  const pathRoutes = path
    .split("/")
    .filter((item, _index) => item != "app" && item != "");
  console.log(pathRoutes);

  const breadcrumbs = [
    { href: "/", label: "Accueil" },
    ...pathRoutes.map((i) => ({ href: "/" + i, label: i.toLocaleLowerCase() })),
  ];

  return (
    <Provider store={store}>
      <div
        className={`flex h-screen  pb-4 bg-gray-100 dark:bg-slate-950 ${
          isMobile && "overflow-x-hidden"
        }`}
      >
        {/* Sidebar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main content area */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300  ${
            isCollapsed && !isMobile ? "ml-4 mr-4" : !isMobile && "ml-44 mr-4"
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
        <ScrollToTopButton />
      </div>
    </Provider>
  );
};

export default AppLayout;
