"use client";
import AppHeader from "@/components/app/appHeader/AppHeader.component";
import Sidebar from "@/components/app/sidebar/Sidebar.component";
import store from "@/lib/redux/store";
import React from "react";
import { Provider } from "react-redux";

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <AppHeader />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
            {children}
          </main>
        </div>
      </div>
    </Provider>
  );
};

export default AppLayout;
