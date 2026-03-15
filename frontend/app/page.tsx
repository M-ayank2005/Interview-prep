import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Code2, BrainCircuit, Building2, Timer } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Master Your <span className="text-primary">Technical Interview</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                  The ultimate platform for software engineers to prepare for FAANG interviews. Curated problems, pattern recognition, and company-specific preparation all in one place.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/signup">
                    Start Preparing for Free <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">
                    Login to Account
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center flex-col items-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to succeed</h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Curated Problems</h3>
                  <p className="text-muted-foreground">Focus on the most important problems asked by top tech companies, not the obscure ones.</p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <BrainCircuit className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Master Patterns</h3>
                  <p className="text-muted-foreground">Learn the underlying patterns of DSA problems to solve newly encountered questions with ease.</p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Company Specific</h3>
                  <p className="text-muted-foreground">Target your preparation with lists of frequently asked questions from your dream companies.</p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Timer className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Track Progress</h3>
                  <p className="text-muted-foreground">Stay motivated by tracking your solving streak, completion rate, and time taken per difficulty.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 border-t border-border mt-auto flex justify-center">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-muted-foreground">© 2026 Interview Prep. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
