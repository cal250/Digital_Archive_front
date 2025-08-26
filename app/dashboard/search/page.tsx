"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { SearchResults } from "@/components/search/search-results"
import { AdvancedSearchFilters } from "@/components/search/advanced-search-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, Clock, TrendingUp } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchStats, setSearchStats] = useState({
    totalResults: 0,
    searchTime: 0,
    suggestions: [] as string[],
  })

  const [filters, setFilters] = useState({
    departments: [] as string[],
    fileTypes: [] as string[],
    dateRange: { from: "", to: "" },
    status: [] as string[],
    uploaders: [] as string[],
    tags: [] as string[],
    contentType: "all", // all, text, metadata, ai-summary
  })

  const [recentSearches] = useState([
    "financial report Q4",
    "marketing strategy",
    "employee handbook",
    "budget analysis",
    "project timeline",
  ])

  const [popularSearches] = useState([
    "quarterly reports",
    "HR policies",
    "technical documentation",
    "meeting notes",
    "contracts",
  ])

  // Mock search function - replace with actual API call
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    const startTime = Date.now()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock search results with highlighting
    const mockResults = [
      {
        id: "1",
        name: "Q4 Financial Report.pdf",
        type: "pdf",
        size: "2.4 MB",
        uploader: "John Smith",
        department: "Finance",
        uploadDate: "2024-01-15T10:30:00Z",
        status: "analyzed",
        tags: ["financial", "quarterly", "report"],
        relevanceScore: 0.95,
        matchType: "content",
        highlights: {
          content: ["...quarterly <mark>financial</mark> performance shows strong growth..."],
          filename: searchQuery.toLowerCase().includes("financial") ? ["Q4 <mark>Financial</mark> Report.pdf"] : [],
          tags: searchQuery.toLowerCase().includes("report") ? ["<mark>report</mark>"] : [],
        },
        aiSummary: "Comprehensive financial analysis showing 15% revenue growth...",
      },
      {
        id: "2",
        name: "Marketing Strategy 2024.pdf",
        type: "pdf",
        size: "3.2 MB",
        uploader: "Mike Davis",
        department: "Marketing",
        uploadDate: "2024-01-13T09:15:00Z",
        status: "analyzed",
        tags: ["marketing", "strategy", "2024"],
        relevanceScore: 0.87,
        matchType: "metadata",
        highlights: {
          content: ["...digital marketing initiatives for <mark>financial</mark> services..."],
          filename: [],
          tags: [],
        },
        aiSummary: "Strategic marketing plan focusing on digital transformation...",
      },
      {
        id: "3",
        name: "Budget Analysis.xlsx",
        type: "xlsx",
        size: "1.8 MB",
        uploader: "Sarah Johnson",
        department: "Finance",
        uploadDate: "2024-01-10T14:20:00Z",
        status: "analyzed",
        tags: ["budget", "analysis", "financial"],
        relevanceScore: 0.82,
        matchType: "tags",
        highlights: {
          content: [],
          filename: [],
          tags: ["<mark>financial</mark>"],
        },
        aiSummary: "Detailed budget breakdown and variance analysis...",
      },
    ].filter(
      (result) =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        result.aiSummary.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const endTime = Date.now()

    setSearchResults(mockResults)
    setSearchStats({
      totalResults: mockResults.length,
      searchTime: (endTime - startTime) / 1000,
      suggestions:
        searchQuery.length > 2 ? [`${searchQuery} reports`, `${searchQuery} analysis`, `${searchQuery} documents`] : [],
    })
    setIsSearching(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  const clearFilters = () => {
    setFilters({
      departments: [],
      fileTypes: [],
      dateRange: { from: "", to: "" },
      status: [],
      uploaders: [],
      tags: [],
      contentType: "all",
    })
  }

  const hasActiveFilters = Object.values(filters).some((filter) =>
    Array.isArray(filter)
      ? filter.length > 0
      : typeof filter === "object"
        ? Object.values(filter).some((v) => v !== "")
        : filter !== "all",
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold">Search Documents</h1>
          <p className="text-muted-foreground">Find documents by content, metadata, or AI analysis</p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents, content, tags, or AI summaries..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" disabled={isSearching}>
                  {isSearching ? "Searching..." : "Search"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-transparent"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      Active
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {filters.departments.map((dept) => (
                    <Badge key={dept} variant="secondary" className="gap-1">
                      {dept}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, departments: prev.departments.filter((d) => d !== dept) }))
                        }
                      />
                    </Badge>
                  ))}
                  {filters.fileTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="gap-1">
                      {type.toUpperCase()}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, fileTypes: prev.fileTypes.filter((t) => t !== type) }))
                        }
                      />
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Advanced Filters */}
        {showFilters && <AdvancedSearchFilters filters={filters} onFiltersChange={setFilters} />}

        {/* Search Results or Default State */}
        {query && searchResults.length > 0 ? (
          <div className="space-y-4">
            {/* Search Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Found {searchStats.totalResults} results in {searchStats.searchTime.toFixed(2)} seconds
              </span>
              {searchStats.suggestions.length > 0 && (
                <div className="flex items-center gap-2">
                  <span>Try:</span>
                  {searchStats.suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setQuery(suggestion)
                        performSearch(suggestion)
                      }}
                      className="h-auto p-1 text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <SearchResults results={searchResults} query={query} />
          </div>
        ) : query && !isSearching ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground text-center">Try adjusting your search terms or filters</p>
            </CardContent>
          </Card>
        ) : (
          /* Default State - Recent and Popular Searches */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Searches</span>
                </CardTitle>
                <CardDescription>Your recent search queries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-2"
                      onClick={() => {
                        setQuery(search)
                        performSearch(search)
                      }}
                    >
                      <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                      {search}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Popular Searches</span>
                </CardTitle>
                <CardDescription>Trending searches in your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {popularSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-2"
                      onClick={() => {
                        setQuery(search)
                        performSearch(search)
                      }}
                    >
                      <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                      {search}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
