"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { HardDrive, Trash2, Download, Archive, FileText, ImageIcon, File } from "lucide-react"

interface User {
  storageUsed: number
  storageLimit: number
  documentsCount: number
}

interface StorageSettingsProps {
  user: User
}

export function StorageSettings({ user }: StorageSettingsProps) {
  const storagePercentage = (user.storageUsed / user.storageLimit) * 100

  const storageBreakdown = [
    { type: "Documents", size: 1.8, count: 89, icon: FileText, color: "bg-blue-500" },
    { type: "Images", size: 0.4, count: 34, icon: ImageIcon, color: "bg-green-500" },
    { type: "Other", size: 0.2, count: 33, icon: File, color: "bg-gray-500" },
  ]

  const largeFiles = [
    {
      name: "Annual Report 2023.pdf",
      size: "45.2 MB",
      type: "pdf",
      lastModified: "2024-01-10",
    },
    {
      name: "Marketing Presentation.pptx",
      size: "38.7 MB",
      type: "pptx",
      lastModified: "2024-01-08",
    },
    {
      name: "Product Demo Video.mp4",
      size: "156.3 MB",
      type: "mp4",
      lastModified: "2024-01-05",
    },
    {
      name: "Database Backup.sql",
      size: "89.1 MB",
      type: "sql",
      lastModified: "2024-01-03",
    },
  ]

  const handleCleanup = () => {
    console.log("Starting storage cleanup")
  }

  const handleArchive = () => {
    console.log("Archiving old files")
  }

  const handleExport = () => {
    console.log("Exporting data")
  }

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HardDrive className="h-5 w-5" />
            <span>Storage Overview</span>
          </CardTitle>
          <CardDescription>Monitor your storage usage and manage your files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Used Storage</span>
              <span>
                {user.storageUsed} GB of {user.storageLimit} GB
              </span>
            </div>
            <Progress value={storagePercentage} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{storagePercentage.toFixed(1)}% used</span>
              <span>{(user.storageLimit - user.storageUsed).toFixed(1)} GB remaining</span>
            </div>
          </div>

          {storagePercentage > 80 && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                You're running low on storage space. Consider archiving or deleting old files.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Storage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Breakdown</CardTitle>
          <CardDescription>See how your storage is being used</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {storageBreakdown.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${item.color.replace("bg-", "bg-opacity-20 bg-")}`}>
                    <item.icon className={`h-4 w-4 ${item.color.replace("bg-", "text-")}`} />
                  </div>
                  <div>
                    <p className="font-medium">{item.type}</p>
                    <p className="text-sm text-muted-foreground">{item.count} files</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.size} GB</p>
                  <p className="text-sm text-muted-foreground">{((item.size / user.storageUsed) * 100).toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Large Files */}
      <Card>
        <CardHeader>
          <CardTitle>Large Files</CardTitle>
          <CardDescription>Files taking up the most space</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {largeFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">Modified {file.lastModified}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{file.size}</Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Storage Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Management</CardTitle>
          <CardDescription>Tools to help manage your storage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" onClick={handleCleanup} className="bg-transparent">
              <Trash2 className="h-4 w-4 mr-2" />
              Clean Up Files
            </Button>
            <Button variant="outline" onClick={handleArchive} className="bg-transparent">
              <Archive className="h-4 w-4 mr-2" />
              Archive Old Files
            </Button>
            <Button variant="outline" onClick={handleExport} className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
