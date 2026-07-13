import Link from "next/link"
import { CASE_STUDIES } from "@/content/case-studies"
import { CaseBanner, CsFooter, CsHeader } from "./ui"
import { Reveal } from "./reveal"

export default function CaseStudiesIndexPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <CsHeader />

      {/* Hero */}
      <section className="mx-auto w-full max-w-[82.5rem] px-6 pt-20 sm:px-10 lg:pt-28">
        <p className="text-[0.8125rem] font-medium text-black/40">Case Studies</p>
        <h1 className="mt-6 max-w-[24ch] text-4xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-5xl">
          Proof, not promises.
        </h1>
        <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-[1.55] text-black/60">
          How operationally heavy businesses use Source to understand, untangle, and
          rebuild their ERP estates — in weeks, not months, at a fixed cost.
        </p>
      </section>

      {/* Case study cards */}
      <section className="mx-auto mt-16 flex w-full max-w-[82.5rem] flex-col gap-10 px-6 sm:px-10 lg:mt-20">
        {CASE_STUDIES.map((cs, i) => (
          <Reveal key={cs.slug} delay={0.08 * (i % 3)}>
          <Link
            href={`/case-studies/${cs.slug}`}
            className="group flex flex-col gap-6"
          >
            <CaseBanner client={cs.client} image={cs.image} compact />
            <div className="flex flex-col gap-4">
              <h2 className="max-w-[36ch] text-2xl font-medium leading-[1.15] tracking-[-0.02em] transition-colors group-hover:text-black/70">
                {cs.title}
              </h2>
              <p className="max-w-[70ch] text-[0.9375rem] leading-[1.55] text-black/60">
                {cs.intro[0]}
              </p>
              <span className="text-sm font-medium text-black/50 transition-colors group-hover:text-black">
                Read the case study →
              </span>
            </div>
          </Link>
          </Reveal>
        ))}

        {/* Growth affordance */}
        <div className="flex items-center gap-4 rounded-[4px] border border-dashed border-black/15 px-5 py-6">
          <p className="text-sm text-black/35">More case studies coming soon</p>
        </div>
      </section>

      <CsFooter />
    </main>
  )
}
