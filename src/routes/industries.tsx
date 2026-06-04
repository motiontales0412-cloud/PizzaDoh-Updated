import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Industries as IndustriesSection, LaunchProgram, SampleCTA } from "@/components/site/sections";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — PIZZAD'OH" },
      { name: "description", content: "Frozen pizza dough for cafes, restaurants, cloud kitchens, pizza chains, hotels, caterers, food courts and franchise brands." },
      { property: "og:title", content: "Industries We Serve — PIZZAD'OH" },
      { property: "og:description", content: "We supply pizza dough to every kind of food business across India." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <SiteLayout>
      <section className="grain bg-cream pt-32 pb-12 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-italian-red">Industries</p>
          <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] text-primary">
            One dough.<br/><em className="font-light">Every format.</em>
          </h1>
        </div>
      </section>
      <IndustriesSection />
      <LaunchProgram />
      <SampleCTA />
    </SiteLayout>
  );
}
