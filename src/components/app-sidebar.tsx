"use client"

import { Home, Search, User } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import woowLogo from "@/assets/woow_logo.jpeg"
import { NavUser } from "@/components/nav-user"
import { useLogout } from "@/hooks/useLogout"
import { useAuthStore } from "@/stores/auth.store"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const appName = "Woow"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((s) => s.user)
  const { logout } = useLogout()
  const location = useLocation()
  const isDashboardActive = location.pathname === "/dashboard"
  const isProfileActive = location.pathname === "/profile"
  const isSearchUsersActive = location.pathname === "/users"

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard" className="font-semibold">
                <img
                  src={woowLogo}
                  alt={appName}
                  className="size-8 shrink-0 rounded-lg object-contain"
                />
                <span>{appName}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isDashboardActive} tooltip="Inicio">
                <Link to="/dashboard">
                  <Home />
                  <span>Inicio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isProfileActive} tooltip="Perfil">
                <Link to="/profile">
                  <User />
                  <span>Perfil</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isSearchUsersActive} tooltip="Buscar usuarios">
                <Link to="/users">
                  <Search />
                  <span>Buscar usuarios</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{ name: user.name, email: user.email }}
            onLogout={() => void logout()}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
