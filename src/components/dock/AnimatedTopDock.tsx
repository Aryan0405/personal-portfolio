import { useEffect, useRef, useState, type JSX } from "react";
import { createTopDockController } from "./topDockController";

export const ANIMATED_TOP_DOCK_VARIANTS = ["retro"] as const;
export type AnimatedTopDockVariant = (typeof ANIMATED_TOP_DOCK_VARIANTS)[number];

export type AnimatedTopDockProps = {
  className?: string;
};

const GITHUB_URL = "https://github.com/Aryan0405/";
const SECTION_IDS = ["projects", "skills", "education", "contact"] as const;

const ICON_PROJECTS = (
  <svg viewBox="0 0 7 7" aria-hidden="true">
    <rect x="1" y="0" width="4" height="1" />
    <rect x="1" y="1" width="1" height="5" />
    <rect x="5" y="1" width="1" height="5" />
    <rect x="1" y="6" width="5" height="1" />
    <rect x="2" y="2" width="3" height="1" />
    <rect x="2" y="4" width="3" height="1" />
  </svg>
);
const ICON_SKILLS = (
  <svg viewBox="0 0 7 7" aria-hidden="true">
    <rect x="3" y="0" width="1" height="7" />
    <rect x="0" y="3" width="7" height="1" />
    <rect x="1" y="1" width="1" height="1" />
    <rect x="5" y="1" width="1" height="1" />
    <rect x="1" y="5" width="1" height="1" />
    <rect x="5" y="5" width="1" height="1" />
  </svg>
);
const ICON_EDUCATION = (
  <svg viewBox="0 0 7 7" aria-hidden="true">
    <rect x="0" y="1" width="7" height="5" />
    <rect x="2" y="0" width="3" height="2" />
    <rect x="1" y="4" width="5" height="1" />
  </svg>
);
const ICON_CONTACT = (
  <svg viewBox="0 0 7 7" aria-hidden="true">
    <rect x="2" y="0" width="3" height="1" />
    <rect x="4" y="1" width="2" height="2" />
    <rect x="3" y="3" width="2" height="1" />
    <rect x="3" y="4" width="1" height="1" />
    <rect x="3" y="6" width="1" height="1" />
  </svg>
);

const ITEMS: readonly { id: string; label: string; href: string; icon: JSX.Element }[] = [
  { id: "projects", label: "PROJECTS", href: "/#projects", icon: ICON_PROJECTS },
  { id: "skills", label: "SKILLS", href: "/#skills", icon: ICON_SKILLS },
  { id: "education", label: "EDUCATION", href: "/#education", icon: ICON_EDUCATION },
  { id: "contact", label: "CONTACT", href: "/#contact", icon: ICON_CONTACT },
];

function useDockController(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    return createTopDockController(root, () => ({
      proximity: 122,
      spring: 0.19,
      damping: 0.7,
      widthGrowth: 17,
      heightGrowth: 16,
      drop: 3.5,
      distribute: true,
    }));
  }, []);
}

export function AnimatedTopDock({ className = "" }: AnimatedTopDockProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useDockController(rootRef);

  /* Scroll-spy: the active cell is yellow with aria-current. Items are anchors
     so they scroll to their section (or navigate to /#section from case studies). */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-14% 0% -75% 0%", threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={['animated-top-dock-component', 'atd-retro', className].filter(Boolean).join(' ')}>
      <header className="atd-retro__bar">
        <a href="/" className="atd-retro__brand" aria-label="Aryan Ashok Portfolio Homepage">
          <span className="atd-retro__badge" aria-hidden="true">
            <svg viewBox="0 0 7 7">
              <rect x="0" y="2" width="7" height="3" />
              <rect x="2" y="0" width="3" height="7" />
            </svg>
          </span>
          ARYAN//ASHOK
        </a>
        <nav ref={rootRef} className="atd-retro__dock" aria-label="Primary navigation">
          {ITEMS.map((item) => (
            <a
              key={item.id}
              className="atd-retro__item"
              href={item.href}
              data-dock-item
              aria-current={activeId === item.id ? "true" : undefined}
            >
              <span className="atd-retro__icon" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="atd-retro__cta"
          aria-label="Visit Aryan's GitHub Profile"
        >
          <span aria-hidden="true">&#x2197;</span>
          GITHUB
        </a>
      </header>

      <button
        type="button"
        className="atd-retro__menu-toggle"
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <span aria-hidden="true" style={{ display: "block", width: "14px", height: "2px", background: "currentColor", boxShadow: "0 -4px 0 currentColor, 0 4px 0 currentColor" }} />
      </button>

      {menuOpen && (
        <div
          className="atd-retro__menu"
          role="menu"
          aria-label="Main menu"
          onKeyDown={(e) => {
            if (e.key === "Escape") closeMenu();
          }}
        >
          <button type="button" className="atd-retro__menu-close" aria-label="Close navigation menu" onClick={closeMenu}>
            <span aria-hidden="true" style={{ display: "block", width: "14px", height: "2px", background: "currentColor", transform: "rotate(45deg)", margin: "2px 0" }} />
            <span aria-hidden="true" style={{ display: "block", width: "14px", height: "2px", background: "currentColor", transform: "rotate(-45deg)", margin: "-2px 0 0" }} />
          </button>
          <nav role="none">
            {ITEMS.map((item) => (
              <a
                key={item.id}
                className="atd-retro__menu-item"
                href={item.href}
                aria-current={activeId === item.id ? "true" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="atd-retro__menu-item atd-retro__menu-item--cta"
            aria-label="Visit Aryan's GitHub Profile"
            onClick={closeMenu}
          >
            GITHUB
          </a>
        </div>
      )}
    </div>
  );
}
