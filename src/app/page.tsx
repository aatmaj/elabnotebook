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
import { Beaker, FileText, Lock, ShieldCheck, Zap, Workflow, Lightbulb } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Bubbles } from "@/components/bubbles";
import React from "react";

const problemFeatures = [
  {
    icon: <Workflow className="w-8 h-8 text-destructive" />,
    title: "Fragmented Data",
    description: "Lab data is scattered across spreadsheets, paper notebooks, and various instruments, leading to inefficiencies.",
  },
  {
    icon: <Beaker className="w-8 h-8 text-destructive" />,
    title: "Manual Processes",
    description: "Time-consuming manual data entry and experiment tracking slow down the pace of research and increase errors.",
  },
  {
    icon: <FileText className="w-8 h-8 text-destructive" />,
    title: "Compliance Headaches",
    description: "Meeting regulatory standards is complex and burdensome with manual, disconnected systems.",
  },
];

const solutionFeatures = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Intelligent Data Capture",
    description: "Automatically capture and organize structured and unstructured data from all your lab sources in one place.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: "AI-Powered Insights",
    description: "Leverage generative AI to summarize complex experiments and generate novel hypotheses from your data.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Streamlined Compliance",
    description: "Seamlessly integrate with SOPs and generate compliance reports, making audits a breeze.",
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
    title: "GDPR & HIPAA Ready",
    description: "Our platform is designed to meet GDPR and HIPAA requirements for data privacy.",
  },
]

export default function Home() {
  const screenshot1 = PlaceHolderImages.find(img => img.id === "screenshot-1");
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-grow">
        <section id="hero" className="relative w-full py-20 md:py-32 lg:py-40 bg-card overflow-hidden">
          <Bubbles />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                    The Future of Laboratory Research is Here
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Paramanu is an intelligent electronic lab notebook designed to streamline your research, foster collaboration, and accelerate scientific discovery.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
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
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                {screenshot1 && (
                  <Image
                    src={screenshot1.imageUrl}
                    alt={screenshot1.description}
                    data-ai-hint={screenshot1.imageHint}
                    width={1200}
                    height={800}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">The Problem</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-destructive">Research is Slow and Fragmented</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Modern labs are held back by outdated tools and manual processes that create data silos and hinder innovation.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {problemFeatures.map((feature, index) => (
                <div key={index} className="grid gap-1 p-4 rounded-lg hover:bg-card transition-colors">
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
        
        <section id="solution" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">The Solution</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Accelerate Your Discovery</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Paramanu comes packed with features designed to make your research more efficient, collaborative, and insightful.
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

        <section id="security" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Security & Compliance</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Enterprise-Grade Security</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We take data security seriously. Your research is protected by industry-leading security standards and protocols.
                </p>
            </div>
            <div className="mx-auto grid gap-8 sm:max-w-4xl md:grid-cols-3 md:gap-12">
               {securityFeatures.map((feature, index) => (
                  <Card key={index} className="bg-card border-none shadow-none">
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
