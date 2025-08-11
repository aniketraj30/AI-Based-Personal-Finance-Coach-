import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const Auth = () => {
  useSEO({ title: 'Sign in | FinCoach AI', description: 'Secure email login for your AI finance coach.', canonical: '/auth' });

  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message ?? 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>{mode === 'login' ? 'Welcome back' : 'Create your account'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full">{loading ? 'Please wait…' : (mode === 'login' ? 'Sign in' : 'Create account')}</Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              {mode === 'login' ? (
                <button className="underline" onClick={() => setMode('signup')}>Don't have an account? Sign up</button>
              ) : (
                <button className="underline" onClick={() => setMode('login')}>Already have an account? Sign in</button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Auth;
