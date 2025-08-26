"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { AccountSettings } from "@/components/settings/account-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { StorageSettings } from "@/components/settings/storage-settings"
import { DepartmentSettings } from "@/components/settings/department-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Settings, Bell, Shield, HardDrive, Users } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data - replace with actual user context
  const user = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    role: "Senior Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    isAdmin: true,
    joinDate: "2023-06-15T00:00:00Z",
    lastLogin: "2024-01-15T10:30:00Z",
    storageUsed: 2.4, // GB
    storageLimit: 10, // GB
    documentsCount: 156,
    preferences: {
      theme: "light",
      language: "en",
      timezone: "America/New_York",
      notifications: {
        email: true,
        push: true,
        documentAnalysis: true,
        teamActivity: false,
        storageAlerts: true,
        weeklyDigest: true,
      },
    },
  }

  const tabs = [
    {
      value: "profile",
      label: "Profile",
      icon: User,
      description: "Manage your personal information and preferences",
    },
    {
      value: "account",
      label: "Account",
      icon: Settings,
      description: "Update account settings and preferences",
    },
    {
      value: "notifications",
      label: "Notifications",
      icon: Bell,
      description: "Configure notification preferences",
    },
    {
      value: "security",
      label: "Security",
      icon: Shield,
      description: "Manage password and security settings",
    },
    {
      value: "storage",
      label: "Storage",
      icon: HardDrive,
      description: "View storage usage and manage files",
    },
    ...(user.isAdmin
      ? [
          {
            value: "department",
            label: "Department",
            icon: Users,
            description: "Manage department settings and members",
          },
        ]
      : []),
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and system settings</p>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Settings</CardTitle>
                <CardDescription>Choose a category to configure</CardDescription>
              </CardHeader>
              <CardContent>
                <TabsList className="flex flex-col h-auto w-full space-y-1 bg-transparent p-0">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="w-full justify-start data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                    >
                      <tab.icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <tab.icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </CardTitle>
                      <CardDescription>{tab.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {tab.value === "profile" && <ProfileSettings user={user} />}
                      {tab.value === "account" && <AccountSettings user={user} />}
                      {tab.value === "notifications" && <NotificationSettings user={user} />}
                      {tab.value === "security" && <SecuritySettings user={user} />}
                      {tab.value === "storage" && <StorageSettings user={user} />}
                      {tab.value === "department" && user.isAdmin && <DepartmentSettings user={user} />}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
