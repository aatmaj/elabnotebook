'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LandingHeader } from "@/components/landing-header";
import { Footer } from "@/components/footer";
import { FileText, Lock, ShieldCheck, FlaskConical, BarChart3, FolderGit2, Search, SlidersHorizontal, Scale, BrainCircuit, Layers, Link2, GitBranch, Target } from "lucide-react";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bubbles } from "@/components/bubbles";

const solutionFeatures = [
    {
    icon: <FlaskConical className="w-8 h-8 text-primary" />,
    title: "Pre-Formulation Studies",
    description: "Leverage AI to analyze API characteristics and excipient compatibility, predicting stability and performance to de-risk your development path.",
    },
    {
    icon: <SlidersHorizontal className="w-8 h-8 text-primary" />,
    title: "Formulation Development",
    description: "Intelligently design and optimize robust generic formulations with AI-driven DoE, achieving target product profiles faster than traditional methods.",
    },
    {
    icon: <Scale className="w-8 h-8 text-primary" />,
    title: "Scale-Up & Tech Transfer",
    description: "Employ AI simulations to model process parameters for scale-up, ensuring smooth technology transfer and consistent batch quality from lab to commercial production.",
    },
    {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Bioequivalence & Clinicals",
    description: "Streamline bioequivalence study design and data analysis with AI, enhancing the accuracy of statistical evaluation and reducing trial timelines.",
    },
    {
    icon: <FolderGit2 className="w-8 h-8 text-primary" />,
    title: "Regulatory Submission",
    description: "Automate the compilation of compliant ANDA/dossiers. Our AI helps check for data integrity and completeness, ensuring a smoother eCTD publishing process.",
    },
];

const approachFeatures = [
  {
    icon: <GitBranch className="w-8 h-8 text-primary" />,
    title: "Unified Knowledge Graph",
    description: "We structure your disparate R&D data—unstructured notes, instrument data, and results—into an interconnected knowledge graph, revealing hidden relationships between experiments, compounds, and outcomes.",
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: "AI Co-pilot for Research",
    description: "Paramanu's generative AI acts as a co-pilot, summarizing complex data, generating novel hypotheses from your results, and identifying unseen connections to accelerate discovery.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Analytics & Insights",
    description: "Visualize your experimental data through intuitive dashboards. Uncover trends, spot outliers, and gain deeper insights from your results to guide your next steps.",
  },
]

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

function ContactForm() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const mailtoLink = `mailto:contact@paramanu.ai?subject=Contact Form Submission from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(name)}%20(${encodeURIComponent(email)})`;
    
    window.location.href = mailtoLink;
    setOpen(false);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <Button size="lg" variant="default">
              Contact Us
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-center text-center">
            <Logo className="w-10 h-10 mb-2"/>
            <DialogTitle>How can we help?</DialogTitle>
            <DialogDescription>
                Tell us about the biggest problem you're facing in your R&D today.
            </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your Name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Your Problem</Label>
            <Textarea id="message" name="message" placeholder="Describe the challenge you're facing..." required rows={5}/>
          </div>
          <Button type="submit">Send Message</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-grow">
        <section id="hero" className="relative w-full h-[100vh] flex items-center justify-center text-center overflow-hidden">
           <div className="absolute inset-0 z-0 bg-background" />
            <Bubbles />
            <div className="absolute inset-0 z-10 bg-radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/0 to-background"></div>
            <div className="absolute inset-0 z-20 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_50%,white)]"></div>
           <div className="relative z-30 flex flex-col items-center space-y-4">
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl font-headline text-foreground">
                    The Intelligent E-Lab Notebook for Generics Pharma
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Paramanu is an intelligent electronic lab notebook (ELN) platform, purpose-built to accelerate every phase of generic drug development.
                  </p>
                </div>
                <div className="space-x-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    <ContactForm />
                </div>
              </div>
        </section>
        
        <section id="solution" className="w-full py-8 md:py-10 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">The Platform</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">An Intelligent Lab Notebook for the Entire R&D Lifecycle</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Paramanu unifies every stage of your generics R&D workflow into a single, intelligent lab notebook platform.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {solutionFeatures.map((feature, index) => (
                <div key={index} className={cn("grid gap-1 p-4 rounded-lg", 
                  solutionFeatures.length === 5 && index === 4 && "lg:col-start-2"
                  )}>
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

        <section id="approach" className="w-full py-8 md:py-10 lg:py-12 bg-secondary/20">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Approach</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">How We Accelerate Discovery</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Paramanu is built on three core principles that turn your laboratory data into a strategic advantage.
                </p>
            </div>
            <div className="mx-auto grid gap-8 sm:max-w-4xl md:grid-cols-3 md:gap-12">
               {approachFeatures.map((feature, index) => (
                  <Card key={index} className="bg-transparent border-none shadow-none">
                     <CardHeader className="flex flex-col items-center text-center gap-4 pb-4">
                        {feature.icon}
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                     </CardHeader>
                     <CardContent className="text-center">
                       <p className="text-sm text-muted-foreground">{feature.description}</p>
                     </CardContent>
                  </Card>
               ))}
            </div>
          </div>
        </section>

        <section id="security" className="w-full py-8 md:py-10 lg:py-12">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Security & Compliance</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Built for Pharma Compliance</h2>
                <p className="max-w-[900px] text-muted-foreground mdDtext-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
       <style jsx>{`
        .logos {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          top: 0;
          left: 0;
        }
        .logo {
          position: absolute;
          bottom: -100px;
          width: 40px;
          height: 40px;
          color: hsl(var(--primary) / 0.1);
          opacity: 0.5;
          animation: rise 25s infinite ease-in;
        }
        .logo:nth-child(1) { left: 10%; animation-duration: 18s; width: 80px; height: 80px; }
        .logo:nth-child(2) { left: 20%; animation-duration: 15s; animation-delay: 1s; }
        .logo:nth-child(3) { left: 25%; animation-duration: 17s; animation-delay: 2s; width: 30px; height: 30px; }
        .logo:nth-child(4) { left: 40%; animation-duration: 21s; animation-delay: 0s; width: 60px; height: 60px; }
        .logo:nth-child(5) { left: 50%; animation-duration: 16s; animation-delay: 3s; }
        .logo:nth-child(6) { left: 65%; animation-duration: 18s; animation-delay: 1s; width: 50px; height: 50px; }
        .logo:nth-child(7) { left: 75%; animation-duration: 22s; animation-delay: 2s; width: 70px; height: 70px; }
        .logo:nth-child(8) { left: 80%; animation-duration: 16s; animation-delay: 2s; }
        .logo:nth-child(9) { left: 55%; animation-duration: 19s; animation-delay: 0s; width: 25px; height: 25px; }
        .logo:nth-child(10) { left: 90%; animation-duration: 15s; animation-delay: 4s; }
        .logo:nth-child(11) { left: 5%; animation-duration: 24s; width: 45px; height: 45px; }
        .logo:nth-child(12) { left: 30%; animation-duration: 19s; animation-delay: 5s; }
        .logo:nth-child(13) { left: 45%; animation-duration: 17s; animation-delay: 3s; width: 35px; height: 35px; }
        .logo:nth-child(14) { left: 60%; animation-duration: 20s; animation-delay: 1s; }
        .logo:nth-child(15) { left: 85%; animation-duration: 16s; animation-delay: 3s; width: 55px; height: 55px; }

        @keyframes rise {
          0% {
            bottom: -100px;
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translate(100px) rotate(180deg);
          }
          100% {
            bottom: 1080px;
            transform: translateX(-200px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
