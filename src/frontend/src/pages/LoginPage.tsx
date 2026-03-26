import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { IndianRupee, Loader2, Lock, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  useEffect(() => {
    if (isLoggedIn) {
      navigate({ to: "/dashboard" });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center py-16 px-4"
      style={{ backgroundColor: "#F2F4F7" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div
          className="bg-white rounded-2xl shadow-card overflow-hidden"
          data-ocid="login.card"
        >
          <div className="h-2" style={{ backgroundColor: "#D1A83A" }} />
          <div className="p-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#0F2A44" }}
              >
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">
                <span style={{ color: "#D1A83A" }}>BRBI</span>
                <span style={{ color: "#0F2A44" }}> INDIA LOAN</span>
              </span>
            </div>
            <h1
              className="font-heading text-2xl font-bold text-center mb-1"
              style={{ color: "#111827" }}
            >
              Welcome Back
            </h1>
            <p
              className="text-sm text-center mb-8"
              style={{ color: "#4B5563" }}
            >
              Login or create your account securely using Internet Identity
            </p>
            <Button
              className="w-full h-12 text-base font-semibold text-white"
              style={{ backgroundColor: "#0F2A44" }}
              onClick={() => login()}
              disabled={isLoggingIn}
              data-ocid="login.submit_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Connecting...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Login / Register
                </>
              )}
            </Button>
            <div
              className="mt-6 flex items-start gap-3 p-4 rounded-xl"
              style={{ backgroundColor: "#F2F4F7" }}
            >
              <Shield
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: "#0F2A44" }}
              />
              <div className="text-xs" style={{ color: "#4B5563" }}>
                <strong className="block mb-0.5" style={{ color: "#111827" }}>
                  Secured by Internet Identity
                </strong>
                Your credentials are never stored on our servers. Login is
                cryptographically secured using blockchain identity.
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {["Bank-Grade Security", "No Passwords", "Privacy First"].map(
                (f) => (
                  <div key={f} className="text-center">
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#4B5563" }}
                    >
                      {f}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <p className="text-xs text-center mt-4" style={{ color: "#4B5563" }}>
          By logging in, you agree to our{" "}
          <a
            href="/documentation"
            className="underline"
            style={{ color: "#0F2A44" }}
          >
            Terms &amp; Conditions
          </a>{" "}
          and{" "}
          <a
            href="/documentation"
            className="underline"
            style={{ color: "#0F2A44" }}
          >
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
