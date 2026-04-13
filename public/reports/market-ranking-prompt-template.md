# Market Ranking Deep Research Prompt Template

> Use this prompt with Claude Deep Research, Perplexity, or any deep research tool.
> Replace `{{CORRIDOR}}` with the specific migration corridor (e.g. "QuickBooks to NetSuite").

---

## The Prompt

```
You are a competitive intelligence analyst specializing in ERP migration consulting.

Produce a comprehensive **Market Ranking Report** for the migration corridor: **{{CORRIDOR}}**

The report must cover the following 5 sections with real, verifiable data:

---

### 1. GOOGLE SEARCH RANKINGS

For the top 20-30 search queries a buyer would use when looking for {{CORRIDOR}} migration help:

- List the top 10 domains ranking on page 1 of Google for each keyword cluster
- Estimate Domain Authority (DA) for each domain (use Moz/Ahrefs scale 0-100)
- Note which are paid vs organic positions
- Identify keyword clusters:
  - Informational (e.g. "how to migrate from QB to NetSuite")
  - Commercial (e.g. "best QB to NetSuite migration consultants")
  - Transactional (e.g. "QB to NetSuite migration cost", "hire NetSuite consultant")
- Rank the top 15 domains by overall search visibility for this corridor

Output as a ranked table: Position | Domain | DA | Keywords Ranking For | Estimated Monthly Traffic

---

### 2. CONSULTANCY LANDSCAPE

Identify every consulting firm that actively offers {{CORRIDOR}} migration services:

- Firm name, website, HQ location
- Size tier: Boutique (<50 emp), Mid-market (50-500), Enterprise (500+)
- Partner status (e.g. NetSuite Alliance Partner, Solution Provider, Microsoft Partner)
- Key differentiators and specializations
- Estimated number of {{CORRIDOR}} migrations completed
- Pricing model if publicly available (fixed fee, T&M, hybrid)

Output as a ranked table by market presence: Rank | Firm | Website | Size | Partner Status | Differentiator

---

### 3. AI ENGINE VISIBILITY (AEO)

Test the following AI engines/LLMs and document which firms they recommend for {{CORRIDOR}} migrations:

- ChatGPT (GPT-4)
- Claude
- Gemini
- Perplexity
- Microsoft Copilot

For each AI engine, ask: "Who are the best consultants for {{CORRIDOR}} migration?"

Document:
- Which firms are mentioned by name
- In what order they appear
- What reasons are given for the recommendation
- Whether Source or source.shop appears in any results

Output as a matrix: Firm | ChatGPT | Claude | Gemini | Perplexity | Copilot | Total Mentions

---

### 4. CONTENT LANDSCAPE

Analyze the top-performing content for {{CORRIDOR}} migration topics:

- Top 20 blog posts / articles by estimated traffic
- Top 10 landing pages (commercial intent)
- Top video content (YouTube)
- Top downloadable resources (whitepapers, guides, checklists)
- Content gaps — topics with search volume but no quality content

For each piece of content:
- URL, title, publishing domain
- Estimated monthly traffic
- Content type (blog, landing page, case study, video)
- Word count / depth
- Date published or last updated

Output as a ranked table: Rank | Title | Domain | Type | Est. Traffic | Word Count

---

### 5. PAID SEARCH INTELLIGENCE

Analyze the paid search landscape for {{CORRIDOR}} migrations:

- Top advertisers bidding on related keywords
- Estimated monthly ad spend per advertiser
- Top ad copy being used (headlines + descriptions)
- Landing page URLs
- Cost-per-click estimates for key terms
- Which keywords have the highest commercial intent

Output as: Advertiser | Est. Monthly Spend | Top Keywords | CPC Range | Landing Page

---

## FORMAT

Return the full report in clean markdown with:
- Executive summary (3-4 bullet points on who dominates and where opportunities exist)
- All 5 sections with tables
- A "Source Opportunity" section at the end identifying gaps where Source (source.shop) could compete or dominate
- Total word count: aim for 3000-5000 words with dense, actionable data
```

---

## Migration Corridors to Run

| Corridor | Priority | Status |
|----------|----------|--------|
| QuickBooks → NetSuite | High | Pending |
| QuickBooks → Dynamics 365 | High | Pending |
| QuickBooks → Sage Intacct | Medium | Pending |
| Sage → NetSuite | Medium | Pending |
| Sage → Dynamics 365 | Medium | Pending |
| Dynamics GP → NetSuite | Medium | Pending |
| Dynamics GP → D365 Business Central | High | Pending |
| Legacy ERP → NetSuite | Low | Pending |
| Legacy ERP → Dynamics 365 | Low | Pending |
| NetSuite Implementation | High | Pending |
| Dynamics 365 Implementation | High | Pending |
| Any → Acumatica | Low | Pending |

## How to Use

1. Copy the prompt above
2. Replace `{{CORRIDOR}}` with the specific migration (e.g. "QuickBooks to NetSuite")
3. Run through Claude Deep Research, Perplexity Deep Research, or similar
4. Save the output using `write_report` with ID pattern: `market-ranking-{corridor-slug}`
5. Results will appear in the Market Ranking tab on source.shop/leads
