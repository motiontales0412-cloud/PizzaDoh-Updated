import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { WhyUs, Certifications, Delivery } from "@/components/site/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PIZZAD'OH — Italian Craft, Indian Scale" },
      { name: "description", content: "We bring authentic Italian pizza dough craftsmanship to Indian restaurants — long fermentation, premium flour, cold-chain delivery." },
      { property: "og:title", content: "About PIZZAD'OH" },
      { property: "og:description", content: "Italian craftsmanship, B2B scale. The story behind India's premium frozen pizza dough." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="grain grain-strong bg-cream pt-32 pb-20 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Our story</p>
          <h1 className="mt-3 max-w-5xl font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.92] text-primary">
            Italian craft.<br/><em className="font-light">B2B scale.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-foreground/80">
            We started PIZZAD'OH after watching brilliant pizza concepts fail
            because of one bottleneck — dough. Inconsistent ferments, missed
            shifts, chefs who leave. So we built a bakery that does it once,
            properly, and ships it frozen to your kitchen at –18°C.
          </p>
        </div>
      </section>
      <WhyUs />
      <Delivery />
      <Certifications />
    </SiteLayout>
  );
}
