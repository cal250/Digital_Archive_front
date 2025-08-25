"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "next/link"
import {
  ImageIcon,
  FileText,
  File,
  MoreHorizontal,
  Eye,
  Download,
  Share,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  HardDrive,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Document {
  id: string
  name: string
  size: string
  type: string
  uploader: string
  department: string
  uploadDate: string
  status: "analyzed" | "processing" | "failed" | "pending"
  tags: string[]
  aiSummary: string | null
}

interface DocumentListProps {
  documents: Document[]
}

export function DocumentList({ documents }: DocumentListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const getFileIcon = (type: string) => {
    if (["jpg", "jpeg", "png", "gif"].includes(type)) {
      return ImageIcon
    }
    if (["pdf", "doc", "docx", "txt"].includes(type)) {
      return FileText
    }
    return File
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "analyzed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      analyzed: "default",
      processing: "secondary",
      failed: "destructive",
      pending: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No documents found</h3>
          <p className="text-muted-foreground text-center">
            Try adjusting your search criteria or upload some documents to get started.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => {
        const FileIcon = getFileIcon(document.type)

        return (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* File Icon */}
                  <div className="p-2 bg-muted rounded-lg">
                    <FileIcon className="h-6 w-6 text-muted-foreground" />
                  </div>

                  {/* Document Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold truncate">{document.name}</h3>
                      {getStatusIcon(document.status)}
                      {getStatusBadge(document.status)}
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{document.uploader}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDistanceToNow(new Date(document.uploadDate), { addSuffix: true })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HardDrive className="h-3 w-3" />
                        <span>{document.size}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {document.department}
                      </Badge>
                    </div>

                    {/* Tags */}
                    {document.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {document.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* AI Summary */}
                    {document.aiSummary && (
                      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                        <p className="text-sm text-accent-foreground/80">
                          <span className="font-medium text-accent">AI Summary: </span>
                          {document.aiSummary}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <Link href={`/dashboard/documents/${document.id}`}>View</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
