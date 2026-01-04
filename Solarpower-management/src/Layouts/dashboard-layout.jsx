import React from "react";
import { Outlet, useLocation } from "react-router";
import {
  Calendar,
  Home,
  TriangleAlert,
  CreditCard,
  User,
  ChevronsUpDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useGetInvoicesForUserQuery } from "@/lib/redux/query";
import { UserButton, useUser } from "@clerk/clerk-react";
import Logo from "@/assets/enovex-logo.png";

const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Anomalies",
    url: "/dashboard/anomalies",
    icon: TriangleAlert,
  },
  {
    title: "Invoices",
    url: "/dashboard/invoices",
    icon: CreditCard,
  },
  {
    title: "Profile",
    url: "/dashboard/user",
    icon: User,
  },
];

const DashboardLayout = () => {
  const { user } = useUser();
  const location = useLocation();

  const { data: invoices } = useGetInvoicesForUserQuery(undefined, {
    pollingInterval: 30000,
  });

  const invoiceList = Array.isArray(invoices) ? invoices : invoices?.data || [];
  const pendingCount = invoiceList.filter(
    (inv) => inv.paymentStatus === "PENDING"
  ).length;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50/50">
        <Sidebar className="border-r-0 bg-primary text-white">
          {/* Header */}
          <SidebarHeader className="h-16 flex items-center px-6 border-b border-white/10">
            <div className="flex gap-2 mr-10">
              <img
                src={Logo}
                alt="Enovex Logo"
                className="h-8 w-auto "
              />
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Platform
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const isActive = location.pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          isActive={isActive}
                          className={`
                            h-10 px-4 rounded-xl transition-all duration-200
                            ${
                              isActive
                                ? 
                                  "bg-white text-primary font-bold shadow-md"
                                : 
                                  "text-white/70 hover:bg-white/10 hover:text-white"
                            }
                          `}
                        >
                          <a
                            href={item.url}
                            className="flex justify-between items-center w-full"
                          >
                            <div className="flex items-center gap-3">
                              <item.icon
                                className={`h-4 w-4 ${
                                  isActive ? "text-primary" : "text-white/70"
                                }`}
                              />
                              <span>{item.title}</span>
                            </div>

                            {/* Notification Badge */}
                            {item.title === "Invoices" && pendingCount > 0 && (
                              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm shadow-rose-500/20">
                                {pendingCount}
                              </span>
                            )}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer */}
          <SidebarFooter className="p-4 border-t border-white/10">
            <SidebarMenuButton className="h-auto w-full p-2 hover:bg-white/10 transition-all rounded-xl border border-transparent">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  {/* Avatar Wrapper */}
                  <div className="rounded-full border border-white/20 p-0.5 bg-white/10">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-8 h-8",
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-semibold text-white truncate w-24">
                      {user?.firstName || "User"}
                    </span>
                    <span className="text-[10px] text-white/60 truncate w-24">
                      {user?.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </div>
                <ChevronsUpDown className="h-4 w-4 text-white/50" />
              </div>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50/50">
          {/* Top Navbar */}
          <header className="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-9 w-9 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-500" />
              <h2 className="font-semibold text-gray-700 hidden md:block">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium text-gray-500">
                System Operational
              </span>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
