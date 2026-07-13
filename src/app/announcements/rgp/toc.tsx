"use client"

import { useEffect, useState } from "react"

/**
 * Sticky on-this-page nav with scrollspy — the active section's link darkens
 * and gets a leading dash as you read, so the rail feels alive.
 */
export function AnnouncementToc({
  items,
}: {
  items: { id: string; label: string }[]
}) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -60% 0px" }
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [items])

  return (
    <nav
      aria-label="On this page"
      className="hidden w-[13.75rem] shrink-0 flex-col gap-3 lg:sticky lg:top-10 lg:flex"
    >
      {items.map((item) => {
        const isActive = item.id === active
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`flex items-center gap-2 text-sm transition-colors ${
              isActive ? "text-black" : "text-black/40 hover:text-black"
            }`}
          >
            <span
              aria-hidden
              className={`h-px bg-black transition-all duration-300 ${
                isActive ? "w-4 opacity-100" : "w-0 opacity-0"
              }`}
            />
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}
