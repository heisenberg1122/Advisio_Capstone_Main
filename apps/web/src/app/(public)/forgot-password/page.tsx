import type { Metadata } from "next";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-[var(--border-radius-xl)] border border-[var(--color-border-tertiary)] p-8 bg-[var(--color-background-primary)]">
        <h1 className="text-[18px] font-medium text-[var(--color-text-primary)]">Reset your password</h1>
        <p className="mt-2 text-[13px] text-[var(--color-text-secondary)]">
          Password reset will be wired to the auth provider in a later step.
        </p>
      </section>
    </main>
  );
}
