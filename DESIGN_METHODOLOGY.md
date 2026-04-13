# Design Methodology: Consultant Killer Landing Page

**Project**: v0-design-lab
**Last Updated**: 2026-02-01
**Style**: Industrial Minimal / Technical Documentation Aesthetic

---

## 1. Design Philosophy

### Core Identity
This is an AI-powered ERP consultant replacement tool. The design communicates:
- **Authority** — We know ERP systems deeply
- **Efficiency** — No fluff, just results
- **Transparency** — Fixed prices, clear deliverables
- **Technical Credibility** — We speak your language

### Visual Language
| Principle | Implementation |
|-----------|----------------|
| Industrial Minimal | Clean whites, stark blacks, no gradients |
| Technical Documentation | Monospace fonts, uppercase labels, report-style cards |
| Data-Forward | Numbers prominent, animated calculations |
| High Contrast | Black on white, white on black — no muddy grays |

---

## 2. Color System

### Light Mode (Primary)
```css
/* Backgrounds */
--bg-white: #ffffff;
--bg-subtle: rgba(0, 0, 0, 0.02);  /* black/[0.02] */
--bg-hover: rgba(0, 0, 0, 0.05);   /* black/[0.05] */

/* Text */
--text-primary: #000000;
--text-secondary: rgba(0, 0, 0, 0.7);   /* black/70 */
--text-muted: rgba(0, 0, 0, 0.5);       /* black/50 */
--text-faint: rgba(0, 0, 0, 0.4);       /* black/40 */
--text-ghost: rgba(0, 0, 0, 0.3);       /* black/30 */

/* Borders */
--border-subtle: rgba(0, 0, 0, 0.1);    /* black/10 */
--border-default: rgba(0, 0, 0, 0.2);   /* black/20 */
--border-strong: rgba(0, 0, 0, 0.3);    /* black/30 */

/* Semantic */
--color-success: #16a34a;  /* green-600 */
--color-accent-qb: #2CA01C; /* QuickBooks green */
--color-accent-ns: #1A3D6D; /* NetSuite blue */
```

### Dark Mode (Accents / Footer / CTAs)
```css
--bg-black: #000000;
--text-on-dark: #ffffff;
--text-muted-dark: rgba(255, 255, 255, 0.5);
--border-dark: rgba(255, 255, 255, 0.1);
```

---

## 3. Typography System

### Font Stack
```css
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace;
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

### Type Scale

| Element | Size | Weight | Tracking | Transform | Usage |
|---------|------|--------|----------|-----------|-------|
| Hero H1 | 5xl-7xl | Bold | tighter | None | Main headline |
| Section H2 | 3xl-4xl | Bold | tight | None | Section titles |
| Card Title | sm-base | Bold | Normal | None | Card headers |
| Body | base-xl | Normal | Normal | None | Descriptions |
| Label | 9-10px | Medium | wider/widest | Uppercase | Metadata, tags |
| Mono Data | xs-sm | Normal | wider | Uppercase | Stats, codes |

### Label Pattern
```tsx
<div className="font-mono text-[9px] text-black/40 uppercase tracking-wider">
  LABEL TEXT
</div>
```

---

## 4. Spacing System

### Scale (Tailwind)
```
4px   = 1    (gap-1, p-1)
8px   = 2    (gap-2, p-2)
12px  = 3    (gap-3, p-3)
16px  = 4    (gap-4, p-4)
20px  = 5    (gap-5, p-5)
24px  = 6    (gap-6, p-6)
32px  = 8    (gap-8, mb-8)
48px  = 12   (gap-12, py-12)
64px  = 16   (gap-16, mt-16)
80px  = 20   (py-20)
```

### Common Patterns
| Component | Padding |
|-----------|---------|
| Section | `py-20 px-6` |
| Card | `p-5` or `p-6` |
| Card header | `px-4 py-2` or `px-5 py-3` |
| Button (primary) | `px-8 py-5` or `px-10 py-5` |
| Button (small) | `px-4 py-2` |
| Stat box | `p-3` |
| Input | `px-2 py-1` |

---

## 5. Component Patterns

### Card (Report Style)
```tsx
<div className="relative bg-white border border-black/10 hover:border-black/30 hover:shadow-lg transition-all">
  {/* Header bar */}
  <div className="flex items-center justify-between px-4 py-2 border-b border-black/10 bg-black/[0.02]">
    <span className="font-mono text-[9px] text-black/40 tracking-wider">
      RPT-001
    </span>
    <span className="px-2 py-0.5 bg-black text-white font-mono text-[8px] tracking-wider">
      POPULAR
    </span>
  </div>

  {/* Content */}
  <div className="p-5">
    {/* ... */}
  </div>
</div>
```

### Corner Accents
```tsx
{/* Add to card corners for technical feel */}
<div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-black" />
<div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-black" />
<div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-black" />
<div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-black" />
```

### Stat Display
```tsx
<div className="border-l border-black/20 pl-4">
  <div className="text-2xl md:text-3xl font-bold tracking-tight">87%</div>
  <div className="text-xs font-mono text-black/50 mt-1 uppercase tracking-wider">
    Cost Reduction
  </div>
</div>
```

### Primary CTA Button
```tsx
<a
  href="/demo"
  className="inline-flex items-center justify-center px-8 py-5 bg-black text-white font-mono text-sm md:text-base tracking-wider hover:bg-black/90 transition-colors shadow-lg"
>
  MIGRATE YOUR ERP WITH AI
  <span className="ml-3 animate-blink">_</span>
</a>
```

### Secondary CTA Button
```tsx
<a
  href="#use-cases"
  className="inline-flex items-center justify-center px-8 py-5 border-2 border-black text-black font-mono text-sm md:text-base tracking-wider hover:bg-black hover:text-white transition-colors"
>
  TALK TO YOUR ERP
</a>
```

### Includes List (Checkmarks)
```tsx
<div className="flex items-center gap-2 text-xs text-black/60">
  <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0" />
  <span>Data mapping</span>
</div>
```

---

## 6. Animation Patterns

### Animated Counter Hook
```tsx
function useCountAnimation(target: number, duration: number = 2000, startDelay: number = 0) {
  const [count, setCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime

      if (elapsed < startDelay) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      const progress = Math.min((elapsed - startDelay) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3) // Ease out cubic
      setCount(Math.floor(easeOut * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setIsComplete(true)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration, startDelay])

  return { count, isComplete }
}
```

### Usage with Staggered Delays
```tsx
const customers = useCountAnimation(3400, 1800, 300)
const items = useCountAnimation(12000, 2200, 500)
const price = useCountAnimation(8500, 1500, 1000)
```

### Blinking Cursor
```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.animate-blink {
  animation: blink 1s infinite;
}
```

### Progress Bar During Animation
```tsx
{!isComplete && (
  <div
    className="absolute bottom-0 left-0 h-0.5 bg-black/20 animate-pulse"
    style={{ width: `${(count / target) * 100}%` }}
  />
)}
```

---

## 7. Layout Patterns

### Two-Column Hero
```tsx
<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
  {/* Left: Content (headline, stats, CTAs) */}
  <div>...</div>

  {/* Right: Interactive element (quote builder, demo) */}
  <div className="lg:pt-8">...</div>
</div>
```

### 3x3 Grid (Packages)
```tsx
<div className="grid md:grid-cols-3 gap-4">
  {packages.map((pkg, i) => (
    <Card key={i} />
  ))}
</div>
```

### Metadata Bar
```tsx
<div className="flex items-center gap-6 font-mono text-[10px] text-black/40">
  <span>STATUS: OPERATIONAL</span>
  <span>VERSION: 2.0.26</span>
  <span>SECTOR: ERP_INTELLIGENCE</span>
</div>
```

---

## 8. Iconography

### Icon Library
Using **Lucide React** for all icons.

### Common Icons
| Purpose | Icon |
|---------|------|
| Search/Audit | `Search` |
| Database/Migration | `Database` |
| Reports/Charts | `BarChart3` |
| Workflow | `GitBranch` |
| Code/Scripts | `Code` |
| Documents | `FileText`, `FileCheck`, `FileSpreadsheet` |
| Integration | `Globe` |
| Duplicates | `Trash2` |
| Success | `CheckCircle2`, `Check` |
| Arrow | `ArrowRight` |
| Loading | `Loader2` |

### Icon Sizing
```
w-3 h-3   = Inline with small text
w-4 h-4   = Inline with body text
w-5 h-5   = Card icons
w-6 h-6   = Feature icons
w-10 h-10 = Hero/large icons (in containers)
```

---

## 9. Visual Effects

### Dither Overlay
Subtle noise texture for depth:
```tsx
<DitherOverlay intensity="light" />
```

### ASCII Decorations
Corner flourishes for technical aesthetic:
```tsx
<AsciiDecoration variant="corner" />
```

### ASCII Dividers
```tsx
<div className="font-mono text-xs text-black/20 overflow-hidden whitespace-nowrap">
  {'░'.repeat(200)}
</div>
```

### Grain Overlay (Full Page)
```tsx
<GrainOverlay />
```

---

## 10. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | < 640px (sm) | Single column, stacked CTAs |
| Tablet | 640-1024px (md) | 2-3 columns, reduced spacing |
| Desktop | > 1024px (lg) | Full layout, side-by-side hero |

### Key Responsive Classes
```tsx
// Typography scaling
className="text-5xl md:text-6xl lg:text-7xl"

// Grid columns
className="grid md:grid-cols-3 gap-4"

// Flex direction
className="flex flex-col sm:flex-row gap-4"

// Conditional visibility
className="hidden sm:inline"
```

---

## 11. File Structure

```
src/
├── app/
│   └── page.tsx              # Main landing page
├── components/
│   └── landing/
│       ├── hero-section.tsx      # Hero with migration quote
│       ├── packages-section.tsx  # 3x3 report grid
│       ├── use-case-tabs.tsx     # Interactive use cases
│       ├── features-section.tsx  # Feature list
│       ├── comparison-section.tsx # vs consultants
│       ├── cta-section.tsx       # Final CTA
│       ├── ascii-decoration.tsx  # Decorative elements
│       └── dither-overlay.tsx    # Texture overlays
```

---

## 12. Key Principles Summary

1. **Light mode dominant** — White backgrounds, black text
2. **Monospace for data** — All labels, stats, metadata in mono
3. **Uppercase labels** — Small, tracked-out, muted color
4. **No border-radius** — Sharp corners everywhere
5. **Subtle borders** — `border-black/10` default
6. **Animation on data** — Numbers should feel calculated
7. **Fixed pricing prominent** — The value prop is clarity
8. **Report aesthetic** — Cards should feel like documents
9. **CTAs are bold** — Large, black, impossible to miss
10. **Technical credibility** — ASCII art, version numbers, status indicators

---

*This document defines the visual language for the Consultant Killer landing page. All new components should follow these patterns.*
