"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SCHOOL_LOCATION_LINE, SCHOOL_NAME } from "@/lib/school";

const NAV_SECTIONS = [
  { label: "About", id: "about" },
  { label: "Academics", id: "academics" },
  { label: "Activities", id: "activities" },
  { label: "Facilities", id: "facilities" },
  { label: "Admissions", id: "admissions" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
] as const;

function sectionHref(pathname: string, id: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
        <Link href="/" className="shrink-0 min-w-0" onClick={() => setOpen(false)}>
          <div className="flex flex-col leading-tight">
            <span className="text-[1.3rem] lg:text-[3.445rem] font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent leading-tight">
              {SCHOOL_NAME}
            </span>
            <span className="text-[0.89375rem] lg:text-[2.368rem] text-gray-600 font-medium mt-0.5 leading-tight">
              {SCHOOL_LOCATION_LINE}
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex gap-5 xl:gap-6 items-center text-sm font-medium flex-wrap justify-end">
          {NAV_SECTIONS.map((item) => (
            <a
              key={item.id}
              href={sectionHref(pathname, item.id)}
              className="hover:text-blue-600 transition whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/notice-board"
            className="hover:text-blue-600 transition whitespace-nowrap font-semibold text-blue-700"
          >
            Notice Board
          </Link>
          <button
            type="button"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
            onClick={() => {
              window.location.href = sectionHref(pathname, "admissions");
            }}
          >
            Admissions
          </button>
        </div>

        <button
          type="button"
          className="lg:hidden text-2xl p-1 shrink-0"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-gray-50 border-t p-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
          {NAV_SECTIONS.map((item) => (
            <a
              key={item.id}
              href={sectionHref(pathname, item.id)}
              className="block text-sm font-medium hover:text-blue-600 py-2.5"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/notice-board"
            className="block text-sm font-semibold text-blue-700 py-2.5"
            onClick={() => setOpen(false)}
          >
            Notice Board
          </Link>
          <button
            type="button"
            className="w-full mt-2 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium"
            onClick={() => {
              setOpen(false);
              window.location.href = sectionHref(pathname, "admissions");
            }}
          >
            Admissions Open
          </button>
        </div>
      )}
    </nav>
  );
}
