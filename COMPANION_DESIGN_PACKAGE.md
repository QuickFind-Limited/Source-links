# Companion Page Design Package

## Overview
This document contains the complete design specifications for the `/companion` page, including color schemes, typography, layouts, component styles, and graph specifications.

---

## 🎨 Color Palette (Minimalistic Monochrome)

### Philosophy
**Strict minimalism**: Use only black, white, and opacity variations. No colors except for critical status indicators (use sparingly).

### Primary Scale (Black to White)
```
#000000  ████████  Pure Black (primary elements, data, borders)
#1A1A1A  ███████░  Near Black (secondary emphasis)
#333333  ██████░░  Dark Gray (tertiary lines)
#4D4D4D  █████░░░  Medium-Dark Gray
#666666  ████░░░░  Medium Gray (reference lines)
#808080  ███░░░░░  True Middle Gray
#999999  ██░░░░░░  Light Gray (inactive states)
#B3B3B3  █░░░░░░░  Very Light Gray
#CCCCCC  ░░░░░░░░  Barely There Gray
#E5E5E5  ░░░░░░░░  Almost White (backgrounds)
#F5F5F5  ░░░░░░░░  Off White (form elements)
#FAFAFA  ░░░░░░░░  Near White (text areas)
#FFFFFF  ░░░░░░░░  Pure White (canvas)
```

### Opacity-Based Palette (Preferred Method)
- **100% Black**: `rgba(0, 0, 0, 1.0)` - Primary elements
- **80% Black**: `rgba(0, 0, 0, 0.8)` - Primary text
- **60% Black**: `rgba(0, 0, 0, 0.6)` - Secondary text
- **40% Black**: `rgba(0, 0, 0, 0.4)` - Tertiary text, icons
- **30% Black**: `rgba(0, 0, 0, 0.3)` - Placeholders
- **20% Black**: `rgba(0, 0, 0, 0.2)` - Borders (hover)
- **15% Black**: `rgba(0, 0, 0, 0.15)` - Heatmap medium
- **10% Black**: `rgba(0, 0, 0, 0.1)` - Borders (default)
- **5% Black**: `rgba(0, 0, 0, 0.05)` - Dividers, grid lines
- **2% Black**: `rgba(0, 0, 0, 0.02)` - Background tints
- **1% Black**: `rgba(0, 0, 0, 0.01)` - Subtle backgrounds

### Status Colors (Use Only When Critical)
> Use monochrome first. Only use status colors for critical alerts.

- **Success**: `#10B981` (Green) - Use for confirmations only
- **Warning**: `#F59E0B` (Amber) - Use for cautions only  
- **Error**: `#DC2626` (Red) - Use for errors only

**Guideline**: If it can be communicated with text/icon, don't use color.

---

## 📐 Typography

### Font Families
- **Primary (Sans)**: System default, tracking-tight
- **Mono**: Font-mono (for labels, metadata, technical info)

### Font Sizes & Use Cases

#### Headers
- **Hero (H1)**: `text-4xl md:text-5xl lg:text-6xl` (36-60px)
- **Section (H2)**: `text-3xl md:text-4xl` (30-36px)
- **Subsection (H3)**: `text-2xl md:text-3xl` (24-30px)
- **Card Title (H4)**: `text-xl` (20px)

#### Body Text
- **Large**: `text-xl` (20px) - Selector dropdowns
- **Base**: `text-base` (16px) - Main content, chatbot responses
- **Small**: `text-sm` (14px) - Descriptions, secondary content
- **Extra Small**: `text-xs` (12px) - Labels, metadata
- **Tiny**: `text-[10px]` (10px) - Uppercase labels, status
- **Micro**: `text-[9px]` (9px) - Fine print, legends

#### Mono Typography
- **Labels**: `text-xs font-mono uppercase tracking-wider` (12px)
- **Status**: `text-[10px] font-mono uppercase tracking-wider` (10px)
- **Code**: `text-[11px] font-mono` (11px)

### Letter Spacing
- **Uppercase Labels**: `tracking-[0.2em]` or `tracking-wider`
- **Headers**: `tracking-tight` or `tracking-tighter`
- **Body**: Default tracking

---

## 📏 Layout System

### Grid Layouts

#### Two-Column Partitioned (Phase >= 6)
```css
grid lg:grid-cols-[1fr_2fr]
```
- **Left Column (1/3)**: Chatbot response, analysis output
- **Right Column (2/3)**: User input form, interaction area

#### Centered Single Column (Phase < 6)
```css
max-w-2xl mx-auto
```
- **Max Width**: 672px
- **Centered**: Horizontally centered
- **Use**: Form selectors, initial input

### Section Structure
```
┌─────────────────────────────────────────────┐
│  Section Container (max-w-5xl mx-auto)      │
│  ┌───────────────────────────────────────┐  │
│  │  Border Container (border)            │  │
│  │  ┌─────────────┬─────────────────┐   │  │
│  │  │ Left (1/3)  │ Right (2/3)     │   │  │
│  │  │ Response    │ Input Form      │   │  │
│  │  └─────────────┴─────────────────┘   │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Spacing Scale
- **Gap 2**: `0.5rem` (8px)
- **Gap 3**: `0.75rem` (12px)
- **Gap 4**: `1rem` (16px)
- **Gap 6**: `1.5rem` (24px)
- **Gap 8**: `2rem` (32px)
- **Gap 12**: `3rem` (48px)

### Padding
- **Container**: `p-8` (32px)
- **Card**: `p-6` (24px)
- **Input**: `px-5 py-4` (20px/16px)
- **Button**: `px-6 py-3` (24px/12px)

---

## 🎯 Component Specifications

### Selector Dropdowns

#### Visual Specs
- **Background**: `#f5f5f5`
- **Border**: `1px solid rgba(0,0,0,0.1)`
- **Padding**: `24px` horizontal, `12px` vertical
- **Border Radius**: `0` (square corners)
- **Min Width**: Department: 200px, Role: 280px

#### States
- **Default**: `border-black/10`
- **Open**: `border-black` + chevron rotates 180°
- **Selected**: Text changes to black, border becomes `border-black/20`

#### Dropdown Menu
- **Background**: `#FFFFFF`
- **Border**: `1px solid rgba(0,0,0,0.1)`
- **Shadow**: `shadow-lg`
- **Max Height**: `240px` (scrollable)
- **Option Padding**: `px-4 py-2.5`
- **Option Hover**: `bg-black/5`
- **Selected Option**: `bg-black/5`

### AI Response Card

#### Header Section
- **Avatar**: 32x32px circle, black background
- **Icon**: Sparkles, 16x16px, white
- **Name**: "Source AI" - `text-sm font-medium`
- **Title**: "Financial Systems Specialist" - `text-xs text-black/40`
- **Border Bottom**: `1px solid rgba(0,0,0,0.05)`
- **Padding Bottom**: `12px`

#### Content Section
- **Main Text**: `text-base text-black/80 leading-relaxed`
- **Analysis Header**: `text-xs font-medium text-black/40 uppercase tracking-wider`
- **Analysis Items**: Arrow `→` + `text-sm text-black/60`
- **Final Message**: `text-sm text-black/70 leading-relaxed`

#### Continue Button (Inside Response)
- **Width**: `w-full`
- **Padding**: `py-2.5` (10px)
- **Border**: `1px solid rgba(0,0,0,0.1)`
- **Text**: `font-mono text-xs tracking-wider`
- **Hover**: `border-black/30`
- **Active**: `bg-black text-white scale-[0.98]`

### Input Field
- **Background**: `#fafafa`
- **Border**: `1px solid rgba(0,0,0,0.2)`
- **Border (Focus)**: `1px solid #000000`
- **Min Height**: `160px`
- **Padding**: `20px 16px`
- **Font Size**: `text-base` (16px)

### Continue Button (Main)
- **Padding**: `px-20 py-4` (80px/16px)
- **Border**: `2px solid #000000`
- **Font Size**: `text-xl` (20px)
- **Font Weight**: `font-normal`
- **Hover**: Background transitions to black, text to white

---

## ⚡ Animation Specifications

### Timing Functions
- **Cursor Movement**: `300ms ease-out`
- **Fade In**: `500-700ms`
- **Slide In**: `500-700ms`
- **Typewriter Speed**: `18-20ms per character`
- **Phase Transitions**: `700ms`

### Animation Delays
- **Department Select**: `400ms` start
- **Role Select**: `1200ms` delay after department
- **Input Appearance**: `600ms` after role selected
- **Chatbot Response**: `3000ms` after submission

### Keyframe Animations
- **Cursor Pulse**: Scale from 1.0 to 0.9 on click
- **Thinking Dots**: Bounce with staggered delays (0ms, 150ms, 300ms)
- **Chevron Rotate**: 180° when dropdown opens
- **Scale Effect**: `scale-[0.98]` on button press

---

## 📊 Graph & Data Visualization Specs

### System Architecture Graph
**Use Case**: Connection discovery section showing integrations

#### Layout
- **Canvas**: SVG viewBox="0 0 100 100" (percentage-based)
- **Background**: `#fafafa` or `#f5f5f5`

#### Nodes
- **Core System (NetSuite)**:
  - Size: `px-4 py-3`
  - Background: `#000000`
  - Text: `#FFFFFF`
  - Border: `2px solid #000000`
  - Font: `text-[10px] font-mono font-medium`

- **Connected Systems**:
  - Size: `px-3 py-2`
  - Background: Dynamic based on status
  - Border: `1px solid` + dynamic color
  - Font: `text-[10px] font-mono`

#### Status Colors
- **Healthy**: `border-black/10 bg-white`
- **Warning**: `border-amber-300 bg-amber-50`
- **Error**: `border-red-300 bg-red-50`

#### Connection Lines
- **Stroke Width**: `0.3`
- **Healthy**: `#d1d5db` (gray-300)
- **Warning**: `#d97706` (amber-600)
- **Error**: `#dc2626` (red-600)
- **Path Type**: Quadratic Bezier curve
- **Animation**: Fade in with staggered delay (50ms per line)

### Progress Indicators

#### Step Cards
- **Container**: Border with padding `p-4`
- **Icon Box**: `40x40px`
- **Pending**: `bg-black/[0.02] border-transparent`
- **Active**: `bg-black/10 border-black/20`
- **Complete**: `bg-black border-black/10`

#### Progress Dots
- **Size**: `8x8px` rounded-full
- **Spacing**: `gap-2`
- **Complete**: `bg-green-500`
- **Current**: `bg-black w-6` (elongated)
- **Pending**: `bg-black/20`

### Data Cards & Stats

#### Stat Display
```
┌───────────────┐
│    3.4K       │  ← text-2xl font-bold
│  CUSTOMERS    │  ← text-[9px] font-mono uppercase text-black/40
└───────────────┘
```

#### Result Card
- **Border**: `1px solid rgba(0,0,0,0.1)`
- **Padding**: `12px`
- **Title Bar**: `bg-black/[0.03] border-b px-3 py-1.5`
- **Title Font**: `text-[10px] font-mono uppercase tracking-wider`
- **Content**: `p-3 text-xs`

### Chart Color Palette (Minimalistic Monochrome)
```javascript
const chartColors = {
  // Line/Bar Gradients (Grayscale)
  line1: '#000000',     // Darkest - primary metric
  line2: '#333333',     // Dark gray
  line3: '#666666',     // Medium gray
  line4: '#999999',     // Light gray
  line5: '#CCCCCC',     // Very light gray
  
  // Backgrounds & Grids
  background: '#FFFFFF',
  gridLines: 'rgba(0,0,0,0.05)',    // Subtle grid
  gridLinesAlt: 'rgba(0,0,0,0.02)', // Even more subtle
  axis: 'rgba(0,0,0,0.2)',          // Axis lines
  
  // Text
  labelPrimary: 'rgba(0,0,0,0.8)',
  labelSecondary: 'rgba(0,0,0,0.4)',
  
  // Interactive Elements
  hover: 'rgba(0,0,0,0.05)',        // Hover highlight
  selected: '#000000',               // Selected item
  tooltip: '#FFFFFF',
  tooltipBorder: 'rgba(0,0,0,0.1)',
  tooltipShadow: 'rgba(0,0,0,0.1)'
}
```

---

## 🎭 Animation Flow & Phases

### Phase Timeline

```
Phase 0 (0.0s - 0.4s)
├─ Initial state
└─ Cursor appears

Phase 1 (0.4s - 1.8s)
├─ Click department dropdown
├─ Show 10 options
├─ Select "Finance"
└─ Dropdown closes

Phase 2 (1.8s - 3.6s)
├─ Click role dropdown
├─ Show 10 options
├─ Select "CFO / Finance Director"
└─ Dropdown closes

Phase 3 (3.6s - 8.5s)
├─ Input box appears (auto-transition)
├─ Cursor moves to input
├─ Types full prompt (~4s)
├─ Moves to Continue button
└─ Clicks Continue

Phase 4 (8.5s - 9.5s)
└─ Processing/Understanding animation

Phase 5 (9.5s - 11.5s)
└─ Analyzing state with spinner

Phase 6 (11.5s - 18.5s)
├─ Layout shifts to 1:2 grid
├─ Chatbot response appears (left)
├─ Main text types out (~2.5s)
├─ 3 analysis steps type sequentially (~3.5s)
├─ Final message types (~2s)
├─ Continue button fades in
├─ Cursor clicks button
└─ Smooth scroll to next section
```

### Total Duration
**~18.5 seconds** from start to scroll

---

## 📦 Component Library

### Buttons

#### Primary Button
```tsx
className="bg-black text-white border-2 border-black 
          px-20 py-4 text-xl font-normal 
          hover:bg-black/90 transition-all"
```

#### Secondary Button (Response)
```tsx
className="border border-black/10 bg-white text-black/80
          py-2.5 px-4 font-mono text-xs tracking-wider
          hover:border-black/30 transition-all"
```

#### Button States
- **Default**: White background, subtle border
- **Hover**: Darker border
- **Pressed**: `scale-[0.98]`
- **Active**: Black background, white text

### Cards

#### Response Card
```css
padding: 32px
background: #FFFFFF
border: 1px solid rgba(0,0,0,0.1)
```

#### Step Card
```css
padding: 16px
border: 1px solid rgba(0,0,0,0.1)
background: rgba(0,0,0,0.02) when active
```

### Icons
- **Standard Size**: `w-4 h-4` (16px)
- **Large Size**: `w-5 h-5` (20px)
- **Avatar**: `w-8 h-8` (32px)
- **Color**: `text-black/40` default

---

## 📈 Graph Specifications

### 1. Connection Flow Diagram

**Purpose**: Show system integrations and data flows

#### Dimensions
- **Width**: 100% of container
- **Height**: 500px minimum
- **Aspect Ratio**: Responsive, maintains connections

#### Node Specifications
```
Core Node (NetSuite):
  - Position: Center (50%, 50%)
  - Size: 80x60px
  - Background: #000000
  - Text: #FFFFFF
  - Font: 14px mono bold

Connected Systems:
  - Size: 60x45px
  - Background: #FFFFFF
  - Border: 1px with status color
  - Font: 10px mono
  - Shadow: Optional subtle shadow
```

#### Connection Lines
- **Type**: SVG path with quadratic curves
- **Formula**: `M x1 y1 Q mx my x2 y2`
- **Stroke**: 2-3px width
- **Colors**: Status-based (see status colors above)
- **Animation**: Dash array animation or opacity fade-in

#### Legend
```
Position: bottom-left
Font: 9px mono
Spacing: gap-4 horizontal

● OK (gray circle)
● Warning (amber circle)  
● Error (red circle)
```

### 2. Timeline/Progress Graph

**Purpose**: Show migration phases or onboarding steps

#### Horizontal Timeline
```
Step 1 ────●──── Step 2 ────●──── Step 3
        ↓              ↓              ↓
   [Content]      [Content]      [Content]
```

**Specifications**:
- **Line Height**: 2px
- **Line Color**: `rgba(0,0,0,0.1)` incomplete, `#000000` complete
- **Dot Size**: 16x16px
- **Dot Border**: 4px white border
- **Transition**: Width animates to show progress

### 3. Statistical Bar Charts

**Purpose**: Data volume display, comparison metrics

#### Bar Specifications
```
Height: Variable based on value
Min Height: 40px
Max Height: 200px
Width: 60px per bar
Spacing: 16px gap
Background: #000000 for active bars
Background: rgba(0,0,0,0.1) for comparison bars
```

#### Labels
- **Value Label**: Above bar, `text-base font-bold`
- **Category Label**: Below bar, `text-[9px] font-mono uppercase text-black/40`

### 4. Stat Cards (Grid Display)

**Layout**: `grid grid-cols-3 gap-4`

```
┌──────────┬──────────┬──────────┐
│   3.4K   │   12K    │  5 yrs   │
│ Customers│  Items   │ History  │
└──────────┴──────────┴──────────┘
```

**Specs**:
- **Value**: `text-2xl font-bold`
- **Label**: `text-[9px] font-mono uppercase text-black/40`
- **Alignment**: Center
- **Padding**: Minimal

### 5. Issue Status Indicators

**Purpose**: Show system health, problems detected

#### Visual Format
```
🔴 Critical Issue Title
    └─ Description text below
    └─ Metric or count

⚠️ Warning Title  
    └─ Description text below
```

**Colors**:
- Critical: Red left border `border-l-red-400`, background `bg-red-50/50`
- Warning: Amber left border `border-l-amber-400`, background `bg-amber-50/50`
- **Border Width**: `2px` on left
- **Padding**: `12px`

### 6. Line Charts (Minimalistic)

**Purpose**: Show trends, performance over time, benchmarking

#### Visual Style (Inspired by Multi-Line Comparison Charts)
- **Lines**: Ultra-thin strokes (1-1.5px), no fills, no area charts
- **Colors**: Strictly grayscale - use opacity for multiple lines
- **Grid**: Minimal horizontal lines only `rgba(0,0,0,0.03)`
- **Background**: Pure white `#FFFFFF`
- **Multiple Lines**: Differentiate with stroke weight and opacity, not color
- **No shadows, no gradients, no colors, no decorations**

**Multi-Line Differentiation Strategy**:
```
When showing multiple datasets (like benchmarking):

Line 1 (Primary/Current):  2px solid #000000
Line 2 (Comparison):       1.5px solid rgba(0,0,0,0.6)
Line 3 (Reference):        1.5px solid rgba(0,0,0,0.4)
Line 4 (Baseline):         1px dashed rgba(0,0,0,0.3)
Line 5+ (Historical):      1px solid rgba(0,0,0,0.2)

Use line weight + opacity instead of color
```

#### Specifications
```
Canvas:
  - Width: 100% container
  - Height: 400-600px
  - Padding: 40px all sides
  - Background: #FFFFFF

Lines:
  - Stroke Width: 1.5px
  - Stroke Cap: round
  - Stroke Join: round
  - Primary: #000000 (2px for emphasis)
  - Secondary: #666666
  - Tertiary: #CCCCCC

Grid:
  - Horizontal only
  - Stroke: rgba(0,0,0,0.05)
  - Stroke Width: 1px
  - Dashed: Optional [4, 4]

Axes:
  - Stroke: rgba(0,0,0,0.2)
  - Stroke Width: 1px
  - Labels: text-xs font-mono text-black/40
  - Ticks: 3px length

Data Points:
  - Circles: 4-6px diameter
  - Fill: Line color
  - Stroke: #FFFFFF (2px for separation)
  - Show on hover only (optional)

Legend:
  - Position: top-right or bottom
  - Font: text-xs font-mono
  - Format: ─── Label (line + text)
  - No background box
```

### 7. Heatmap (Minimalistic Grayscale)

**Purpose**: Show intensity, frequency, usage patterns

#### Visual Approach
```
NO COLORS - Use black opacity gradients only

Intensity Scale:
  0%   → rgba(0,0,0,0.0)  - White/Empty
  25%  → rgba(0,0,0,0.05) - Very light gray
  50%  → rgba(0,0,0,0.15) - Light gray
  75%  → rgba(0,0,0,0.35) - Medium gray
  100% → rgba(0,0,0,0.6)  - Dark gray
```

#### Cell Specifications
```
Cell:
  - Size: 24x24px minimum, 40x40px ideal
  - Border: 1px solid rgba(0,0,0,0.05)
  - Corner Radius: 0 (square)
  - Hover: Darker border + subtle scale

Layout:
  - Gap: 2px between cells
  - Labels: text-[10px] font-mono
  - Axis labels: text-black/40

Tooltip (on hover):
  - Background: #FFFFFF
  - Border: 1px solid rgba(0,0,0,0.1)
  - Shadow: subtle
  - Padding: 8px 12px
  - Font: text-xs
  - Format: "Value: X | Label: Y"
```

#### Example Layout
```
        Mon  Tue  Wed  Thu  Fri
9am     ▓    ▓▓   ▓    ░    ░
10am    ▓▓   ▓▓▓  ▓▓   ▓    ░
11am    ▓▓▓  ▓▓▓  ▓▓▓  ▓▓   ▓
12pm    ▓▓   ▓    ▓▓   ▓    ▓
1pm     ▓    ░    ▓    ▓▓   ▓▓

Legend: ░ Low   ▓ Medium   ▓▓ High   ▓▓▓ Very High
```

### 8. Benchmarking Score Display

**Purpose**: Compare performance, show metrics, ratings

#### Score Card Design (Minimalistic)
```
┌────────────────────────┐
│  METRIC NAME           │  ← text-[10px] mono uppercase
│                        │
│      85                │  ← text-4xl font-bold
│      /100              │  ← text-lg text-black/40
│                        │
│  ▓▓▓▓▓▓▓▓▓░            │  ← Visual bar (10 segments)
│                        │
│  Above Average         │  ← text-xs text-black/60
└────────────────────────┘
```

#### Bar Specifications
```
Progress Bar:
  - Width: 100%
  - Height: 4px
  - Background: rgba(0,0,0,0.05)
  - Fill: #000000
  - Border Radius: 0
  - Segmented style: 10 individual bars with 2px gap

Segmented Bar:
  - 10 segments total
  - Segment Width: calc((100% - 18px) / 10)
  - Gap: 2px
  - Filled: #000000
  - Empty: rgba(0,0,0,0.05)
```

#### Score Comparison Layout
```
Grid: grid-cols-2 md:grid-cols-4 gap-4

┌─────────┬─────────┬─────────┬─────────┐
│   85    │   72    │   91    │   68    │
│ Speed   │ Quality │ Cost    │ Support │
│ ▓▓▓▓▓░  │ ▓▓▓▓░░  │ ▓▓▓▓▓▓  │ ▓▓▓░░░  │
└─────────┴─────────┴─────────┴─────────┘
```

### 9. Comparison Table (Minimalistic)

**Purpose**: Side-by-side comparisons, before/after

```
Layout: Borderless table with dividers

┌──────────────────┬─────────────┬─────────────┐
│                  │   Current   │   After AI  │
├──────────────────┼─────────────┼─────────────┤
│ Processing Time  │   4.5 hrs   │   0.5 hrs   │
│ Error Rate       │     12%     │      2%     │
│ Manual Steps     │     47      │      3      │
└──────────────────┴─────────────┴─────────────┘
```

#### Table Specifications
```
Table:
  - Border: None on outer edge
  - Cell Padding: px-4 py-3
  - Border Between: 1px solid rgba(0,0,0,0.05)
  - Background: Alternating rows rgba(0,0,0,0.01)

Headers:
  - Font: text-xs font-mono uppercase
  - Color: text-black/40
  - Weight: font-medium
  - Border Bottom: 1px solid rgba(0,0,0,0.1)

Values:
  - Font: text-sm font-mono tabular-nums
  - Color: text-black/80
  - Better values: font-bold
  - Alignment: Center or right-aligned
```

### 10. Minimal Data Visualization Principles

#### Core Rules
1. **No Colors** - Only black, white, and gray
2. **Thin Lines** - 1-2px maximum
3. **Subtle Grid** - 5% opacity maximum
4. **Clear Labels** - Mono font, uppercase, small
5. **White Space** - Don't fill every pixel
6. **Clean Typography** - Tabular numbers, consistent sizing
7. **Hover Only** - Show details on interaction, not always
8. **Purposeful Marks** - Every element must have meaning

#### What to Avoid
- ❌ Drop shadows
- ❌ Gradients
- ❌ Multiple colors
- ❌ 3D effects
- ❌ Heavy borders (>2px)
- ❌ Background fills
- ❌ Decorative elements
- ❌ Rounded corners on data elements

#### What to Use
- ✅ Line weight variation for hierarchy
- ✅ Opacity levels for depth
- ✅ Negative space for breathing room
- ✅ Monospace fonts for data
- ✅ Sharp corners and clean edges
- ✅ Simple geometric shapes
- ✅ Text labels over legends when possible
- ✅ Subtle animations on interaction

---

## 🎬 Animation Curves & Timing

### Transition Curves
```css
/* Default smooth */
transition-all duration-300 ease-out

/* Fast interactions */
transition-all duration-200

/* Layout shifts */
transition-all duration-700

/* Typewriter */
Character delay: 18-20ms (50-55 chars/sec)
```

### Animation Classes (Tailwind)
- `animate-in fade-in` - Opacity 0 → 1
- `slide-in-from-left-5` - Translate from left 20px
- `slide-in-from-right-5` - Translate from right 20px
- `slide-in-from-bottom-2` - Translate from bottom 8px
- `animate-pulse` - Continuous pulsing (cursor, status)
- `animate-spin` - Loading spinner
- `animate-bounce` - Scroll indicators

---

## 🖼️ Visual Assets Guidelines

### Icons
- **Library**: Lucide React
- **Style**: Outline/stroke based, 2px stroke width
- **Size**: Consistent 16px or 20px
- **Color**: Match text color or specific status

### Cursor
- **Type**: Custom SVG pointer
- **Fill**: `#000000`
- **Stroke**: `#FFFFFF` (1.5px for visibility)
- **Size**: 24x24px
- **Click Effect**: Ping animation with `bg-black/20`

### Illustrations
- **Style**: Minimalist, line-based
- **Colors**: Monochrome with accent colors
- **Format**: SVG preferred for scalability

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
default: < 768px (full width, stacked)

/* Tablet */
md: 768px - 1024px

/* Desktop */
lg: 1024px+ (grid layouts activate)
  - Two-column grids appear
  - Horizontal layouts expand
```

### Mobile Adjustments
- Grid columns collapse to single column
- Font sizes reduce by ~20%
- Padding reduces from `p-8` to `p-6`
- Gap reduces from `gap-8` to `gap-6`

---

## 🎨 Design Principles

### Visual Hierarchy
1. **Bold Typography** for emphasis
2. **Monospace** for technical/system info
3. **Opacity levels** create depth (80% → 60% → 40% → 30%)
4. **Borders** for separation and structure

### Interaction Design
1. **Immediate feedback** on all interactions
2. **Cursor shows intent** before actions
3. **Animations are purposeful** not decorative
4. **Progressive disclosure** (show info when relevant)

### Content Strategy
1. **Conversational tone** for AI responses
2. **Technical precision** in analysis steps
3. **Action-oriented** CTA text
4. **Clear value propositions** in descriptions

---

## 📊 Minimalistic Data Visualization Examples

### Heatmap: System Usage Patterns

#### Design Approach
```
Pure monochrome - intensity shown through black opacity only

Visual Example:
        Mon   Tue   Wed   Thu   Fri   Sat   Sun
00:00   □     □     □     □     □     □     □     (0-10%)
04:00   □     □     □     □     □     □     □     (0-10%)
08:00   ▤     ▥     ▥     ▤     ▥     □     □     (40-60%)
12:00   ▥     ▥     ▥     ▥     ▥     ▤     □     (50-70%)
16:00   ▦     ▦     ▥     ▦     ▥     ▤     □     (60-80%)
20:00   ▤     ▤     ▤     ▥     ▤     ▤     □     (30-50%)

Legend:
□ = 0-20% (white/barely visible)
▤ = 20-40% (light gray)
▥ = 40-60% (medium-light gray)
▦ = 60-80% (medium-dark gray)
█ = 80-100% (dark gray/black)
```

#### Implementation Specs
```css
.heatmap-cell {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0,0,0,0.05);
  background: rgba(0,0,0,0.0); /* Base */
  transition: all 200ms ease;
}

.heatmap-cell:hover {
  border-color: rgba(0,0,0,0.2);
  transform: scale(1.05);
}

/* Intensity Classes */
.intensity-0   { background: rgba(0,0,0,0.0); }   /* 0-10% */
.intensity-1   { background: rgba(0,0,0,0.05); }  /* 10-20% */
.intensity-2   { background: rgba(0,0,0,0.1); }   /* 20-30% */
.intensity-3   { background: rgba(0,0,0,0.15); }  /* 30-40% */
.intensity-4   { background: rgba(0,0,0,0.2); }   /* 40-50% */
.intensity-5   { background: rgba(0,0,0,0.3); }   /* 50-60% */
.intensity-6   { background: rgba(0,0,0,0.4); }   /* 60-70% */
.intensity-7   { background: rgba(0,0,0,0.5); }   /* 70-80% */
.intensity-8   { background: rgba(0,0,0,0.6); }   /* 80-90% */
.intensity-9   { background: rgba(0,0,0,0.75); }  /* 90-100% */
```

### Benchmarking: Performance Scores

#### Horizontal Bar Chart (Minimalistic)
```
Category Name                    ▓▓▓▓▓▓▓▓▓░  85/100
Another Metric                   ▓▓▓▓▓▓░░░░  65/100
Third Category                   ▓▓▓▓▓▓▓▓▓▓  95/100
Fourth Item                      ▓▓▓▓░░░░░░  42/100
```

**Specifications**:
```
Bar Container:
  - Height: 8px
  - Width: 200px fixed or 100% fluid
  - Background: rgba(0,0,0,0.05)
  - Border: None

Bar Fill:
  - Background: #000000
  - Height: 100%
  - Width: percentage of score
  - Transition: width 400ms ease-out

Label Layout:
  - Left: Category name (text-sm)
  - Right: Score + bar (flex gap-3)
  - Alignment: items-center
  - Gap: 12px between rows

Score Display:
  - Font: text-sm font-mono tabular-nums
  - Format: "85/100" or "85%"
  - Color: text-black/80
  - Position: After bar
```

#### Comparison Bars (Side-by-side)
```
                Before AI          After AI
Speed           ▓░░░░░ 35%        ▓▓▓▓▓▓▓▓░ 88%
Accuracy        ▓▓░░░░ 42%        ▓▓▓▓▓▓▓▓▓ 97%
Cost            ▓▓▓▓▓▓ 68%        ▓▓░░░░░░░ 28% ← Lower is better
```

**Layout**: `grid grid-cols-[1fr_auto_auto] gap-4`

### Scatter Plot (Minimalistic)

**Purpose**: Correlation, outlier detection

```
Implementation:
  - Points: 4-6px circles
  - Fill: rgba(0,0,0,0.4)
  - Stroke: rgba(0,0,0,0.6) on hover
  - Grid: rgba(0,0,0,0.05) both axes
  - No background fill
  - Axes: 1px rgba(0,0,0,0.2)
  
Quadrants (optional):
  - Divide with dashed lines
  - rgba(0,0,0,0.1)
  - Labels in corners (text-xs font-mono)
```

### Ranking/Leaderboard

**Purpose**: Show relative performance

```
┌─────────────────────────────────────┐
│  #1  Item Name             98  ▓▓▓▓▓│
│  #2  Second Item           92  ▓▓▓▓░│
│  #3  Third Place           87  ▓▓▓▓░│
│  #4  Fourth                81  ▓▓▓░░│
│  #5  Fifth Item            76  ▓▓▓░░│
└─────────────────────────────────────┘

Specs:
  - Rank: text-xs font-mono text-black/40
  - Name: text-sm text-black/80
  - Score: text-sm font-bold font-mono
  - Bar: 50px width, 4px height, inline
  - Row Height: 48px
  - Border Between: 1px solid rgba(0,0,0,0.05)
  - Hover: bg-black/[0.02]
```

### Sparklines (Inline Micro Charts)

**Purpose**: Show trends at a glance

```
Revenue: $45K  ▁▂▃▄▅▆▇█▇▆  +12%
Orders:   234  ▃▄▄▅▆▅▄▃▄▅  +5%
```

**Specifications**:
```
SVG Line Chart:
  - Width: 80px
  - Height: 24px
  - Line: 1px stroke
  - Color: rgba(0,0,0,0.6)
  - No axes, no grid
  - No fill under line
  - Inline with text
```

---

## 🔧 Implementation Notes

### State Management
```javascript
// Key states for animations
phase: 0-6 (controls overall flow)
hasStarted: boolean (triggers animation)
showMainText: boolean (triggers typewriter)
showButton: boolean (shows CTA after content)
```

### Cursor Positioning
```javascript
// Relative to container
getRelativePosition(ref, offsetX, offsetY) => {x, y}

// Common offsets
Text input: (20, 20) - top-left corner
Button center: (width/2, 20) - centered
Dropdown option: (20, 10) - left-aligned
```

### Performance Considerations
- Use `IntersectionObserver` to trigger animations only when in viewport
- Debounce resize events for cursor repositioning
- Cleanup timers on component unmount
- Use CSS transforms for animations (GPU accelerated)

---

## 📋 Checklist for New Sections

When creating new animated sections:

- [ ] Define clear phases (0-N)
- [ ] Set up intersection observer for viewport detection
- [ ] Create refs for all interactive elements
- [ ] Calculate relative cursor positions
- [ ] Sequence animations with setTimeout
- [ ] Add cleanup in useEffect return
- [ ] Test cursor positioning on different screen sizes
- [ ] Ensure min-height prevents layout shifts
- [ ] Add hover states for better UX
- [ ] Include loading/processing states

---

## 🎯 Future Enhancement Ideas

### Interactive Elements
- Real dropdown with search/filter
- Multi-select with tags
- Drag-and-drop file upload
- Progress bars with percentage
- Real-time data streaming effect

### Visualizations
- Network topology graph with zoom
- Gantt chart for timeline
- Sankey diagram for data flows
- Heat map for usage patterns
- Tree view for data structure

### Animations
- Particle effects on completion
- Morphing transitions between states
- Parallax scrolling effects
- Liquid/fluid animations
- Confetti on success states

---

## 📞 Contact & Support

For questions about this design system:
- Review component code in `/src/app/companion/page.tsx`
- Check shared components in `/src/components/ui/`
- Reference landing components in `/src/components/landing/`

---

## 🖼️ Visual Style Reference

### Minimalistic Data Visualization Inspiration

The design follows **strict minimalism** principles inspired by research papers, scientific journals, and financial reports:

#### Key Characteristics
1. **Monochrome Only** - Pure black and white with gray gradients
2. **Information Density** - Show maximum data with minimum ink
3. **No Chart Junk** - Every pixel serves a purpose
4. **Subtle Grid** - Grid should fade into background (2-5% opacity)
5. **Clean Typography** - Mono fonts for data, sans for labels
6. **Line Weight Hierarchy** - Differentiate through thickness, not color

#### Reference: Multi-Line Time Series
```
Example: "Money balance over time - Average across 5 runs"

Style Guide:
├─ Y-axis: Left side, light gray text
├─ X-axis: Bottom, day intervals
├─ Grid: Horizontal only, barely visible
├─ Lines: Multiple overlapping, various gray shades
├─ Legend: Minimal, right side or inline
└─ Background: Pure white, no fills

Visual Hierarchy:
  Primary metric     → 2px black line (#000)
  Secondary metrics  → 1.5px dark gray (#333, #666)
  Tertiary metrics   → 1px light gray (#999, #CCC)
  Grid/Reference     → 1px ultra-light (rgba 5%)
```

#### For Benchmarking Scores
```
Visual Strategy:
  - Show multiple benchmark runs as thin gray lines
  - Highlight current/best as thicker black line
  - Use line endpoints to show final scores
  - Annotate with small labels (9-10px mono)
  - Keep legend minimal or eliminate entirely
  - Use direct labeling when possible
```

### Data-to-Ink Ratio
> Maximize data, minimize decoration

**Good Examples**:
- ✅ Thin lines with data
- ✅ Minimal grid
- ✅ Direct labels on data points
- ✅ Small, unobtrusive legends
- ✅ White space for clarity

**Avoid**:
- ❌ Thick borders around chart
- ❌ Background fills
- ❌ Drop shadows
- ❌ 3D effects
- ❌ Decorative patterns
- ❌ Multiple colors

### Edward Tufte Principles Applied
1. **Above all else, show the data**
2. **Maximize data-ink ratio** (remove non-data elements)
3. **Erase non-data ink** (no decoration)
4. **Erase redundant data-ink** (no duplicate info)
5. **Revise and edit** (simplify, simplify, simplify)

---

## 📐 Chart Templates (Copy-Paste Ready)

### Template 1: Multi-Line Time Series (Grayscale)
```jsx
<svg viewBox="0 0 800 400" className="w-full h-auto">
  {/* Grid - horizontal lines only */}
  <g className="grid">
    {[0, 100, 200, 300, 400].map(y => (
      <line
        key={y}
        x1="40" y1={y + 40}
        x2="760" y2={y + 40}
        stroke="rgba(0,0,0,0.03)"
        strokeWidth="1"
      />
    ))}
  </g>
  
  {/* Axes */}
  <line x1="40" y1="40" x2="40" y2="440" 
        stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
  <line x1="40" y1="440" x2="760" y2="440" 
        stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
  
  {/* Data lines - differentiated by weight + opacity */}
  <path d="M..." fill="none" 
        stroke="#000000" strokeWidth="2" />      {/* Primary */}
  <path d="M..." fill="none" 
        stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" /> {/* Secondary */}
  <path d="M..." fill="none" 
        stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" /> {/* Tertiary */}
  
  {/* Labels - small mono */}
  <text x="20" y="50" fontSize="10" fontFamily="monospace" 
        fill="rgba(0,0,0,0.4)">$5000</text>
</svg>
```

### Template 2: Heatmap Grid
```jsx
<div className="inline-grid gap-[2px]" style={{ 
  gridTemplateColumns: `repeat(7, 40px)`,
  gridTemplateRows: `repeat(24, 40px)`
}}>
  {data.map((value, idx) => (
    <div
      key={idx}
      className="border border-black/5 hover:border-black/20 transition-all"
      style={{ 
        backgroundColor: `rgba(0,0,0,${value / 100 * 0.6})`
      }}
    />
  ))}
</div>
```

### Template 3: Benchmark Score Card
```jsx
<div className="p-6 border border-black/10">
  {/* Score */}
  <div className="text-center mb-4">
    <div className="text-5xl font-bold">87</div>
    <div className="text-xs font-mono uppercase text-black/40 tracking-wider">
      Overall Score
    </div>
  </div>
  
  {/* Visual bar - segmented */}
  <div className="flex gap-[2px] h-1 mb-4">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="flex-1"
        style={{
          backgroundColor: i < 9 ? '#000000' : 'rgba(0,0,0,0.05)'
        }}
      />
    ))}
  </div>
  
  {/* Context */}
  <div className="text-xs text-black/60 text-center">
    Top 15th percentile
  </div>
</div>
```

---

## 🔧 Implementation Notes
