"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F9FC] text-[#0B1220]">
      <Hero scrollY={scrollY} />
      <MarketSelector />
      <ProblemSection />
      <SystemSection />
      <ServicesSection />
      <ColdLeadSection />
      <ProofSection />
      <QuoteSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}

function Hero({ scrollY }: { scrollY: number }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050B14] text-white">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          transform: `translateY(${scrollY * 0.18}px)`,
        }}
      >
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#F5D06F]/20 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[140px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          transform: `translateY(${scrollY * 0.08}px)`,
        }}
      />

      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-10">
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-[#F5D06F] backdrop-blur">
            Airbnb • Realtor • Property Management Cleaning
          </p>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-7xl">
            Property cleaning that protects{" "}
            <span className="text-[#F5D06F]">
              reviews, showings, and reputation.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Kafele Kleaning provides checklist-driven, photo-verified cleaning
            for Airbnb hosts, realtors, and property managers who need fewer
            complaints, cleaner handoffs, and more reliable vendor execution.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#quote"
              className="group rounded-xl bg-[#F5D06F] px-7 py-4 text-center text-base font-black text-[#050B14] shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-[#FFE28A]"
            >
              Request a Quote
              <span className="ml-2 inline-block transition group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#markets"
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-center text-base font-black text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              Choose Your Property Type
            </a>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-400">
            Start with one clean. Compare the process. Keep us if the standard
            is stronger than what you have now.
          </p>
        </div>

        <div
          className="animate-float rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur"
          style={{
            transform: `translateY(${scrollY * -0.04}px)`,
          }}
        >
          <div className="rounded-2xl bg-white p-6 text-[#0B1220]">
            <p className="text-sm font-black uppercase tracking-widest text-[#B98700]">
              Vendor Risk Check
            </p>

            <h2 className="mt-3 text-2xl font-black">
              The wrong cleaner costs more than the invoice.
            </h2>

            <div className="mt-6 space-y-4">
              {[
                "A missed detail can turn into a complaint.",
                "A late update can create scheduling pressure.",
                "No photos means you are trusting blindly.",
                "Inconsistent quality makes every clean feel like a gamble.",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5D06F] text-xs font-black">
                    ✓
                  </span>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <a
              href="#quote"
              className="mt-7 block rounded-xl bg-[#050B14] px-5 py-4 text-center font-black text-white transition hover:-translate-y-0.5 hover:bg-[#13233A]"
            >
              Check Availability
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketSelector() {
  const markets = [
    {
      title: "Airbnb Hosts",
      pain: "Bad reviews, guest complaints, rushed turnovers, and unreliable cleaners.",
      promise:
        "Guest-ready turnovers with checklist standards and photo verification.",
      cta: "Protect My Next Turnover",
    },
    {
      title: "Realtors",
      pain: "Listings that show poorly, move-outs that look unfinished, and last-minute cleaning stress.",
      promise:
        "Listing-ready cleaning that helps properties feel clean, prepared, and professionally handled.",
      cta: "Prepare My Listing",
    },
    {
      title: "Property Managers",
      pain: "Tenant complaints, vendor inconsistency, weak communication, and too much follow-up.",
      promise:
        "Reliable cleaning support for turnovers, vacant units, and managed properties.",
      cta: "Get Vendor Pricing",
    },
  ];

  return (
    <section id="markets" className="relative border-b border-slate-200 bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,208,111,0.12),_transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <p className="text-sm font-black uppercase tracking-widest text-[#B98700]">
            Choose your situation
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
            Different properties. Same problem: the clean has to be right.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Whether you manage guests, buyers, tenants, or owners, your cleaning
            vendor affects how people judge the property.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {markets.map((market, index) => (
            <div
              key={market.title}
              className="group rounded-3xl border border-slate-200 bg-[#F7F9FC] p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                animation: `fadeUp 700ms ease ${index * 120}ms both`,
              }}
            >
              <h3 className="text-2xl font-black">{market.title}</h3>

              <div className="mt-5 rounded-2xl bg-white p-5 transition duration-300 group-hover:shadow-md">
                <p className="text-sm font-black uppercase tracking-wider text-red-700">
                  Common pain
                </p>
                <p className="mt-2 leading-7 text-slate-700">{market.pain}</p>
              </div>

              <div className="mt-4 rounded-2xl bg-[#07111F] p-5 text-white transition duration-300 group-hover:-translate-y-1">
                <p className="text-sm font-black uppercase tracking-wider text-[#F5D06F]">
                  What we solve
                </p>
                <p className="mt-2 leading-7 text-slate-300">
                  {market.promise}
                </p>
              </div>

              <a
                href="#quote"
                className="mt-6 block rounded-xl bg-[#F5D06F] px-5 py-4 text-center font-black text-[#07111F] transition hover:bg-[#FFE28A]"
              >
                {market.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const cards = [
    {
      title: "Complaints",
      text: "Small missed details become big problems when clients, tenants, or guests notice first.",
    },
    {
      title: "Delays",
      text: "Late cleaners create pressure on check-ins, showings, move-ins, and inspections.",
    },
    {
      title: "Callbacks",
      text: "A cheap clean is not cheap when you have to send someone back to fix it.",
    },
    {
      title: "Reputation risk",
      text: "Cleanliness affects how people judge the owner, host, agent, or manager.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="animate-fade-up">
          <p className="text-sm font-black uppercase tracking-widest text-[#B98700]">
            The expensive part is not the cleaning
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
            The expensive part is what happens when the cleaning is not handled
            correctly.
          </h2>
        </div>

        <div className="space-y-5 text-lg leading-8 text-slate-700 animate-fade-up-delay">
          <p>
            A missed bathroom detail can become a guest complaint. A rushed
            turnover can become a bad review. A poorly prepared listing can
            weaken a buyer’s first impression. A messy tenant turnover can
            create more work for management.
          </p>
          <p>
            Cheap cleaning becomes expensive when it creates stress, callbacks,
            complaints, refunds, delays, or reputation damage.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{
              animation: `fadeUp 700ms ease ${index * 100}ms both`,
            }}
          >
            <h3 className="text-xl font-black">{card.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SystemSection() {
  const steps = [
    {
      number: "01",
      title: "Clear Scope",
      text: "We confirm the property type, service, priorities, timing, and condition before the clean.",
    },
    {
      number: "02",
      title: "Checklist Cleaning",
      text: "The clean follows a room-by-room standard so important details are not left to memory.",
    },
    {
      number: "03",
      title: "Photo Verification",
      text: "Before and after photos create accountability, especially for clients who are not on-site.",
    },
    {
      number: "04",
      title: "Follow-Up",
      text: "If something needs attention, we tighten the process instead of hiding behind excuses.",
    },
  ];

  return (
    <section
      id="system"
      className="relative overflow-hidden bg-[#07111F] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(245,208,111,0.18),_transparent_30%),radial-gradient(circle_at_80%_80%,_rgba(37,99,235,0.14),_transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-widest text-[#F5D06F]">
            The Kafele Kleaning system
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
            Structure, systems, and accountability.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Most cleaners sell effort. We sell a controlled process.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur transition duration-500 hover:-translate-y-2 hover:bg-white/15"
              style={{
                animation: `fadeUp 700ms ease ${index * 140}ms both`,
              }}
            >
              <p className="text-sm font-black text-[#F5D06F]">
                {step.number}
              </p>
              <h3 className="mt-4 text-xl font-black">{step.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      title: "Airbnb Turnover Cleaning",
      description:
        "For hosts who need guest-ready properties, fast resets, and fewer review risks.",
      points: [
        "Kitchen reset",
        "Bathroom detail",
        "Bed and surface reset",
        "Photo confirmation",
      ],
    },
    {
      title: "Pre-Listing Cleaning",
      description:
        "For realtors and sellers who need the property to show clean, sharp, and ready.",
      points: [
        "High-touch areas",
        "Bathrooms and kitchens",
        "Floors and surfaces",
        "Listing-ready presentation",
      ],
    },
    {
      title: "Move-In / Move-Out Cleaning",
      description:
        "For owners, tenants, and managers who need a property reset before the next person walks in.",
      points: ["Cabinets", "Appliances", "Bathrooms", "Floors and baseboards"],
    },
    {
      title: "Property Management Cleaning",
      description:
        "For managers who need reliable vendor support without chasing, guessing, or babysitting.",
      points: [
        "Unit turnovers",
        "Vacant property cleaning",
        "Photo proof",
        "Clear communication",
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-widest text-[#B98700]">
          Services
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
          Cleaning built for high-pressure property situations.
        </h2>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The goal is not just clean. The goal is guest-ready, showing-ready,
          move-in-ready, or management-ready.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            style={{
              animation: `fadeUp 700ms ease ${index * 120}ms both`,
            }}
          >
            <h3 className="text-2xl font-black">{service.title}</h3>

            <p className="mt-4 leading-7 text-slate-600">
              {service.description}
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="rounded-xl bg-[#F7F9FC] px-4 py-3 text-sm font-bold text-slate-700 transition group-hover:bg-[#FFF7DF]"
                >
                  ✓ {point}
                </li>
              ))}
            </ul>

            <a
              href="#quote"
              className="mt-7 inline-block rounded-xl border border-slate-300 px-5 py-3 text-center font-black transition hover:border-[#07111F] hover:bg-[#07111F] hover:text-white"
            >
              Get Pricing
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function ColdLeadSection() {
  const steps = [
    "Send property details, location, timing, and what needs attention.",
    "Get a clear quote and confirmed scope before the job starts.",
    "Review the clean, photos, and communication. Then decide if we deserve more work.",
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_transparent,_rgba(245,208,111,0.13),_transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-widest text-[#B98700]">
            Already have a cleaner?
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
            Keep them. Test us on one clean.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            You do not have to replace your current cleaner today. Use Kafele
            Kleaning for one turnover, one listing clean, or one move-out. Then
            compare the communication, detail level, and photo verification.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((text, index) => (
            <div
              key={text}
              className="rounded-3xl border border-slate-200 bg-[#F7F9FC] p-7 transition duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <p className="text-sm font-black uppercase tracking-widest text-[#B98700]">
                Step {index + 1}
              </p>
              <p className="mt-4 text-lg font-bold leading-8 text-[#0B1220]">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#quote"
            className="inline-block rounded-xl bg-[#07111F] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#13233A]"
          >
            Test Us On One Clean
          </a>
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  const proofItems = [
    "Arrival confirmation",
    "Before photos",
    "After photos",
    "Room-by-room checklist",
    "Client priorities noted",
    "Quality issues tracked and corrected",
  ];

  return (
    <section className="bg-[#F7F9FC]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:px-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="grid gap-4">
            {proofItems.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-[#F7F9FC] p-5 font-bold transition duration-300 hover:-translate-x-1 hover:bg-white hover:shadow-md"
                style={{
                  animation: `fadeUp 700ms ease ${index * 80}ms both`,
                }}
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-widest text-[#B98700]">
            Visible accountability
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
            You should not have to wonder if the job was done right.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-700">
            Most cleaning companies ask you to trust their word. Our process is
            designed to give property owners, hosts, agents, and managers more
            visibility through confirmations, checklists, and photo proof.
          </p>

          <a
            href="#quote"
            className="mt-8 inline-block rounded-xl bg-[#07111F] px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#13233A]"
          >
            Check Availability
          </a>
        </div>
      </div>
    </section>
  );
}

function QuoteSection() {
  const inputFields = [
    {
      label: "Name",
      placeholder: "Your name",
    },
    {
      label: "Phone or Email",
      placeholder: "Best way to reach you",
    },
    {
      label: "Property Size",
      placeholder: "Example: 2 bed / 2 bath, 1,200 sq ft",
    },
    {
      label: "City",
      placeholder: "Example: Torrance, Redondo Beach, Los Angeles",
    },
    {
      label: "Preferred Cleaning Date",
      placeholder: "Example: This Friday morning",
    },
  ];

  return (
    <section id="quote" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-[#B98700]">
            Request pricing
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
            Start with one property. No pressure. Just clear pricing.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-700">
            Send the property details and we’ll give you straightforward pricing.
            If it makes sense, start with one clean so you can judge the process
            before making a bigger decision.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Best for Airbnb turnovers, move-outs, listings, and property management support.",
              "Photo verification available for off-site owners, hosts, agents, and managers.",
              "Clear scope before the job so expectations are not vague.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-5 font-bold shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>

        <form className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl">
          <div className="mb-6 rounded-2xl bg-[#07111F] p-5 text-white">
            <p className="font-black">Fastest way to get accurate pricing:</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Include property size, city, service type, preferred date, and any
              areas that need extra attention.
            </p>
          </div>

          <div className="grid gap-5">
            {inputFields.map((field) => (
              <label key={field.label} className="grid gap-2">
                <span className="font-bold">{field.label}</span>
                <input
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#B98700] focus:ring-4 focus:ring-[#F5D06F]/20"
                  placeholder={field.placeholder}
                />
              </label>
            ))}

            <label className="grid gap-2">
              <span className="font-bold">Which best describes you?</span>
              <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#B98700] focus:ring-4 focus:ring-[#F5D06F]/20">
                <option>Airbnb Host</option>
                <option>Realtor</option>
                <option>Property Manager</option>
                <option>Property Owner</option>
                <option>Other</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="font-bold">Service Needed</span>
              <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#B98700] focus:ring-4 focus:ring-[#F5D06F]/20">
                <option>Airbnb Turnover Cleaning</option>
                <option>Pre-Listing Cleaning</option>
                <option>Deep Cleaning</option>
                <option>Move-In / Move-Out Cleaning</option>
                <option>Property Management Cleaning</option>
                <option>Not sure yet</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="font-bold">What needs the most attention?</span>
              <textarea
                className="min-h-32 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#B98700] focus:ring-4 focus:ring-[#F5D06F]/20"
                placeholder="Tell us about the condition, priorities, timing, or problem areas."
              />
            </label>

            <a
              href="mailto:Kafele.kleaning@gmail.com?subject=Cleaning Quote Request&body=Name:%0D%0APhone or Email:%0D%0AI am a:%0D%0AService Needed:%0D%0AProperty Size:%0D%0ACity:%0D%0APreferred Date:%0D%0AWhat needs attention:%0D%0A"
              className="rounded-xl bg-[#07111F] px-7 py-4 text-center font-black text-white transition hover:-translate-y-1 hover:bg-[#13233A]"
            >
              Send Quote Request
            </a>

            <p className="text-center text-sm text-slate-500">
              Prefer direct contact? Email:{" "}
              <a
                href="mailto:Kafele.kleaning@gmail.com"
                className="font-bold text-[#07111F] underline-offset-4 hover:underline"
              >
                Kafele.kleaning@gmail.com
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Do you work with Airbnb hosts?",
      a: "Yes. Airbnb turnovers are one of our core services. We focus on reliable resets, detail checks, guest-ready presentation, and photo confirmation.",
    },
    {
      q: "Do you clean for realtors before showings or listings?",
      a: "Yes. We help prepare properties before listings, showings, move-ins, and move-outs so the space presents clean and professionally handled.",
    },
    {
      q: "Do you work with property managers?",
      a: "Yes. We support move-outs, vacant units, turnover cleaning, and property management cleaning needs where communication and consistency matter.",
    },
    {
      q: "Do you send before and after photos?",
      a: "Yes. Photo verification is available so clients can see the work without needing to be on-site.",
    },
    {
      q: "How fast can I get a quote?",
      a: "Send the property size, service type, location, preferred timing, and condition. The clearer the information, the faster we can price the job.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-10">
        <p className="text-center text-sm font-black uppercase tracking-widest text-[#B98700]">
          FAQ
        </p>

        <h2 className="mt-3 text-center text-3xl font-black tracking-tight md:text-5xl">
          Questions clients usually ask first.
        </h2>

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-slate-200 bg-[#F7F9FC] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            >
              <h3 className="text-lg font-black">{faq.q}</h3>
              <p className="mt-3 leading-7 text-slate-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,208,111,0.18),_transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:px-10">
        <p className="text-sm font-black uppercase tracking-widest text-[#F5D06F]">
          Ready when the property needs to be right
        </p>

        <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
          Stop gambling with cleaners who leave you guessing.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Get a structured cleaning partner built around standards,
          accountability, and photo-verified results.
        </p>

        <a
          href="#quote"
          className="mt-8 inline-block rounded-xl bg-[#F5D06F] px-8 py-4 font-black text-[#07111F] transition hover:-translate-y-1 hover:bg-[#FFE28A]"
        >
          Request a Quote
        </a>
      </div>
    </section>
  );
}