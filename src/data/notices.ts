export type Notice = {
  id: string;
  title: string;
  date: string;
  detail: string;
  category?: string;
};

/** Update this list as your school publishes notices */
export const NOTICES: Notice[] = [
  {
    id: "1",
    title: "Admissions open for academic year 2026–27",
    date: "2026-03-01",
    detail:
      "Registrations are now open for all grades. Parents are invited to visit the campus or call the admissions desk for counselling slots.",
    category: "Admissions",
  },
  {
    id: "2",
    title: "Holiday — annual maintenance",
    date: "2026-03-15",
    detail:
      "The school will remain closed for infrastructure maintenance on the notified date. Online assignments will be shared via class groups.",
    category: "Holiday",
  },
  {
    id: "3",
    title: "PTM schedule — Term I",
    date: "2026-03-20",
    detail:
      "Parent–teacher meetings are scheduled by grade. Please check the circular sent on the school portal for your child’s slot.",
    category: "Academics",
  },
  {
    id: "4",
    title: "Inter-house sports trials",
    date: "2026-04-02",
    detail:
      "Trials for athletics and team sports will be held after school hours. Students must carry house ID cards and sports kit.",
    category: "Sports",
  },
];
