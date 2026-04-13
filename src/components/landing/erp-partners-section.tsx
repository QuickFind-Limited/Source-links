import { ScrollAnimate } from "@/components/ui/scroll-animate"

export function ErpPartnersSection() {
  return (
    <section className="relative bg-white py-20 px-6 border-t border-black/20">
      <ScrollAnimate animation="fade-up" duration={600}>
      <div className="max-w-6xl mx-auto text-center">
        <div className="font-mono text-xs uppercase tracking-wider text-black/40 mb-3">
          For ERP Partners
        </div>
        <h3 className="text-2xl md:text-3xl font-normal tracking-tight mb-3">
          Migrating customers at scale?
        </h3>
        <p className="font-mono text-base text-black/60 mb-6 max-w-xl mx-auto">
          We offer partnership terms for high-volume implementations. Let's talk.
        </p>
        <a
          href="/enterprise"
          className="inline-flex items-center gap-2 px-8 py-4 font-mono text-sm tracking-wider border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
        >
          REACH OUT
          <span className="text-base">→</span>
        </a>
      </div>
      </ScrollAnimate>
    </section>
  )
}
