import type { Metadata } from "next";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-[var(--border-radius-xl)] border border-[var(--color-border-tertiary)] p-8 bg-[var(--color-background-primary)]">
        <h1 className="text-[18px] font-medium text-[var(--color-text-primary)]">Create an account</h1>
        <p className="mt-2 text-[13px] text-[var(--color-text-secondary)]">
          Registration is reserved for institution-approved users.
        </p>
      </section>
    </main>
  );
}
