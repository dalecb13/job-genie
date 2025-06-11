import { Link, Outlet, useLocation } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/common/app-sidebar"
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "sonner";

const HeaderLayout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const parts = location.pathname
    .split('/')
    .filter((part) => part !== '')
    .map((part, index, parts) => {
      const to = parts
        .slice(0, index + 1)
        .join('/');

      const displayText = part
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      
      return <Link key={part} className="pl-3 border-l" to={to}>{displayText}</Link>;
    })

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="main-container h-screen w-full">
        {
          !isMobile && (
            <div className="p-4 flex flex-row gap-2">
              <SidebarTrigger />
              {
                parts
              }
            </div>
          )
        }
        <div className="px-4 h-full overflow-scroll md:pt-4">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  )
}

export default HeaderLayout;
