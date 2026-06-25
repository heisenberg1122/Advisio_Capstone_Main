import type { Metadata } from "next";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--color-background-tertiary)" }}
    >
      <div
        className="w-full max-w-sm rounded-[var(--border-radius-xl)] border border-[var(--color-border-tertiary)] p-8"
        style={{ background: "var(--color-background-primary)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div
            className="w-8 h-8 rounded-[var(--border-radius-md)] flex items-center justify-center"
            style={{ background: "var(--color-background-info)" }}
          >
            <i className="ti ti-school text-base text-[var(--color-text-info)]" aria-hidden="true" />
          </div>
          <span className="font-semibold text-base text-[var(--color-text-primary)]">
            Advisio RMS
          </span>
        </div>

        <h1 className="text-[18px] font-medium mb-1 text-[var(--color-text-primary)]">
          Sign in
        </h1>
        <p className="text-[13px] text-[var(--color-text-secondary)] mb-6">
          Use your institutional account to continue
        </p>

        <div className="space-y-3">
          <button
            className="w-full btn flex items-center justify-center gap-2 py-2.5"
            aria-label="Sign in with Google"
          >
            <i className="ti ti-brand-google" aria-hidden="true" />
            Continue with Google
          </button>
          <button
            className="w-full btn flex items-center justify-center gap-2 py-2.5"
            aria-label="Sign in with Microsoft"
          >
            <i className="ti ti-brand-windows" aria-hidden="true" />
            Continue with Microsoft 365
          </button>
        </div>

        <p className="text-[11px] text-[var(--color-text-tertiary)] text-center mt-6">
          Access is restricted to registered university accounts.
        </p>
      </div>
    </div>
  );
}
