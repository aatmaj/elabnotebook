"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { calculateScaleUp, type PredictionInput, type PredictionOutput } from "@/lib/scale-up-calculations";
import { useAppStore } from "@/lib/store";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  productName: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  unitOperation: z.enum(["Top Spray Granulation", "Wet Granulation", "Compression", "Coating", "Blending", "Milling", "Bottom Spray Granulation (Wurster)", "Roll Compaction", "Drying", "Sifting", "Capsule Filling", "Powder Layering", "Hot Melt Extrusion", "Extrusion/Spheronization"]),
  category: z.enum(["Lab → Pilot", "Pilot → Plant 1", "Plant 1 → Plant 2"]),
  strength: z.coerce.number().positive({ message: "Strength must be a positive number." }),
  vertical: z.string(),
  market: z.string(),
  scaleSelection: z.enum(["Scale 2", "Scale 3", "Scale 4"]),
  // Granulation
  sprayRate: z.coerce.number().optional(),
  binderPercentage: z.coerce.number().optional(),
  inletTemp: z.coerce.number().optional(),
  outletTemp: z.coerce.number().optional(),
  panSpeed: z.coerce.number().optional(),
  nozzlePosition: z.coerce.number().optional(),
  // Compression
  turretSpeed: z.coerce.number().optional(),
  numberOfPunches: z.coerce.number().optional(),
  compressionForce: z.coerce.number().optional(),
  // Coating
  bedSpeed: z.coerce.number().optional(),
  atomizationPressure: z.coerce.number().optional(),
  // Blending
  blendingTime: z.coerce.number().optional(),
  blenderSpeed: z.coerce.number().optional(),
  // Milling
  millSpeed: z.coerce.number().optional(),
  screenSize: z.coerce.number().optional(),
  // Roll Compaction
  rollForce: z.coerce.number().optional(),
  rollSpeed: z.coerce.number().optional(),
  gapSize: z.coerce.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ScaleUpPredictorPage() {
  const [prediction, setPrediction] = React.useState<PredictionOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { getUniqueValues } = useAppStore();
  const resultsRef = React.useRef<HTMLDivElement>(null);

  const markets = getUniqueValues("market");
  const verticals = getUniqueValues("vertical");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      unitOperation: "Top Spray Granulation",
      category: "Lab → Pilot",
      vertical: verticals[0] || "",
      market: markets[0] || "",
      scaleSelection: "Scale 2",
      sprayRate: undefined,
      binderPercentage: undefined,
      inletTemp: undefined,
      outletTemp: undefined,
      panSpeed: undefined,
      nozzlePosition: undefined,
      turretSpeed: undefined,
      numberOfPunches: undefined,
      compressionForce: undefined,
      bedSpeed: undefined,
      atomizationPressure: undefined,
      blendingTime: undefined,
      blenderSpeed: undefined,
      millSpeed: undefined,
      screenSize: undefined,
      rollForce: undefined,
      rollSpeed: undefined,
      gapSize: undefined,
    },
  });

  const selectedUnitOp = form.watch("unitOperation");

  function onSubmit(values: FormValues) {
    setIsLoading(true);
    setPrediction(null);
    console.log("Form Submitted:", values);
    
    // Simulate API call delay
    setTimeout(() => {
        const result = calculateScaleUp(values as PredictionInput);
        setPrediction(result);
        setIsLoading(false);
    }, 1000);
  }

  React.useEffect(() => {
    if (prediction && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [prediction]);


  const renderDynamicFields = () => {
    switch (selectedUnitOp) {
      case "Top Spray Granulation":
      case "Bottom Spray Granulation (Wurster)":
      case "Powder Layering":
        return (
          <>
            <FormField
              control={form.control}
              name="sprayRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spray Rate (g/min)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 150" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="binderPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Binder %</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 5" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="inletTemp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inlet Temp (°C)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 60" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="outletTemp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outlet Temp (°C)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 45" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="panSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pan Speed (RPM)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 10" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="nozzlePosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nozzle Position</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 3" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
    case "Wet Granulation":
        return (
          <>
            <FormField
                control={form.control}
                name="panSpeed"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>RMG Speed (RPM)</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="e.g., 150" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="blendingTime"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Wet Massing Time (min)</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="e.g., 5" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          </>
        );
      case "Compression":
        return (
          <>
            <FormField
              control={form.control}
              name="turretSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turret Speed (RPM)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 25" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfPunches"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Punches</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 45" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="compressionForce"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compression Force (kN)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 15" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "Coating":
        return (
          <>
             <FormField
              control={form.control}
              name="sprayRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spray Rate (g/min)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 120" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="bedSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bed Speed (RPM)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 8" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="atomizationPressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atomization Pressure (bar)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 2.5" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
       case "Blending":
        return (
          <>
            <FormField
              control={form.control}
              name="blendingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blending Time (min)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 15" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blenderSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blender Speed (RPM)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 20" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "Milling":
      case "Sifting":
        return (
          <>
            <FormField
              control={form.control}
              name="millSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mill Speed (RPM)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 3000" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="screenSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Screen Size (microns)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 500" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "Roll Compaction":
        return (
          <>
            <FormField
              control={form.control}
              name="rollForce"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll Force (kN/cm)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 10" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rollSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll Speed (RPM)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 5" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="gapSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gap Size (mm)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 1.5" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      default:
        return <p className="text-muted-foreground text-sm">Prediction for this unit operation is not yet implemented.</p>;
    }
  };


  return (
    <div className="space-y-8">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Scale-Up Predictor</CardTitle>
            <CardDescription>
              Predict optimal process parameters for scaling up formulations.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Metformin ER" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="strength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Strength (mg)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 500" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>

               <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="unitOperation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit Operation</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a unit operation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Blending">Blending</SelectItem>
                            <SelectItem value="Bottom Spray Granulation (Wurster)">Bottom Spray Granulation (Wurster)</SelectItem>
                            <SelectItem value="Capsule Filling">Capsule Filling</SelectItem>
                            <SelectItem value="Coating">Coating</SelectItem>
                            <SelectItem value="Compression">Compression</SelectItem>
                            <SelectItem value="Drying">Drying</SelectItem>
                            <SelectItem value="Extrusion/Spheronization">Extrusion/Spheronization</SelectItem>
                            <SelectItem value="Hot Melt Extrusion">Hot Melt Extrusion</SelectItem>
                            <SelectItem value="Milling">Milling</SelectItem>
                            <SelectItem value="Powder Layering">Powder Layering</SelectItem>
                            <SelectItem value="Roll Compaction">Roll Compaction</SelectItem>
                            <SelectItem value="Sifting">Sifting</SelectItem>
                            <SelectItem value="Top Spray Granulation">Top Spray Granulation</SelectItem>
                            <SelectItem value="Wet Granulation">Wet Granulation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a scaling category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Lab → Pilot">Lab → Pilot</SelectItem>
                            <SelectItem value="Pilot → Plant 1">Pilot → Plant 1</SelectItem>
                            <SelectItem value="Plant 1 → Plant 2">Plant 1 → Plant 2</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
               </div>
               <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                      control={form.control}
                      name="vertical"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vertical</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a vertical" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {verticals.map((v) => (
                                <SelectItem key={v} value={v}>{v}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="market"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Market</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a market" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {markets.map((m) => (
                                <SelectItem key={m} value={m}>{m}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="scaleSelection"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Scale Selection</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select target scale" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Scale 2">Scale 2</SelectItem>
                              <SelectItem value="Scale 3">Scale 3</SelectItem>
                              <SelectItem value="Scale 4">Scale 4</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
               </div>

              <Separator className="my-4" />

              <div>
                <h3 className="text-lg font-medium mb-4">Unit Operation Parameters (Current Scale)</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {renderDynamicFields()}
                </div>
              </div>
          </CardContent>
          <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Predict Parameters
              </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
    
    {prediction && (
        <div ref={resultsRef}>
            <Card className="max-w-4xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle>Prediction Results</CardTitle>
                    <CardDescription>Recommended parameters for {prediction.targetScale}.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-medium mb-2">Recommended Parameters</h4>
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead>Parameter</TableHead>
                                <TableHead>Current Value</TableHead>
                                <TableHead>Recommended Value</TableHead>
                                <TableHead>Unit</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {prediction.recommendedParameters.map((param) => (
                                <TableRow key={param.name}>
                                <TableCell>{param.name}</TableCell>
                                <TableCell>{param.currentValue}</TableCell>
                                <TableCell className="font-bold">{param.recommendedValue}</TableCell>
                                <TableCell>{param.unit}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Scale-Up Comparison</h4>
                         <ChartContainer config={{
                            current: { label: "Current", color: "hsl(var(--chart-1))" },
                            recommended: { label: "Recommended", color: "hsl(var(--chart-2))" },
                         }} className="h-[250px] w-full">
                            <BarChart accessibilityLayer data={prediction.recommendedParameters.map(p => ({name: p.name, current: p.currentValue, recommended: p.recommendedValue}))}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="current" fill="var(--color-current)" radius={4} />
                                <Bar dataKey="recommended" fill="var(--color-recommended)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Constraints & Warnings</h4>
                        {prediction.constraints.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {prediction.constraints.map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground">No constraints or warnings.</p>
                        )}
                    </div>

                </CardContent>
            </Card>
        </div>
    )}
    </div>
  );
}
