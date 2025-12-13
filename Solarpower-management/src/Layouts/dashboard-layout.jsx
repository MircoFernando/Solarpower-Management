import { Outlet } from "react-router";
import { useState } from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { AppSidebar } from "../components/AppSide"
import { ChartAreaInteractive } from "../components/chart-area-interactive"
import { DataTable } from "../components/data-table"
import { SectionCards } from "../components/section-cards"
import { SiteHeader } from "../components/site-header"
import { BrowserRouter, Routes, Route } from 'react-router'
import SolarEnergyProduction from "../pages/home/components/SolarEnergyProduction"
import { useGetAllNewUsersQuery } from "../lib/redux/query";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/clerk-react";

// TODO : check if signed in user has a solar unit assign useUser === newUser redirect them to apply to a solarunit

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]


const DashboardLayout = () => {

  const [isAssigned, setIsAssigned] = useState(false);



    return (
         
    <SidebarProvider>
      <AppSidebar items={items} variant="inset" />
      <main className="p-4 w-full bg-slate-200">
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="flex m-3 p-2">
                <SolarEnergyProduction />
              </div> 
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      </main>
    </SidebarProvider>
  )
};

export default DashboardLayout;