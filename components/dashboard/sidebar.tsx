"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Home,
  Upload,
  Search,
  Bell,
  Settings,
  Users,
  BarChart3,
  Folder,
  Clock,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(["documents"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Upload", href: "/dashboard/upload", icon: Upload },
    { name: "Search", href: "/dashboard/search", icon: Search },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: "3" },
  ]

  const documentSections = [
    { name: "All Documents", href: "/dashboard/documents", icon: FileText, count: "1,234" },
    { name: "Recent", href: "/dashboard/documents/recent", icon: Clock, count: "23" },
    { name: "Processing", href: "/dashboard/documents/processing", icon: BarChart3, count: "5" },
  ]

  const departments = [
    { name: "Engineering", count: "456" },
    { name: "Marketing", count: "234" },
    { name: "Sales", count: "189" },
    { name: "HR", count: "123" },
  ]

  const bottomNavigation = [
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-sidebar-accent rounded-lg">
                <FileText className="h-5 w-5 text-sidebar-accent-foreground" />
              </div>
              <span className="font-serif font-bold text-sidebar-foreground">Digital Achievement</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Main Navigation */}
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Documents Section */}
            <div className="pt-4">
              <Button
                variant="ghost"
                onClick={() => toggleSection("documents")}
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-2"
              >
                {expandedSections.includes("documents") ? (
                  <ChevronDown className="h-4 w-4 mr-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-2" />
                )}
                <Folder className="h-4 w-4 mr-2" />
                Documents
              </Button>
              {expandedSections.includes("documents") && (
                <div className="ml-6 space-y-1">
                  {documentSections.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        size="sm"
                        className={cn(
                          "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground",
                        )}
                      >
                        <item.icon className="h-3 w-3 mr-2" />
                        {item.name}
                        <span className="ml-auto text-xs text-sidebar-foreground/60">{item.count}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Departments Section */}
            <div className="pt-4">
              <Button
                variant="ghost"
                onClick={() => toggleSection("departments")}
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-2"
              >
                {expandedSections.includes("departments") ? (
                  <ChevronDown className="h-4 w-4 mr-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-2" />
                )}
                <Users className="h-4 w-4 mr-2" />
                Departments
              </Button>
              {expandedSections.includes("departments") && (
                <div className="ml-6 space-y-1">
                  {departments.map((dept) => (
                    <Link key={dept.name} href={`/dashboard/departments/${dept.name.toLowerCase()}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        {dept.name}
                        <span className="ml-auto text-xs text-sidebar-foreground/60">{dept.count}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-sidebar-border p-4 space-y-1">
            {bottomNavigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
