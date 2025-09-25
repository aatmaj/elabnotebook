"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const compoundActivityData = [
  { compound: "A", activity: 5.5, control: 2.1 },
  { compound: "B", activity: 6.8, control: 2.3 },
  { compound: "C", activity: 8.1, control: 2.2 },
  { compound: "D", activity: 4.2, control: 2.5 },
  { compound: "E", activity: 9.5, control: 2.0 },
  { compound: "F", activity: 7.3, control: 2.4 },
];

const compoundActivityConfig = {
    activity: {
        label: "Compound Activity",
        color: "hsl(var(--chart-1))",
    },
    control: {
        label: "Control Group",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;


export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Experiment Completion Rate</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Compound Activity Levels</CardTitle>
          <CardDescription>Relative activity of new chemical compounds</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={compoundActivityConfig} className="min-h-[300px] w-full">
            <LineChart accessibilityLayer data={compoundActivityData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="compound"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `Cmpd ${value}`}
              />
               <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="activity"
                type="monotone"
                stroke="var(--color-activity)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="control"
                type="monotone"
                stroke="var(--color-control)"
                strokeWidth={2}
                strokeDasharray="3 4"
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
