"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  MessageSquare,
  FileText,
  Code,
  Database,
  Search,
  Globe,
  Trash2,
  BarChart3,
  GitBranch,
  FileCheck,
  Check,
  Download,
  Send,
  AlertTriangle,
  Clock,
  Zap,
  Loader2,
  CheckCircle2,
  ExternalLink
} from "lucide-react"

// Reasoning step component
export const ReasoningStep = ({ icon: Icon, text, status }: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  status: 'pending' | 'active' | 'complete';
}) => (
  <div className={cn(
    "flex items-center gap-2 py-1 text-[11px] font-mono transition-all",
    status === 'pending' && "text-black/30",
    status === 'active' && "text-black/50",
    status === 'complete' && "text-black/70"
  )}>
    {status === 'active' ? (
      <Loader2 className="w-3 h-3 animate-spin" />
    ) : status === 'complete' ? (
      <CheckCircle2 className="w-3 h-3 text-green-600" />
    ) : (
      <Icon className="w-3 h-3" />
    )}
    <span>{text}</span>
  </div>
)

// Action button
export const ActionButton = ({ children, primary, icon: Icon }: {
  children: React.ReactNode;
  primary?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}) => (
  <button className={cn(
    "text-[10px] font-mono uppercase tracking-wider transition-all inline-flex items-center gap-1.5 px-3 py-1.5",
    primary
      ? "bg-black text-white hover:bg-black/80"
      : "bg-white text-black/70 border border-black/20 hover:border-black/40"
  )}>
    {Icon && <Icon className="w-3 h-3" />}
    {children}
  </button>
)

// Result card
export const ResultCard = ({ title, children, variant }: {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning';
}) => (
  <div className={cn(
    "mt-2 overflow-hidden border",
    variant === 'success' && "bg-green-50/50 border-green-200",
    variant === 'warning' && "bg-amber-50/50 border-amber-200",
    !variant && "bg-black/[0.02] border-black/10"
  )}>
    {title && (
      <div className={cn(
        "px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border-b",
        variant === 'success' && "bg-green-100/50 border-green-200 text-green-700",
        variant === 'warning' && "bg-amber-100/50 border-amber-200 text-amber-700",
        !variant && "bg-black/[0.03] border-black/10 text-black/50"
      )}>
        {title}
      </div>
    )}
    <div className="p-3 text-xs">{children}</div>
  </div>
)

// Stat display
export const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-base font-bold text-black">{value}</div>
    <div className="text-[9px] font-mono text-black/40 uppercase tracking-wider">{label}</div>
  </div>
)

// Use case message type
export type UseCaseMessage = {
  role: 'user' | 'reasoning' | 'assistant';
  content?: string;
  delay: number;
  steps?: Array<{
    icon: React.ComponentType<{ className?: string }>;
    text: string;
    status: 'pending' | 'active' | 'complete';
  }>;
  ui?: React.ReactNode;
}

// Use case type
export type UseCase = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tags: string[];
  messages: UseCaseMessage[];
}

// Use case definitions - all 10 use cases
export const useCases: UseCase[] = [
  {
    id: "support",
    label: "SUPPORT",
    icon: MessageSquare,
    title: "Support Queries",
    description: "Ask any question about your ERP and get answers cross-referenced with your actual environment",
    tags: ["Real-time", "Context-Aware"],
    messages: [
      { role: "user", content: "Why is Acme Corp showing a negative balance?", delay: 0 },
      {
        role: "reasoning",
        steps: [
          { icon: Search, text: "Searching customer records...", status: "complete" as const },
          { icon: Database, text: "Analyzing transactions...", status: "complete" as const },
        ],
        delay: 300
      },
      {
        role: "assistant",
        content: "Found 3 unapplied payments totaling $2,450.",
        delay: 800,
        ui: (
          <ResultCard title="Unapplied Payments">
            <div className="space-y-1 font-mono">
              <div className="flex justify-between"><span className="text-black/50">PMT-4521</span><span>$1,200</span></div>
              <div className="flex justify-between"><span className="text-black/50">PMT-4533</span><span>$850</span></div>
              <div className="flex justify-between"><span className="text-black/50">PMT-4540</span><span>$400</span></div>
            </div>
            <div className="flex gap-2 mt-3">
              <ActionButton primary icon={Check}>Auto-Apply</ActionButton>
              <ActionButton>Review</ActionButton>
            </div>
          </ResultCard>
        )
      },
    ],
  },
  {
    id: "discovery",
    label: "SCAN",
    icon: Search,
    title: "System Health Check",
    description: "Get a full health assessment with actionable insights on critical issues and optimization opportunities",
    tags: ["Auto-Discovery", "Risk Detection"],
    messages: [
      { role: "user", content: "Run a health check", delay: 0 },
      {
        role: "reasoning",
        steps: [
          { icon: Database, text: "Scanning data integrity...", status: "complete" as const },
          { icon: Globe, text: "Testing integrations...", status: "complete" as const },
        ],
        delay: 300
      },
      {
        role: "assistant",
        content: "Found 3 critical issues requiring attention.",
        delay: 800,
        ui: (
          <ResultCard variant="warning">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-3 h-3" />
                <span>Shopify sync failing (47 orders)</span>
              </div>
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="w-3 h-3" />
                <span>340 duplicate customers</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <ActionButton primary icon={Zap}>Fix Issues</ActionButton>
            </div>
          </ResultCard>
        )
      },
    ],
  },
  {
    id: "change",
    label: "CHANGES",
    icon: FileText,
    title: "Change Requests",
    description: "Need a new field, workflow, or tweak? Describe it and get it scoped instantly with fixed pricing",
    tags: ["Fixed Price", "Quick Turnaround"],
    messages: [
      { role: "user", content: "Add a Priority field to Sales Orders", delay: 0 },
      {
        role: "reasoning",
        steps: [
          { icon: Search, text: "Checking existing fields...", status: "complete" as const },
        ],
        delay: 300
      },
      {
        role: "assistant",
        content: "I'll add a Priority dropdown with 4 options.",
        delay: 700,
        ui: (
          <ResultCard variant="success" title="Quote">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-bold">$150</div>
                <div className="text-[10px] text-black/40 font-mono">FIXED PRICE</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2 hrs</div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <ActionButton primary>Approve</ActionButton>
            </div>
          </ResultCard>
        )
      },
    ],
  },
  {
    id: "custom",
    label: "SCRIPTS",
    icon: Code,
    title: "Script Development",
    description: "From saved searches to SuiteScripts, get AI-assisted development with automatic testing",
    tags: ["AI-Assisted", "Auto-Tested"],
    messages: [
      { role: "user", content: "Block orders when customer is on credit hold", delay: 0 },
      {
        role: "reasoning",
        steps: [
          { icon: Code, text: "Generating SuiteScript 2.1...", status: "complete" as const },
          { icon: Check, text: "Validating...", status: "complete" as const },
        ],
        delay: 300
      },
      {
        role: "assistant",
        content: "Created User Event script for Sales Orders.",
        delay: 800,
        ui: (
          <div className="mt-2 bg-[#1a1a1a] overflow-hidden border border-black/20">
            <div className="px-2 py-1 bg-[#252525] text-[9px] font-mono text-white/50 flex justify-between">
              <span>SuiteScript 2.1</span>
              <span className="text-green-400">● Ready</span>
            </div>
            <pre className="p-2 text-[10px] font-mono text-[#d4d4d4] overflow-x-auto">
{`define(['N/record'], (r) => {
  beforeSubmit: (ctx) => {
    if (isCreditHold(ctx))
      throw error('CREDIT_HOLD');
  }
});`}
            </pre>
            <div className="px-2 pb-2">
              <ActionButton primary icon={Zap}>Deploy</ActionButton>
            </div>
          </div>
        )
      },
    ],
  },
  {
    id: "integration",
    label: "FIX",
    icon: Globe,
    title: "Integration Fixes",
    description: "Diagnose and fix broken integrations with automatic root cause analysis",
    tags: ["Root Cause", "Auto-Fix"],
    messages: [
      { role: "user", content: "Shopify integration stopped working", delay: 0 },
      {
        role: "reasoning",
        steps: [
          { icon: Search, text: "Analyzing logs...", status: "complete" as const },
        ],
        delay: 300
      },
      {
        role: "assistant",
        content: "API token expired on Jan 24. 47 orders stuck.",
        delay: 700,
        ui: (
          <ResultCard variant="warning" title="Quick Fix">
            <input
              type="text"
              placeholder="Paste new API token..."
              className="w-full px-2 py-1.5 border border-black/20 text-xs font-mono bg-white mb-2"
              readOnly
            />
            <ActionButton primary icon={Zap}>Update & Sync</ActionButton>
          </ResultCard>
        )
      },
    ],
  },
  {
    id: "duplicates",
    label: "CLEANUP",
    icon: Trash2,
    title: "Data Cleanup",
    description: "Identify and merge duplicate records with smart matching and audit trails",
    tags: ["Smart Matching", "Audit Trail"],
    messages: [
      { role: "user", content: "Clean up duplicate customers", delay: 0 },
      {
        role: "reasoning",
        steps: [
          { icon: Database, text: "Scanning records...", status: "complete" as const },
        ],
        delay: 300
      },
      {
        role: "assistant",
        content: "Found 340 duplicates (12% of customer base).",
        delay: 700,
        ui: (
          <ResultCard>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Stat value="180" label="Exact" />
              <Stat value="120" label="Likely" />
              <Stat value="40" label="Review" />
            </div>
            <div className="flex gap-2">
              <ActionButton primary>Auto-Merge $200</ActionButton>
            </div>
          </ResultCard>
        )
      },
    ],
  },
  {
    id: "reports",
    label: "REPORTS",
    icon: BarChart3,
    title: "Custom Reports",
    description: "Build saved searches and reports in plain English with scheduling",
    tags: ["Plain English", "Schedulable"],
    messages: [
      { role: "user", content: "Show overdue invoices by customer", delay: 0 },
      {
        role: "reasoning",
        steps: [
          { icon: Database, text: "Building search...", status: "complete" as const },
        ],
        delay: 300
      },
      {
        role: "assistant",
        content: "Report ready with 89 overdue invoices.",
        delay: 700,
        ui: (
          <ResultCard variant="success">
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Stat value="89" label="Invoices" />
              <Stat value="$234K" label="Total" />
              <Stat value="47" label="Customers" />
            </div>
            <div className="flex gap-2">
              <ActionButton primary icon={ExternalLink}>Open</ActionButton>
              <ActionButton icon={Clock}>Schedule</ActionButton>
            </div>
          </ResultCard>
        )
      },
    ],
  },
  {
    id: "workflow",
    label: "WORKFLOWS",
    icon: GitBranch,
    title: "Workflow Automation",
    description: "Design approval workflows, notifications, and business rules without code",
    tags: ["No-Code", "Email Actions"],
    messages: [
      { role: "user", content: "Route POs over $10K to director approval", delay: 0 },
      {
        role: "reasoning",
        steps: [
          { icon: GitBranch, text: "Designing workflow...", status: "complete" as const },
        ],
        delay: 300
      },
      {
        role: "assistant",
        content: "Created 4-step approval workflow.",
        delay: 700,
        ui: (
          <ResultCard>
            <div className="space-y-2">
              {["Trigger: Amount > $10K", "Set: Pending Approval", "Email Director", "On Approve: Release PO"].map((step, i) => (
                <div key={i} className="flex items-center gap-2 font-mono">
                  <span className="w-5 h-5 bg-black text-white flex items-center justify-center text-[10px]">{i+1}</span>
                  <span className="text-black/70">{step}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <ActionButton primary icon={Zap}>Deploy</ActionButton>
            </div>
          </ResultCard>
        )
      },
    ],
  },
  {
    id: "rfp",
    label: "RFP",
    icon: FileCheck,
    title: "RFP Generation",
    description: "Generate comprehensive RFPs based on your actual system configuration",
    tags: ["System-Aware", "Vendor-Ready"],
    messages: [
      { role: "user", content: "Create an RFP for new ERP evaluation", delay: 0 },
      {
        role: "reasoning",
        steps: [
          { icon: Database, text: "Analyzing system...", status: "complete" as const },
        ],
        delay: 300
      },
      {
        role: "assistant",
        content: "Generated 24-page RFP document.",
        delay: 700,
        ui: (
          <ResultCard variant="success">
            <div className="space-y-1 font-mono text-black/60 mb-3">
              <div>3 subsidiaries • 6 integrations</div>
              <div>12 scripts • 200+ custom fields</div>
            </div>
            <div className="flex gap-2">
              <ActionButton primary icon={Download}>Download</ActionButton>
              <ActionButton icon={Send}>Send</ActionButton>
            </div>
          </ResultCard>
        )
      },
    ],
  },
  {
    id: "migration",
    label: "MIGRATE",
    icon: Database,
    title: "Migration Planning",
    description: "AI analyzes your system and suggests optimal migration paths with fixed quotes",
    tags: ["Data Analysis", "Fixed Quote"],
    messages: [
      { role: "user", content: "Migrate from QuickBooks to NetSuite", delay: 0 },
      {
        role: "reasoning",
        steps: [
          { icon: Database, text: "Analyzing data...", status: "complete" as const },
          { icon: FileText, text: "Building plan...", status: "complete" as const },
        ],
        delay: 300
      },
      {
        role: "assistant",
        content: "Analyzed your data. Here's the migration plan.",
        delay: 800,
        ui: (
          <ResultCard>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Stat value="3.4K" label="Customers" />
              <Stat value="12K" label="Items" />
              <Stat value="5 yrs" label="History" />
            </div>
            <div className="bg-black text-white p-3 mt-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xl font-bold">$8,500</div>
                  <div className="text-[10px] font-mono text-white/60">FIXED • 3 WEEKS</div>
                </div>
                <div className="text-[10px] font-mono text-white/60 text-right">
                  100% Money-Back<br/>Guarantee
                </div>
              </div>
            </div>
          </ResultCard>
        )
      },
    ],
  },
]

// Animated Chat Preview Component for package cards - animates on hover
export function ChatPreview({ useCaseId, isHovered }: { useCaseId: string; isHovered: boolean }) {
  const useCase = useCases.find(uc => uc.id === useCaseId)
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [hasAnimated, setHasAnimated] = useState(false)
  
  // Animate messages when hovered (only if not already animated)
  useEffect(() => {
    if (!useCase || !isHovered || hasAnimated) return
    
    const messages = useCase.messages
    const timeouts: NodeJS.Timeout[] = []
    
    messages.forEach((msg, index) => {
      const delay = index === 0 ? 100 : msg.delay + (index * 300)
      const timeout = setTimeout(() => {
        setVisibleMessages(prev => [...prev, index])
        if (index === messages.length - 1) {
          setHasAnimated(true)
        }
      }, delay)
      timeouts.push(timeout)
    })
    
    return () => timeouts.forEach(t => clearTimeout(t))
  }, [isHovered, useCase, hasAnimated])
  
  if (!useCase) return null

  return (
    <div className="bg-white overflow-hidden h-full flex flex-col">
      {/* Chat header */}
      <div className="border-b border-black/10 px-3 py-2 flex items-center justify-between bg-black/[0.02] flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-1.5 h-1.5 transition-colors",
            (isHovered || hasAnimated) ? "bg-green-500" : "bg-black/20",
            isHovered && !hasAnimated && "animate-pulse"
          )} />
          <span className="font-mono text-[9px] text-black/60">AI_CONSULTANT</span>
        </div>
        <div className="font-mono text-[8px] text-black/30">DEMO</div>
      </div>

      {/* Messages - animated display */}
      <div className="p-3 space-y-2 flex-1 overflow-y-auto">
        {!hasAnimated && visibleMessages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-black/30">
              <div className="font-mono text-[10px] mb-1">HOVER TO PREVIEW</div>
              <div className="text-[9px]">See the AI in action</div>
            </div>
          </div>
        )}
        
        {useCase.messages.map((message, i) => {
          const isVisible = visibleMessages.includes(i)
          
          return (
            <div 
              key={i}
              className={cn(
                "transition-all duration-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              {/* User message */}
              {message.role === "user" && (
                <div className="flex justify-end">
                  <div className="bg-black text-white px-2 py-1.5 text-[10px] font-mono max-w-[90%]">
                    {message.content}
                  </div>
                </div>
              )}

              {/* Reasoning steps */}
              {message.role === "reasoning" && (
                <div className="flex justify-start">
                  <div className="bg-black/[0.03] border border-black/10 px-2 py-1.5 max-w-[90%]">
                    {message.steps?.map((step, j) => (
                      <div key={j} className="flex items-center gap-1.5 py-0.5 text-[9px] font-mono text-black/70">
                        <CheckCircle2 className="w-2.5 h-2.5 text-green-600" />
                        <span>{step.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assistant message */}
              {message.role === "assistant" && (
                <div className="flex justify-start">
                  <div className="max-w-[95%]">
                    <div className="bg-black/[0.03] border border-black/10 px-2 py-1.5">
                      <p className="text-[10px] text-black/80">{message.content}</p>
                    </div>
                    {message.ui && (
                      <div className={cn(
                        "scale-[0.85] origin-top-left transition-opacity duration-300 delay-200",
                        isVisible ? "opacity-100" : "opacity-0"
                      )}>
                        {message.ui}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
        
        {/* Typing indicator */}
        {isHovered && visibleMessages.length > 0 && visibleMessages.length < useCase.messages.length && (
          <div className="flex justify-start">
            <div className="bg-black/[0.03] border border-black/10 px-3 py-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-black/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-black/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-black/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
