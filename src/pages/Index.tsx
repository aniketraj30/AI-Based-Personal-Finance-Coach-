import hero from "@/assets/hero-finance.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "AI Personal Finance Coach | FinCoach AI",
    description: "Budget smarter with AI. Track expenses, see real-time charts, and chat with an NLP assistant.",
    canonical: "/",
  });

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="AI personal finance coach hero with dashboards and charts" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/70 to-background" />
        </div>
        <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
          <h1 className="text-balance text-4xl font-bold leading-tight md:text-6xl">
            Master your money with an AI Finance Coach
          </h1>
          <p className="text-balance max-w-2xl text-lg text-muted-foreground md:text-xl">
            Personalized budgeting, expense tracking, and investment insights. Real-time analytics and an NLP assistant at your fingertips.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/dashboard"><Button className="">Open Dashboard</Button></Link>
            <Link to="/auth"><Button variant="secondary">Get Started Free</Button></Link>
          </div>
          <div className="mt-6 grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground">Beautiful charts for spending, budgets, and savings.</p>
            </div>
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold">NLP Finance Assistant</h3>
              <p className="text-sm text-muted-foreground">Ask questions in plain English and get tailored advice.</p>
            </div>
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">Authentication powered by Supabase with secure sessions.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;

