"use client"

import { cn } from "@/lib/utils"

interface AsciiDecorationProps {
  variant?: "corner" | "divider" | "frame" | "logo" | "robot"
  className?: string
  inverted?: boolean
}

const ASCII_ART = {
  corner: `+---+
|   |
+---+`,
  divider: `════════════════════════════════════════`,
  frame: `┌────────────────────────────────────────┐
│                                        │
│                                        │
│                                        │
└────────────────────────────────────────┘`,
  logo: `
 ██████╗  ██████╗ ███╗   ██╗███████╗██╗   ██╗██╗  ████████╗
██╔════╝ ██╔═══██╗████╗  ██║██╔════╝██║   ██║██║  ╚══██╔══╝
██║      ██║   ██║██╔██╗ ██║███████╗██║   ██║██║     ██║   
██║      ██║   ██║██║╚██╗██║╚════██║██║   ██║██║     ██║   
╚██████╗ ╚██████╔╝██║ ╚████║███████║╚██████╔╝███████╗██║   
 ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚══════╝╚═╝   
                                                           
██╗  ██╗██╗██╗     ██╗     ███████╗██████╗                  
██║ ██╔╝██║██║     ██║     ██╔════╝██╔══██╗                 
█████╔╝ ██║██║     ██║     █████╗  ██████╔╝                 
██╔═██╗ ██║██║     ██║     ██╔══╝  ██╔══██╗                 
██║  ██╗██║███████╗███████╗███████╗██║  ██║                 
╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝                 
`,
  robot: `
    ┌─────────┐
    │  ■   ■  │
    │    ▼    │
    │  └───┘  │
    └────┬────┘
         │
    ┌────┴────┐
    │ ░░░░░░░ │
    │ ░ A I ░ │
    │ ░░░░░░░ │
    └─────────┘
`
}

export function AsciiDecoration({ variant = "corner", className, inverted = false }: AsciiDecorationProps) {
  return (
    <pre
      className={cn(
        "font-mono text-xs leading-none select-none whitespace-pre",
        inverted ? "text-white" : "text-black",
        className
      )}
      aria-hidden="true"
    >
      {ASCII_ART[variant]}
    </pre>
  )
}

export function AsciiDivider({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <pre
        className={cn(
          "font-mono text-xs leading-none select-none",
          inverted ? "text-white/30" : "text-black/30"
        )}
        aria-hidden="true"
      >
        {`+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +`}
      </pre>
    </div>
  )
}

export function MetadataBar({ 
  items,
  className,
  inverted = false 
}: { 
  items: { label: string; value: string }[]
  className?: string
  inverted?: boolean
}) {
  return (
    <div className={cn(
      "font-mono text-xs flex flex-wrap gap-4",
      inverted ? "text-white/60" : "text-black/60",
      className
    )}>
      {items.map((item, i) => (
        <span key={i}>
          <span className={inverted ? "text-white/40" : "text-black/40"}>{item.label}:</span>{" "}
          <span className={inverted ? "text-white" : "text-black"}>{item.value}</span>
        </span>
      ))}
    </div>
  )
}
