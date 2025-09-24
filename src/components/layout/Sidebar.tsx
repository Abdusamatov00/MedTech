import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import {
  Users,
  Menu,
  Key,
  Stethoscope,
  ClipboardList,
  User,
} from "lucide-react";

interface SidebarItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  let sidebarItems: SidebarItem[] = [];

  if (
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/user")
  ) {
    sidebarItems = [
      {
        to: "/admin/users",
        icon: <Users size={20} />,
        label: "User Management",
      },
      { to: "/user", icon: <Key size={20} />, label: "Login Management" },
    ];
  } else if (
    location.pathname.startsWith("/reception") ||
    location.pathname.startsWith("/patients")
  ) {
    sidebarItems = [
      {
        to: "/reception",
        icon: <ClipboardList size={20} />,
        label: "Reception Panel",
      },
      { to: "/patients", icon: <User size={20} />, label: "Patients Panel" },
    ];
  } else if (location.pathname.startsWith("/doctor")) {
    sidebarItems = [
      { to: "/doctor", icon: <Stethoscope size={20} />, label: "Doctor Panel" },
    ];
  }

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024); // < lg screen collapse
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return null;

  return (
    <div
      className={`
        fixed md:relative z-40
        ${collapsed ? "w-20" : "w-64"} 
        bg-gradient-to-b from-blue-50 to-blue-100
        dark:from-gray-500 dark:to-gray-700
        shadow-xl border-r min-h-screen transition-all duration-300 flex flex-col
      `}
    >
      {/* Header */}
      <div className="mt-14 flex justify-between items-center px-4">
        {!collapsed && (
          <span className="font-bold text-lg text-gray-800 dark:text-white">
            Dashboard
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <Menu size={22} className="text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 space-y-2 px-2">
        {sidebarItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 
                ${
                  active
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-lg 
                ${active ? "bg-white/20" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                {item.icon}
              </div>
              <span
                className={`${
                  collapsed ? "hidden" : "inline text-sm font-medium"
                }`}
              >
                {item.label}
              </span>

              {collapsed && (
                <span className="absolute left-20 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
