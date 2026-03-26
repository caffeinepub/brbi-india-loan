import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  Banknote,
  BookOpen,
  CheckCircle2,
  FileText,
  HelpCircle,
  Shield,
  User,
} from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.4 },
};

const eligibility = [
  { label: "Age", detail: "21 to 60 years at the time of loan application" },
  { label: "Nationality", detail: "Indian Resident (OCI/PIO not eligible)" },
  {
    label: "Minimum Income",
    detail: "₹15,000/month (salaried) or ₹2,00,000/year (self-employed)",
  },
  { label: "Credit Score", detail: "CIBIL score of 650 or above recommended" },
  {
    label: "Employment",
    detail:
      "Salaried (min. 6 months in current job) or Self-Employed (2+ years)",
  },
  {
    label: "Bank Account",
    detail: "Active Indian bank account in the applicant's name",
  },
];

const docSections = [
  {
    title: "Identity Proof",
    items: [
      "Aadhaar Card (with linked mobile)",
      "PAN Card",
      "Passport",
      "Voter ID Card",
    ],
  },
  {
    title: "Address Proof",
    items: [
      "Aadhaar Card",
      "Utility Bill (last 3 months)",
      "Rent Agreement (notarized)",
      "Passport",
    ],
  },
  {
    title: "Income Proof",
    items: [
      "Last 3 months Salary Slips",
      "Bank Statement (last 6 months)",
      "Form 16 / ITR (last 2 years)",
      "Employer Letter on Letterhead",
    ],
  },
];

const tableRows = [
  ["Loan Amount", "₹10,000 – ₹5,00,000", "₹5,000 – ₹1,00,000"],
  ["Tenure", "12 – 60 months", "3 – 24 months"],
  ["Interest Rate", "10.5% – 22% p.a.", "14% – 28% p.a."],
  ["Platform Fee", "₹99 (one-time)", "₹99 (one-time)"],
  ["Processing Time", "4–6 hours", "1–2 hours"],
  ["Collateral", "Not Required", "Not Required"],
  ["Prepayment Penalty", "Nil", "Nil"],
];

const faqs = [
  {
    q: "What is the one-time platform fee of ₹99?",
    a: "The ₹99 platform fee covers the cost of processing your loan application, KYC verification, and credit evaluation. It is non-refundable and must be paid via UPI before your application is reviewed.",
  },
  {
    q: "How quickly will I get my loan after approval?",
    a: "Once your loan is approved and all documents are verified, funds are typically disbursed within 4–6 hours on working days. Instant Loans are disbursed within 2 hours.",
  },
  {
    q: "What is the maximum loan amount I can apply for?",
    a: "For Personal Loans, you can apply for up to ₹5,00,000. For Instant Loans, the maximum amount is ₹1,00,000. The actual amount sanctioned depends on your credit score and income.",
  },
  {
    q: "What documents are required for a loan application?",
    a: "You need Aadhaar Card, PAN Card, salary slips for the last 3 months, bank statements for the last 6 months, and proof of address. Self-employed applicants also need ITR/Form 16.",
  },
  {
    q: "Is there any prepayment penalty?",
    a: "BRBI India Loan does not charge any prepayment or foreclosure penalty. You can repay your loan early without any additional charges after 6 EMIs.",
  },
  {
    q: "How is my interest rate determined?",
    a: "Your interest rate is determined based on your CIBIL score, income, employment type, and loan tenure. Personal Loans start from 10.5% p.a. and Instant Loans from 14% p.a.",
  },
  {
    q: "What happens if I miss an EMI payment?",
    a: "A penal interest of 2% per month will be charged on overdue amounts. Consistent defaults may affect your credit score and may lead to legal recovery proceedings.",
  },
  {
    q: "Can I apply if I am self-employed?",
    a: "Yes! Self-employed individuals can apply. You'll need to provide your last 2 years' ITR, bank statements for the last 12 months, and business proof documents.",
  },
];

const termsItems = [
  {
    title: "Loan Agreement",
    text: "By accepting the loan, you agree to repay the principal amount along with applicable interest in monthly installments (EMIs) as specified in your loan agreement.",
  },
  {
    title: "Platform Fee",
    text: "The ₹99 platform fee is non-refundable and must be paid before loan processing begins. It covers application processing, KYC verification, and credit assessment costs.",
  },
  {
    title: "Prepayment",
    text: "You may prepay the loan after 6 EMIs without penalty. Partial prepayment is allowed with a minimum of 2 EMI amounts.",
  },
  {
    title: "Default",
    text: "Non-payment of EMIs will attract penal interest @ 2% per month and may impact your CIBIL credit score. Consistent defaults may lead to legal recovery proceedings.",
  },
  {
    title: "Data Privacy",
    text: "Your personal and financial data is stored securely and will not be shared with third parties without your consent, except for credit bureau reporting.",
  },
  {
    title: "Governing Law",
    text: "These terms are governed by the laws of India. All disputes shall be subject to the jurisdiction of courts in Mumbai, Maharashtra.",
  },
];

const privacyItems = [
  {
    title: "Data We Collect",
    text: "Name, address, PAN, Aadhaar, income details, bank account information, and device/usage data for fraud prevention.",
  },
  {
    title: "How We Use It",
    text: "To process your loan application, verify your identity, assess creditworthiness, disburse funds, and provide customer support.",
  },
  {
    title: "Data Sharing",
    text: "We share your data with credit bureaus (CIBIL, Experian), our banking partners for disbursement, and regulatory authorities as required by law.",
  },
  {
    title: "Data Security",
    text: "All data is encrypted with 256-bit SSL. We comply with RBI data localization norms and the Information Technology Act, 2000.",
  },
  {
    title: "Your Rights",
    text: "You have the right to access, correct, or request deletion of your personal data by contacting support@brbiindialoan.in.",
  },
  {
    title: "Cookies",
    text: "We use essential cookies for session management and analytics cookies to improve our services. You can opt out of analytics cookies in your browser settings.",
  },
];

export default function DocumentationPage() {
  return (
    <div className="bg-white">
      <div className="py-12" style={{ backgroundColor: "#0F2A44" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5" style={{ color: "#D1A83A" }} />
              <span
                className="text-sm font-medium"
                style={{ color: "#CBD5E1" }}
              >
                Documentation
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              Loan Documentation &amp; Guide
            </h1>
            <p style={{ color: "#CBD5E1" }}>
              Everything you need to know about BRBI India Loan products and
              processes.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        <motion.section {...fadeUp}>
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(15,42,68,0.1)" }}
            >
              <User className="w-4 h-4" style={{ color: "#0F2A44" }} />
            </div>
            <h2
              className="font-heading text-2xl font-bold"
              style={{ color: "#111827" }}
            >
              Eligibility Criteria
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {eligibility.map((c) => (
              <div
                key={c.label}
                className="flex gap-3 p-4 rounded-xl"
                style={{
                  backgroundColor: "#F2F4F7",
                  border: "1px solid #E6E9EE",
                }}
              >
                <CheckCircle2
                  className="w-5 h-5 shrink-0 mt-0.5"
                  style={{ color: "#D1A83A" }}
                />
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#111827" }}
                  >
                    {c.label}
                  </p>
                  <p className="text-sm" style={{ color: "#4B5563" }}>
                    {c.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp}>
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(15,42,68,0.1)" }}
            >
              <FileText className="w-4 h-4" style={{ color: "#0F2A44" }} />
            </div>
            <h2
              className="font-heading text-2xl font-bold"
              style={{ color: "#111827" }}
            >
              Required Documents
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {docSections.map((doc) => (
              <Card
                key={doc.title}
                className="rounded-xl border"
                style={{ borderColor: "#E6E9EE" }}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p
                      className="font-heading font-semibold"
                      style={{ color: "#111827" }}
                    >
                      {doc.title}
                    </p>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: "rgba(209,168,58,0.15)",
                        color: "#C9A032",
                      }}
                    >
                      Mandatory
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {doc.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "#4B5563" }}
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: "#D1A83A" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ color: "#4B5563" }}>
            * Only 1 document from each category needs to be submitted. All
            documents must be self-attested.
          </p>
        </motion.section>

        <motion.section {...fadeUp}>
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(15,42,68,0.1)" }}
            >
              <Banknote className="w-4 h-4" style={{ color: "#0F2A44" }} />
            </div>
            <h2
              className="font-heading text-2xl font-bold"
              style={{ color: "#111827" }}
            >
              Loan Products Overview
            </h2>
          </div>
          <div
            className="overflow-x-auto rounded-xl border"
            style={{ borderColor: "#E6E9EE" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#0F2A44" }}>
                  {["Feature", "Personal Loan", "Instant Loan"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left font-semibold text-white"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr
                    key={row[0]}
                    style={{
                      backgroundColor: i % 2 === 0 ? "white" : "#F2F4F7",
                    }}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={`${row[0]}-col-${j}`}
                        className="px-5 py-3"
                        style={{
                          color: j === 0 ? "#111827" : "#4B5563",
                          fontWeight: j === 0 ? 600 : 400,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section {...fadeUp}>
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(15,42,68,0.1)" }}
            >
              <HelpCircle className="w-4 h-4" style={{ color: "#0F2A44" }} />
            </div>
            <h2
              className="font-heading text-2xl font-bold"
              style={{ color: "#111827" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            data-ocid="faq.panel"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="rounded-xl border px-4"
                style={{ borderColor: "#E6E9EE" }}
                data-ocid={`faq.item.${i + 1}`}
              >
                <AccordionTrigger
                  className="text-sm font-semibold text-left"
                  style={{ color: "#111827" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm"
                  style={{ color: "#4B5563" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.section>

        <motion.section {...fadeUp}>
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(15,42,68,0.1)" }}
            >
              <Shield className="w-4 h-4" style={{ color: "#0F2A44" }} />
            </div>
            <h2
              className="font-heading text-2xl font-bold"
              style={{ color: "#111827" }}
            >
              Terms &amp; Conditions Summary
            </h2>
          </div>
          <Card
            className="rounded-xl border"
            style={{ borderColor: "#E6E9EE" }}
          >
            <CardContent
              className="p-6 space-y-4 text-sm"
              style={{ color: "#4B5563" }}
            >
              {termsItems.map((item, i) => (
                <p key={item.title}>
                  <strong style={{ color: "#111827" }}>
                    {i + 1}. {item.title}:
                  </strong>{" "}
                  {item.text}
                </p>
              ))}
            </CardContent>
          </Card>
        </motion.section>

        <motion.section {...fadeUp}>
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(15,42,68,0.1)" }}
            >
              <AlertTriangle className="w-4 h-4" style={{ color: "#0F2A44" }} />
            </div>
            <h2
              className="font-heading text-2xl font-bold"
              style={{ color: "#111827" }}
            >
              Privacy Policy
            </h2>
          </div>
          <Card
            className="rounded-xl border"
            style={{ borderColor: "#E6E9EE" }}
          >
            <CardContent
              className="p-6 space-y-4 text-sm"
              style={{ color: "#4B5563" }}
            >
              {privacyItems.map((item) => (
                <p key={item.title}>
                  <strong style={{ color: "#111827" }}>{item.title}:</strong>{" "}
                  {item.text}
                </p>
              ))}
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
