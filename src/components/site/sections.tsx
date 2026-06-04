import { Link } from "@tanstack/react-router";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useMemo, useRef, useState } from "react";
import doughBall from "@/assets/dough-ball.jpg";
import handsStretching from "@/assets/hands-stretching.jpg";
import heroDough from "@/assets/hero-dough.jpg";
import pizzaFinished from "@/assets/pizza-finished.jpg";
import { cn } from "@/lib/utils";

type Direction = "left" | "right";

const revealEase = [0.16, 1, 0.3, 1] as const;

function useCountUp(value: number, start: boolean, delay = 0, duration = 1400) {
  const [display, setDisplay] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let timeout = 0;

    timeout = window.setTimeout(() => {
      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
      };

      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [delay, duration, reduceMotion, start, value]);

  return display;
}

function useGsapScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (reduceMotion) {
      setProgress(1);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, [reduceMotion]);

  return { ref, progress };
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}


function AlternatingSection({
  id,
  eyebrow,
  title,
  emphasis,
  body,
  direction,
  tone = "cream",
  visual,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  body: string;
  direction: Direction;
  tone?: "cream" | "beige";
  visual?: React.ReactNode;
  children: React.ReactNode;
}) {
  const isLeft = direction === "left";
  const x = isLeft ? -100 : 100;

  return (
    <motion.section
      id={id}
      className={cn(
        "premium-section grain overflow-hidden py-24 lg:py-32",
        tone === "cream" ? "bg-cream" : "bg-beige",
      )}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.95, ease: revealEase }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:px-10">
        <div className={cn("lg:col-span-5", isLeft ? "lg:order-1" : "lg:order-2")}>
          <p
            className={cn(
              "text-xs uppercase tracking-[0.25em]",
              tone === "cream" ? "text-gold" : "text-italian-red",
            )}
          >
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] text-primary">
            {title}
            <br />
            <em className="font-light">{emphasis}</em>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">{body}</p>
          {visual}
        </div>
        <div className={cn("lg:col-span-7", isLeft ? "lg:order-2" : "lg:order-1")}>{children}</div>
      </div>
    </motion.section>
  );
}

function Metric({
  value,
  suffix,
  label,
  delay,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  start: boolean;
}) {
  const count = useCountUp(value, start, delay);

  return (
    <motion.div
      className="glass-panel bg-charcoal/70 p-8 text-cream shadow-[0_30px_90px_-45px_rgba(0,0,0,0.9)]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: revealEase }}
    >
      <p className="font-display text-6xl leading-none text-gold">
        {count}
        {suffix}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-cream/75">{label}</p>
    </motion.div>
  );
}

function MagneticCta({
  children,
  to,
  dark = false,
}: {
  children: React.ReactNode;
  to: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduceMotion = useReducedMotion();

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.2;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <Link
      ref={ref}
      to={to}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "premium-cta inline-flex w-full will-change-transform items-center justify-center rounded-full px-7 py-4 text-base font-semibold transition duration-500 sm:w-auto",
        dark
          ? "bg-gold text-charcoal shadow-[0_0_38px_rgba(180,138,74,0.28)] hover:bg-gold-soft"
          : "bg-primary text-primary-foreground shadow-elegant hover:bg-italian-green-deep",
      )}
    >
      {children}
    </Link>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.35 });
  const contentScale = useTransform(smooth, [0, 1], isDesktop ? [1.15, 1] : [1, 1]);
  const contentOpacity = useTransform(smooth, [0, 0.85], [1, 0.28]);
  const meshY = useTransform(smooth, [0, 1], [0, -85]);
  const imageY = useTransform(smooth, [0, 1], [0, -42]);

  return (
    <section
      ref={ref}
      className="hero-cinema relative flex min-h-screen overflow-hidden bg-cream pt-24 text-foreground sm:pt-28"
    >
      <motion.div
        className="premium-mesh pointer-events-none absolute inset-0"
        style={reduceMotion ? undefined : { y: meshY }}
      />
      <div className="noise-overlay pointer-events-none absolute inset-0" />
      <motion.div
       className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10"
        style={
          reduceMotion ? undefined : { scale: contentScale, opacity: isDesktop ? contentOpacity : 1 }
        }
      >
        <div className="lg:col-span-7">
          <p className="inline-flex max-w-full items-center gap-3 rounded-full border border-gold/35 bg-cream/70 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-gold shadow-card backdrop-blur-xl sm:text-xs sm:tracking-[0.22em]">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Crafted in Italy. Made for India.
          </p>
           <h1 className="mt-7 max-w-5xl text-balance font-display text-[clamp(2.85rem,15vw,7.4rem)] font-semibold leading-[0.9] text-primary sm:text-[clamp(3.3rem,8vw,7.4rem)] sm:leading-[0.88]">
            Authentic Italian pizza dough for serious kitchens.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-charcoal/72 md:text-xl">
            Long-fermented frozen dough engineered for restaurants, cloud kitchens and pizza brands
            that need premium consistency without daily production drag.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <MagneticCta to="/sample">Request Free Sample</MagneticCta>
            <Link
              to="/contact"
              className="inline-flex w-full justify-center rounded-full border border-foreground/15 bg-cream/55 px-7 py-4 text-base font-semibold text-foreground backdrop-blur-xl transition hover:border-primary hover:text-primary sm:w-auto"
            >
              Talk to Sales
            </Link>
          </div>
        </div>

        <motion.div
          className="relative lg:col-span-5"
           style={reduceMotion || !isDesktop ? undefined : { y: imageY }}
        >
          <div className="glass-panel overflow-hidden p-2 shadow-[0_34px_120px_-50px_rgba(15,59,46,0.65)]">
            <img
              src={heroDough}
              alt="Long-fermented artisan pizza dough ball being stretched by hand"
              className="aspect-[4/5] w-full rounded-[1.25rem] object-cover"
              width={1280}
              height={1600}
            />
          </div>
          <div className="glass-panel absolute -bottom-7 left-4 hidden max-w-[15rem] p-5 text-sm text-charcoal/75 shadow-card sm:block">
            <p className="font-display text-3xl text-primary">87%</p>
            <p className="mt-1">
              Operational compatibility across trained and untrained kitchen teams.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function LogosMarquee() {
  const names = [
    "Trattoria Nove",
    "Forno Rosso",
    "Cloud Crust",
    "La Cucina",
    "Sliced",
    "Nonna's",
    "Pizzeria Vero",
    "Brick & Fire",
  ];

  return (
    <section className="border-y border-border/60 bg-cream py-8 overflow-hidden">
      <p className="mx-auto mb-6 max-w-7xl px-6 text-center text-xs uppercase tracking-[0.3em] text-foreground/50 lg:px-10">
        Powering pizza programs across India
      </p>
      <div className="flex animate-marquee gap-16 whitespace-nowrap">
        {[...names, ...names].map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="font-display text-2xl font-medium text-foreground/40"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Problem() {
  const pains = [
    ["Staff dependency", "Skilled dough chefs are scarce, expensive and hard to retain."],
    ["Dough inconsistency", "Hydration and fermentation vary batch to batch."],
    ["Fermentation failures", "Over- or under-proofed dough kills service nights."],
    ["Labour costs", "2-3 staff dedicated to dough every single day."],
  ];

  return (
    <AlternatingSection
      eyebrow="The problem"
      title="Stop wasting time"
      emphasis="making dough daily."
      body="Dough is the bottleneck no one talks about. It quietly drains hours, hires and floor space while your team chases service."
      direction="left"
      tone="beige"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {pains.map(([title, body], index) => (
          <motion.article
            key={title}
            className="glass-panel min-h-[13rem] p-7 shadow-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: revealEase }}
          >
            <span className="text-xs uppercase tracking-[0.24em] text-italian-red">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 font-display text-2xl font-medium text-primary">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">{body}</p>
          </motion.article>
        ))}
      </div>
    </AlternatingSection>
  );
}

export function Solution() {
  const benefits = [
    ["Long fermentation", "24-72 hour cold fermentation for flavor and digestibility."],
    ["Consistent quality", "Every dough ball performs identically across outlets and shifts."],
    ["Faster service", "Thaw, stretch, top, bake. Ready in minutes during peak rush."],
    ["Better profitability", "Lower wastage, lower labour, predictable food cost per pizza."],
  ];

  return (
    <AlternatingSection
      eyebrow="The solution"
      title="Focus on selling pizza."
      emphasis="We'll handle the dough."
      body="A frozen dough program with restaurant-grade fermentation, controlled hydration and practical kitchen workflows."
      direction="right"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {benefits.map(([title, body], index) => (
          <motion.article
            key={title}
            className="group glass-panel p-7 shadow-card transition hover:-translate-y-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, delay: index * 0.07, ease: revealEase }}
          >
            <div className="gold-rule mb-6 w-14 transition group-hover:w-20" />
            <h3 className="font-display text-2xl font-medium text-primary">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">{body}</p>
          </motion.article>
        ))}
      </div>
    </AlternatingSection>
  );
}

export function Products() {
  const cards = [
    {
      series: "Series 01",
      name: "Basic Series",
      badge: "High volume",
      fermentation: "24-36h",
      hydration: "60%",
      ideal: ["Cafes", "QSRs", "High-volume kitchens"],
    },
    {
      series: "Series 02",
      name: "Premium Series",
      badge: "Signature",
      fermentation: "48-72h",
      hydration: "75%",
      ideal: ["Artisan pizza brands", "Premium restaurants", "Gourmet cafes"],
    },
    {
      series: "Format",
      name: "Portion Range",
      badge: "Ready to scale",
      fermentation: "200-450g",
      hydration: "8-14 inch",
      ideal: ["Menu testing", "Multi-outlet SOPs", "Cold-chain planning"],
    },
  ];

  return (
    <section
      id="products"
      className="relative overflow-clip bg-italian-green-deep py-24 text-cream lg:py-32"
    >
      <div className="premium-dark-mesh pointer-events-none absolute inset-0" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">The product</p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] text-cream">
            Dough solutions for
            <br />
            <em className="font-light text-gold">every</em> pizza business.
          </h2>
        </div>

        <div className="mt-12 space-y-6 pb-0 lg:mt-16 lg:space-y-[-4rem] lg:pb-20">
          {cards.map((card, index) => (
            <motion.article
              key={card.name}
              className="product-sticky-card glass-panel relative min-h-0 p-6 text-cream shadow-[0_40px_140px_-70px_rgba(0,0,0,0.95)] sm:p-8 lg:sticky lg:min-h-[28rem] lg:p-10"
              style={{ top: `calc(6rem + ${index * 1.25}rem)`, zIndex: index + 1 }}
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 - index * 0.015 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, ease: revealEase }}
            >
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">{card.series}</p>
                   <h3 className="mt-3 font-display text-[clamp(2.1rem,10vw,3rem)] font-medium leading-none sm:text-5xl">
                    {card.name}
                  </h3>
                </div>
                <span className="rounded-full border border-cream/20 bg-cream/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cream/80 backdrop-blur-xl">
                  {card.badge}
                </span>
              </div>
              <div className="mt-8 grid gap-5 border-y border-cream/12 py-6 sm:grid-cols-2 lg:mt-10 lg:py-8">
                <div>
                  <p className="font-display text-[clamp(2.25rem,11vw,3rem)] leading-none text-gold">
                    {card.fermentation}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-cream/55">
                    Fermentation
                  </p>
                </div>
                <div>
                   <p className="font-display text-[clamp(2.25rem,11vw,3rem)] leading-none text-gold">
                    {card.hydration}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-cream/55">
                    Spec range
                  </p>
                </div>
              </div>
              <ul className="mt-8 flex flex-wrap gap-3">
                {card.ideal.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-cream/10 px-4 py-2 text-sm text-cream/82"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = useMemo(
    () => [
      ["01", "Keep Frozen", "Receive in our cold chain. Store at -18 C until you need it."],
      ["02", "Thaw & Proof", "Move balls to chiller overnight. Pull to room temp before service."],
      [
        "03",
        "Stretch & Top",
        "Hand-stretch on flour. Add sauce, mozzarella and your signature toppings.",
      ],
      ["04", "Bake & Serve", "Wood-fired, deck or conveyor. Fresh Neapolitan pizza in minutes."],
    ],
    [],
  );
  const { ref, progress } = useGsapScrollProgress<HTMLElement>();
  const activeStep = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  return (
    <section ref={ref} className="relative bg-cream py-24 lg:min-h-[240vh] lg:py-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:sticky lg:top-0 lg:min-h-screen lg:grid-cols-12 lg:items-center lg:px-10">
        <div className="lg:col-span-5">
          <div className="glass-panel overflow-hidden p-2 shadow-card">
            <img
              src={handsStretching}
              alt="Pizzaiolo hands stretching dough on marble"
              loading="lazy"
              width={1600}
              height={1024}
              className="aspect-[4/5] w-full rounded-[1.25rem] object-cover lg:aspect-[4/5]"
            />
          </div>
        </div>
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">The process</p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] text-primary">
            Fresh Neapolitan
            <br />
            <em className="font-light">in minutes.</em>
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.35rem_1fr]">
            <div className="hidden overflow-hidden rounded-full bg-border lg:block">
              <motion.div
                className="w-full rounded-full bg-gold"
                style={{ height: `${Math.max(progress * 100, 8)}%` }}
              />
            </div>
            <ol className="space-y-5">
              {steps.map(([number, title, body], index) => {
                const complete = index < activeStep;
                const active = index === activeStep;

                return (
                  <li
                    key={number}
                    className={cn(
                      "glass-panel flex gap-5 p-6 transition duration-500",
                      active && "scale-[1.025] border-gold/45 shadow-elegant",
                      complete && "bg-gold/12",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-4xl font-light",
                        complete || active ? "text-gold" : "text-primary/35",
                      )}
                    >
                      {number}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-medium text-primary">{title}</h3>
                      <p className="mt-2 max-w-md text-foreground/72">{body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Impact() {
  const ref = useRef<HTMLElement | null>(null);
  const visible = useInView(ref, { once: true, amount: 0.35 });
  const stats = [
    [40, "%", "Saved on dough production costs"],
    [80, "%", "Less labour dependency for pizza"],
    [3, "x", "Peak hour output per kitchen"],
    [0, "", "Dough wasted, portion controlled"],
  ] as const;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden grain bg-charcoal py-24 text-cream lg:py-32"
    >
      <div className="premium-dark-mesh pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Business impact</p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1]">
            Numbers that
            <br />
            <em className="font-light text-gold">move the menu.</em>
          </h2>
        </div>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, suffix, label], index) => (
            <Metric
              key={label}
              value={value}
              suffix={suffix}
              label={label}
              delay={index * 140}
              start={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const items = [
    ["Authentic Italian Process", "Tipo 00 flour, biga starter, slow cold ferment."],
    ["Long Fermentation", "Up to 72 hours for digestibility and depth of flavor."],
    ["Premium Ingredients", "European flour, extra virgin olive oil, sea salt."],
    ["Consistent Results", "Lab-controlled hydration, weight and temperature."],
    ["Food Safety Standards", "FSSAI, HACCP, ISO 22000, fully traceable."],
    ["Reliable Cold Chain", "-18 C distribution, monitored end to end."],
  ];

  return (
    <AlternatingSection
      eyebrow="Why us"
      title="Built like a bakery."
      emphasis="Run like a brand."
      body="Premium food manufacturing discipline, translated into a practical operating system for every pizza shift."
      direction="left"
      tone="beige"
      visual={
        <img
          src={doughBall}
          alt="Macro view of fermented pizza dough"
          loading="lazy"
          width={1024}
          height={1024}
          className="mt-8 aspect-square w-full max-w-md rounded-[1.5rem] object-cover shadow-card"
        />
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {items.map(([title, body], index) => (
          <motion.article
            key={title}
            className="glass-panel p-6 shadow-card"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, delay: index * 0.06, ease: revealEase }}
          >
            <div className="gold-rule mb-5 w-12" />
            <h3 className="font-display text-xl font-medium text-primary">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">{body}</p>
          </motion.article>
        ))}
      </div>
    </AlternatingSection>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLElement | null>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const speeds = [
    useTransform(scrollYProgress, [0, 1], [42, -34]),
    useTransform(scrollYProgress, [0, 1], [-20, 30]),
    useTransform(scrollYProgress, [0, 1], [54, -48]),
  ];
  const reviews = [
    [
      "We replaced our entire dough station overnight. Our pizza is more consistent than it has ever been, and we run a leaner kitchen.",
      "Aanya Mehta",
      "Founder, Trattoria Nove",
      "New Delhi",
    ],
    [
      "The Premium Series tastes like 72-hour dough because it is. Our chefs were skeptical for a week. Now they will not go back.",
      "Rohan Kapoor",
      "Executive Chef, Forno Rosso",
      "Gurgaon",
    ],
    [
      "We launched 4 cloud-kitchen pizza brands in a month. PIZZAD'OH made it possible with supply, recipes and training in one package.",
      "Priya Shah",
      "Operations, Cloud Crust",
      "Noida",
    ],
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">Tasted. Tested. Trusted.</p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] text-primary">
          What kitchens are
          <br />
          <em className="font-light">saying.</em>
        </h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {reviews.map(([quote, name, role, city], index) => (
            <motion.figure
              key={name}
              className="glass-panel flex h-full flex-col p-8 shadow-card"
              style={isDesktop ? { y: speeds[index] } : undefined}
              whileHover={{ scale: 1.025, y: 0 }}
              transition={{ duration: 0.45, ease: revealEase }}
            >
              <span className="font-display text-6xl leading-none text-gold">"</span>
              <blockquote className="mt-2 flex-1 font-display text-xl font-normal leading-snug text-charcoal">
                {quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-5">
                <p className="font-semibold text-primary">{name}</p>
                <p className="text-sm text-foreground/60">
                  {role} / {city}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  const items = [
    "Cafes",
    "Restaurants",
    "Cloud Kitchens",
    "Pizza Chains",
    "Hotels",
    "Caterers",
    "Food Courts",
    "Franchise Brands",
  ];

  return (
    <section className="grain bg-beige py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-italian-red">Industries</p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] text-primary">
            Built for every
            <br />
            <em className="font-light">pizza program.</em>
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <motion.div
              key={item}
              className="glass-panel group p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant sm:p-7"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.045, ease: revealEase }}
            >
               <p className="font-display text-[clamp(1.35rem,7vw,1.5rem)] font-medium leading-tight text-primary">
                {item}
              </p>
              <p className="mt-2 text-sm text-foreground/60 transition group-hover:text-primary">
                Designed for scale
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LaunchProgram() {
  const services = [
    "Dough Supply",
    "Pizza Recipes",
    "Staff Training",
    "Oven Guidance",
    "Menu Consultation",
    "WhatsApp Support",
  ];
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spotlightY = useTransform(scrollYProgress, [0, 1], ["18%", "82%"]);
  const spotlightBackground = useTransform(
    spotlightY,
    (y) => `radial-gradient(circle at 68% ${y}, rgba(180,138,74,0.28), transparent 34rem)`,
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary py-24 text-cream lg:py-32">
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlightBackground }}
      />
      <motion.div
        className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: revealEase }}
      >
        <div className="lg:col-span-6">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Pizza launch program</p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1]">
            Launch your pizza
            <br />
            business <em className="font-light text-gold">faster.</em>
          </h2>
          <p className="mt-6 max-w-md text-lg text-cream/80">
            Perfect for new cafes and cloud kitchens launching pizza. We supply the dough, recipes,
            training and stay on call.
          </p>
          <div className="mt-10">
            <MagneticCta to="/contact" dark>
              Talk to our team
            </MagneticCta>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
          {services.map((service, index) => (
            <motion.li
              key={service}
              className="glass-panel flex items-baseline gap-4 bg-italian-green-deep/58 p-5 text-cream sm:p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: revealEase }}
            >
              <span className="font-display text-sm text-gold">0{index + 1}</span>
               <span className="font-display text-base leading-tight sm:text-lg">{service}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

export function Delivery() {
  const cities = ["Delhi", "Noida", "Gurgaon", "Ghaziabad", "Faridabad"];

  return (
    <AlternatingSection
      eyebrow="Coverage"
      title="Reliable cold chain"
      emphasis="distribution."
      body="Today our trucks run -18 C across the entire Delhi NCR region. Pan-India coverage is in motion."
      direction="right"
    >
      <div className="glass-panel relative overflow-hidden bg-beige/70 p-4 shadow-card sm:p-6 lg:p-8">
        <svg
          viewBox="0 0 400 320"
          className="aspect-[4/3] w-full"
          role="img"
          aria-label="Delhi NCR delivery coverage map"
        >
          {Array.from({ length: 14 }).map((_, index) => (
            <circle
              key={index}
              cx={200}
              cy={160}
              r={20 + index * 14}
              fill="none"
              stroke="oklch(0.32 0.06 158)"
              strokeOpacity={0.06 + (14 - index) * 0.015}
            />
          ))}
          {[
            [200, 160, "Delhi"],
            [260, 140, "Noida"],
            [150, 180, "Gurgaon"],
            [240, 100, "Ghaziabad"],
            [170, 230, "Faridabad"],
          ].map(([x, y, name]) => (
            <g key={name as string}>
              <circle cx={x as number} cy={y as number} r={26} fill="oklch(0.66 0.11 75 / 0.18)" />
              <circle cx={x as number} cy={y as number} r={5} fill="oklch(0.66 0.11 75)" />
              <text
                x={(x as number) + 12}
                y={(y as number) + 4}
                fontSize="11"
                fontFamily="Inter"
                fill="oklch(0.32 0.06 158)"
                fontWeight="600"
              >
                {name as string}
              </text>
            </g>
          ))}
        </svg>
        <div className="mt-4 flex flex-wrap gap-2 lg:absolute lg:bottom-6 lg:left-6 lg:right-6 lg:mt-0">
          {cities.map((city) => (
            <span
              key={city}
              className="rounded-full border border-primary/20 bg-cream/80 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-xl sm:px-4 sm:py-2 sm:text-sm"
            >
              {city}
            </span>
          ))}
        </div>
      </div>
    </AlternatingSection>
  );
}

export function Certifications() {
  const certs = ["FSSAI", "HACCP", "ISO 22000", "Quality Tested"];

  return (
    <section className="border-y border-border bg-beige py-16 sm:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <p className="font-display text-2xl font-normal text-primary md:text-3xl">
            Held to standards that <em className="font-light">never compromise.</em>
          </p>
          <ul className="flex flex-wrap items-center justify-start gap-4 md:justify-end">
            {certs.map((cert, index) => (
              <motion.li
                key={cert}
                className="glass-panel flex items-center gap-2.5 px-4 py-2.5 shadow-card sm:gap-3 sm:px-5"
                initial={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: revealEase }}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-xs font-bold text-charcoal">
                  OK
                </span>
                <span className="font-display text-sm font-medium text-primary">{cert}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SampleCTA() {
  return (
    <section
      id="sample"
      className="relative flex min-h-screen overflow-hidden bg-charcoal py-24 text-cream lg:py-32"
    >
      <div className="premium-dark-mesh pointer-events-none absolute inset-0" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-35" />
      <motion.div
        className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.05, ease: revealEase }}
      >
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Try before you commit</p>
          <h2 className="mt-4 text-balance font-display text-[clamp(2.8rem,15vw,7rem)] font-semibold leading-[0.92] sm:text-[clamp(3rem,7vw,7rem)] sm:leading-[0.9]">
            Bring better pizza to the line.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/72">
            Start with a sample pack, validate the bake, then scale the dough program across your
            kitchen.
          </p>
          <div className="mt-10">
            <MagneticCta to="/sample" dark>
              Request Free Sample
            </MagneticCta>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="glass-panel overflow-hidden p-2 shadow-[0_40px_140px_-65px_rgba(180,138,74,0.75)]">
            <img
              src={pizzaFinished}
              alt="Finished Neapolitan margherita pizza"
              loading="lazy"
              width={1280}
              height={1280}
              className="aspect-square w-full rounded-[1.25rem] object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
