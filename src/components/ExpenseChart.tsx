import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import type { Expense } from "./ExpenseForm";

interface Props {
  expenses: Expense[];
}

const colors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--muted-foreground))", "hsl(var(--secondary-foreground))"];

function groupByDate(expenses: Expense[]) {
  const map = new Map<string, number>();
  expenses.forEach(e => {
    const d = e.date;
    map.set(d, (map.get(d) ?? 0) + e.amount);
  });
  return Array.from(map.entries()).sort(([a],[b]) => a.localeCompare(b)).map(([date, total]) => ({ date, total }));
}

function groupByCategory(expenses: Expense[]) {
  const map = new Map<string, number>();
  expenses.forEach(e => map.set(e.category, (map.get(e.category) ?? 0) + e.amount));
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

const ExpenseChart = ({ expenses }: Props) => {
  const byDate = groupByDate(expenses);
  const byCategory = groupByCategory(expenses);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Spending Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={byDate} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="total" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>By Category</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={80} innerRadius={40} paddingAngle={4}>
                {byCategory.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseChart;
