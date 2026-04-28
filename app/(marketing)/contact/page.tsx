import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Section, SectionHeader } from "@/components/sections/section";
import { Card, CardContent } from "@/components/ui/card";
import { DiscoveryCallForm } from "@/components/forms/discovery-call-form";
import { ContactForm } from "@/components/forms/contact-form";
import { FaqAccordion } from "@/components/sections/faq-accordion";

export const metadata: Metadata = {
  title: "Contact — Book a Discovery Call | BND Labs",
  description:
    "Book a free 30-minute discovery call with BND Labs. We'll audit your current lead flow and show you where the gaps are — no pitch, no pressure.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Office",
    value: "Lusaka, Zambia",
    detail: "By appointment only",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@bndlabs.co.zm",
    href: "mailto:hello@bndlabs.co.zm",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+260 97X XXX XXX",
    href: "tel:+26097XXXXXXX",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    detail: "Mon – Fri, 08:00 – 17:00 CAT",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <Section size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Get In Touch
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Let&apos;s Talk{" "}
            <span className="text-primary">Growth</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Book a free 30-minute discovery call. We&apos;ll audit your current
            lead flow and show you exactly where the gaps are — no pitch, no
            pressure.
          </p>
        </div>
      </Section>

      {/* Discovery Call Form */}
      <Section size="md" background="muted">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Book a Discovery Call
              </h2>
              <p className="mt-2 text-muted-foreground">
                Tell us about your business and we&apos;ll send you a calendar
                link within 24 hours.
              </p>
              <div className="mt-8">
                <DiscoveryCallForm />
              </div>
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Contact Info
              </h3>
              <div className="mt-6 space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium text-foreground">
                            {item.value}
                          </p>
                        )}
                        {item.detail && (
                          <p className="text-sm text-muted-foreground">
                            {item.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* What to expect */}
              <Card className="mt-8 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    What to Expect
                  </h3>
                  <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        1
                      </span>
                      <span>Submit the form — takes 2 minutes</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        2
                      </span>
                      <span>We review your details and send a calendar link</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        3
                      </span>
                      <span>
                        30-min call: we audit your lead flow and give you
                        actionable next steps
                      </span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* General Contact Form */}
      <Section size="md">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            eyebrow="General Inquiry"
            title="Or Just Send Us a Message"
            description="Not ready for a call? No problem. Drop us a message and we'll get back to you."
          />
          <ContactForm />
        </div>
      </Section>

      {/* FAQ */}
      <FaqAccordion
        faqs={[
          {
            question: "Is the discovery call really free?",
            answer:
              "Yes — 100% free, no strings attached. We use the call to understand your business and assess whether a growth system is the right fit. If it's not, we'll tell you honestly.",
          },
          {
            question: "How quickly will you respond?",
            answer:
              "We respond to all inquiries within 24 hours during business days (Monday–Friday, 08:00–17:00 CAT). Discovery call requests get priority.",
          },
          {
            question: "Can I just ask a question without booking a call?",
            answer:
              "Absolutely. Use the general contact form above and we'll reply by email. The discovery call is just the fastest way to get specific, actionable advice.",
          },
          {
            question: "What should I prepare for the discovery call?",
            answer:
              "Nothing specific — just come ready to talk about your business, your current lead sources, and where you want to grow. We'll handle the audit and recommendations.",
          },
        ]}
      />
    </>
  );
}
