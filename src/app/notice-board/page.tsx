import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { NOTICES } from "@/data/notices";
import { SCHOOL_NAME } from "@/lib/school";

export const metadata = {
  title: `Notice Board | ${SCHOOL_NAME}`,
  description: "Official notices, circulars, and announcements.",
};

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NoticeBoardPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-blue-600 mb-2">Announcements</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Notice board</h1>
          <p className="text-gray-600 mb-10">
            Latest circulars for parents, students, and staff of {SCHOOL_NAME}. For urgent queries, please contact
            the school office.
          </p>

          <div className="space-y-6">
            {NOTICES.map((n) => (
              <article
                key={n.id}
                className="rounded-xl border border-gray-200 bg-gray-50/80 p-6 shadow-sm hover:border-blue-200 transition"
              >
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
                  <time dateTime={n.date}>{formatDate(n.date)}</time>
                  {n.category && (
                    <>
                      <span aria-hidden>·</span>
                      <span className="font-medium text-blue-700">{n.category}</span>
                    </>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{n.title}</h2>
                <p className="text-gray-700 leading-relaxed">{n.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl bg-blue-50 border border-blue-100">
            <p className="font-semibold text-gray-900 mb-2">School office</p>
            <p className="text-gray-600 text-sm mb-4">
              For verified copies of circulars or clarifications, visit the reception during working hours or call the
              admissions helpline.
            </p>
            <Link href="/" className="inline-flex text-blue-700 font-semibold hover:text-blue-800">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
