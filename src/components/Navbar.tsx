import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <nav className={cn("container mx-auto flex h-16 items-center justify-between px-4")}>        
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-glow)]" />
          <span className="font-semibold">FinCoach AI</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><Button variant="secondary">Dashboard</Button></Link>
          {email ? (
            <Button onClick={handleLogout}>Sign out</Button>
          ) : (
            <Link to="/auth"><Button>Sign in</Button></Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
