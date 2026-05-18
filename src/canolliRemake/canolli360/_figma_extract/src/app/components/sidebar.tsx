import { NavLink } from "react-router";
import { DollarSign, Megaphone, Users, Settings } from "lucide-react";

const navItems = [
  { path: "/", label: "Finance", icon: DollarSign },
  { path: "/campaigns", label: "Campaigns", icon: Megaphone },
  { path: "/retention", label: "Retention", icon: Users },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-20 bg-sidebar flex flex-col items-center py-8 gap-8">
      {/* Logo */}
      <div className="bg-primary rounded-xl p-3 shadow-lg">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-colors group ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-6 w-6 ${isActive ? "text-white" : ""}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
