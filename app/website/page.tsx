"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

const SOURCE_KEY = "kk_lead_source";
const WEBHOOK_URL =
  "https://hook.eu1.make.com/686xm5yw89izbiijypiq50cbxvgqhgha";
const EMAIL = "Kafele.kleaning@gmail.com";

type LeadSource = { source: string; campaign: string };

// Remembers where a visitor came from (ad link tags like ?utm_source=google)
// so the quote form can report it, even if they browse around first.
function captureLeadSource() {
  try {
    const params = new URLSearchParams(window.location.search);
    const source =
      params.get("utm_source") ||
      (params.get("gclid") ? "google" : "") ||
      (params.get("fbclid") ? "facebook" : "");
    if (!source) return;
    const value: LeadSource = {
      source,
      campaign: params.get("utm_campaign") || "",
    };
    localStorage.setItem(SOURCE_KEY, JSON.stringify(value));
  } catch {
    // Storage can be blocked; the lead is still captured as "direct".
  }
}

function readLeadSource(): LeadSource {
  try {
    const raw = localStorage.getItem(SOURCE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<LeadSource>;
      return {
        source: String(parsed.source || "direct"),
        campaign: String(parsed.campaign || ""),
      };
    }
  } catch {
    // Fall through to direct.
  }
  return { source: "direct", campaign: "" };
}

const services = [
  {
    title: "Airbnb turnovers",
    text: "A full reset between guests, so every check-in is review-ready.",
  },
  {
    title: "Pre-listing cleaning",
    text: "Showing-ready homes for realtors and sellers.",
  },
  {
    title: "Move-in and move-out",
    text: "Empty units cleaned for owners and managers.",
  },
  {
    title: "Deep cleaning",
    text: "The buildup a regular clean misses.",
  },
  {
    title: "Property management",
    text: "Steady cleaning support across multiple units.",
  },
];

const results = [
  {
    label: "Under the sink",
    before: "/cleaning-photos/before-sink.jpeg",
    after: "/cleaning-photos/after-sink.jpeg",
  },
  {
    label: "Refrigerator",
    before: "/cleaning-photos/before-refrigerator.jpeg",
    after: "/cleaning-photos/after-refrigerator.jpeg",
  },
];

const steps = [
  "Send us the property details.",
  "Get clear pricing, no pressure.",
  "We clean and send photos when it's done.",
];

export default function WebsitePage() {
  useEffect(() => {
    captureLeadSource();
  }, []);

  return (
    <main className="bg-black text-white antialiased [font-family:'Helvetica_Neue',Helvetica,Arial,sans-serif]">
      <Nav />
      <Hero />

      {/* Everything below slides up over the pinned hero photo. */}
      <div className="relative z-10 bg-black">
        <Services />
        <Results />
        <Steps />
        <Quote />
        <Footer />
      </div>
    </main>
  );
}

function Nav() {
  const [solid, setSolid] = useState(false);

  // Transparent over the photo, solid black once the page scrolls under it so
  // the logo stays readable over the white quote section.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4 transition-colors duration-300 md:px-12 ${
        solid ? "bg-black/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      <a
        href="#top"
        className="text-lg font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        Kafele Kleaning
      </a>
      <a
        href="#quote"
        className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        Get a quote
      </a>
    </header>
  );
}

function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // The photo stays pinned while the page slides over it. As you scroll, it
  // drifts up, zooms in slightly and the headline fades.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      if (photoRef.current) {
        photoRef.current.style.transform = `translate3d(0, ${
          progress * -8
        }%, 0) scale(${1 + progress * 0.12})`;
      }
      if (textRef.current) {
        textRef.current.style.opacity = String(1 - progress * 1.3);
        textRef.current.style.transform = `translate3d(0, ${
          progress * -40
        }px, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="top"
      className="sticky top-0 z-0 h-svh w-full overflow-hidden bg-black"
    >
      <div
        ref={photoRef}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/cleaning-photos/before-couch.jpeg"
          alt="Living room of a short-term rental, cleaned and staged for the next guest"
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />

      <div
        ref={textRef}
        className="absolute inset-x-0 bottom-0 px-6 pb-14 md:px-12 md:pb-20"
      >
        <h1 className="max-w-4xl text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
          Ready for the next guest.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-7 text-neutral-300 md:text-xl">
          Photo-verified Airbnb turnover cleaning across Los Angeles, Orange
          County and Palm Springs.
        </p>
        <a
          href="#quote"
          className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-base font-bold text-black transition hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Get a quote
        </a>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-36">
      <h2 className="max-w-3xl text-4xl font-extrabold leading-[1] tracking-[-0.035em] md:text-6xl">
        We clean the places people book.
      </h2>

      <ul className="mt-14 border-t border-neutral-800">
        {services.map((service) => (
          <li
            key={service.title}
            className="grid gap-2 border-b border-neutral-800 py-7 md:grid-cols-2 md:gap-10 md:py-9"
          >
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
              {service.title}
            </h3>
            <p className="text-lg leading-7 text-neutral-400">
              {service.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Results() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 md:px-12 md:pb-36">
      <h2 className="text-4xl font-extrabold leading-[1] tracking-[-0.035em] md:text-6xl">
        Before and after.
      </h2>
      <p className="mt-5 max-w-xl text-lg leading-7 text-neutral-400">
        Real photos from real jobs. You get photos like these after every
        clean.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        {results.map((pair) => (
          <figure key={pair.label}>
            <div className="grid grid-cols-2 gap-2">
              {[
                { src: pair.before, tag: "Before" },
                { src: pair.after, tag: "After" },
              ].map((photo) => (
                <div
                  key={photo.tag}
                  className="relative aspect-[3/4] overflow-hidden bg-neutral-900"
                >
                  <Image
                    src={photo.src}
                    alt={`${pair.label}, ${photo.tag.toLowerCase()} cleaning`}
                    fill
                    sizes="(min-width: 768px) 25vw, 45vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-bold text-white">
                    {photo.tag}
                  </span>
                </div>
              ))}
            </div>
            <figcaption className="mt-3 text-neutral-400">
              {pair.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 md:px-12 md:pb-36">
      <h2 className="text-4xl font-extrabold leading-[1] tracking-[-0.035em] md:text-6xl">
        How it works.
      </h2>
      <ol className="mt-12 grid gap-10 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step} className="border-t border-white pt-5">
            <span className="text-neutral-500">{index + 1}</span>
            <p className="mt-3 text-2xl font-bold leading-tight tracking-tight">
              {step}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const fieldClass =
  "w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 text-lg text-black outline-none transition placeholder:text-neutral-400 focus:border-black";

function Quote() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    // Hidden honeypot field: real visitors never fill it in, bots often do.
    if (form.get("company")) return;

    const payload = {
      name: String(form.get("name") || ""),
      contact: String(form.get("contact") || ""),
      propertySize: String(form.get("propertySize") || ""),
      city: String(form.get("city") || ""),
      date: String(form.get("date") || ""),
      clientType: String(form.get("clientType") || ""),
      service: String(form.get("service") || ""),
      details: String(form.get("details") || ""),
      ...readLeadSource(),
    };

    setStatus("sending");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");

      formElement.reset();
      setStatus("sent");
    } catch {
      // Fall back to an email draft so the lead is never lost.
      const subject = encodeURIComponent("Cleaning Quote Request");
      const body = encodeURIComponent(
        `Name: ${payload.name}\n` +
          `Phone or Email: ${payload.contact}\n` +
          `Client Type: ${payload.clientType}\n` +
          `Service Needed: ${payload.service}\n` +
          `Property Size: ${payload.propertySize}\n` +
          `City: ${payload.city}\n` +
          `Preferred Cleaning Date: ${payload.date}\n` +
          `What needs attention: ${payload.details}`
      );
      setStatus("error");
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    }
  };

  return (
    <section id="quote" className="scroll-mt-0 bg-white text-black">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-[5fr_6fr] md:gap-20 md:px-12 md:py-36">
        <div>
          <h2 className="text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Get a quote.
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-7 text-neutral-600">
            Tell us about the property and we&apos;ll send clear pricing. Start
            with one clean and judge us on the result.
          </p>
          <p className="mt-8 text-neutral-600">
            Prefer email?{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="font-bold text-black underline underline-offset-4"
            >
              {EMAIL}
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <label className="grid">
            <span className="text-sm font-bold">Name</span>
            <input
              name="name"
              required
              autoComplete="name"
              className={fieldClass}
              placeholder="Your name"
            />
          </label>

          <label className="grid">
            <span className="text-sm font-bold">Phone or email</span>
            <input
              name="contact"
              required
              autoComplete="email"
              className={fieldClass}
              placeholder="Best way to reach you"
            />
          </label>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid">
              <span className="text-sm font-bold">City</span>
              <input
                name="city"
                required
                autoComplete="address-level2"
                className={fieldClass}
                placeholder="Santa Monica"
              />
            </label>
            <label className="grid">
              <span className="text-sm font-bold">Preferred date</span>
              <input
                name="date"
                className={fieldClass}
                placeholder="This Friday morning"
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid">
              <span className="text-sm font-bold">I am a</span>
              <select name="clientType" className={fieldClass}>
                <option>Airbnb Host</option>
                <option>Realtor</option>
                <option>Property Manager</option>
                <option>Property Owner</option>
                <option>Other</option>
              </select>
            </label>
            <label className="grid">
              <span className="text-sm font-bold">Service</span>
              <select name="service" className={fieldClass}>
                <option>Airbnb Turnover Cleaning</option>
                <option>Pre-Listing Cleaning</option>
                <option>Deep Cleaning</option>
                <option>Move-In / Move-Out Cleaning</option>
                <option>Property Management Cleaning</option>
                <option>Not sure yet</option>
              </select>
            </label>
          </div>

          <label className="grid">
            <span className="text-sm font-bold">Property size</span>
            <input
              name="propertySize"
              className={fieldClass}
              placeholder="2 bed, 2 bath, 1,200 sq ft"
            />
          </label>

          <label className="grid">
            <span className="text-sm font-bold">Anything we should know?</span>
            <textarea
              name="details"
              rows={3}
              className={fieldClass}
              placeholder="Condition, timing, problem areas"
            />
          </label>

          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 rounded-full bg-black px-8 py-4 text-base font-bold text-white transition hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send request"}
          </button>

          {status === "sent" && (
            <p
              role="status"
              className="border-l-4 border-black pl-4 text-base font-bold"
            >
              Got it. We received your request and will be in touch with
              pricing.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-12 text-neutral-400 md:flex-row md:items-center md:justify-between md:px-12">
      <p className="font-bold text-white">Kafele Kleaning</p>
      <p>Los Angeles, Orange County and Palm Springs</p>
      <a
        href={`mailto:${EMAIL}`}
        className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {EMAIL}
      </a>
    </footer>
  );
}
