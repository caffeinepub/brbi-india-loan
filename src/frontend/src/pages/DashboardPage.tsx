import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Eye,
  IndianRupee,
  Lock,
  PlusCircle,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { LoanStatus } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCancelApplication,
  useGetAllApplications,
  useGetMyApplications,
  useIsAdmin,
  useUpdateApplicationStatus,
} from "../hooks/useQueries";

function statusBadge(status: LoanStatus) {
  const map: Record<LoanStatus, { label: string; style: React.CSSProperties }> =
    {
      [LoanStatus.pending]: {
        label: "Pending",
        style: { backgroundColor: "#FEF3C7", color: "#92400E" },
      },
      [LoanStatus.under_review]: {
        label: "Under Review",
        style: { backgroundColor: "#DBEAFE", color: "#1E40AF" },
      },
      [LoanStatus.approved]: {
        label: "Approved",
        style: { backgroundColor: "#D1FAE5", color: "#065F46" },
      },
      [LoanStatus.rejected]: {
        label: "Rejected",
        style: { backgroundColor: "#FEE2E2", color: "#991B1B" },
      },
      [LoanStatus.cancelled]: {
        label: "Cancelled",
        style: { backgroundColor: "#F3F4F6", color: "#374151" },
      },
    };
  const m = map[status];
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={m.style}
    >
      {m.label}
    </span>
  );
}

const STATS_CONFIG = [
  { label: "Total Applications", icon: IndianRupee, filter: () => true },
  {
    label: "Pending",
    icon: Clock,
    filter: (s: LoanStatus) => s === LoanStatus.pending,
  },
  {
    label: "Approved",
    icon: CheckCircle2,
    filter: (s: LoanStatus) => s === LoanStatus.approved,
  },
  {
    label: "Rejected",
    icon: XCircle,
    filter: (s: LoanStatus) => s === LoanStatus.rejected,
  },
];

export default function DashboardPage() {
  const { loginStatus, identity, login } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const navigate = useNavigate();

  const { data: myApps, isLoading, refetch } = useGetMyApplications();
  const { data: isAdmin } = useIsAdmin();
  const { data: allApps, isLoading: allLoading } = useGetAllApplications();
  const cancelMutation = useCancelApplication();
  const updateMutation = useUpdateApplicationStatus();

  const handleCancel = async (id: bigint) => {
    try {
      await cancelMutation.mutateAsync(id);
      toast.success("Application cancelled");
    } catch {
      toast.error("Failed to cancel application");
    }
  };

  const handleStatusUpdate = async (id: bigint, status: LoanStatus) => {
    try {
      await updateMutation.mutateAsync({ id, status });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F2F4F7" }}
      >
        <div className="text-center p-8">
          <Lock
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: "#0F2A44" }}
          />
          <h2
            className="font-heading text-xl font-bold mb-2"
            style={{ color: "#111827" }}
          >
            Login Required
          </h2>
          <p className="text-sm mb-4" style={{ color: "#4B5563" }}>
            Please login to view your dashboard.
          </p>
          <Button
            className="text-white"
            style={{ backgroundColor: "#0F2A44" }}
            onClick={() => login()}
            data-ocid="dashboard.primary_button"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  const principal = identity?.getPrincipal().toString();

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ backgroundColor: "#F2F4F7" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h1
                className="font-heading text-2xl font-bold"
                style={{ color: "#111827" }}
              >
                My Dashboard
              </h1>
              <p
                className="text-xs mt-1 font-mono"
                style={{ color: "#4B5563" }}
              >
                Principal: {principal?.slice(0, 20)}...
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                data-ocid="dashboard.button"
              >
                <RefreshCw className="w-4 h-4 mr-1" /> Refresh
              </Button>
              <Button
                size="sm"
                className="text-white"
                style={{ backgroundColor: "#D1A83A" }}
                onClick={() => navigate({ to: "/apply" })}
                data-ocid="dashboard.primary_button"
              >
                <PlusCircle className="w-4 h-4 mr-1" /> New Application
              </Button>
            </div>
          </div>

          {myApps && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {STATS_CONFIG.map((s) => (
                <Card
                  key={s.label}
                  className="rounded-xl border"
                  style={{ borderColor: "#E6E9EE" }}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "rgba(15,42,68,0.08)" }}
                    >
                      <s.icon
                        className="w-5 h-5"
                        style={{ color: "#0F2A44" }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-heading font-bold text-xl"
                        style={{ color: "#111827" }}
                      >
                        {myApps.filter((a) => s.filter(a.status)).length}
                      </p>
                      <p className="text-xs" style={{ color: "#4B5563" }}>
                        {s.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Card
            className="rounded-2xl border mb-6"
            style={{ borderColor: "#E6E9EE" }}
          >
            <CardHeader className="pb-3">
              <CardTitle
                className="font-heading text-lg"
                style={{ color: "#111827" }}
              >
                My Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div
                  className="p-6 space-y-3"
                  data-ocid="dashboard.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : !myApps || myApps.length === 0 ? (
                <div
                  className="p-10 text-center"
                  data-ocid="dashboard.empty_state"
                >
                  <IndianRupee
                    className="w-10 h-10 mx-auto mb-3"
                    style={{ color: "#CBD5E1" }}
                  />
                  <p className="font-medium" style={{ color: "#111827" }}>
                    No applications yet
                  </p>
                  <p className="text-sm mt-1 mb-4" style={{ color: "#4B5563" }}>
                    Apply for your first loan today!
                  </p>
                  <Button
                    size="sm"
                    className="text-white"
                    style={{ backgroundColor: "#0F2A44" }}
                    onClick={() => navigate({ to: "/apply" })}
                    data-ocid="dashboard.primary_button"
                  >
                    Apply Now
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="dashboard.table">
                    <TableHeader>
                      <TableRow style={{ backgroundColor: "#F2F4F7" }}>
                        {[
                          "App ID",
                          "Type",
                          "Amount",
                          "Tenure",
                          "Fee Paid",
                          "Status",
                          "Actions",
                        ].map((h) => (
                          <TableHead
                            key={h}
                            className="text-xs"
                            style={{ color: "#4B5563" }}
                          >
                            {h}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myApps.map((app, idx) => (
                        <TableRow
                          key={app.applicationId.toString()}
                          data-ocid={`dashboard.item.${idx + 1}`}
                        >
                          <TableCell
                            className="text-sm font-mono"
                            style={{ color: "#111827" }}
                          >
                            #{app.applicationId.toString()}
                          </TableCell>
                          <TableCell
                            className="text-sm"
                            style={{ color: "#4B5563" }}
                          >
                            {app.submission.loanProduct === "personal_loan"
                              ? "Personal"
                              : "Instant"}
                          </TableCell>
                          <TableCell
                            className="text-sm font-semibold"
                            style={{ color: "#0F2A44" }}
                          >
                            ₹
                            {Number(
                              app.submission.amountRequested,
                            ).toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell
                            className="text-sm"
                            style={{ color: "#4B5563" }}
                          >
                            {Number(app.submission.tenureMonths)} mo.
                          </TableCell>
                          <TableCell>
                            {app.platformFeePaid ? (
                              <CheckCircle2
                                className="w-4 h-4"
                                style={{ color: "#065F46" }}
                              />
                            ) : (
                              <XCircle
                                className="w-4 h-4"
                                style={{ color: "#991B1B" }}
                              />
                            )}
                          </TableCell>
                          <TableCell>{statusBadge(app.status)}</TableCell>
                          <TableCell>
                            {app.status === LoanStatus.pending && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7 text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleCancel(app.applicationId)}
                                data-ocid={`dashboard.delete_button.${idx + 1}`}
                              >
                                Cancel
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {isAdmin && (
            <Card
              className="rounded-2xl border"
              style={{ borderColor: "#E6E9EE" }}
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className="font-heading text-lg flex items-center gap-2"
                  style={{ color: "#111827" }}
                >
                  <Eye className="w-5 h-5" style={{ color: "#D1A83A" }} /> Admin
                  Panel — All Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {allLoading ? (
                  <div
                    className="p-6 space-y-3"
                    data-ocid="admin.loading_state"
                  >
                    {[1, 2].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table data-ocid="admin.table">
                      <TableHeader>
                        <TableRow style={{ backgroundColor: "#F2F4F7" }}>
                          {[
                            "App ID",
                            "Applicant",
                            "Type",
                            "Amount",
                            "Status",
                            "Update Status",
                          ].map((h) => (
                            <TableHead
                              key={h}
                              className="text-xs"
                              style={{ color: "#4B5563" }}
                            >
                              {h}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(allApps || []).map((app, idx) => (
                          <TableRow
                            key={app.applicationId.toString()}
                            data-ocid={`admin.item.${idx + 1}`}
                          >
                            <TableCell className="text-sm font-mono">
                              #{app.applicationId.toString()}
                            </TableCell>
                            <TableCell
                              className="text-xs font-mono"
                              style={{ color: "#4B5563" }}
                            >
                              {app.applicant.toString().slice(0, 12)}...
                            </TableCell>
                            <TableCell
                              className="text-sm"
                              style={{ color: "#4B5563" }}
                            >
                              {app.submission.loanProduct === "personal_loan"
                                ? "Personal"
                                : "Instant"}
                            </TableCell>
                            <TableCell
                              className="text-sm font-semibold"
                              style={{ color: "#0F2A44" }}
                            >
                              ₹
                              {Number(
                                app.submission.amountRequested,
                              ).toLocaleString("en-IN")}
                            </TableCell>
                            <TableCell>{statusBadge(app.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-1 flex-wrap">
                                {[
                                  LoanStatus.under_review,
                                  LoanStatus.approved,
                                  LoanStatus.rejected,
                                ].map((s) => (
                                  <button
                                    key={s}
                                    type="button"
                                    onClick={() =>
                                      handleStatusUpdate(app.applicationId, s)
                                    }
                                    className="px-2 py-0.5 rounded text-xs font-medium transition-opacity hover:opacity-80"
                                    style={{
                                      backgroundColor:
                                        s === LoanStatus.approved
                                          ? "#D1FAE5"
                                          : s === LoanStatus.rejected
                                            ? "#FEE2E2"
                                            : "#DBEAFE",
                                      color:
                                        s === LoanStatus.approved
                                          ? "#065F46"
                                          : s === LoanStatus.rejected
                                            ? "#991B1B"
                                            : "#1E40AF",
                                    }}
                                    data-ocid="admin.button"
                                  >
                                    {s.replace("_", " ")}
                                  </button>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
