import { Button } from "@/components/ui/button"
import { FileText, Shield, Search, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-accent rounded-lg">
              <FileText className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-xl font-serif font-bold">Digital Achievement Doc</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-serif font-bold mb-6">
            Modern Document Management
            <span className="text-accent"> Powered by AI</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Streamline your enterprise document workflow with intelligent analysis, department-based access control, and
            powerful search capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Everything you need to manage documents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-accent rounded-lg w-fit mx-auto mb-4">
                <FileText className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-2">Smart Upload</h3>
              <p className="text-muted-foreground">
                Drag and drop documents with automatic OCR and metadata extraction
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-accent rounded-lg w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">Get intelligent summaries and insights from your documents</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-accent rounded-lg w-fit mx-auto mb-4">
                <Search className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-2">Global Search</h3>
              <p className="text-muted-foreground">Find any document instantly with powerful search and filtering</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-accent rounded-lg w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-2">Secure Access</h3>
              <p className="text-muted-foreground">Department-based permissions ensure data security and compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Digital Achievement Doc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
