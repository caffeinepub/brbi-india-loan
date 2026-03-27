import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  FileText,
  IndianRupee,
  Shield,
  Smartphone,
  Star,
  User,
} from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.5 },
};

const loanFeatures = [
  "Minimal documentation",
  "No collateral required",
  "Flexible repayment",
  "Quick disbursal in 4–6 hours",
];
const instantFeatures = [
  "Instant approval in minutes",
  "Digital KYC process",
  "No branch visit required",
  "Available 24/7",
];
const upiSteps = [
  "Open any UPI app (PhonePe, GPay, Paytm)",
  "Scan the QR code or use UPI ID: bloa@ptyes",
  "Enter amount ₹99 and pay",
  "Note your transaction reference ID",
  "Enter the reference ID in your application",
];
const applySteps = [
  {
    icon: User,
    title: "Create Your Account",
    desc: "Register or login to your BRBI India Loan account.",
  },
  {
    icon: FileText,
    title: "Fill Application Form",
    desc: "Choose loan type, amount, and fill in your personal & income details.",
  },
  {
    icon: IndianRupee,
    title: "Pay Platform Fee ₹99",
    desc: "Pay the one-time processing fee via UPI and enter your transaction ID.",
  },
  {
    icon: BadgeCheck,
    title: "Document Verification",
    desc: "Upload your documents. Our team will verify within 2–4 hours.",
  },
  {
    icon: CreditCard,
    title: "Loan Disbursement",
    desc: "On approval, funds are transferred directly to your bank account.",
  },
];
const docTypes = [
  {
    icon: User,
    title: "Proof of Identity",
    items: ["Aadhaar Card", "PAN Card", "Passport / Voter ID"],
  },
  {
    icon: Shield,
    title: "Proof of Address",
    items: ["Aadhaar Card", "Utility Bill (last 3 months)", "Rent Agreement"],
  },
  {
    icon: FileText,
    title: "Income Proof",
    items: [
      "Salary Slips (last 3 months)",
      "Bank Statement (last 6 months)",
      "ITR / Form 16",
    ],
  },
];
const testimonials = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    text: "Got ₹2 lakh instantly for my daughter's education. Process was smooth and transparent.",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    city: "Delhi",
    text: "Best instant loan app in India. No hidden charges, quick approval. Highly recommend!",
    rating: 5,
  },
  {
    name: "Anita Patel",
    city: "Ahmedabad",
    text: "The ₹99 fee was worth it. Got my loan within 6 hours. Excellent service!",
    rating: 5,
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* HERO */}
      <section
        className="relative min-h-[540px] flex items-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15,42,68,0.93) 45%, rgba(36,78,115,0.75) 100%), url('/assets/generated/hero-city-skyline.dim_1400x600.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest"
                style={{
                  backgroundColor: "rgba(209,168,58,0.2)",
                  color: "#D1A83A",
                }}
              >
                RBI Registered NBFC
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                Fast &amp; Personal
                <br />
                <span style={{ color: "#D1A83A" }}>Loans for Indians</span>
              </h1>
              <p className="text-lg mb-6" style={{ color: "#CBD5E1" }}>
                Get personal or instant loans up to ₹5,00,000 in just a few
                hours. 100% digital. No hidden charges.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate({ to: "/apply" })}
                  className="font-semibold text-white"
                  style={{ backgroundColor: "#D1A83A" }}
                  data-ocid="hero.primary_button"
                >
                  Check Your Eligibility
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate({ to: "/documentation" })}
                  className="border-white/50 text-white hover:bg-white/10 hover:text-white"
                  data-ocid="hero.secondary_button"
                >
                  Learn More
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                {["Quick Approval", "No Hidden Fees", "Secure & Safe"].map(
                  (tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1.5 text-sm"
                      style={{ color: "#CBD5E1" }}
                    >
                      <CheckCircle2
                        className="w-4 h-4"
                        style={{ color: "#D1A83A" }}
                      />
                      {tag}
                    </div>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ backgroundColor: "#143A5C" }} className="py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Customers Served", value: "2,50,000+" },
              { label: "Loans Disbursed", value: "₹1,200 Cr+" },
              { label: "Avg. Disbursal Time", value: "4 Hours" },
              { label: "Cities Covered", value: "500+" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-heading text-xl font-bold"
                  style={{ color: "#D1A83A" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#CBD5E1" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LOAN PRODUCTS */}
      <section id="personal" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2
              className="font-heading text-3xl font-bold mb-2"
              style={{ color: "#111827" }}
            >
              Our Loan Products
            </h2>
            <p className="text-base" style={{ color: "#4B5563" }}>
              Choose the loan that fits your needs
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card
                className="rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow border"
                style={{ borderColor: "#E6E9EE" }}
              >
                <div className="h-2" style={{ backgroundColor: "#0F2A44" }} />
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(15,42,68,0.08)" }}
                    >
                      <User className="w-6 h-6" style={{ color: "#0F2A44" }} />
                    </div>
                    <div>
                      <CardTitle
                        className="font-heading text-xl"
                        style={{ color: "#111827" }}
                      >
                        Personal Loan
                      </CardTitle>
                      <p className="text-sm" style={{ color: "#4B5563" }}>
                        For any personal financial need
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: "Max Amount", value: "₹5,00,000" },
                      { label: "Tenure", value: "12–60 Months" },
                      { label: "Interest Rate", value: "10.5% p.a." },
                    ].map((d) => (
                      <div
                        key={d.label}
                        className="rounded-lg p-3 text-center"
                        style={{ backgroundColor: "#F2F4F7" }}
                      >
                        <p
                          className="font-heading font-bold text-sm"
                          style={{ color: "#0F2A44" }}
                        >
                          {d.value}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "#4B5563" }}
                        >
                          {d.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <ul
                    className="space-y-2 text-sm mb-5"
                    style={{ color: "#4B5563" }}
                  >
                    {loanFeatures.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: "#D1A83A" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full font-semibold text-white"
                    style={{ backgroundColor: "#0F2A44" }}
                    onClick={() => navigate({ to: "/apply" })}
                    data-ocid="personal_loan.primary_button"
                  >
                    Apply for Personal Loan{" "}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              id="instant"
            >
              <Card
                className="rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow border"
                style={{ borderColor: "#E6E9EE" }}
              >
                <div className="h-2" style={{ backgroundColor: "#D1A83A" }} />
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(209,168,58,0.12)" }}
                    >
                      <Smartphone
                        className="w-6 h-6"
                        style={{ color: "#D1A83A" }}
                      />
                    </div>
                    <div>
                      <CardTitle
                        className="font-heading text-xl"
                        style={{ color: "#111827" }}
                      >
                        Instant Loan
                      </CardTitle>
                      <p className="text-sm" style={{ color: "#4B5563" }}>
                        Money in your account within 2 hours
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: "Max Amount", value: "₹1,00,000" },
                      { label: "Tenure", value: "3–24 Months" },
                      { label: "Interest Rate", value: "14% p.a." },
                    ].map((d) => (
                      <div
                        key={d.label}
                        className="rounded-lg p-3 text-center"
                        style={{ backgroundColor: "#F2F4F7" }}
                      >
                        <p
                          className="font-heading font-bold text-sm"
                          style={{ color: "#D1A83A" }}
                        >
                          {d.value}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "#4B5563" }}
                        >
                          {d.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <ul
                    className="space-y-2 text-sm mb-5"
                    style={{ color: "#4B5563" }}
                  >
                    {instantFeatures.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: "#D1A83A" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full font-semibold text-white"
                    style={{ backgroundColor: "#D1A83A" }}
                    onClick={() => navigate({ to: "/apply" })}
                    data-ocid="instant_loan.primary_button"
                  >
                    Apply for Instant Loan{" "}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* UPI PAYMENT */}
      <section className="py-12" style={{ backgroundColor: "#F2F4F7" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <Card
              className="rounded-2xl border"
              style={{ borderColor: "#E6E9EE" }}
            >
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div>
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{
                        backgroundColor: "rgba(209,168,58,0.15)",
                        color: "#C9A032",
                      }}
                    >
                      <IndianRupee className="w-3 h-3" /> One-time Platform Fee
                    </div>
                    <h3
                      className="font-heading text-2xl font-bold mb-2"
                      style={{ color: "#111827" }}
                    >
                      Pay ₹99 via UPI
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "#4B5563" }}>
                      A one-time non-refundable platform processing fee of just
                      ₹99. Pay securely via UPI.
                    </p>
                    <Button
                      onClick={() => navigate({ to: "/apply" })}
                      className="font-semibold text-white"
                      style={{ backgroundColor: "#0F2A44" }}
                      data-ocid="upi.primary_button"
                    >
                      Start Application
                    </Button>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="border-4 rounded-xl overflow-hidden"
                      style={{ borderColor: "#D1A83A" }}
                    >
                      <img
                        src="/assets/generated/upi-qr-code.dim_200x200.png"
                        alt="UPI QR Code"
                        className="w-40 h-40 object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p
                        className="font-heading font-semibold text-sm"
                        style={{ color: "#0F2A44" }}
                      >
                        bloa@ptyes
                      </p>
                      <p className="text-xs" style={{ color: "#4B5563" }}>
                        Scan to pay ₹99
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4
                      className="font-semibold text-sm mb-3"
                      style={{ color: "#111827" }}
                    >
                      How to Pay
                    </h4>
                    <ul className="space-y-2">
                      {upiSteps.map((step, i) => (
                        <li
                          key={step}
                          className="flex items-start gap-3 text-sm"
                          style={{ color: "#4B5563" }}
                        >
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                            style={{ backgroundColor: "#0F2A44" }}
                          >
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-3 mt-4">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/220px-UPI-Logo-vector.svg.png"
                        alt="UPI"
                        className="h-6 object-contain"
                      />
                      <Shield
                        className="w-5 h-5"
                        style={{ color: "#0F2A44" }}
                      />
                      <span className="text-xs" style={{ color: "#4B5563" }}>
                        256-bit SSL Secured
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* HOW TO APPLY + DOCUMENTS */}
      <section id="how-to-apply" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div {...fadeUp}>
              <h2
                className="font-heading text-2xl font-bold mb-6"
                style={{ color: "#111827" }}
              >
                How to Apply
              </h2>
              <div className="space-y-5">
                {applySteps.map((step, i) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ backgroundColor: "#0F2A44" }}
                      >
                        {i + 1}
                      </div>
                      {i < applySteps.length - 1 && (
                        <div
                          className="w-px flex-1 mt-1"
                          style={{ backgroundColor: "#E6E9EE" }}
                        />
                      )}
                    </div>
                    <div className="pb-4">
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "#111827" }}
                      >
                        {step.title}
                      </p>
                      <p
                        className="text-sm mt-0.5"
                        style={{ color: "#4B5563" }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
              <h2
                className="font-heading text-2xl font-bold mb-6"
                style={{ color: "#111827" }}
              >
                Documents Required
              </h2>
              <div className="space-y-4">
                {docTypes.map((doc) => (
                  <div
                    key={doc.title}
                    className="rounded-xl p-4 border"
                    style={{
                      backgroundColor: "#F2F4F7",
                      borderColor: "#E6E9EE",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "rgba(15,42,68,0.1)" }}
                      >
                        <doc.icon
                          className="w-4 h-4"
                          style={{ color: "#0F2A44" }}
                        />
                      </div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "#111827" }}
                      >
                        {doc.title}
                      </p>
                    </div>
                    <ul className="space-y-1">
                      {doc.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm"
                          style={{ color: "#4B5563" }}
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: "#D1A83A" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link to="/documentation">
                <Button
                  variant="outline"
                  className="mt-4 border"
                  style={{ borderColor: "#0F2A44", color: "#0F2A44" }}
                  data-ocid="docs.link"
                >
                  View Full Documentation{" "}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12" style={{ backgroundColor: "#F2F4F7" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-8">
            <h2
              className="font-heading text-2xl font-bold"
              style={{ color: "#111827" }}
            >
              Trusted by Thousands
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card
                  className="rounded-xl border"
                  style={{ borderColor: "#E6E9EE" }}
                >
                  <CardContent className="p-5">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: t.rating }, (_, j) => (
                        <Star
                          key={`${t.name}-star-${j}`}
                          className="w-4 h-4 fill-current"
                          style={{ color: "#D1A83A" }}
                        />
                      ))}
                    </div>
                    <p
                      className="text-sm italic mb-3"
                      style={{ color: "#4B5563" }}
                    >
                      "{t.text}"
                    </p>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "#111827" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "#4B5563" }}>
                      {t.city}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ backgroundColor: "#0F2A44" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl font-bold text-white mb-3">
              Ready to Apply?
            </h2>
            <p className="mb-6" style={{ color: "#CBD5E1" }}>
              Start your loan application today. Get approved within hours.
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: "/apply" })}
              className="font-semibold text-white"
              style={{ backgroundColor: "#D1A83A" }}
              data-ocid="cta.primary_button"
            >
              Apply Now — It's Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
