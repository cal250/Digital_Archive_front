"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NotificationFiltersProps {
  selectedFilter: string
  onFilterChange: (filter: string) => void
  notifications: any[]
}

export function NotificationFilters({ selectedFilter, onFilterChange, notifications }: NotificationFiltersProps) {
  const filterOptions = [
    {
      value: "all",
      label: "All Notifications",
      count: notifications.length,
    },
    {
      value: "unread",
      label: "Unread",
      count: notifications.filter((n) => !n.read).length,
    },
    {
      value: "high",
      label: "High Priority",
      count: notifications.filter((n) => n.priority === "high").length,
    },
    {
      value: "document_analyzed",
      label: "Analysis Complete",
      count: notifications.filter((n) => n.type === "document_analyzed").length,
    },
    {
      value: "document_uploaded",
      label: "New Uploads",
      count: notifications.filter((n) => n.type === "document_uploaded").length,
    },
    {
      value: "storage_warning",
      label: "Storage Alerts",
      count: notifications.filter((n) => n.type === "storage_warning").length,
    },
    {
      value: "scheduled_task",
      label: "Scheduled Tasks",
      count: notifications.filter((n) => n.type === "scheduled_task").length,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(option.value)}
              className="bg-transparent"
            >
              {option.label}
              {option.count > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {option.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
