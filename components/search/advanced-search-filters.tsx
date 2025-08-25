"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface AdvancedSearchFiltersProps {
  filters: {
    departments: string[]
    fileTypes: string[]
    dateRange: { from: string; to: string }
    status: string[]
    uploaders: string[]
    tags: string[]
    contentType: string
  }
  onFiltersChange: (filters: any) => void
}

export function AdvancedSearchFilters({ filters, onFiltersChange }: AdvancedSearchFiltersProps) {
  const departments = ["Engineering", "Marketing", "Sales", "Finance", "HR", "Operations", "Legal", "IT Support"]
  const fileTypes = ["pdf", "doc", "docx", "txt", "jpg", "png", "ppt", "xls"]
  const statuses = ["analyzed", "processing", "failed", "pending"]
  const contentTypes = [
    { value: "all", label: "All Content" },
    { value: "text", label: "Document Text" },
    { value: "metadata", label: "Metadata Only" },
    { value: "ai-summary", label: "AI Summaries" },
  ]

  const handleArrayFilterChange = (filterKey: string, value: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      [filterKey]: checked
        ? [...(filters[filterKey as keyof typeof filters] as string[]), value]
        : (filters[filterKey as keyof typeof filters] as string[]).filter((item) => item !== value),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Departments */}
          <div className="space-y-3">
            <Label className="font-semibold">Departments</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {departments.map((dept) => (
                <div key={dept} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dept-${dept}`}
                    checked={filters.departments.includes(dept)}
                    onCheckedChange={(checked) => handleArrayFilterChange("departments", dept, checked as boolean)}
                  />
                  <Label htmlFor={`dept-${dept}`} className="text-sm">
                    {dept}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* File Types */}
          <div className="space-y-3">
            <Label className="font-semibold">File Types</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {fileTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.fileTypes.includes(type)}
                    onCheckedChange={(checked) => handleArrayFilterChange("fileTypes", type, checked as boolean)}
                  />
                  <Label htmlFor={`type-${type}`} className="text-sm">
                    {type.toUpperCase()}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <Label className="font-semibold">Status</Label>
            <div className="space-y-2">
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={filters.status.includes(status)}
                    onCheckedChange={(checked) => handleArrayFilterChange("status", status, checked as boolean)}
                  />
                  <Label htmlFor={`status-${status}`} className="text-sm capitalize">
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range & Content Type */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-semibold">Date Range</Label>
              <div className="space-y-2">
                <Input
                  type="date"
                  placeholder="From"
                  value={filters.dateRange.from}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      dateRange: { ...filters.dateRange, from: e.target.value },
                    })
                  }
                />
                <Input
                  type="date"
                  placeholder="To"
                  value={filters.dateRange.to}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      dateRange: { ...filters.dateRange, to: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Search In</Label>
              <Select
                value={filters.contentType}
                onValueChange={(value) => onFiltersChange({ ...filters, contentType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
