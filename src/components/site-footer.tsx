"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { SCHOOL_LOCATION_LINE, SCHOOL_NAME } from "@/lib/school";

function sectionHref(pathname: string, id: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

export function SiteFooter() {
  const pathname = usePathname();

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-12 px-4 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">{SCHOOL_NAME}</h3>
            <p className="text-sm text-gray-400">{SCHOOL_LOCATION_LINE}</p>
            <p className="text-sm mt-3">Est. 2013 | CBSE Affiliated | English Medium</p>
            <p className="text-sm mt-2">Building leaders for tomorrow</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={sectionHref(pathname, "about")} className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <Link href="/notice-board" className="hover:text-white transition">
                  Notice board
                </Link>
              </li>
              <li>
                <a href={sectionHref(pathname, "academics")} className="hover:text-white transition">
                  Academics
                </a>
              </li>
              <li>
                <a href={sectionHref(pathname, "activities")} className="hover:text-white transition">
                  Activities
                </a>
              </li>
              <li>
                <a href={sectionHref(pathname, "admissions")} className="hover:text-white transition">
                  Admissions
                </a>
              </li>
              <li>
                <a href={sectionHref(pathname, "gallery")} className="hover:text-white transition">
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>Nasriganj, Rohtas, Bihar 803101</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91-XXXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@sonevalley.in</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Follow us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Facebook">
                f
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="X">
                𝕏
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Instagram">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="YouTube">
                ▶
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {SCHOOL_NAME}. All rights reserved.</p>
          <p className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition">
              Privacy policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">
              Terms of service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
