"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeader } from "@/components/sections/section";
import { ScrollReveal } from "@/components/scroll-reveal";

interface FaqItem {
  question: string;
  answer: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: "How is BND Labs different from other agencies?",
    answer:
      "We don't sell services — we build systems. Most agencies charge you monthly for social posts or ads. We architect the entire lead generation infrastructure so your growth becomes predictable and independent of freelancer hours.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We specialize in established Zambian businesses in healthcare (private clinics), hospitality (lodges, hotels, restaurants), and education (private schools). These industries share similar lead qualification and follow-up patterns that our systems are optimized for.",
  },
  {
    question: "How long until I see results?",
    answer:
      "The Growth Starter takes 2–3 weeks to launch your foundation. The Retainer typically delivers visible lead-flow improvements within 30–60 days. Compounding results come in months 3–6 as your system optimizes.",
  },
  {
    question: "Do I need to know anything technical?",
    answer:
      "No. Our job is to handle the infrastructure so you can focus on running your business. We provide clear monthly reports and strategy sessions so you always understand what's working and why.",
  },
  {
    question: "Can I upgrade from Starter to Retainer?",
    answer:
      "Yes — most clients do within 30–60 days. The Starter gives you the foundation; the Retainer runs your growth engine every month. You only upgrade when you're ready for consistent lead flow.",
  },
  {
    question: "What happens if I cancel the Retainer?",
    answer:
      "The minimum commitment is 3 months. After that, you can pause or cancel with 30 days' notice. Your infrastructure (website, CRM, content) remains yours — we hand over everything.",
  },
  {
    question: "Do you work with businesses outside Zambia?",
    answer:
      "Our systems are designed for the Zambian market, but we're occasionally open to regional clients in Southern Africa. Reach out for a discovery call — we'll tell you honestly if we're a fit.",
  },
];

interface FaqAccordionProps {
  faqs?: FaqItem[];
}

export function FaqAccordion({ faqs = defaultFaqs }: FaqAccordionProps) {
  return (
    <Section size="lg">
      <SectionHeader
        eyebrow="FAQ"
        title="Questions? We've Got Answers."
        description="Everything you need to know before booking a discovery call."
      />
      <ScrollReveal stagger={false} className="mx-auto max-w-3xl">
        <Accordion>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="py-5 text-base font-semibold sm:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </Section>
  );
}
