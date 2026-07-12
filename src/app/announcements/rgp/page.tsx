import type { Metadata } from "next"
import { CAL_LINK, CsFooter, CsHeader } from "@/app/case-studies/ui"

export const metadata: Metadata = {
  title: "Source × RGP — Partnership Announcement",
  description:
    "Source and Resources Global Professionals are partnering to bring AI-accelerated ERP assessment and delivery to the enterprise.",
}

const SECTIONS = [
  {
    id: "why",
    toc: "Why this partnership",
    heading: "Why this partnership",
    paragraphs: [
      "RGP runs some of the most trusted business and systems transformation assessments in the enterprise — structured engagements that move from current-state discovery into future-state design, ERP and integrator evaluation, roadmap, and executive readout.",
      "Source is the acceleration layer underneath that work. Not a replacement for consultants' judgment — a way to make the evidence auditable sooner, so every decision starts from a cleaner fact base.",
    ],
  },
  {
    id: "how",
    toc: "What changes in practice",
    heading: "What changes in practice",
    paragraphs: [
      "Before a working session meets, Source has already scanned the approved systems: reports, process notes, integrations, data extracts, and prior artifacts. Instead of starting from blank-page discovery, each session starts from confirmed evidence, visible process exceptions, draft requirements, and a short list of open questions.",
      "A dedicated Source AI specialist is embedded in the engagement — running scans, preparing evidence, drafting outputs, and keeping traceability moving — while RGP's consultants own interpretation, selection, roadmap, and recommendation.",
    ],
  },
  {
    id: "results",
    toc: "The result",
    heading: "The result",
    paragraphs: [
      "On engagements structured this way, core findings that traditionally take a full assessment cycle are ready for review roughly twice as fast — with hundreds of hours of manual evidence-gathering and document production removed from the critical path.",
      "The client sees the same rigour and the same deliverables, sooner — and the consultants' time goes to the work only people can do: judgment, trade-offs, and decisions.",
    ],
  },
  {
    id: "next",
    toc: "What's next",
    heading: "What's next",
    paragraphs: [
      "We're rolling this model out across engagements together — pairing RGP's transformation expertise with Source's platform across discovery, assessment, and delivery.",
      "If you're planning an ERP assessment or transformation and want the evidence-first version of it, we'd love to talk.",
    ],
  },
]

export default function RgpAnnouncementPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <CsHeader />

      {/* ── Hero artwork — full-width, Figma announcement visual ───────── */}
      <section className="mx-auto w-full max-w-[1320px] px-6 pt-10 sm:px-10 lg:pt-12">
        <div className="relative w-full overflow-hidden rounded-[6px] bg-[#0a0a0a] aspect-[4/5] sm:aspect-[16/9] lg:aspect-[2.15/1]">
          <img
            src="/images/home-hero-meadow.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Legibility washes */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.45) 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-between px-8 py-10 sm:py-12">
            {/* Lockup */}
            <div className="flex flex-1 items-center justify-center gap-6 sm:gap-8">
              <span className="font-display text-5xl text-white sm:text-6xl lg:text-7xl">
                Source
              </span>
              <span aria-hidden className="h-12 w-px bg-white/60 sm:h-16" />
              <span className="text-5xl tracking-tight text-white sm:text-6xl lg:text-7xl [font-family:'Helvetica_Neue',Helvetica,Arial,sans-serif]">
                rgp.
              </span>
            </div>
            {/* Announcement line */}
            <p className="max-w-[38ch] text-balance text-center text-lg leading-snug text-white/90 opacity-90 sm:text-xl lg:text-2xl">
              We are excited to announce our partnership with Resources Global
              Professionals
            </p>
          </div>
        </div>
      </section>

      {/* ── Centered announcement header ────────────────────────────────── */}
      <section className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-6 px-6 pt-20 text-center sm:px-10 lg:pt-24">
        <p className="text-[13px] text-black/40">July 12, 2026 · Partnership</p>
        <h1 className="max-w-[22ch] text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-5xl">
          Source and RGP partner to bring AI-accelerated ERP delivery to the
          enterprise
        </h1>
        <p className="max-w-[56ch] text-balance text-[17px] leading-[1.55] text-black/60">
          RGP&apos;s transformation expertise, running on Source&apos;s AI platform —
          assessments grounded in evidence from day one, delivered in roughly
          half the time.
        </p>
      </section>

      {/* ── Body: sticky TOC + article ──────────────────────────────────── */}
      <section className="mx-auto mt-20 flex w-full max-w-[1100px] flex-col items-start gap-12 px-6 sm:px-10 lg:mt-24 lg:flex-row lg:gap-20">
        {/* TOC */}
        <nav
          aria-label="On this page"
          className="hidden w-[220px] shrink-0 flex-col gap-3 lg:sticky lg:top-10 lg:flex"
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm text-black/40 transition-colors hover:text-black"
            >
              {s.toc}
            </a>
          ))}
        </nav>

        {/* Article */}
        <article className="flex min-w-0 flex-1 flex-col gap-14">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="flex scroll-mt-10 flex-col gap-5">
              <h2 className="text-xl font-medium leading-[1.2] tracking-[-0.02em]">
                {s.heading}
              </h2>
              <div className="flex flex-col gap-5 text-[15px] leading-[1.6] text-black/70">
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </section>

      {/* ── Pull quote ──────────────────────────────────────────────────── */}
      <section className="mx-auto flex w-full max-w-[860px] flex-col items-center gap-8 px-6 pt-24 text-center sm:px-10 lg:pt-28">
        <blockquote className="text-balance text-2xl font-medium leading-[1.3] tracking-[-0.02em] text-black sm:text-3xl">
          &ldquo;Every assessment should start from evidence, not a blank page.
          Pairing RGP&apos;s consultants with Source means the room meets already
          knowing what&apos;s true — and spends its time on the decisions that
          matter.&rdquo;
        </blockquote>
        <cite className="text-sm font-medium not-italic text-black/50">
          — Source team
        </cite>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm text-white transition-colors hover:bg-black/80"
        >
          Work with Source
          <span aria-hidden>→</span>
        </a>
      </section>

      <CsFooter />
    </main>
  )
}
