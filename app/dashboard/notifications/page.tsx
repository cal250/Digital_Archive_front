"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { NotificationList } from "@/components/notifications/notification-list"
import { NotificationFilters } from "@/components/notifications/notification-filters"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, CheckCheck, Settings, Filter } from "lucide-react"

export default function NotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Mock notifications data - replace with actual API call
  const notifications = [
    {
      id: "1",
      type: "document_analyzed",
      title: "Document Analysis Complete",
      message: "Q4 Financial Report.pdf has been successfully analyzed with AI insights",
      timestamp: "2024-01-15T10:30:00Z",
      read: false,
      priority: "normal",
      department: "Finance",
      relatedDocument: {
        id: "doc1",
        name: "Q4 Financial Report.pdf",
      },
      actions: [
        { label: "View Document", action: "view_document" },
        { label: "View Analysis", action: "view_analysis" },
      ],
    },
    {
      id: "2",
      type: "document_uploaded",
      title: "New Document Uploaded",
      message: "Marketing team uploaded Strategy 2024.pdf to your department",
      timestamp: "2024-01-15T09:15:00Z",
      read: false,
      priority: "low",
      department: "Marketing",
      relatedDocument: {
        id: "doc2",
        name: "Strategy 2024.pdf",
      },
      actions: [{ label: "View Document", action: "view_document" }],
    },
    {
      id: "3",
      type: "storage_warning",
      title: "Storage Limit Warning",
      message: "You're using 85% of your storage quota. Consider archiving old documents.",
      timestamp: "2024-01-15T08:00:00Z",
      read: true,
      priority: "high",
      department: null,
      actions: [
        { label: "Manage Storage", action: "manage_storage" },
        { label: "View Usage", action: "view_usage" },
      ],
    },
    {
      id: "4",
      type: "analysis_failed",
      title: "Analysis Failed",
      message: "Unable to analyze Employee Handbook.docx due to file corruption",
      timestamp: "2024-01-14T16:45:00Z",
      read: true,
      priority: "high",
      department: "HR",
      relatedDocument: {
        id: "doc3",
        name: "Employee Handbook.docx",
      },
      actions: [
        { label: "Re-upload", action: "reupload" },
        { label: "Contact Support", action: "support" },
      ],
    },
    {
      id: "5",
      type: "scheduled_task",
      title: "Scheduled Report Due",
      message: "Monthly compliance report is due in 2 days",
      timestamp: "2024-01-14T14:20:00Z",
      read: false,
      priority: "normal",
      department: "Legal",
      actions: [
        { label: "Create Report", action: "create_report" },
        { label: "Set Reminder", action: "set_reminder" },
      ],
    },
    {
      id: "6",
      type: "team_activity",
      title: "Team Member Added",
      message: "Alice Johnson has been added to the Engineering department",
      timestamp: "2024-01-14T11:30:00Z",
      read: true,
      priority: "low",
      department: "Engineering",
      actions: [],
    },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "unread") return !notification.read
    if (selectedFilter === "high") return notification.priority === "high"
    return notification.type === selectedFilter
  })

  const unreadCount = notifications.filter((n) => !n.read).length
  const highPriorityCount = notifications.filter((n) => n.priority === "high").length

  const markAllAsRead = () => {
    // API call to mark all notifications as read
    console.log("Marking all notifications as read")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with document activities and system alerts</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" onClick={markAllAsRead} className="bg-transparent">
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-blue-500 rounded-full" />
                <div>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                  <p className="text-sm text-muted-foreground">Unread</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-red-500 rounded-full" />
                <div>
                  <p className="text-2xl font-bold">{highPriorityCount}</p>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-green-500 rounded-full" />
                <div>
                  <p className="text-2xl font-bold">{notifications.length - unreadCount}</p>
                  <p className="text-sm text-muted-foreground">Read</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        {showFilters && (
          <NotificationFilters
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            notifications={notifications}
          />
        )}

        {/* Notifications List */}
        <NotificationList
          notifications={filteredNotifications}
          onNotificationAction={(notificationId, action) => {
            console.log("Notification action:", notificationId, action)
          }}
        />

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
              <p className="text-muted-foreground text-center">
                {selectedFilter === "all"
                  ? "You're all caught up! No new notifications."
                  : "No notifications match your current filter."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
