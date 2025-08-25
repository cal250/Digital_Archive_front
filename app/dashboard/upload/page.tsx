"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, FileText, ImageIcon, File, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface UploadFile {
  id: string
  file: File
  progress: number
  status: "pending" | "uploading" | "processing" | "completed" | "error"
  error?: string
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [department, setDepartment] = useState("")
  const [tags, setTags] = useState("")
  const [description, setDescription] = useState("")
  const router = useRouter()

  const departments = ["Engineering", "Marketing", "Sales", "Finance", "HR", "Operations", "Legal", "IT Support"]

  const acceptedFileTypes = [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".ppt",
    ".pptx",
    ".xls",
    ".xlsx",
  ]

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) {
      return ImageIcon
    }
    if (["pdf", "doc", "docx", "txt"].includes(extension || "")) {
      return FileText
    }
    return File
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      addFiles(selectedFiles)
    }
  }

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      const extension = "." + file.name.split(".").pop()?.toLowerCase()
      return acceptedFileTypes.includes(extension) && file.size <= 10 * 1024 * 1024 // 10MB limit
    })

    const uploadFiles: UploadFile[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "pending",
    }))

    setFiles((prev) => [...prev, ...uploadFiles])
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const uploadFiles = async () => {
    if (!department) {
      alert("Please select a department")
      return
    }

    for (const uploadFile of files) {
      if (uploadFile.status !== "pending") continue

      // Update status to uploading
      setFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, status: "uploading" } : f)))

      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          setFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, progress } : f)))
        }

        // Simulate processing
        setFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, status: "processing" } : f)))

        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Mark as completed
        setFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, status: "completed" } : f)))

        // Here you would make the actual API call
        // const formData = new FormData()
        // formData.append('file', uploadFile.file)
        // formData.append('department', department)
        // formData.append('tags', tags)
        // formData.append('description', description)
        // await fetch('/api/documents/upload', { method: 'POST', body: formData })
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? {
                  ...f,
                  status: "error",
                  error: "Upload failed. Please try again.",
                }
              : f,
          ),
        )
      }
    }
  }

  const allCompleted = files.length > 0 && files.every((f) => f.status === "completed")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold">Upload Documents</h1>
          <p className="text-muted-foreground">Add new files to your document library</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Files</CardTitle>
                <CardDescription>Drag and drop files here or click to browse. Maximum file size: 10MB</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-accent bg-accent/10" : "border-muted-foreground/25 hover:border-accent/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
                  <p className="text-muted-foreground mb-4">
                    Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, PPT, XLS
                  </p>
                  <input
                    type="file"
                    multiple
                    accept={acceptedFileTypes.join(",")}
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </span>
                    </Button>
                  </label>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold">Selected Files ({files.length})</h4>
                    {files.map((uploadFile) => {
                      const FileIcon = getFileIcon(uploadFile.file.name)
                      return (
                        <div key={uploadFile.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <FileIcon className="h-5 w-5 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{uploadFile.file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            {uploadFile.status === "uploading" && (
                              <Progress value={uploadFile.progress} className="mt-2" />
                            )}
                            {uploadFile.error && <p className="text-sm text-destructive mt-1">{uploadFile.error}</p>}
                          </div>
                          <div className="flex items-center space-x-2">
                            {uploadFile.status === "completed" && <CheckCircle className="h-5 w-5 text-green-600" />}
                            {uploadFile.status === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
                            {uploadFile.status === "processing" && (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent"></div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(uploadFile.id)}
                              disabled={uploadFile.status === "uploading"}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Metadata Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Details</CardTitle>
                <CardDescription>Add metadata to help organize your files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="e.g. financial, quarterly, report"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Separate tags with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the document..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button onClick={uploadFiles} disabled={files.length === 0 || !department} className="w-full">
                  Upload {files.length} File{files.length !== 1 ? "s" : ""}
                </Button>

                {allCompleted && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      All files uploaded successfully!
                      <Button
                        variant="link"
                        className="p-0 ml-1 h-auto"
                        onClick={() => router.push("/dashboard/documents")}
                      >
                        View documents
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
