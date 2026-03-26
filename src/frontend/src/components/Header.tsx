import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { IndianRupee, LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Header() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Personal Loans", href: "/#personal" },
    { label: "Instant Loans", href: "/#instant" },
    { label: "How to Apply", href: "/#how-to-apply" },
    { label: "Documents", href: "/documentation" },
    { label: "Contact", href: "/#contact" },
  ];

  const handleLogin = async () => {
    if (isLoggedIn) {
      clear();
    } else {
      await login();
    }
  };

  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal
    ? `${principal.slice(0, 6)}...${principal.slice(-4)}`
    : "";

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "#0F2A44" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.link"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#D1A83A" }}
            >
              <IndianRupee className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-lg leading-tight">
              <span style={{ color: "#D1A83A" }}>BRBI</span>
              <span className="text-white"> INDIA LOAN</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-yellow-300"
                style={{ color: "#CBD5E1" }}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/dashboard" })}
                  className="text-sm font-medium px-3 py-1 rounded text-white hover:text-yellow-300 transition-colors"
                  data-ocid="nav.link"
                >
                  {shortPrincipal}
                </button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogin}
                  className="border-white/40 text-white hover:bg-white/10 hover:text-white"
                  data-ocid="nav.button"
                >
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate({ to: "/login" })}
                className="border-white/40 text-white hover:bg-white/10 hover:text-white"
                data-ocid="nav.button"
              >
                Login / Register
              </Button>
            )}
            <Button
              size="sm"
              onClick={() => navigate({ to: "/apply" })}
              className="font-semibold text-white"
              style={{ backgroundColor: "#D1A83A" }}
              data-ocid="nav.primary_button"
            >
              Apply Now
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: "#143A5C" }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium py-2 border-b border-white/10 text-white/80 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 mt-2">
                {isLoggedIn ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleLogin}
                    className="border-white/40 text-white flex-1"
                    data-ocid="nav.button"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigate({ to: "/login" });
                      setMobileOpen(false);
                    }}
                    className="border-white/40 text-white flex-1"
                    data-ocid="nav.button"
                  >
                    Login
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => {
                    navigate({ to: "/apply" });
                    setMobileOpen(false);
                  }}
                  className="flex-1 font-semibold text-white"
                  style={{ backgroundColor: "#D1A83A" }}
                  data-ocid="nav.primary_button"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
