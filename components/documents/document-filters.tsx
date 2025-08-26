"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface DocumentFiltersProps {
  selectedDepartment: string
  selectedStatus: string
  sortBy: string
  onDepartmentChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSortChange: (value: string) => void
}

export function DocumentFilters({
  selectedDepartment,
  selectedStatus,
  sortBy,
  onDepartmentChange,
  onStatusChange,
  onSortChange,
}: DocumentFiltersProps) {
  const departments = [
    { value: "all", label: "All Departments" },
    { value: "Engineering", label: "Engineering" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "Finance", label: "Finance" },
    { value: "HR", label: "HR" },
    { value: "Operations", label: "Operations" },
    { value: "Legal", label: "Legal" },
    { value: "IT Support", label: "IT Support" },
  ]

  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "analyzed", label: "Analyzed" },
    { value: "processing", label: "Processing" },
    { value: "failed", label: "Failed" },
    { value: "pending", label: "Pending" },
  ]

  const sortOptions = [
    { value: "date", label: "Upload Date" },
    { value: "name", label: "Name" },
    { value: "size", label: "File Size" },
    { value: "uploader", label: "Uploader" },
    { value: "department", label: "Department" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Department</Label>
            <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={selectedStatus} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
