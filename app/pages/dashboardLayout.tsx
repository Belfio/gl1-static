import DashHeader from "~/@/components/DashHeader";
import { Nav } from "~/@/components/DashNav";
import { Separator } from "~/@/components/ui/separator";
import { Outlet, useLocation } from "@remix-run/react";
import {
  Activity,
  ChartNetwork,
  ChartPie,
  Headset,
  House,
  LayoutDashboard,
  Settings,
  TextSearch,
} from "lucide-react";
import { useContext } from "react";
import { UserContext } from "~/providers/userContext";
import GL1_logo_Black from "~/@/assets/images/GL1_logo_Black.svg";
import GL1_logo from "~/@/assets/images/gl1-logo.svg";

export default function DashboardLayout() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const hideHeader =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  if (hideHeader) {
    return <Outlet />;
  }
  const isCollapsed = false;
  return (
    <div className="">
      {/* Header */}
      {/* SideBar */}
      <div className="flex">
        {/* SideBar */}
        <div className="w-1/6 min-w-64 h-screen agradient-background-light bg-[var(--darkblue)] text-[var(--blue)]">
          <div className="fixed  w-1/6 min-w-64 border-r border-dark dark:border-muted h-screen">
            <div className="flex items-center h-[102px] px-2">
              <img src={GL1_logo} alt="GL1" className="w-[84px] h-[84px]" />
            </div>
            <div className="flex-1 flex-col w-full">
              <Nav
                isCollapsed={false}
                links={[
                  {
                    title: "Overview",
                    url: "/",
                    icon: LayoutDashboard,
                  },
                ]}
              />
            </div>
            {/* <Separator /> */}

            <div className="flex-1 flex-col ">
              <Nav
                isCollapsed={false}
                links={[
                  {
                    title: "Portfolio",
                    url: "/portfolio",
                    icon: ChartPie,
                  },
                  {
                    title: "Decarbonisation Pathways",
                    url: "/decarbonisation",
                    icon: ChartNetwork,
                  },
                  {
                    title: "Properties",
                    url: "/properties",
                    icon: House,
                  },
                  {
                    title: "Reports (soon)",
                    url: "/reports",
                    icon: TextSearch,
                  },
                  {
                    title: "Monitoring (soon)",
                    url: "/monitoring",
                    icon: Activity,
                  },
                ]}
              />
            </div>
            <div className="">
              <Separator />
              <Nav
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Settings (soon)",
                    url: "/settings",
                    icon: Settings,
                  },
                  {
                    title: "Support (soon)",
                    url: "/support",
                    icon: Headset,
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="w-5/6 bg-white">
          <DashHeader user={user} />
          {/* Content */}

          <Outlet />
        </div>
      </div>
    </div>
  );
}
