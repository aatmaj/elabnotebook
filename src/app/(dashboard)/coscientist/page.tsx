"use client";

import * as React from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { askCoScientist } from "@/app/actions/ai-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function CoScientistPage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askCoScientist({ query: input });
      setMessages([
        ...newMessages,
        { role: "assistant", content: response.response },
      ]);
    } catch (error) {
      console.error("Error asking co-scientist:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (scrollAreaRef.current) {
        // Use `lastElementChild` to get the viewport element inside the ScrollArea
        const viewport = scrollAreaRef.current.lastElementChild;
        if (viewport) {
             viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  return (
    <div className="flex h-[calc(100vh-6rem)] w-full">
        <Card className="flex flex-col w-full max-w-4xl mx-auto">
        <CardHeader>
            <CardTitle>Co-scientist</CardTitle>
            <CardDescription>
            Your AI-powered research assistant for chemistry, patents, and FDA guidelines.
            </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
             <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                {messages.map((message, index) => (
                    <div
                    key={index}
                    className={cn(
                        "flex items-start gap-4",
                        message.role === "user" ? "justify-end" : ""
                    )}
                    >
                    {message.role === "assistant" && (
                        <Avatar className="h-8 w-8 border">
                            <div className="flex items-center justify-center h-full w-full bg-primary/10">
                                <Logo className="h-5 w-5" />
                            </div>
                        </Avatar>
                    )}
                    <div
                        className={cn(
                        "max-w-[75%] rounded-lg p-3 text-sm",
                        message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                    >
                         <article className="prose prose-sm dark:prose-invert max-w-none">
                             <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </ReactMarkdown>
                         </article>
                    </div>
                     {message.role === "user" && (
                         <Avatar className="h-8 w-8 border">
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-4">
                         <Avatar className="h-8 w-8 border">
                            <div className="flex items-center justify-center h-full w-full bg-primary/10">
                                <Logo className="h-5 w-5" />
                            </div>
                        </Avatar>
                        <div className="max-w-[75%] rounded-lg p-3 text-sm bg-muted">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150" />
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300" />
                            </div>
                        </div>
                    </div>
                )}

                </div>
            </ScrollArea>
        </CardContent>
        <CardFooter className="pt-4 border-t">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Input
                id="message"
                placeholder="Ask about chemistry, patents, or FDA guidelines..."
                className="flex-1"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
            </form>
        </CardFooter>
        </Card>
    </div>
  );
}