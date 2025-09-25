'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LandingHeader } from "@/components/landing-header";
import { Footer } from "@/components/footer";
import { FileText, Lock, ShieldCheck, Zap, Lightbulb, TestTube, Pill } from "lucide-react";
import { Bubbles } from "@/components/bubbles";
import React from "react";

const solutionFeatures = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Accelerated Drug Development",
    description: "Utilize AI-driven tools to analyze molecular data, predict compound efficacy, and shorten development timelines for generic drugs.",
  },
  {
    icon: <TestTube className="w-8 h-8 text-primary" />,
    title: "Streamlined Clinical Trials",
    description: "Manage trial data, patient recruitment, and regulatory submissions on a unified, compliant platform for generics.",
  },
  {
    icon: <Pill className="w-8 h-8 text-primary" />,
    title: "Optimized Manufacturing",
    description: "Ensure quality control and supply chain efficiency with our integrated manufacturing process management tools for generic pharmaceuticals.",
  },
];

const securityFeatures = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "SOC 2 Type II",
    description: "We are compliant with SOC 2 Type II standards, ensuring your data is handled securely.",
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: "End-to-End Encryption",
    description: "All your data is encrypted in transit and at rest, providing maximum security.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "GxP & 21 CFR Part 11",
    description: "Our platform is built to meet GxP and FDA 21 CFR Part 11 requirements for data integrity and electronic records.",
  },
]

export default function Home() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-grow">
        <section id="hero" className="relative w-full py-24 md:py-40 lg:py-56 bg-card overflow-hidden">
          <Bubbles />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl font-headline text-foreground">
                    Driving Innovation in Generics Pharma
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Paramanu provides an intelligent platform for generics pharmaceutical companies to streamline drug development and compliance.
                  </p>
                </div>
                <div className="space-x-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                         <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                           Contact Us
                         </Button>
                      </DialogTrigger>
                       <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Contact Us</DialogTitle>
                          <DialogDescription>
                            Have a question or want to get a demo? Fill out the form below.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input id="name" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input id="email" type="email" className="col-span-3" />
                          </div>
                           <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="message" className="text-right pt-2">
                              Message
                            </Label>
                            <Textarea id="message" className="col-span-3" rows={4} />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={() => setOpen(false)}>Send Message</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                </div>
              </div>
          </div>
        </section>
        
        <section id="solution" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">The Platform</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Unified Generics Pharma Platform</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Paramanu comes packed with features designed to accelerate every stage of the generics pharmaceutical lifecycle.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {solutionFeatures.map((feature, index) => (
                <div key={index} className="grid gap-1 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    {feature.icon}
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="security" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Security & Compliance</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Built for Pharma Compliance</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We take data security and regulatory compliance seriously. Your research is protected by industry-leading standards.
                </p>
            </div>
            <div className="mx-auto grid gap-8 sm:max-w-4xl md:grid-cols-3 md:gap-12">
               {securityFeatures.map((feature, index) => (
                  <Card key={index} className="bg-transparent border-none shadow-none">
                     <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        {feature.icon}
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <p className="text-sm text-muted-foreground">{feature.description}</p>
                     </CardContent>
                  </Card>
               ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
