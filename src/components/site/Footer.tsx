import { Link } from "@tanstack/react-router";
import React from "react";

export function Footer() {
  return (
    <footer className="grain bg-italian-green-deep text-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="font-display text-4xl font-medium leading-none">
              pizzad<span className="text-gold">'</span>oh
            </h3>
            <p className="mt-4 max-w-sm text-cream/70">
              Authentic Italian dough. Ready for business. Long-fermented frozen
              pizza dough for restaurants, cloud kitchens and cafes.
            </p>
            <div className="mt-8 flex gap-3">
              {["Instagram", "LinkedIn", "WhatsApp"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-full border border-cream/20 px-4 py-2 text-xs uppercase tracking-widest text-cream/80 transition hover:border-gold hover:text-gold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <FCol title="Company" links={[["About Us", "/about"], ["Contact", "/contact"], ["Industries", "/industries"]]} />
            <FCol title="Products" links={[["Basic Series", "/products"], ["Premium Series", "/products"], ["Sample Pack", "/sample"]]} />
            <FCol title="Contact" links={[["hello@pizzadoh.in", "mailto:hello@pizzadoh.in"], ["+91 98000 00000", "tel:+919800000000"], ["Delhi NCR, India", "#"]]} />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-8 text-sm text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} PIZZAD'OH Foods Pvt Ltd. Crafted in India.</p>
          <p className="flex items-center gap-4">
            <span>FSSAI Certified</span>
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <span>HACCP Compliant</span>
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <span>ISO 22000 Ready</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-gold">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
        {links.map(([label, href]) => (
          <li key={label}>
            {href.startsWith("/") ? (
              <Link to={href} className="transition hover:text-gold">{label}</Link>
            ) : (
              <a href={href} className="transition hover:text-gold">{label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
