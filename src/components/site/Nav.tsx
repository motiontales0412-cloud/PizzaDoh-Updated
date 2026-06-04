import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import React from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-tight text-primary">
            pizzad<span className="text-italian-red">'</span>oh
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 transition hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/sample"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition hover:bg-italian-green-deep hover:shadow-elegant"
          >
            Request Sample
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full bg-cream md:hidden"
        >
          <span className="text-charcoal">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-foreground/80"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/sample"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Request Sample →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
