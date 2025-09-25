import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Beaker, CheckCircle, FlaskConical, Users } from "lucide-react";

const stats = [
    { title: "Active Experiments", value: "12", icon: <Beaker className="h-6 w-6 text-muted-foreground" /> },
    { title: "Completed this Month", value: "8", icon: <CheckCircle className="h-6 w-6 text-muted-foreground" /> },
    { title: "Collaborators", value: "4", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
    { title: "Samples Processed", value: "1,204", icon: <FlaskConical className="h-6 w-6 text-muted-foreground" /> },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Dr. Rosalind!</h1>
        <p className="text-muted-foreground">Here&apos;s a summary of your lab activities.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        {stat.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            +2.1% from last month
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>A log of recent updates and changes to your experiments.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5"/>
                        </div>
                        <div className="text-sm">
                            <p className="font-medium">Dr. Franklin invited Dr. Watson to collaborate on &quot;CRISPR-Cas9 Gene Editing Efficacy&quot;.</p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Beaker className="w-5 h-5"/>
                        </div>
                        <div className="text-sm">
                            <p className="font-medium">Experiment &quot;Protein Folding Simulation #3&quot; was marked as completed.</p>
                            <p className="text-xs text-muted-foreground">Yesterday</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
