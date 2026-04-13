"use client";

import React from "react";
import Cal from "@calcom/embed-react";
import { LogIn, Upload, DollarSign, ArrowRight } from "lucide-react";

const STEPS = [
  { n: "1", icon: LogIn, label: "Sign in", desc: "Access your Source partner portal" },
  { n: "2", icon: Upload, label: "Upload SOW", desc: "Drop your SOW, discovery transcript, or requirements" },
  { n: "3", icon: DollarSign, label: "Get price", desc: "Fixed-price quote returned within 24 hours" },
];

export default function GetQuotePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      {/* Top header */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-2">
        <div className="text-center mb-8 sm:mb-10">
          <div className="text-[28px] sm:text-[34px] font-display tracking-normal text-black mb-1.5">
            Source
          </div>
          <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-black/35 font-bold mb-5">
            Fixed-Fee Implementations
          </div>
          <h1 className="text-[22px] sm:text-[30px] font-semibold tracking-tight text-black leading-[1.2] mb-2">
            Get a fixed-price quote in 24 hours
          </h1>
          <p className="text-[14px] sm:text-[16px] text-black/40 leading-[1.6] max-w-[520px] mx-auto">
            Share your SOW or requirements and Source AI scopes, prices, and delivers — fully white-labelled.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ── Left: Existing Partner path ── */}
          <div className="bg-white border border-black/[0.08] rounded-sm overflow-hidden">
            <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5">
              <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-black/30 font-bold mb-1.5">
                Existing Partner
              </div>
              <div className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-black/90 mb-1">
                Sign in &amp; upload your SOW
              </div>
              <p className="text-[13px] sm:text-[14px] text-black/40 leading-[1.6]">
                Already a Source partner? Sign in, drop your requirements, and get a fixed-price quote back within 24 hours.
              </p>
            </div>

            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
              {/* Steps */}
              <div className="bg-[#f8f8f6] border border-black/[0.06] rounded-sm p-4 sm:p-5 mb-5">
                <div className="text-[9px] font-mono uppercase tracking-[0.14em] text-black/25 font-bold mb-4">
                  How it works
                </div>
                <div className="space-y-3.5">
                  {STEPS.map(({ n, icon: Icon, label, desc }) => (
                    <div key={n} className="flex items-start gap-3.5">
                      <div className="flex h-7 w-7 items-center justify-center bg-black text-white text-[11px] font-bold shrink-0 rounded-sm">
                        {n}
                      </div>
                      <div className="pt-0.5">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Icon className="w-3 h-3 text-black/30" strokeWidth={2} />
                          <span className="text-[13px] sm:text-[14px] font-semibold text-black/75">{label}</span>
                        </div>
                        <p className="text-[12px] sm:text-[13px] text-black/40 leading-[1.5]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="/fixed-fee-implementations"
                className="flex items-center justify-between w-full bg-black text-white px-5 sm:px-6 py-4 sm:py-5 rounded-sm group hover:bg-black/90 transition-colors"
              >
                <div>
                  <div className="text-[15px] sm:text-[17px] font-semibold tracking-tight mb-0.5">
                    Sign in &amp; get your quote
                  </div>
                  <div className="text-[12px] sm:text-[13px] text-white/45">
                    Upload requirements → quote in 24 hours
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>
            </div>
          </div>

          {/* ── Right: New to Source — Cal.com embed ── */}
          <div className="bg-white border border-black/[0.08] rounded-sm overflow-hidden">
            <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-black/30 font-bold mb-1.5">
                New to Source?
              </div>
              <div className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-black/90 mb-1">
                Book a 30-minute call
              </div>
              <p className="text-[13px] sm:text-[14px] text-black/40 leading-[1.6]">
                Not a partner yet? Let&apos;s talk about how Source AI can deliver your ERP implementations at fixed cost.
              </p>
            </div>

            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="border border-black/[0.06] rounded-sm overflow-hidden bg-white" style={{ minHeight: "420px" }}>
                <Cal
                  calLink="source-ai/30min"
                  style={{ width: "100%", height: "100%", minHeight: "420px", overflow: "auto" }}
                  config={{
                    layout: "month_view",
                    theme: "light",
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-black/20 leading-[1.6]">
            All pricing is confidential to the partner. Source AI is a product of QuickFind AI, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
