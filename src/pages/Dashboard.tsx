import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ExpenseForm, { type Expense } from "@/components/ExpenseForm";
import ExpenseChart from "@/components/ExpenseChart";
import AIChat from "@/components/AIChat";
import { useSEO } from "@/hooks/useSEO";

const sample: Expense[] = [
  { id: '1', title: 'Groceries', category: 'Food', amount: 54.2, date: new Date(Date.now()-86400000*4).toISOString().slice(0,10) },
  { id: '2', title: 'Uber', category: 'Transport', amount: 12.6, date: new Date(Date.now()-86400000*3).toISOString().slice(0,10) },
  { id: '3', title: 'Gym', category: 'Health', amount: 29.0, date: new Date(Date.now()-86400000*2).toISOString().slice(0,10) },
  { id: '4', title: 'Coffee', category: 'Food', amount: 4.5, date: new Date(Date.now()-86400000*1).toISOString().slice(0,10) },
];

const Dashboard = () => {
  useSEO({ title: 'Dashboard | FinCoach AI', description: 'Track expenses, budgets, and chat with your AI finance coach on your dashboard.', canonical: '/dashboard' });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const stored = localStorage.getItem('expenses');
    return stored ? JSON.parse(stored) as Expense[] : sample;
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e: Expense) => setExpenses((list) => [...list, e]);

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader><CardTitle>Monthly Spend</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">${total.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Updated in real-time</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Quick Budget</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label>Needs (50%)</Label>
              <Input placeholder="$1200" />
            </div>
            <div>
              <Label>Wants (30%)</Label>
              <Input placeholder="$700" />
            </div>
            <div>
              <Label>Savings (20%)</Label>
              <Input placeholder="$500" />
            </div>
            <Button className="sm:col-span-3">Save Budget</Button>
          </CardContent>
        </Card>
      </section>

      <ExpenseChart expenses={expenses} />
      <section className="grid gap-4 md:grid-cols-2">
        <ExpenseForm onAdd={addExpense} />
        <AIChat />
      </section>
    </main>
  );
};

export default Dashboard;
