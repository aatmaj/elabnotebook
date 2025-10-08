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

const formSchema = z.object({
  productName: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  unitOperation: z.enum(["Top Spray Granulation", "Wet Granulation", "Compression", "Coating"]),
  category: z.enum(["Lab → Pilot", "Pilot → Plant 1", "Plant 1 → Plant 2"]),
  strength: z.coerce.number().positive({ message: "Strength must be a positive number." }),
  vertical: z.enum(["OSD", "Injectable", "Liquid", "Other"]),
  market: z.enum(["USA", "EU", "India", "Other"]),
  scaleSelection: z.enum(["Scale 2", "Scale 3", "Scale 4"]),
  // Dynamic parameters based on unit operation
  sprayRate: z.coerce.number().optional(),
  binderPercentage: z.coerce.number().optional(),
  inletTemp: z.coerce.number().optional(),
  outletTemp: z.coerce.number().optional(),
  panSpeed: z.coerce.number().optional(),
  nozzlePosition: z.coerce.number().optional(),
  turretSpeed: z.coerce.number().optional(),
  numberOfPunches: z.coerce.number().optional(),
  compressionForce: z.coerce.number().optional(),
  bedSpeed: z.coerce.number().optional(),
  atomizationPressure: z.coerce.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ScaleUpPredictorPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      unitOperation: "Top Spray Granulation",
      category: "Lab → Pilot",
      vertical: "OSD",
      market: "USA",
      scaleSelection: "Scale 2",
    },
  });

  const selectedUnitOp = form.watch("unitOperation");

  function onSubmit(values: FormValues) {
    // This is where we will call the backend calculation logic
    console.log("Form Submitted:", values);
  }

  const renderDynamicFields = () => {
    switch (selectedUnitOp) {
      case "Top Spray Granulation":
      case "Wet Granulation":
        return (
          <>
            <FormField
              control={form.control}
              name="sprayRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spray Rate (g/min)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 150" {...field} />
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
                    <Input type="number" placeholder="e.g., 5" {...field} />
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
                    <Input type="number" placeholder="e.g., 60" {...field} />
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
                    <Input type="number" placeholder="e.g., 45" {...field} />
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
                    <Input type="number" placeholder="e.g., 10" {...field} />
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
                    <Input type="number" placeholder="e.g., 3" {...field} />
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
                    <Input type="number" placeholder="e.g., 25" {...field} />
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
                    <Input type="number" placeholder="e.g., 45" {...field} />
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
                    <Input type="number" placeholder="e.g., 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </Item>
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
                    <Input type="number" placeholder="e.g., 120" {...field} />
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
                    <Input type="number" placeholder="e.g., 8" {...field} />
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
                    <Input type="number" placeholder="e.g., 2.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      default:
        return null;
    }
  };


  return (
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
                          <Input type="number" placeholder="e.g., 500" {...field} />
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
                            <SelectItem value="Top Spray Granulation">Top Spray Granulation</SelectItem>
                            <SelectItem value="Wet Granulation">Wet Granulation</SelectItem>
                            <SelectItem value="Compression">Compression</SelectItem>
                            <SelectItem value="Coating">Coating</SelectItem>
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
                            </Trigger>
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
                              <SelectItem value="OSD">OSD</SelectItem>
                              <SelectItem value="Injectable">Injectable</SelectItem>
                              <SelectItem value="Liquid">Liquid</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
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
                              </Trigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="USA">USA</SelectItem>
                              <SelectItem value="EU">EU</SelectItem>
                              <SelectItem value="India">India</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
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
                              </Trigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Scale 2">Scale 2</SelectItem>
                              <SelectItem value="Scale 3">Scale 3</SelectItem>
                              <SelectItem value="Scale 4">Scale 4</Ttem>
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
              <Button type="submit">Predict Parameters</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

    