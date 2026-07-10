// Case study content model for source.shop/case-studies.
//
// NOTE: the first entry is illustrative placeholder content (anonymised
// engagement, role-attributed quotes) so the layout can ship — swap in a
// real, client-approved story before linking the section from the homepage.

export type CaseStudyQuote = {
  text: string
  attribution: string
}

export type CaseStudySection = {
  heading: string
  quote?: CaseStudyQuote
  paragraphs: string[]
  bullets?: { lead: string; rest?: string }[]
}

export type CaseStudy = {
  slug: string
  /** Client display name — appears in breadcrumb, banner and cards. */
  client: string
  /** Short uppercase tag pair rendered as the split pill. */
  tags: { primary: string; secondary: string }
  title: string
  intro: string[]
  facts: { label: string; value: string }[]
  sections: CaseStudySection[]
  closing: { heading: string; paragraph: string }
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "dtc-apparel-netsuite",
    client: "DTC Apparel Brand",
    tags: { primary: "Case study", secondary: "NetSuite re-architecture" },
    title:
      "Unwinding eight years of workarounds - and landing a clean NetSuite core.",
    intro: [
      "A nine-figure direct-to-consumer apparel brand had grown fast on Shopify and NetSuite - and its systems had grown with it. Eight years of integrations, custom scripts, and one-off fixes had accreted into an estate nobody fully understood. Every change risked order flow, and every question needed the one person who remembered the answer.",
      "That's what brought them to Source: a fixed-fee re-architecture, grounded in evidence from their actual system - delivered in weeks, not months.",
    ],
    facts: [
      { label: "Industry", value: "Consumer & DTC Apparel" },
      { label: "Company size", value: "~250" },
      { label: "Systems", value: "NetSuite, Shopify, Celigo, 3PL" },
      { label: "Engagement", value: "Architecture review → fixed-fee build" },
    ],
    sections: [
      {
        heading: "The challenge",
        paragraphs: [
          "The brand's NetSuite account carried more than 1,800 saved searches, 58 active custom scripts, and dozens of integration flows - most built by people who had since moved on. The team knew a large share of it was dead weight, but nobody could say which parts were safe to touch. Meanwhile the business was preparing for a clean re-implementation, and every open question was a cutover risk.",
          "The strategic problem was the one every mature operator faces: how do you make eight years of embedded system knowledge visible, so decisions stop depending on memory and start depending on evidence?",
        ],
      },
      {
        heading: "Why Source",
        quote: {
          text: "Source read our actual system - every script, every saved search, every flow - before proposing anything. Nobody had ever done that.",
          attribution: "Head of Operations",
        },
        paragraphs: [
          "Source's experts, working with frontier AI over the brand's real estate, produced a complete register of the system: every integration flow with its disposition (retire, retain, replace, validate), every custom script with its type, bundle, and verdict, every saved search scored for port risk.",
          "The client's own team then reviewed the registers line by line - confirming, challenging, and commenting on each row - so the target architecture was signed off on evidence rather than assumption.",
          "And because the whole engagement was scoped from that evidence, the price was fixed before the build began. No hourly meters, no change-order treadmill.",
        ],
      },
      {
        heading: "Impact",
        quote: {
          text: "The first step is always the register now. Every decision traces back to something we can point at.",
          attribution: "Systems Lead",
        },
        paragraphs: [
          "Within weeks, decisions that had stalled for quarters were closed:",
        ],
        bullets: [
          {
            lead: "Scripts triaged:",
            rest: "all 58 active custom scripts dispositioned - keep, retire, redesign, or repoint - with the client team confirming each verdict in days, not months.",
          },
          {
            lead: "Integrations mapped:",
            rest: "every flow in the estate documented with source-of-truth ownership and a cutover decision, replacing tribal knowledge with a single register.",
          },
          {
            lead: "Fixed-fee builds:",
            rest: "priority builds quoted at a committed fixed price - 40-60% below the systems-integrator anchors the brand had been carrying.",
          },
        ],
      },
      {
        heading: "What's next",
        paragraphs: [
          "With the target architecture agreed and the registers signed off, the brand is moving through cutover with a run-sheet grounded in evidence - and a Phase 2 backlog already prioritised for the builds that come after go-live.",
          "Looking ahead, the ambition is the same one Source brings to every engagement: systems that are understood, documented, and ready for the AI era - not just migrated.",
        ],
      },
    ],
    closing: {
      heading: "Source: your systems, actually understood.",
      paragraph:
        "This engagement is a model for how operationally heavy businesses modernise without betting the company on it: read the real system first, decide on evidence, fix the price, then build. With Source, the brand isn't just protecting what it built over eight years - it's shipping faster than it ever has.",
    },
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
