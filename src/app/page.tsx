'use client';

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
import { FileText, Lock, ShieldCheck, FlaskConical, BarChart3, FolderGit2 } from "lucide-react";
import React from "react";


const solutionFeatures = [
  {
    icon: <FlaskConical className="w-8 h-8 text-primary" />,
    title: "Formulation Development",
    description: "Intelligently design and optimize generic formulations to achieve bioequivalence with AI-driven excipient selection and process modeling.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Bioequivalence Studies",
    description: "Streamline the planning, execution, and analysis of bioequivalence trials with integrated data capture and real-time monitoring.",
  },
  {
    icon: <FolderGit2 className="w-8 h-8 text-primary" />,
    title: "Regulatory Submission",
    description: "Automate the compilation of ANDA/dossiers with compliant documentation, tracking, and seamless eCTD publishing.",
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
        <section id="hero" className="relative w-full h-[100vh] flex items-center justify-center text-center overflow-hidden">
           <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,hsl(var(--primary)/0.1),transparent)]" />
           <div className="relative z-10 flex flex-col items-center space-y-4">
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

        <section id="security" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
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
