"use client"

import { useState } from "react"
import { ScrollAnimate } from "@/components/ui/scroll-animate"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Build mailto link with form data
    const subject = encodeURIComponent(`Contact from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    
    // Open email client
    window.location.href = `mailto:liam@source.shop?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative bg-neutral-50 py-24 px-6 border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left Column - Info */}
          <ScrollAnimate animation="fade-right" duration={600} className="lg:col-span-5">
          <div className="space-y-8">
            <div className="font-mono text-[10px] tracking-widest text-black/40">
              CONTACT
            </div>

            <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
              Get in touch<br />
              with our <em className="font-bold">human</em> team
            </h2>

            <div className="space-y-2 font-mono text-black/50">
              <p className="text-xl font-bold text-black">Source.</p>
              <p className="text-sm">San Francisco, CA</p>
            </div>

          </div>
          </ScrollAnimate>

          {/* Right Column - Form */}
          <ScrollAnimate animation="fade-left" duration={600} delay={150} className="lg:col-span-7">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[10px] tracking-wider text-black/50 mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-black/10 font-mono text-sm focus:outline-none focus:border-black/30 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-wider text-black/50 mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-black/10 font-mono text-sm focus:outline-none focus:border-black/30 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-wider text-black/50 mb-2">
                  MESSAGE
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/10 font-mono text-sm focus:outline-none focus:border-black/30 transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group px-8 py-3 bg-black text-white font-mono text-xs tracking-wider hover:bg-black/90 transition-all"
                >
                  SEND MESSAGE
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </form>
          </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}
