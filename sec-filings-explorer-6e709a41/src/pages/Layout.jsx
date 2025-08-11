
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Search, FileText, History, Building2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Search Filings",
    url: createPageUrl("Search"),
    icon: Search,
  },
  {
    title: "Filing History",
    url: createPageUrl("History"),
    icon: History,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --primary: 11 20 38;
            --primary-foreground: 248 250 252;
            --secondary: 37 99 235;
            --secondary-foreground: 255 255 255;
            --muted: 241 245 249;
            --muted-foreground: 100 116 139;
            --accent: 37 99 235;
            --accent-foreground: 255 255 255;
            --border: 226 232 240;
            --card: 255 255 255;
            --card-foreground: 15 23 42;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }
        `}
      </style>
      
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100">
        <Sidebar className="border-r border-slate-200 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">SEC Lookup</h2>
                <p className="text-xs text-slate-500 font-medium">EDGAR Filing Search</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-2 py-3">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 rounded-xl px-4 py-3 ${
                          location.pathname === item.url ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-2 py-3">
                Quick Access
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">Popular Filings</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['10-K', '10-Q', '8-K', 'DEF 14A'].map(type => (
                      <div key={type} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-center font-medium">
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <span className="text-slate-700 font-semibold text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">User</p>
                <p className="text-xs text-slate-500 truncate">SEC Filing Research</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-8 py-6 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-900">SEC Lookup</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
