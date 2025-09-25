import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const documents = [
  {
    id: "SOP-001",
    name: "Standard Operating Procedure for PCR",
    version: "v2.3",
    lastUpdated: "2023-05-15",
  },
  {
    id: "REG-012",
    name: "Q3 2023 Compliance Report",
    version: "v1.0",
    lastUpdated: "2023-07-01",
  },
  {
    id: "SOP-002",
    name: "Lab Safety and Chemical Handling",
    version: "v4.1",
    lastUpdated: "2023-04-22",
  },
  {
    id: "GUIDE-005",
    name: "Data Integrity and Auditing Guide",
    version: "v1.5",
    lastUpdated: "2023-06-30",
  },
];

export default function CompliancePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Documents</CardTitle>
        <CardDescription>
          Access and manage your SOPs, regulatory documents, and compliance reports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doc ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.id}</TableCell>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>{doc.version}</TableCell>
                <TableCell>{doc.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="outline">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
