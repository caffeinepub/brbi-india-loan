import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  IndianRupee,
  Loader2,
  Lock,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { EmploymentType, LoanProduct } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useRecordPayment,
  useSubmitLoanApplication,
} from "../hooks/useQueries";

const STEPS = ["Loan Details", "Personal Info", "Pay Fee", "Confirmation"];

type FormData = {
  loanProduct: LoanProduct;
  amountRequested: string;
  tenureMonths: string;
  fullName: string;
  email: string;
  phone: string;
  monthlyIncome: string;
  employmentType: EmploymentType;
  upiTransactionId: string;
};

export default function ApplyPage() {
  const navigate = useNavigate();
  const { login, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;

  const [step, setStep] = useState(0);
  const [applicationId, setApplicationId] = useState<bigint | null>(null);
  const [form, setForm] = useState<FormData>({
    loanProduct: LoanProduct.personal_loan,
    amountRequested: "",
    tenureMonths: "",
    fullName: "",
    email: "",
    phone: "",
    monthlyIncome: "",
    employmentType: EmploymentType.salaried,
    upiTransactionId: "",
  });

  const submitMutation = useSubmitLoanApplication();
  const paymentMutation = useRecordPayment();

  const set = (key: keyof FormData, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const maxAmount =
    form.loanProduct === LoanProduct.personal_loan ? 500000 : 100000;
  const minTenure = form.loanProduct === LoanProduct.personal_loan ? 12 : 3;
  const maxTenure = form.loanProduct === LoanProduct.personal_loan ? 60 : 24;

  const handleStep1Next = () => {
    if (!form.amountRequested || !form.tenureMonths) {
      toast.error("Please fill all fields");
      return;
    }
    const amt = Number(form.amountRequested);
    if (amt < 10000 || amt > maxAmount) {
      toast.error(
        `Amount must be between ₹10,000 and ₹${maxAmount.toLocaleString("en-IN")}`,
      );
      return;
    }
    setStep(1);
  };

  const handleStep2Next = async () => {
    if (!form.fullName || !form.email || !form.phone || !form.monthlyIncome) {
      toast.error("Please fill all fields");
      return;
    }
    if (!isLoggedIn) {
      toast.error("Please login first");
      await login();
      return;
    }
    try {
      const id = await submitMutation.mutateAsync({
        loanProduct: form.loanProduct,
        amountRequested: BigInt(form.amountRequested),
        tenureMonths: BigInt(form.tenureMonths),
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        monthlyIncome: BigInt(form.monthlyIncome),
        employmentType: form.employmentType,
      });
      setApplicationId(id);
      setStep(2);
    } catch {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  const handlePayment = async () => {
    if (!form.upiTransactionId.trim()) {
      toast.error("Please enter your UPI transaction reference ID");
      return;
    }
    if (!applicationId) return;
    try {
      await paymentMutation.mutateAsync({
        applicationId,
        upiTransactionId: form.upiTransactionId.trim(),
      });
      setStep(3);
      toast.success("Payment recorded successfully!");
    } catch {
      toast.error("Failed to record payment. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: "#F2F4F7" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1
            className="font-heading text-2xl font-bold mb-5"
            style={{ color: "#111827" }}
          >
            Loan Application
          </h1>
          <div className="flex items-center gap-2">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors"
                    style={{
                      backgroundColor:
                        i < step
                          ? "#D1A83A"
                          : i === step
                            ? "#0F2A44"
                            : "#E6E9EE",
                      color: i <= step ? "white" : "#4B5563",
                    }}
                  >
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className="text-xs font-medium hidden sm:block"
                    style={{ color: i === step ? "#0F2A44" : "#4B5563" }}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 h-px mx-2"
                    style={{
                      backgroundColor: i < step ? "#D1A83A" : "#E6E9EE",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card
                className="rounded-2xl border"
                style={{ borderColor: "#E6E9EE" }}
              >
                <CardContent className="p-6 space-y-5">
                  <h2
                    className="font-heading text-xl font-bold"
                    style={{ color: "#111827" }}
                  >
                    Step 1: Loan Details
                  </h2>
                  <div className="space-y-2">
                    <Label style={{ color: "#111827" }}>Loan Type</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          val: LoanProduct.personal_loan,
                          label: "Personal Loan",
                          sub: "Up to ₹5,00,000",
                        },
                        {
                          val: LoanProduct.instant_loan,
                          label: "Instant Loan",
                          sub: "Up to ₹1,00,000",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => set("loanProduct", opt.val)}
                          className="border-2 rounded-xl p-4 text-left transition-colors"
                          style={{
                            borderColor:
                              form.loanProduct === opt.val
                                ? "#0F2A44"
                                : "#E6E9EE",
                            backgroundColor:
                              form.loanProduct === opt.val
                                ? "rgba(15,42,68,0.05)"
                                : "white",
                          }}
                          data-ocid="apply.select"
                        >
                          <p
                            className="font-semibold text-sm"
                            style={{ color: "#111827" }}
                          >
                            {opt.label}
                          </p>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: "#4B5563" }}
                          >
                            {opt.sub}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount" style={{ color: "#111827" }}>
                      Loan Amount (₹)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder={`10,000 – ${maxAmount.toLocaleString("en-IN")}`}
                      value={form.amountRequested}
                      onChange={(e) => set("amountRequested", e.target.value)}
                      data-ocid="apply.input"
                    />
                    <p className="text-xs" style={{ color: "#4B5563" }}>
                      Max: ₹{maxAmount.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tenure" style={{ color: "#111827" }}>
                      Loan Tenure (Months)
                    </Label>
                    <Select
                      value={form.tenureMonths}
                      onValueChange={(v) => set("tenureMonths", v)}
                    >
                      <SelectTrigger id="tenure" data-ocid="apply.select">
                        <SelectValue placeholder="Select tenure" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: maxTenure - minTenure + 1 },
                          (_, i) => minTenure + i,
                        )
                          .filter((m) => m % 6 === 0 || m === minTenure)
                          .map((m) => (
                            <SelectItem key={m} value={String(m)}>
                              {m} Months
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="w-full font-semibold text-white"
                    style={{ backgroundColor: "#0F2A44" }}
                    onClick={handleStep1Next}
                    data-ocid="apply.primary_button"
                  >
                    Continue <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card
                className="rounded-2xl border"
                style={{ borderColor: "#E6E9EE" }}
              >
                <CardContent className="p-6 space-y-5">
                  <h2
                    className="font-heading text-xl font-bold"
                    style={{ color: "#111827" }}
                  >
                    Step 2: Personal Information
                  </h2>
                  {!isLoggedIn && (
                    <div
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{
                        backgroundColor: "rgba(209,168,58,0.1)",
                        border: "1px solid #D1A83A",
                      }}
                    >
                      <Lock
                        className="w-5 h-5 shrink-0"
                        style={{ color: "#C9A032" }}
                      />
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#111827" }}
                        >
                          Login Required
                        </p>
                        <p className="text-xs" style={{ color: "#4B5563" }}>
                          You need to login to submit your application.
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => login()}
                        className="ml-auto text-white"
                        style={{ backgroundColor: "#0F2A44" }}
                        data-ocid="apply.submit_button"
                      >
                        Login
                      </Button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" style={{ color: "#111827" }}>
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="As per Aadhaar"
                        value={form.fullName}
                        onChange={(e) => set("fullName", e.target.value)}
                        data-ocid="apply.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" style={{ color: "#111827" }}>
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        data-ocid="apply.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" style={{ color: "#111827" }}>
                        Mobile Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="10-digit mobile"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        data-ocid="apply.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="income" style={{ color: "#111827" }}>
                        Monthly Income (₹)
                      </Label>
                      <Input
                        id="income"
                        type="number"
                        placeholder="Min ₹15,000"
                        value={form.monthlyIncome}
                        onChange={(e) => set("monthlyIncome", e.target.value)}
                        data-ocid="apply.input"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: "#111827" }}>Employment Type</Label>
                    <Select
                      value={form.employmentType}
                      onValueChange={(v) =>
                        set("employmentType", v as EmploymentType)
                      }
                    >
                      <SelectTrigger data-ocid="apply.select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={EmploymentType.salaried}>
                          Salaried
                        </SelectItem>
                        <SelectItem value={EmploymentType.self_employed}>
                          Self Employed
                        </SelectItem>
                        <SelectItem value={EmploymentType.unemployed}>
                          Unemployed
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(0)}
                      className="flex-1"
                      data-ocid="apply.cancel_button"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                    <Button
                      className="flex-1 font-semibold text-white"
                      style={{ backgroundColor: "#0F2A44" }}
                      onClick={handleStep2Next}
                      disabled={submitMutation.isPending}
                      data-ocid="apply.submit_button"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit &amp; Pay Fee{" "}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card
                className="rounded-2xl border"
                style={{ borderColor: "#E6E9EE" }}
              >
                <CardContent className="p-6 space-y-6">
                  <h2
                    className="font-heading text-xl font-bold"
                    style={{ color: "#111827" }}
                  >
                    Step 3: Pay Platform Fee
                  </h2>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: "rgba(209,168,58,0.1)",
                      border: "1px solid #D1A83A",
                    }}
                  >
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "#111827" }}
                    >
                      Application ID: #{applicationId?.toString()}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#4B5563" }}>
                      Please pay the ₹9 platform fee to proceed with your loan
                      application.
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="text-center">
                      <div
                        className="border-4 rounded-xl overflow-hidden inline-block"
                        style={{ borderColor: "#D1A83A" }}
                      >
                        <img
                          src="/assets/uploads/bb-019d28d2-b06c-721a-a327-c67fc687cc2a-1.jpeg"
                          alt="UPI QR"
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                      <p
                        className="font-semibold text-sm mt-2"
                        style={{ color: "#0F2A44" }}
                      >
                        bloa@ptyes
                      </p>
                      <p
                        className="font-heading text-lg font-bold"
                        style={{ color: "#D1A83A" }}
                      >
                        ₹9
                      </p>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="space-y-1">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "#111827" }}
                        >
                          Pay via UPI
                        </p>
                        <p className="text-xs" style={{ color: "#4B5563" }}>
                          Use PhonePe, GPay, Paytm, or any UPI app to scan the
                          QR or pay to UPI ID: <strong>bloa@ptyes</strong>
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="upiRef" style={{ color: "#111827" }}>
                          UPI Transaction Reference ID
                        </Label>
                        <Input
                          id="upiRef"
                          placeholder="Enter 12-digit UTR / reference ID"
                          value={form.upiTransactionId}
                          onChange={(e) =>
                            set("upiTransactionId", e.target.value)
                          }
                          data-ocid="payment.input"
                        />
                        <p className="text-xs" style={{ color: "#4B5563" }}>
                          You can find the reference ID in your UPI app's
                          transaction history.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                      data-ocid="payment.cancel_button"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                    <Button
                      className="flex-1 font-semibold text-white"
                      style={{ backgroundColor: "#D1A83A" }}
                      onClick={handlePayment}
                      disabled={paymentMutation.isPending}
                      data-ocid="payment.submit_button"
                    >
                      {paymentMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Recording...
                        </>
                      ) : (
                        <>
                          Confirm Payment{" "}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card
                className="rounded-2xl border"
                style={{ borderColor: "#E6E9EE" }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "rgba(209,168,58,0.15)" }}
                  >
                    <CheckCircle2
                      className="w-8 h-8"
                      style={{ color: "#D1A83A" }}
                    />
                  </div>
                  <h2
                    className="font-heading text-2xl font-bold mb-2"
                    style={{ color: "#111827" }}
                  >
                    Application Submitted!
                  </h2>
                  <p className="mb-2" style={{ color: "#4B5563" }}>
                    Your loan application #{applicationId?.toString()} has been
                    submitted successfully.
                  </p>
                  <p className="text-sm mb-6" style={{ color: "#4B5563" }}>
                    Our team will review your application within 2–4 business
                    hours. You'll receive a notification on your registered
                    email.
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                    <Button
                      variant="outline"
                      onClick={() => navigate({ to: "/dashboard" })}
                      data-ocid="confirm.link"
                    >
                      View Dashboard
                    </Button>
                    <Button
                      className="text-white"
                      style={{ backgroundColor: "#0F2A44" }}
                      onClick={() => navigate({ to: "/" })}
                      data-ocid="confirm.link"
                    >
                      Go Home
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
