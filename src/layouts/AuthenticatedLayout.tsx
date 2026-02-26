import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const DEFAULT_PAGE_TITLE = "Inicio";

export type AuthenticatedLayoutContext = {
  setPageTitle: (title: string) => void;
};

export function AuthenticatedLayout() {
  const [pageTitle, setPageTitle] = useState(DEFAULT_PAGE_TITLE);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-lg font-semibold">{pageTitle}</h1>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          <Outlet context={{ setPageTitle } satisfies AuthenticatedLayoutContext} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
