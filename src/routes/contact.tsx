import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact PIZZAD'OH — Talk to Sales" },
      { name: "description", content: "Talk to PIZZAD'OH about bulk pizza dough supply for your restaurant, cafe, cloud kitchen or chain." },
      { property: "og:title", content: "Contact PIZZAD'OH" },
      { property: "og:description", content: "Get in touch for bulk pizza dough supply across India." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="grain bg-cream pt-32 pb-20 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Contact</p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] text-primary">
              Let's get<br/><em className="font-light">cooking.</em>
            </h1>
            <p className="mt-6 max-w-md text-lg text-foreground/75">
              Bulk orders, partnerships, pizza launch programs — our team usually
              responds within one business day.
            </p>

            <div className="mt-12 space-y-6">
              <Detail label="Email" value="hello@pizzadoh.in" href="mailto:hello@pizzadoh.in" />
              <Detail label="Phone" value="+91 98000 00000" href="tel:+919800000000" />
              <Detail label="WhatsApp" value="Chat with us" href="https://wa.me/919800000000" />
              <Detail label="Studio" value="Okhla Industrial Area, New Delhi" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Detail({ label, value, href }: { label: string; value: string; href?: string }) {
  const Content = (
    <>
      <p className="text-xs uppercase tracking-[0.25em] text-gold">{label}</p>
      <p className="mt-1 font-display text-xl text-primary">{value}</p>
    </>
  );
  return href ? (
    <a href={href} className="block border-l border-gold/40 pl-4 transition hover:border-gold">{Content}</a>
  ) : (
    <div className="border-l border-gold/40 pl-4">{Content}</div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="rounded-3xl bg-card p-8 shadow-card lg:p-10"
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
    >
      {sent ? (
        <div className="py-16 text-center">
          <p className="font-display text-3xl text-primary">Grazie!</p>
          <p className="mt-3 text-foreground/70">We've received your enquiry and will respond within one business day.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Business name" name="business" required />
          <Field label="Contact person" name="name" required />
          <Field label="Mobile number" name="phone" type="tel" required />
          <Field label="City" name="city" required />
          <Field label="Monthly dough requirement" name="qty" placeholder="e.g. 2,000 balls" full />
          <Field label="Message" name="message" textarea full />
          <div className="sm:col-span-2">
            <button className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition hover:bg-italian-green-deep sm:w-auto">
              Send enquiry →
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  label, name, type = "text", placeholder, required, full, textarea,
}: { label: string; name: string; type?: string; placeholder?: string; required?: boolean; full?: boolean; textarea?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="block text-xs uppercase tracking-[0.18em] text-foreground/60">
        {label}{required && <span className="text-italian-red"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          className="mt-2 w-full rounded-xl border border-input bg-cream px-4 py-3 text-foreground outline-none transition focus:border-primary"
          placeholder={placeholder}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="mt-2 w-full rounded-xl border border-input bg-cream px-4 py-3 text-foreground outline-none transition focus:border-primary"
        />
      )}
    </label>
  );
}
