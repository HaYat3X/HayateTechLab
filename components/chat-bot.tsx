"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "こんにちは！技術的な質問や相談がありましたら、お気軽にお尋ねください。",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // ここにAIの応答ロジックを実装
    const assistantMessage = {
      role: "assistant" as const,
      content: "申し訳ありません。現在、チャットボットは開発中です。",
    };
    setMessages((prev) => [...prev, assistantMessage]);
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" color="white" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-[380px] h-[600px] p-4 flex flex-col bg-card/80 bg-white backdrop-blur-sm dark:bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">チャットボット</h3>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.role === "user"
                        ? "bg-primary text-primary-foreground text-white"
                        : "bg-muted dark:bg-gray-800"
                      }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1 dark:bg-gray-800"
            />
            <Button type="submit" size="icon" className="rounded-full">
              <Send className="h-4 w-4 text-white" />
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}