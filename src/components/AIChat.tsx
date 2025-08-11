import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChat = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI finance coach. Ask me about your budget, savings, or investments." }
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const prompt = input.trim();
    if (!prompt) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: prompt }]);
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("finance-ai", {
        body: { prompt, history: messages }
      });

      if (error) throw error;

      const reply = (data as any)?.reply ?? "I couldn't reach the AI service yet. Here's a tip: track your fixed expenses and set a 50/30/20 budget to start.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "The AI service isn't configured yet. Add your OpenAI key to the finance-ai edge function to enable responses." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>AI Financial Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex h-96 flex-col gap-3">
        <div ref={listRef} className="flex-1 overflow-y-auto rounded-md border p-3">
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 ${m.role === 'user' ? 'text-foreground' : 'text-muted-foreground'}`}>
              <span className="font-medium mr-2">{m.role === 'user' ? 'You' : 'Coach'}:</span>
              <span>{m.content}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Ask: How can I optimize my grocery spending?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          />
          <Button onClick={send} disabled={loading} className="shrink-0">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
