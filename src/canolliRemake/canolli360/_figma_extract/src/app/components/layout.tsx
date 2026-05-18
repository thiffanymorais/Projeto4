import { Outlet } from "react-router";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { Footer } from "./footer";

export function Layout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
