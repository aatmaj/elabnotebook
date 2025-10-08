"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { calculateScaleUp, type PredictionInput, type PredictionOutput, RecommendedParameter } from "@/lib/scale-up-calculations";
import { useAppStore, type Plant } from "@/lib/store";
import { Loader2, PlusCircle, Trash2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";

const unitOperationSchema = z.object({
  unitOperation: z.enum(["Top Spray Granulation", "Wet Granulation", "Compression", "Coating", "Blending", "Milling", "Bottom Spray Granulation (Wurster)", "Roll Compaction", "Drying", "Sifting", "Capsule Filling", "Powder Layering", "Hot Melt Extrusion", "Extrusion/Spheronization"]),
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

const formSchema = z.object({
  productName: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  strength: z.coerce.number().positive({ message: "Strength must be a positive number." }),
  category: z.enum(["Lab → Pilot", "Pilot → Plant 1", "Plant 1 → Plant 2"]),
  vertical: z.string().min(1, "Please select a vertical."),
  market: z.string().min(1, "Please select a market."),
  scaleSelection: z.enum(["Scale 2", "Scale 3", "Scale 4"]),
  operations: z.array(unitOperationSchema).min(1, "Please add at least one unit operation."),
});

type FormValues = z.infer<typeof formSchema>;

const DynamicFields: React.FC<{ control: any; index: number, unitOperation: any }> = ({ control, index, unitOperation }) => {
    switch (unitOperation) {
      case "Top Spray Granulation":
      case "Bottom Spray Granulation (Wurster)":
      case "Powder Layering":
        return (
          <>
            <FormField
              control={control}
              name={`operations.${index}.sprayRate`}
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
              control={control}
              name={`operations.${index}.binderPercentage`}
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
              control={control}
              name={`operations.${index}.inletTemp`}
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
              control={control}
              name={`operations.${index}.outletTemp`}
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
              control={control}
              name={`operations.${index}.panSpeed`}
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
              control={control}
              name={`operations.${index}.nozzlePosition`}
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
                control={control}
                name={`operations.${index}.panSpeed`}
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
                control={control}
                name={`operations.${index}.blendingTime`}
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
              control={control}
              name={`operations.${index}.turretSpeed`}
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
              control={control}
              name={`operations.${index}.numberOfPunches`}
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
              control={control}
              name={`operations.${index}.compressionForce`}
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
              control={control}
              name={`operations.${index}.sprayRate`}
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
              control={control}
              name={`operations.${index}.bedSpeed`}
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
              control={control}
              name={`operations.${index}.atomizationPressure`}
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
              control={control}
              name={`operations.${index}.blendingTime`}
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
              control={control}
              name={`operations.${index}.blenderSpeed`}
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
              control={control}
              name={`operations.${index}.millSpeed`}
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
              control={control}
              name={`operations.${index}.screenSize`}
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
              control={control}
              name={`operations.${index}.rollForce`}
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
              control={control}
              name={`operations.${index}.rollSpeed`}
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
              control={control}
              name={`operations.${index}.gapSize`}
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
        return <p className="text-muted-foreground text-sm col-span-3">Prediction for this unit operation is not yet implemented.</p>;
    }
};

const ResultRow = ({ param }: { param: RecommendedParameter }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>{param.name}</TableCell>
                <TableCell>{param.currentValue}</TableCell>
                <TableCell className="font-bold">{param.recommendedValue}</TableCell>
                <TableCell>{param.unit}</TableCell>
                <TableCell className="text-right">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(prev => !prev)}>
                            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                            <span className="sr-only">{isOpen ? "Hide" : "Show"} formula</span>
                        </Button>
                    </CollapsibleTrigger>
                </TableCell>
            </TableRow>
            {isOpen && (
                 <TableRow>
                    <TableCell colSpan={5} className="p-0">
                        <div className="p-4 bg-muted/50">
                            <p className="font-mono text-xs text-muted-foreground">{param.formula}</p>
                        </div>
                    </TableCell>
                </TableRow>
            )}
        </React.Fragment>
    )
}

export default function ScaleUpPredictorPage() {
  const [prediction, setPrediction] = React.useState<PredictionOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { getUniqueValues, setPlants } = useAppStore();
  const resultsRef = React.useRef<HTMLDivElement>(null);
  
  const firestore = useFirestore();
  const { user } = useUser();

  const plantsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, "plants"), where("userId", "==", user.uid));
  }, [firestore, user]);

  const { data: plants } = useCollection<Plant>(plantsQuery);

  const markets = getUniqueValues("market");
  const verticals = getUniqueValues("vertical");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      category: "Lab → Pilot",
      vertical: "",
      market: "",
      scaleSelection: "Scale 2",
      operations: [{ unitOperation: "Top Spray Granulation" }],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "operations"
  });

  const watchedOperations = form.watch("operations");
  
  React.useEffect(() => {
    if(plants) {
      setPlants(plants);
    }
  }, [plants, setPlants]);

  React.useEffect(() => {
    if (verticals.length > 0 && !form.getValues('vertical')) {
      form.setValue('vertical', verticals[0]);
    }
    if (markets.length > 0 && !form.getValues('market')) {
      form.setValue('market', markets[0]);
    }
  }, [markets, verticals, form]);

  function onSubmit(values: FormValues) {
    setIsLoading(true);
    setPrediction(null);
    console.log("Form Submitted:", values);
    
    const allPredictions: PredictionOutput[] = [];
    values.operations.forEach(op => {
       const result = calculateScaleUp({
         ...values,
         ...op,
       });
       allPredictions.push(result);
    });

    const combinedPrediction: PredictionOutput = {
        targetScale: values.scaleSelection,
        recommendedParameters: allPredictions.flatMap(p => p.recommendedParameters),
        constraints: allPredictions.flatMap(p => p.constraints)
    };

    setTimeout(() => {
        setPrediction(combinedPrediction);
        setIsLoading(false);
    }, 1000);
  }

  React.useEffect(() => {
    if (prediction && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [prediction]);


  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Scale-Up Predictor</h1>
        <p className="text-muted-foreground max-w-2xl">
          Build a sequence of unit operations and predict optimal process parameters for scaling up formulations.
        </p>
      </div>

     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>Process Input</CardTitle>
            <CardDescription>
              Define the product and the scaling parameters for your prediction.
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
                   <div />
               </div>
               <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                      control={form.control}
                      name="vertical"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vertical</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a vertical" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {verticals.length > 0 ? verticals.map((v) => (
                                <SelectItem key={v} value={v}>{v}</SelectItem>
                              )) : <SelectItem value="loading" disabled>Loading...</SelectItem>}
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
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a market" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {markets.length > 0 ? markets.map((m) => (
                                <SelectItem key={m} value={m}>{m}</SelectItem>
                              )) : <SelectItem value="loading" disabled>Loading...</SelectItem>}
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

              <div className="space-y-6">
                <h3 className="text-lg font-medium">Unit Operation Sequence</h3>
                 {fields.map((field, index) => (
                   <Card key={field.id} className="bg-secondary/20">
                     <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <div className="flex-1">
                             <FormField
                                control={form.control}
                                name={`operations.${index}.unitOperation`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit Operation #{index + 1}</FormLabel>
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
                        </div>
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="ml-4 mt-6 text-muted-foreground hover:text-destructive"
                            onClick={() => remove(index)}
                            disabled={fields.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove Operation</span>
                        </Button>
                     </CardHeader>
                     <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                            <DynamicFields control={form.control} index={index} unitOperation={watchedOperations[index]?.unitOperation} />
                        </div>
                     </CardContent>
                   </Card>
                 ))}
                 <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => append({ unitOperation: 'Blending' })}
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Unit Operation
                </Button>
                {form.formState.errors.operations && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.operations.message}</p>
                )}
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
            <Card className="max-w-4xl mt-8">
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
                                <TableHead className="text-right">Details</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {prediction.recommendedParameters.map((param, i) => (
                                <ResultRow param={param} key={`${param.name}-${i}`}/>
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
