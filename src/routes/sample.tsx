import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import doughBall from "@/assets/dough-ball.jpg";

export const Route = createFileRoute("/sample")({
  head: () => ({
    meta: [
      { title: "Request a Free Sample Pack — PIZZAD'OH" },
      { name: "description", content: "Get a free PIZZAD'OH sample pack — 20 dough balls, product guide, storage and baking instructions delivered to your kitchen." },
      { property: "og:title", content: "Free Sample Pack — PIZZAD'OH" },
      { property: "og:description", content: "Try before you commit. 20 dough balls, free, delivered." },
      { property: "og:url", content: "/sample" },
    ],
    links: [{ rel: "canonical", href: "/sample" }],
  }),
  component: SamplePage,
});

function SamplePage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="grain grain-strong bg-cream pt-32 pb-20 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.25em] text-italian-red">Free sample pack</p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] text-primary">
              Try before you<br/><em className="font-light">commit.</em>
            </h1>
            <p className="mt-6 max-w-md text-lg text-foreground/75">
              We'll cold-chain ship a complimentary pack to your kitchen so your
              chefs can taste the difference.
            </p>

            <ul className="mt-10 space-y-3">
              {["20 dough balls (mixed sizes)","Product spec sheet","Storage instructions","Baking & stretching guide"].map((x) => (
                <li key={x} className="flex items-center gap-3 text-foreground/85">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-xs font-bold text-charcoal">✓</span>
                  {x}
                </li>
              ))}
            </ul>

            <div className="mt-10 hidden overflow-hidden rounded-3xl shadow-card lg:block">
              <img src={doughBall} alt="Premium fermented dough ball" loading="lazy" width={1024} height={1024} className="h-72 w-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-3xl bg-card p-8 shadow-elegant lg:p-10"
            >
              {sent ? (
                <div className="py-20 text-center">
                  <p className="font-display text-4xl text-primary">Grazie mille!</p>
                  <p className="mt-3 text-foreground/70">Your sample request is in. Our team will reach out within 24 hours to confirm delivery details.</p>
                </div>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">Request form</p>
                  <h2 className="mt-2 font-display text-3xl text-primary">Tell us about your kitchen</h2>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <SField label="Business name" required />
                    <SField label="Contact person" required />
                    <SField label="Mobile number" type="tel" required />
                    <SField label="City" required />
                    <SField label="Delivery address" full />
                    <SField label="Monthly dough requirement" placeholder="e.g. 2,000 balls" full />
                    <div className="sm:col-span-2">
                      <button className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition hover:bg-italian-green-deep">
                        Send my free sample →
                      </button>
                      <p className="mt-3 text-center text-xs text-foreground/50">No commitments. No spam.</p>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SField({ label, type = "text", placeholder, required, full }: { label: string; type?: string; placeholder?: string; required?: boolean; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="block text-xs uppercase tracking-[0.18em] text-foreground/60">
        {label}{required && <span className="text-italian-red"> *</span>}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-input bg-cream px-4 py-3 text-foreground outline-none transition focus:border-primary"
      />
    </label>
  );
}
