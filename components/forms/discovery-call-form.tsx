"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  discoveryCallSchema,
  INDUSTRIES,
  BUDGET_RANGES,
  TIMELINES,
  type DiscoveryCallInput,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";

export function DiscoveryCallForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DiscoveryCallInput>({
    resolver: zodResolver(discoveryCallSchema),
  });

  const onSubmit = async (data: DiscoveryCallInput) => {
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "discovery-call" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Something went wrong");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
          Your discovery call request is in
        </h3>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll review your details and send a calendar link within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      aria-label="Discovery call form"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" htmlFor="dc-name" error={errors.name?.message}>
          <Input
            id="dc-name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field label="Email" htmlFor="dc-email" error={errors.email?.message}>
          <Input
            id="dc-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field label="Company" htmlFor="dc-company" error={errors.company?.message}>
          <Input
            id="dc-company"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            {...register("company")}
          />
        </Field>
        <Field
          label="Phone (optional)"
          htmlFor="dc-phone"
          error={errors.phone?.message}
        >
          <Input
            id="dc-phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Industry" htmlFor="dc-industry" error={errors.industry?.message}>
          <NativeSelect
            id="dc-industry"
            aria-invalid={!!errors.industry}
            {...register("industry")}
            defaultValue=""
          >
            <option value="" disabled>
              Select your industry
            </option>
            {INDUSTRIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field
          label="Budget range"
          htmlFor="dc-budget"
          error={errors.budget?.message}
        >
          <NativeSelect
            id="dc-budget"
            aria-invalid={!!errors.budget}
            {...register("budget")}
            defaultValue=""
          >
            <option value="" disabled>
              Select budget range
            </option>
            {BUDGET_RANGES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </NativeSelect>
        </Field>
      </div>

      <Field
        label="Timeline"
        htmlFor="dc-timeline"
        error={errors.timeline?.message}
      >
        <NativeSelect
          id="dc-timeline"
          aria-invalid={!!errors.timeline}
          {...register("timeline")}
          defaultValue=""
        >
          <option value="" disabled>
            When do you want to start?
          </option>
          {TIMELINES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </NativeSelect>
      </Field>

      <Field
        label="Tell us more (optional)"
        htmlFor="dc-message"
        error={errors.message?.message}
      >
        <Textarea
          id="dc-message"
          rows={4}
          placeholder="What's going on with your current lead flow? Any specific challenges?"
          {...register("message")}
        />
      </Field>

      {status === "error" && errorMsg && (
        <p className="text-sm text-destructive" role="alert">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request My Discovery Call"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const NativeSelect = ({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={cn(
      "flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
      className,
    )}
    {...props}
  />
);
