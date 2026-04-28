"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema, type NewsletterInput } from "@/lib/schemas";

interface NewsletterFormProps {
  placeholder?: string;
  ctaLabel?: string;
}

export function NewsletterForm({
  placeholder = "your@email.com",
  ctaLabel = "Subscribe",
}: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterInput) => {
    setStatus("submitting");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "newsletter" }),
      });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Check className="h-4 w-4 text-primary" />
        <span>Thanks — you&apos;re subscribed.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder={placeholder}
          className="flex-1"
          aria-label="Email address"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        <Button type="submit" size="sm" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            ctaLabel
          )}
        </Button>
      </div>
      {errors.email && (
        <p className="text-xs text-destructive" role="alert">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
