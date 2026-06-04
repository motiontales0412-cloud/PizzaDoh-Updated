import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Products as ProductsSection, Certifications } from "@/components/site/sections";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Basic & Premium Pizza Dough | PIZZAD'OH" },
      { name: "description", content: "Frozen pizza dough in 200g, 250g, 300g, 450g. Basic Series (24–36h) and Premium Series (48–72h, 75% hydration)." },
      { property: "og:title", content: "PIZZAD'OH Products — Basic & Premium Pizza Dough" },
      { property: "og:description", content: "Frozen artisan pizza dough for restaurants. Long fermentation, premium ingredients, consistent quality." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SiteLayout>
      <section className="grain bg-cream pt-32 pb-12 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Our products</p>
          <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] text-primary">
            Two series.<br/><em className="font-light">Every kitchen covered.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/75">
            Choose Basic for high-volume QSR efficiency, or Premium for artisan
            depth of flavour. Both come portion-controlled and frozen.
          </p>
        </div>
      </section>
      <ProductsSection />
      <Certifications />
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl text-primary">Want to taste both?</h2>
          <Link to="/sample" className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground hover:bg-italian-green-deep">
            Request Free Sample →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
