// Case study content model for source.shop/case-studies.
//
// Content sourced from the recorded partner interview with Nathan Gehring
// (Salora ERP), transcribed 2026-07-10 — quotes are verbatim from the
// transcript (lightly trimmed for print), full transcript at
// ~/Downloads/salora-case-study-transcript.txt

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
  /** Banner photo under /public — falls back to the dark Source × client lockup when unset. */
  image?: string
  title: string
  intro: string[]
  facts: { label: string; value: string }[]
  sections: CaseStudySection[]
  closing: { heading: string; paragraph: string }
}

const GEHRING = "Nathan Gehring, Founder, Salora ERP"

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "salora-erp",
    client: "Salora ERP",
    image: "/images/case-study-interview.jpg",
    title:
      "Running implementations together - and cutting delivery time by up to 80%.",
    intro: [
      "Salora ERP is a 60-person NetSuite consulting firm with close to 300 active clients across retail, manufacturing, healthcare, SaaS, and services. Founded by Nathan Gehring and his business partner in March 2020, the firm built its name on doing the basics exceptionally well - \"treating every client like they're your only client.\"",
      "Salora now co-runs implementations with Source: its consultants' expertise paired with Source's AI platform across discovery, system build, data migration, and integrations. The result, in Nathan's words - the same quality, in a fraction of the time and cost.",
    ],
    facts: [
      { label: "Partner", value: "Salora ERP" },
      { label: "Team", value: "~60 consultants" },
      { label: "Active clients", value: "~300" },
      { label: "Focus", value: "NetSuite & ERP implementations" },
      { label: "Working together", value: "Co-delivered implementations" },
    ],
    sections: [
      {
        heading: "The problem with the old way",
        paragraphs: [
          "Traditional ERP implementations run six to twelve months and regularly cost six or seven figures. \"The traditional methodology, while it works, it's really painful for the client,\" Nathan says - the client's team still has day jobs, discovery means a week of twenty people in a conference room, and long timelines multiply the points of failure: people leave mid-project, bandwidth dries up, years of bad data need cleansing.",
          "And too often the value never gets captured at all. \"A client will do this half-a-million-dollar implementation with another firm, and I ask - can you share the documentation the previous team provided? And they'll say: nothing was given to us. You spent all this money, all this time, and nothing was documented?\"",
        ],
      },
      {
        heading: "Co-running projects with Source",
        quote: {
          text: "The critical part is that I still want to deliver the same quality and the same value we would have with the traditional methodology. With Source, we can absolutely do that - and we're seeing it in real time in the projects we're implementing together today.",
          attribution: GEHRING,
        },
        paragraphs: [
          "Before Salora's consultants sit down with a client, Source has already done the groundwork: AI pre-interviews with each team member and automated scans of the client's existing systems. \"When we go on site to do discovery, we've already done 40, 50, 80 hours of pre-discovery. Instead of walking into a conference room and saying 'tell me about your job', we're asking precise, pointed, detailed questions - 'I saw in your interview you mentioned this very specific manual process. Tell me more.'\"",
          "The system scans surface what conference rooms don't. \"The client tells me they've got 5,000 customers. The system says they have 50,000 - and 200,000 SKUs, 90% of which haven't been used in five years.\" And because pre-interviews happen one-to-one, people say things they'd never volunteer in front of a room: the spreadsheet the process actually runs on, the step that depends on asking Susie, the work that happens entirely outside the system.",
          "The loop stays tight throughout delivery. \"We have a call with the client on Monday; we go on the call Tuesday and our notes are already updated in real time, and we're asking more precise follow-up questions. With the traditional methodology, I'd finally have transcribed my notes two weeks later.\"",
        ],
      },
      {
        heading: "Impact",
        quote: {
          text: "Instead of the traditional three, six, twelve-month project timeline, we're now doing implementations together in a few weeks to three months. By cutting the trajectory of the project down by 50, 75, even 80% in some cases, we're delivering on the promised value so much quicker.",
          attribution: GEHRING,
        },
        paragraphs: [
          "Speed shows up in every phase of the project:",
        ],
        bullets: [
          {
            lead: "System build:",
            rest: "\"Via Source, we can configure the system in hours or a day or two, where traditionally it would have taken us weeks.\"",
          },
          {
            lead: "Data migration:",
            rest: "\"The client doesn't want to pay 30 grand for data migration. If I can do it in half a day where historically it took weeks, that's a lot more value to the client.\"",
          },
          {
            lead: "Integrations:",
            rest: "\"You can build scripts, workflows, and integrations that would have taken months in a matter of hours. On large projects a client might have 30, 50, 80 integrations - now that's days or weeks, not six months.\"",
          },
          {
            lead: "Commercially:",
            rest: "\"If the other firms are saying it's going to take 12 months and 300 grand, and we're saying two or three months and 100 grand, obviously we have a serious competitive edge.\"",
          },
          {
            lead: "Client success:",
            rest: "clients are inside their own system, with their own data, within the first few weeks - which turns the whole project into UAT and training. \"I want the client to be power users as early as possible.\"",
          },
        ],
      },
      {
        heading: "What clients notice",
        paragraphs: [
          "\"Previously there was trepidation - 'oh gosh, this is going to be painful.' Now you can see the enthusiasm early in the cycle: wow, we're going to be able to do this this quickly. These pre-interview questions are so great, and we're getting such valuable information.\"",
          "\"They're learning so much more about their business than they ever would have in the traditional methodology. Businesses have more data than ever before - now we can actually understand it, and fix the things they've been trying to fix for 20 years, in record time.\"",
        ],
      },
      {
        heading: "Why Source, not off-the-shelf AI",
        quote: {
          text: "Building a system that's much more precise, tailored, and refined to the way consultants work and these projects are implemented is going to be light years ahead of just your off-the-shelf AI tools.",
          attribution: GEHRING,
        },
        paragraphs: [
          "Source's platform is purpose-built for ERP delivery - and every co-delivered project sharpens the next. \"Every project we do together: what were our misses? What can we refine for the next one? How can we standardise our questions by client, by vertical, by integration?\"",
          "And it hasn't made the work robotic - the opposite. \"It's really about making it more human and more interactive. I want it to be more personal than it's ever been before. And I think we're achieving that.\" Consultants spend less time on manual busywork; clients spend less time on data entry. \"I want people to spend as little time as possible in the system - and get back to having enough time to think creatively about how to improve the business.\"",
        ],
      },
      {
        heading: "What's next",
        paragraphs: [
          "For Salora, the partnership is how a 60-person firm competes with multi-billion-dollar consultancies - top-tier people, co-delivering with the best tooling in the industry. \"In theory, we're going to be able to do five to ten times more projects - hopefully without five or ten times more headcount. Teams serve many more clients, with the same quality of work and level of detail, on a much more expedited timeline.\"",
        ],
      },
    ],
    closing: {
      heading: "Using AI to make consulting more human.",
      paragraph:
        "Salora's story is what co-running projects with Source looks like in practice: discovery done before the first meeting, systems built in days, clients living in their own system within weeks - and consultants freed to do the work only people can do. Same outcome, same quality, delivered in a fraction of the time.",
    },
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
