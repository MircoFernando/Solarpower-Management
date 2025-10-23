import { Outlet } from "react-router";
import { AppSidebar } from "../components/AppSide";
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar'


export function DashboardLayout() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    <Outlet />
                </main>
            </SidebarProvider>
        </>
    );
};

export default DashboardLayout;