"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, AlertTriangle, CheckCircle, Clock, Users, X, Eye, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Notification {
  id: string
  type: string
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "normal" | "high"
  department: string | null
  relatedDocument?: {
    id: string
    name: string
  }
  actions: Array<{
    label: string
    action: string
  }>
}

interface NotificationListProps {
  notifications: Notification[]
  onNotificationAction: (notificationId: string, action: string) => void
}

export function NotificationList({ notifications, onNotificationAction }: NotificationListProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "document_analyzed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "document_uploaded":
        return <Upload className="h-5 w-5 text-blue-600" />
      case "storage_warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "analysis_failed":
        return <X className="h-5 w-5 text-red-600" />
      case "scheduled_task":
        return <Clock className="h-5 w-5 text-purple-600" />
      case "team_activity":
        return <Users className="h-5 w-5 text-indigo-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "normal":
        return "border-l-blue-500"
      case "low":
        return "border-l-gray-300"
      default:
        return "border-l-gray-300"
    }
  }

  const handleActionClick = (notificationId: string, action: string) => {
    onNotificationAction(notificationId, action)
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`border-l-4 ${getPriorityColor(notification.priority)} ${
            !notification.read ? "bg-muted/20" : ""
          } hover:shadow-md transition-shadow`}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-sm">{notification.title}</h4>
                      {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
                      <Badge variant={notification.priority === "high" ? "destructive" : "outline"} className="text-xs">
                        {notification.priority}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}</span>
                      {notification.department && (
                        <Badge variant="outline" className="text-xs">
                          {notification.department}
                        </Badge>
                      )}
                      {notification.relatedDocument && (
                        <div className="flex items-center space-x-1">
                          <FileText className="h-3 w-3" />
                          <span>{notification.relatedDocument.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {notification.actions.length > 0 && (
                    <div className="flex items-center space-x-2 ml-4">
                      {notification.actions.slice(0, 2).map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleActionClick(notification.id, action.action)}
                          className="text-xs bg-transparent"
                        >
                          {action.action === "view_document" && <Eye className="h-3 w-3 mr-1" />}
                          {action.action === "view_analysis" && <ExternalLink className="h-3 w-3 mr-1" />}
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
