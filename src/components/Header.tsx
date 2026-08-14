"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { ChevronIcon, PhoneIcon } from "./Icons";
import { Container } from "./ui";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Close the mobile drawer whenever the route changes, including on back/
  // forward. Adjusting during render rather than in an effect avoids the extra
  // pass that would briefly paint the drawer over the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setExpanded(null);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      {/* Utility strip */}
      <div className="hidden border-b border-line bg-surface lg:block">
        <Container>
          <div className="flex h-9 items-center justify-end gap-6 text-xs text-muted">
            <span className="font-medium tracking-wide">
              AS9100 Certified &middot; ITAR Registered
            </span>
            <span aria-hidden="true" className="text-line">
              |
            </span>
            <a
              href="tel:+18007332648"
              className="flex items-center gap-1.5 font-medium hover:text-blue"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              800.733.2648
            </a>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label="SYNC Manufacturing home">
            <Image
              src="/sync-logo.png"
              alt="SYNC Manufacturing"
              width={329}
              height={104}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:block" aria-label="Main">
            <ul className="flex items-center">
              {nav.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-4 py-6 text-[15px] font-semibold transition-colors ${
                      isActive(item.href)
                        ? "text-blue"
                        : "text-navy hover:text-blue"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronIcon className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {item.children && (
                    <div className="invisible absolute left-0 top-full w-64 translate-y-1 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <ul className="rounded-lg border border-line bg-white py-2 shadow-[0_12px_32px_rgba(1,35,76,.12)]">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-surface hover:text-blue ${
                                pathname === child.href
                                  ? "text-blue"
                                  : "text-navy"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Link
              href="/contact#quote"
              className="inline-flex items-center rounded-md bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0060bb]"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-navy lg:hidden"
          >
            <span className="sr-only">
              {open ? "Close menu" : "Open menu"}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto border-t border-line bg-white lg:hidden"
        >
          <Container className="py-4">
            <ul className="divide-y divide-line">
              {nav.map((item) => (
                <li key={item.href} className="py-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className={`flex-1 py-3 text-base font-semibold ${
                        isActive(item.href) ? "text-blue" : "text-navy"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded((v) =>
                            v === item.href ? null : item.href,
                          )
                        }
                        aria-expanded={expanded === item.href}
                        className="inline-flex h-11 w-11 items-center justify-center text-muted"
                      >
                        <span className="sr-only">
                          Toggle {item.label} submenu
                        </span>
                        <ChevronIcon
                          className={`h-4 w-4 transition-transform ${
                            expanded === item.href ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {item.children && expanded === item.href && (
                    <ul className="mb-3 ml-1 space-y-1 border-l-2 border-line pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block py-2 text-[15px] text-muted"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3 pb-10">
              <Link
                href="/contact#quote"
                className="flex items-center justify-center rounded-md bg-blue px-6 py-3.5 text-sm font-semibold text-white"
              >
                Request a Quote
              </Link>
              <a
                href="tel:+18007332648"
                className="flex items-center justify-center gap-2 rounded-md border border-line px-6 py-3.5 text-sm font-semibold text-navy"
              >
                <PhoneIcon className="h-4 w-4" />
                800.733.2648
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
