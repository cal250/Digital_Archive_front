"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DocumentList } from "@/components/documents/document-list"
import { DocumentFilters } from "@/components/documents/document-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [showFilters, setShowFilters] = useState(false)

  // Mock document data - replace with actual API call
  const documents = [
    {
      id: "1",
      name: "Q4 Financial Report.pdf",
      size: "2.4 MB",
      type: "pdf",
      uploader: "John Smith",
      department: "Finance",
      uploadDate: "2024-01-15T10:30:00Z",
      status: "analyzed",
      tags: ["financial", "quarterly", "report"],
      aiSummary: "Comprehensive financial analysis showing 15% revenue growth...",
    },
    {
      id: "2",
      name: "Employee Handbook.docx",
      size: "1.8 MB",
      type: "docx",
      uploader: "Sarah Johnson",
      department: "HR",
      uploadDate: "2024-01-14T14:20:00Z",
      status: "processing",
      tags: ["hr", "handbook", "policies"],
      aiSummary: null,
    },
    {
      id: "3",
      name: "Marketing Strategy 2024.pdf",
      size: "3.2 MB",
      type: "pdf",
      uploader: "Mike Davis",
      department: "Marketing",
      uploadDate: "2024-01-13T09:15:00Z",
      status: "analyzed",
      tags: ["marketing", "strategy", "2024"],
      aiSummary: "Strategic marketing plan focusing on digital transformation...",
    },
    {
      id: "4",
      name: "Product Roadmap.png",
      size: "856 KB",
      type: "png",
      uploader: "Emily Chen",
      department: "Engineering",
      uploadDate: "2024-01-12T16:45:00Z",
      status: "analyzed",
      tags: ["product", "roadmap", "engineering"],
      aiSummary: "Visual roadmap outlining key product milestones for Q1-Q2...",
    },
    {
      id: "5",
      name: "Sales Presentation.pptx",
      size: "4.1 MB",
      type: "pptx",
      uploader: "David Wilson",
      department: "Sales",
      uploadDate: "2024-01-11T11:30:00Z",
      status: "failed",
      tags: ["sales", "presentation"],
      aiSummary: null,
    },
  ]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.uploader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDepartment = selectedDepartment === "all" || doc.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold">Documents</h1>
            <p className="text-muted-foreground">Manage and organize your uploaded files</p>
          </div>
          <Link href="/dashboard/upload">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents, uploaders, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <DocumentFilters
            selectedDepartment={selectedDepartment}
            selectedStatus={selectedStatus}
            sortBy={sortBy}
            onDepartmentChange={setSelectedDepartment}
            onStatusChange={setSelectedStatus}
            onSortChange={setSortBy}
          />
        )}

        {/* Document List */}
        <DocumentList documents={filteredDocuments} />

        {/* Results Summary */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredDocuments.length} of {documents.length} documents
        </div>
      </div>
    </DashboardLayout>
  )
}
