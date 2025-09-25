import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LandingHeader } from "@/components/landing-header";
import { Footer } from "@/components/footer";
import { BarChart3, Beaker, FileText, Lock, Share2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    icon: <Beaker className="w-8 h-8 text-primary" />,
    title: "Intelligent Data Capture",
    description: "Capture structured and unstructured data from lab experiments, automatically organizing it within the notebook.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Real-time Collaboration",
    description: "Enable multiple scientists and teams to collaborate on experiments and data in real time.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Analytics & Insights",
    description: "An analytics layer to process experiment data for scientists to gain insights, using graphs and visualizations.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "SOP & Regulatory Integration",
    description: "Seamlessly integrate with standard operating procedures, compliance reports, and other regulatory documentation.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "AI-driven Summaries",
    description: "Utilize generative AI for concise summaries of complex experiments, boosting research productivity.",
  },
  {
    icon: <Share2 className="w-8 h-8 text-primary" />,
    title: "Knowledge Graph Creation",
    description: "Automatically generate a knowledge graph to identify previously unseen connections within experimental data.",
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-grow">
        <section id="hero" className="w-full py-20 md:py-32 lg:py-40 bg-card">
          <div className="container px-4 md:px-6">
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
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/signup">Get Started for Free</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#features">Learn More</Link>
                  </Button>
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

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Accelerate Your Discovery</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Paramanu comes packed with features designed to make your research more efficient, collaborative, and insightful.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="grid gap-1 p-4 rounded-lg hover:bg-card transition-colors animate-in fade-in-0 duration-500 delay-200">
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Enterprise-Grade Security</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We take data security seriously. Your research is protected by industry-leading security standards and protocols.
                </p>
            </div>
            <div className="mx-auto grid gap-8 sm:max-w-4xl md:grid-cols-3 md:gap-12">
               {securityFeatures.map((feature, index) => (
                  <Card key={index} className="bg-background border-none shadow-none">
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

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Ready to Revolutionize Your Research?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of scientists who are using Paramanu to accelerate their work.
                Sign up today and experience the future of lab notebooks.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/signup">Start Your Free Trial</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
