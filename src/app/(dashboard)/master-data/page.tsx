"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircle } from "lucide-react";
import { useAppStore, type Plant, type Equipment } from "@/lib/store";

const plantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  vertical: z.string().min(1, "Vertical is required"),
  market: z.string().min(1, "Market is required"),
});

const equipmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  plant: z.string().min(1, "A plant must be selected"),
  capacity: z.string().min(1, "Capacity is required"),
});

function AddNewDialog({
  activeTab,
  open,
  onOpenChange,
}: {
  activeTab: "plants" | "equipment";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { plants, addPlant, addEquipment } = useAppStore();

  const plantForm = useForm<z.infer<typeof plantSchema>>({
    resolver: zodResolver(plantSchema),
    defaultValues: {
      name: "",
      location: "",
      category: "",
      vertical: "",
      market: "",
    },
  });

  const equipmentForm = useForm<z.infer<typeof equipmentSchema>>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: "",
      type: "",
      plant: "",
      capacity: "",
    },
  });

  const handleAddPlant = (values: z.infer<typeof plantSchema>) => {
    addPlant(values);
    plantForm.reset();
    onOpenChange(false);
  };

  const handleAddEquipment = (values: z.infer<typeof equipmentSchema>) => {
    addEquipment(values);
    equipmentForm.reset();
    onOpenChange(false);
  };

  const isPlantForm = activeTab === "plants";
  const form = isPlantForm ? plantForm : equipmentForm;
  const onSubmit = isPlantForm ? form.handleSubmit(handleAddPlant) : form.handleSubmit(handleAddEquipment);
  const title = isPlantForm ? "Add New Plant" : "Add New Equipment";
  const description = isPlantForm
    ? "Enter the details for the new manufacturing plant."
    : "Enter the details for the new piece of equipment and link it to a plant.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            {isPlantForm ? (
              <>
                <FormField
                  control={plantForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., PharmaPlant C" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={plantForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Dublin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={plantForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Plant 3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={plantForm.control}
                  name="vertical"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vertical</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., OSD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={plantForm.control}
                  name="market"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., EU" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                <FormField
                  control={equipmentForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Blender-02" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={equipmentForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., V-Blender" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={equipmentForm.control}
                  name="plant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Linked Plant</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a plant to link" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {plants.map((plant) => (
                            <SelectItem key={plant.name} value={plant.name}>
                              {plant.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={equipmentForm.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity/Speed</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 200L" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function MasterDataPage() {
  const { plants, equipment } = useAppStore();
  const [activeTab, setActiveTab] = React.useState<"plants" | "equipment">("plants");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Master Data Management</h1>
          <p className="text-muted-foreground">
            Manage all plants, equipment, and process parameters.
          </p>
        </div>
        <Button size="sm" className="gap-1" onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add New
          </span>
        </Button>
      </div>

      <AddNewDialog
        activeTab={activeTab}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "plants" | "equipment")} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plants">Plants</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>
        <TabsContent value="plants">
          <Card>
            <CardHeader>
              <CardTitle>Plants</CardTitle>
              <CardDescription>
                Manage manufacturing plant locations and their attributes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Vertical</TableHead>
                    <TableHead>Market</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plants.map((plant) => (
                    <TableRow key={plant.id}>
                      <TableCell className="font-medium">{plant.name}</TableCell>
                      <TableCell>{plant.location}</TableCell>
                      <TableCell>{plant.category}</TableCell>
                      <TableCell>{plant.vertical}</TableCell>
                      <TableCell>{plant.market}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="equipment">
          <Card>
            <CardHeader>
              <CardTitle>Equipment</CardTitle>
              <CardDescription>
                Manage all equipment linked to specific plants.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Linked Plant</TableHead>
                    <TableHead>Capacity/Speed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipment.map((equip) => (
                    <TableRow key={equip.id}>
                      <TableCell className="font-medium">{equip.name}</TableCell>
                      <TableCell>{equip.type}</TableCell>
                      <TableCell>{equip.plant}</TableCell>
                      <TableCell>{equip.capacity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
