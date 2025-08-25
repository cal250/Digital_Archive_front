"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon, File, Eye, Download, Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface SearchResult {
  id: string
  name: string
  type: string
  size: string
  uploader: string
  department: string
  uploadDate: string
  status: string
  tags: string[]
  relevanceScore: number
  matchType: string
  highlights: {
    content: string[]
    filename: string[]
    tags: string[]
  }
  aiSummary: string
}

interface SearchResultsProps {
  results: SearchResult[]
  query: string
}

export function SearchResults({ results, query }: SearchResultsProps) {
  const getFileIcon = (type: string) => {
    if (["jpg", "jpeg", "png", "gif"].includes(type)) {
      return ImageIcon
    }
    if (["pdf", "doc", "docx", "txt"].includes(type)) {
      return FileText
    }
    return File
  }

  const getMatchTypeBadge = (matchType: string) => {
    const types = {
      content: { label: "Content Match", variant: "default" as const },
      metadata: { label: "Metadata Match", variant: "secondary" as const },
      tags: { label: "Tag Match", variant: "outline" as const },
      filename: { label: "Filename Match", variant: "secondary" as const },
    }

    return types[matchType as keyof typeof types] || { label: "Match", variant: "outline" as const }
  }

  return (
    <div className="space-y-4">
      {results.map((result) => {
        const FileIcon = getFileIcon(result.type)
        const matchBadge = getMatchTypeBadge(result.matchType)

        return (
          <Card key={result.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* File Icon */}
                  <div className="p-2 bg-muted rounded-lg">
                    <FileIcon className="h-6 w-6 text-muted-foreground" />
                  </div>

                  {/* Document Info */}
                  <div className="flex-1 min-w-0">
                    {/* Title and Relevance */}
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">
                        {result.highlights.filename.length > 0 ? (
                          <span dangerouslySetInnerHTML={{ __html: result.highlights.filename[0] }} />
                        ) : (
                          result.name
                        )}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs text-muted-foreground">
                          {Math.round(result.relevanceScore * 100)}%
                        </span>
                      </div>
                      <Badge variant={matchBadge.variant} className="text-xs">
                        {matchBadge.label}
                      </Badge>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>{result.uploader}</span>
                      <span>{formatDistanceToNow(new Date(result.uploadDate), { addSuffix: true })}</span>
                      <span>{result.size}</span>
                      <Badge variant="outline" className="text-xs">
                        {result.department}
                      </Badge>
                    </div>

                    {/* Content Highlights */}
                    {result.highlights.content.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-muted-foreground mb-1">Content matches:</p>
                        {result.highlights.content.map((highlight, index) => (
                          <p key={index} className="text-sm bg-muted/50 p-2 rounded">
                            <span dangerouslySetInnerHTML={{ __html: highlight }} />
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Tag Highlights */}
                    {result.highlights.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                        {result.tags.map((tag) => {
                          const isHighlighted = result.highlights.tags.some((h) => h.includes(tag))
                          return (
                            <Badge key={tag} variant={isHighlighted ? "default" : "secondary"} className="text-xs">
                              {isHighlighted ? (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: result.highlights.tags.find((h) => h.includes(tag)) || tag,
                                  }}
                                />
                              ) : (
                                tag
                              )}
                            </Badge>
                          )
                        })}
                      </div>
                    )}

                    {/* AI Summary */}
                    {result.aiSummary && (
                      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                        <p className="text-sm text-accent-foreground/80">
                          <span className="font-medium text-accent">AI Summary: </span>
                          {result.aiSummary}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Link href={`/dashboard/documents/${result.id}`}>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
