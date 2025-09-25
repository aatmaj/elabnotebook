import { AnalyticsCharts } from '@/components/analytics-charts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
                <p className="text-muted-foreground">Visualize your experimental data and uncover new insights.</p>
            </div>
            <AnalyticsCharts />
        </div>
    );
}
