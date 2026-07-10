import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { CASE_STUDIES, getCaseStudy } from "@/content/case-studies"
import { CAL_LINK, CaseBanner, CsFooter, CsHeader, QuoteCard, TagPills } from "../ui"

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug)
  if (!cs) return {}
  return {
    title: `${cs.client} — Source Case Study`,
    description: cs.intro[0],
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const cs = getCaseStudy((await params).slug)
  if (!cs) notFound()

  return (
    <main className="flex min-h-screen flex-col">
      <CsHeader />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="mx-auto flex w-full max-w-[1320px] flex-col gap-14 px-6 pt-20 sm:px-10 lg:pt-28">
        <div className="flex flex-col items-start gap-8">
          <nav
            aria-label="Breadcrumb"
            className="flex gap-3 font-mono text-[12px] uppercase leading-none tracking-[0.14em]"
          >
            <Link href="/case-studies" className="text-black/40 transition-colors hover:text-black">
              Case Studies
            </Link>
            <span className="text-black/50">/</span>
            <span aria-current="page" className="text-black">
              {cs.client}
            </span>
          </nav>

          <TagPills primary={cs.tags.primary} secondary={cs.tags.secondary} />

          <h1 className="max-w-[30ch] text-3xl font-medium leading-[1.1] tracking-[-0.03em] sm:text-4xl">
            {cs.title}
          </h1>

          <div className="flex max-w-[68ch] flex-col gap-5 text-[15px] leading-[1.55] text-black/70">
            {cs.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <a
            href={CAL_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black px-4 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white"
          >
            Book an intro call
            <span aria-hidden>→</span>
          </a>
        </div>

        <CaseBanner client={cs.client} />
      </section>

      {/* ── Body: fact card + article ─────────────────────────────────── */}
      <section className="mx-auto mt-24 flex w-full max-w-[1320px] flex-col items-start gap-10 px-6 sm:px-10 lg:mt-28 lg:flex-row">
        {/* Fact card */}
        <aside className="w-full shrink-0 rounded-[6px] bg-black/[0.03] p-[3px] lg:sticky lg:top-10 lg:w-[343px]">
          <div className="flex flex-col gap-8 rounded-[4px] bg-white p-6 shadow-[0_0_1px_rgba(0,0,0,0.25),0_1px_4px_rgba(0,0,0,0.04),0_2px_12px_rgba(0,0,0,0.01)]">
            <span className="text-2xl font-medium leading-tight tracking-[-0.02em]">
              {cs.client}
            </span>
            <dl className="flex flex-col gap-5">
              {cs.facts.map((f, i) => (
                <div key={f.label} className="flex flex-col gap-4">
                  {i > 0 && <div className="h-px w-full bg-black/[0.05]" />}
                  <div className="flex flex-col gap-1">
                    <dt className="text-base text-black/50">{f.label}</dt>
                    <dd className="text-base text-black">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        {/* Article */}
        <article className="flex min-w-0 flex-1 flex-col gap-14">
          {cs.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-6">
              <h2 className="text-xl font-medium leading-[1.2] tracking-[-0.02em]">
                {section.heading}
              </h2>

              {section.quote && (
                <QuoteCard text={section.quote.text} attribution={section.quote.attribution} />
              )}

              <div className="flex max-w-[75ch] flex-col gap-5 text-[15px] leading-[1.55] text-black/70">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {section.bullets && (
                  <ul className="flex flex-col gap-5">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="relative pl-5">
                        <span aria-hidden className="absolute left-0">
                          •
                        </span>
                        <span className="font-medium text-black">{b.lead}</span>{" "}
                        {b.rest}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          {/* Closing */}
          <section className="flex flex-col gap-6">
            <h2 className="max-w-[26ch] text-xl font-medium leading-[1.2] tracking-[-0.02em]">
              {cs.closing.heading}
            </h2>
            <p className="max-w-[75ch] text-[15px] leading-[1.55] text-black/70">
              {cs.closing.paragraph}
            </p>
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm text-white transition-colors hover:bg-black/80"
            >
              Work with Source
              <span aria-hidden>→</span>
            </a>
          </section>
        </article>
      </section>

      <CsFooter />
    </main>
  )
}
