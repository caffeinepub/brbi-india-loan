import { Link } from "@tanstack/react-router";
import {
  Facebook,
  IndianRupee,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer style={{ backgroundColor: "#0F2A44" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#D1A83A" }}
              >
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-lg">
                <span style={{ color: "#D1A83A" }}>BRBI</span>
                <span className="text-white"> INDIA LOAN</span>
              </span>
            </div>
            <p className="text-sm" style={{ color: "#CBD5E1" }}>
              India's trusted digital lending platform. Fast, transparent, and
              secure personal &amp; instant loans.
            </p>
            <div className="flex gap-3 mt-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  role="img"
                  aria-label={label}
                  className="hover:opacity-80 transition-opacity cursor-default"
                  style={{ color: "#CBD5E1" }}
                >
                  <Icon className="w-5 h-5" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm" style={{ color: "#CBD5E1" }}>
              {["About Us", "Careers", "Press", "Blog"].map((item) => (
                <li key={item}>
                  <span className="cursor-default hover:text-white transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm" style={{ color: "#CBD5E1" }}>
              <li>
                <Link
                  to="/documentation"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/documentation"
                  className="hover:text-white transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              {["Grievance Redressal", "Fair Practices Code"].map((item) => (
                <li key={item}>
                  <span className="cursor-default hover:text-white transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div id="contact">
            <h4 className="font-semibold text-white mb-3">Contact Us</h4>
            <ul className="space-y-3 text-sm" style={{ color: "#CBD5E1" }}>
              <li className="flex items-center gap-2">
                <Phone
                  className="w-4 h-4 shrink-0"
                  style={{ color: "#D1A83A" }}
                />
                1800-123-4567 (Toll Free)
              </li>
              <li className="flex items-center gap-2">
                <Mail
                  className="w-4 h-4 shrink-0"
                  style={{ color: "#D1A83A" }}
                />
                support@brbiindialoan.in
              </li>
            </ul>
            <p className="mt-4 text-xs" style={{ color: "#CBD5E1" }}>
              Mon–Sat: 9:00 AM – 6:00 PM IST
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs" style={{ color: "#CBD5E1" }}>
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-center" style={{ color: "#CBD5E1" }}>
            BRBI India Loan is a registered NBFC. RBI Reg. No. XXXXXXXX. Loans
            subject to credit approval. Platform fee of ₹9 is non-refundable.
          </p>
        </div>
      </div>
    </footer>
  );
}
