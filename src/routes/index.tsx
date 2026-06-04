import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import {
  Hero, LogosMarquee, Problem, Solution, Products, HowItWorks,
  Impact, WhyUs, Testimonials, Industries, LaunchProgram, Delivery,
  Certifications, SampleCTA,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PIZZAD'OH — Authentic Italian Pizza Dough for Restaurants" },
      { name: "description", content: "Long-fermented frozen pizza dough for cafes, cloud kitchens, restaurants and pizza brands across India. FSSAI certified. Free sample." },
      { property: "og:title", content: "PIZZAD'OH — Authentic Italian Pizza Dough for Restaurants" },
      { property: "og:description", content: "Long-fermented frozen pizza dough for cafes, cloud kitchens and restaurants. Request a free sample pack." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "keywords", content: "frozen pizza dough supplier India, pizza dough manufacturer, frozen Neapolitan dough, B2B pizza dough supplier, cloud kitchen pizza supplier, ready to bake pizza dough, artisan pizza dough India" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "PIZZAD'OH",
        description: "Authentic Italian frozen pizza dough for B2B — cafes, cloud kitchens, restaurants.",
        url: "/",
        areaServed: ["Delhi","Noida","Gurgaon","Ghaziabad","Faridabad"],
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      {/* <LogosMarquee /> */}
      <Problem />
      <Solution />
      <Products />
      <HowItWorks />
      <Impact />
      <WhyUs />
      <Testimonials />
      <Industries />
      <LaunchProgram />
      <Delivery />
      <Certifications />
      <SampleCTA />
    </SiteLayout>
  );
}
