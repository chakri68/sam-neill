"use client";

import { useEffect, useState } from "react";
import { useActiveSection } from "@/src/lib/motion/hooks";

export interface NavLink {
  label: string;
  target: string;
}

export interface NavProps {
  brand: string;
  links: NavLink[];
  menuLabel: string;
}

/**
 * Minimal persistent nav (design.md §7). Transparent over the hero, then a
 * blurred scrim + hairline border once scrolled. The active section is marked
 * with a small amber dot rather than a heavy underline.
 */
export function Nav({ brand, links, menuLabel }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(links.map((l) => l.target));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target: string) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <button className="site-nav__brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        {brand}
      </button>

      <nav className="site-nav__links" aria-label="Primary">
        {links.map((link) => (
          <button
            key={link.target}
            className={`site-nav__link ${active === link.target ? "is-active" : ""}`}
            onClick={() => go(link.target)}
            aria-current={active === link.target ? "true" : undefined}
          >
            <span className="site-nav__dot" aria-hidden />
            {link.label}
          </button>
        ))}
        <span className="sr-only md:hidden">{menuLabel}</span>
      </nav>
    </header>
  );
}

export default Nav;
