"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, TrendingUp, Users, AlertTriangle, CheckCircle, Target, Lightbulb } from "lucide-react"

interface AIAnalysis {
  summary: string
  keyInsights: string[]
  entities: Array<{
    type: string
    value: string
    confidence: number
  }>
  sentiment: {
    overall: string
    confidence: number
    breakdown: {
      positive: number
      neutral: number
      negative: number
    }
  }
  topics: Array<{
    name: string
    relevance: number
  }>
  compliance: {
    score: number
    issues: string[]
    recommendations: string[]
  }
}

interface Document {
  aiAnalysis: AIAnalysis
}

interface AIAnalysisPanelProps {
  document: Document
  isAnalyzing: boolean
}

export function AIAnalysisPanel({ document, isAnalyzing }: AIAnalysisPanelProps) {
  const { aiAnalysis } = document

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-yellow-600"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-4 w-4" />
      case "negative":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 animate-pulse" />
            <span>AI Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
            <p className="text-muted-foreground text-center">Analyzing document with AI...</p>
            <p className="text-sm text-muted-foreground text-center mt-2">This may take a few moments</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* AI Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{aiAnalysis.summary}</p>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="insights">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="insights" className="text-xs">
                Insights
              </TabsTrigger>
              <TabsTrigger value="entities" className="text-xs">
                Entities
              </TabsTrigger>
              <TabsTrigger value="sentiment" className="text-xs">
                Sentiment
              </TabsTrigger>
              <TabsTrigger value="topics" className="text-xs">
                Topics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Key Insights</span>
                </h4>
                {aiAnalysis.keyInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="entities" className="mt-4">
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  <h4 className="font-semibold">Extracted Entities</h4>
                  {aiAnalysis.entities.map((entity, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div>
                        <p className="font-medium text-sm">{entity.value}</p>
                        <p className="text-xs text-muted-foreground">{entity.type}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(entity.confidence * 100)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="sentiment" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold flex items-center space-x-2">
                    {getSentimentIcon(aiAnalysis.sentiment.overall)}
                    <span>Overall Sentiment</span>
                  </h4>
                  <Badge className={getSentimentColor(aiAnalysis.sentiment.overall)}>
                    {aiAnalysis.sentiment.overall.charAt(0).toUpperCase() + aiAnalysis.sentiment.overall.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Positive</span>
                    <span>{Math.round(aiAnalysis.sentiment.breakdown.positive * 100)}%</span>
                  </div>
                  <Progress value={aiAnalysis.sentiment.breakdown.positive * 100} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>Neutral</span>
                    <span>{Math.round(aiAnalysis.sentiment.breakdown.neutral * 100)}%</span>
                  </div>
                  <Progress value={aiAnalysis.sentiment.breakdown.neutral * 100} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>Negative</span>
                    <span>{Math.round(aiAnalysis.sentiment.breakdown.negative * 100)}%</span>
                  </div>
                  <Progress value={aiAnalysis.sentiment.breakdown.negative * 100} className="h-2" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="topics" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Topic Analysis</h4>
                {aiAnalysis.topics.map((topic, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{topic.name}</span>
                      <span>{Math.round(topic.relevance * 100)}%</span>
                    </div>
                    <Progress value={topic.relevance * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Compliance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Compliance Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Compliance Score</span>
              <Badge variant={aiAnalysis.compliance.score > 0.8 ? "default" : "secondary"}>
                {Math.round(aiAnalysis.compliance.score * 100)}%
              </Badge>
            </div>
            <Progress value={aiAnalysis.compliance.score * 100} />

            {aiAnalysis.compliance.issues.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-medium text-sm text-destructive">Issues Found</h5>
                {aiAnalysis.compliance.issues.map((issue, index) => (
                  <p key={index} className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                    {issue}
                  </p>
                ))}
              </div>
            )}

            {aiAnalysis.compliance.recommendations.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Recommendations</h5>
                {aiAnalysis.compliance.recommendations.map((rec, index) => (
                  <p key={index} className="text-sm bg-muted/50 p-2 rounded">
                    {rec}
                  </p>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
