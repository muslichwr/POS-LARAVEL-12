import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Head, Link } from "@inertiajs/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Log {
  id: number;
  user: { name: string };
  action: string;
  model: string;
  description: string;
  created_at: string;
}

interface Props {
  logs: {
    data: Log[]; // Pagination data
  };
}

export default function Logs({ logs }: Props) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader title="Activity Logs" />

        <div className="p-6 bg-gray-900 min-h-screen text-white">
          <Head title="Activity Logs" />

          {/* Header */}
          <h1 className="text-2xl font-bold mb-8">Activity Logs</h1>

          {/* Tabel Logs */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.data.length > 0 ? (
                  logs.data.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.user.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.action === "create"
                              ? "success"
                              : log.action === "update"
                              ? "warning"
                              : "destructive"
                          }
                        >
                          {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.model}</TableCell>
                      <TableCell>{log.description}</TableCell>
                      <TableCell>
                        {new Date(log.created_at).toLocaleString("default", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No logs found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}