'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  BookOpen, 
  Building2, 
  Calendar, 
  Code, 
  Code2, 
  LayoutDashboard, 
  Sparkles, 
  Star,
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { useAuth } from "@/components/auth-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const learningNavItems = [
  { title: "Patterns", url: "/patterns", icon: Code },
  { title: "Study Plans", url: "/study-plans", icon: BookOpen },
  { title: "Companies", url: "/companies", icon: Building2 },
];

const secondaryNavItems = [
  { title: "Cheat Sheets", url: "/cheat-sheets", icon: Sparkles },
  { title: "System Design", url: "/system-design", icon: LayoutDashboard },
  { title: "Complexity", url: "/complexity", icon: BarChart3 },
  { title: "Interview Tips", url: "/tips", icon: Star },
  { title: "AI Mock Interview", url: "/mock-interview", icon: Code2 },
  { title: "Mock Interviews", url: "/scheduler", icon: Users },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar variant="sidebar" className="border-r pt-16 z-40 bg-background !overflow-visible">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className="absolute -right-6 top-1/2 z-50 h-10 w-6 -translate-y-1/2 rounded-none rounded-r-md border-l-0 shadow-md hidden md:flex items-center justify-center bg-background shrink-0"
      >
        {state === 'expanded' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold mb-2">Learning Paths</SidebarGroupLabel>
          <SidebarGroupContent className="overflow-hidden">
            <SidebarMenu>
              {learningNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold mb-2">Resources</SidebarGroupLabel>
          <SidebarGroupContent className="overflow-hidden">
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
