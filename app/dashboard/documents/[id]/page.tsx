"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DocumentViewer } from "@/components/documents/document-viewer"
import { AIAnalysisPanel } from "@/components/documents/ai-analysis-panel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Share, Edit, Trash2, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function DocumentViewPage() {
  const params = useParams()
  const documentId = params.id as string

  // Mock document data - replace with actual API call
  const document = {
    id: documentId,
    name: "Q4 Financial Report.pdf",
    size: "2.4 MB",
    type: "pdf",
    uploader: "John Smith",
    department: "Finance",
    uploadDate: "2024-01-15T10:30:00Z",
    status: "analyzed",
    tags: ["financial", "quarterly", "report"],
    url: "/placeholder.svg?height=800&width=600",
    ocrText: `QUARTERLY FINANCIAL REPORT
Q4 2023

EXECUTIVE SUMMARY
This quarter has shown remarkable growth across all key performance indicators. Revenue increased by 15% compared to the previous quarter, driven primarily by strong performance in our core product lines.

KEY METRICS
- Total Revenue: $2.4M (+15% QoQ)
- Net Profit: $480K (+22% QoQ)
- Customer Acquisition: 1,250 new customers
- Customer Retention Rate: 94%

DEPARTMENTAL PERFORMANCE
Sales Department exceeded targets by 12%, while Marketing generated 35% more qualified leads than the previous quarter. Operations maintained efficiency while scaling to meet increased demand.

OUTLOOK
Based on current trends and market analysis, we project continued growth in Q1 2024, with an estimated revenue increase of 8-12%.`,
    aiAnalysis: {
      summary:
        "This Q4 financial report demonstrates strong company performance with 15% revenue growth and 22% profit increase. Key highlights include successful customer acquisition and high retention rates, indicating healthy business fundamentals.",
      keyInsights: [
        "Revenue growth of 15% quarter-over-quarter indicates strong market position",
        "Customer retention rate of 94% suggests high customer satisfaction",
        "Sales department performance exceeded targets, showing effective sales strategy",
        "Marketing generated 35% more qualified leads, improving sales pipeline",
      ],
      entities: [
        { type: "Financial Metric", value: "$2.4M Revenue", confidence: 0.95 },
        { type: "Financial Metric", value: "$480K Net Profit", confidence: 0.93 },
        { type: "Percentage", value: "15% Growth", confidence: 0.97 },
        { type: "Department", value: "Sales", confidence: 0.89 },
        { type: "Department", value: "Marketing", confidence: 0.91 },
        { type: "Time Period", value: "Q4 2023", confidence: 0.98 },
      ],
      sentiment: {
        overall: "positive",
        confidence: 0.87,
        breakdown: {
          positive: 0.75,
          neutral: 0.2,
          negative: 0.05,
        },
      },
      topics: [
        { name: "Financial Performance", relevance: 0.95 },
        { name: "Customer Metrics", relevance: 0.82 },
        { name: "Department Performance", relevance: 0.78 },
        { name: "Growth Projections", relevance: 0.71 },
      ],
      compliance: {
        score: 0.92,
        issues: [],
        recommendations: [
          "Consider adding more detailed cash flow analysis",
          "Include comparative analysis with industry benchmarks",
        ],
      },
    },
  }

  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleReanalyze = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/documents">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Documents
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-serif font-bold">{document.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline">{document.department}</Badge>
                <Badge variant={document.status === "analyzed" ? "default" : "secondary"}>
                  {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">Uploaded by {document.uploader}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleReanalyze} disabled={isAnalyzing} className="bg-transparent">
              <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? "animate-spin" : ""}`} />
              {isAnalyzing ? "Analyzing..." : "Re-analyze"}
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" className="text-destructive hover:text-destructive bg-transparent">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Viewer */}
          <div className="lg:col-span-2">
            <DocumentViewer document={document} />
          </div>

          {/* AI Analysis Panel */}
          <div>
            <AIAnalysisPanel document={document} isAnalyzing={isAnalyzing} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
