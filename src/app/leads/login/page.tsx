"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LeadsLoginPage() {
  return (
    <Suspense>
      <LeadsLogin />
    </Suspense>
  );
}

function LeadsLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/leads/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      const next = searchParams.get("next") || "/leads";
      router.push(next);
    } else {
      setError("Invalid password");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 380,
          padding: "48px 40px",
          background: "#fff",
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 500,
            textTransform: "uppercase" as const,
            letterSpacing: "0.15em",
            color: "rgba(0,0,0,0.30)",
            marginBottom: 8,
          }}
        >
          Internal Tool
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            margin: "0 0 8px",
          }}
        >
          Leads Database
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "rgba(0,0,0,0.50)",
            margin: "0 0 32px",
            letterSpacing: "-0.01em",
          }}
        >
          ERP Migration Consultancies
        </p>

        <label
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase" as const,
            letterSpacing: "0.12em",
            color: "rgba(0,0,0,0.40)",
            marginBottom: 8,
          }}
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          autoFocus
          style={{
            width: "100%",
            padding: "16px 18px",
            fontSize: 15,
            fontFamily: "inherit",
            border: "1.5px solid rgba(0,0,0,0.10)",
            background: "#fafafa",
            outline: "none",
            marginBottom: error ? 8 : 24,
            letterSpacing: "-0.01em",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#000")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
        />

        {error && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#DC2626",
              marginBottom: 24,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          style={{
            width: "100%",
            padding: "20px 32px",
            background: loading || !password ? "rgba(0,0,0,0.30)" : "#000",
            color: "#fff",
            border: "2px solid #000",
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
            cursor: loading || !password ? "default" : "pointer",
            fontFamily: "inherit",
          }}
        >
          {loading ? "Authenticating..." : "Access Leads"}
        </button>
      </form>
    </div>
  );
}
