export type Notice = {
  id: string;
  title: string;
  date: string;
  detail: string;
  category?: string;
};

/** Update this list as Grace Skill Academy publishes notices */
export const NOTICES: Notice[] = [
  {
    id: "1",
    title: "BCA admissions open — 2026 batch",
    date: "2026-03-01",
    detail:
      "Registrations are open for BCA via Bihar Student Credit Card. Visit the Dehri centre or Nasriganj / Karup counselling desk for free counselling slots.",
    category: "Admissions",
  },
  {
    id: "2",
    title: "Centre closed — infrastructure maintenance",
    date: "2026-03-15",
    detail:
      "Grace Skill Academy training centres will remain closed on the notified date for maintenance. Hybrid learners will receive batch updates on WhatsApp.",
    category: "Holiday",
  },
  {
    id: "3",
    title: "Student Credit Card documentation drive",
    date: "2026-03-20",
    detail:
      "Bring 12th marksheet and domicile documents for assisted Student Credit Card filing. Check your SMS or WhatsApp group for your batch slot.",
    category: "Academics",
  },
  {
    id: "4",
    title: "Live project submission — Semester 2 cohort",
    date: "2026-04-02",
    detail:
      "Students completing live project training (Java, Python, AI) must submit three projects to the organisation as per the handbook. Report to the lab lead after class hours if you need an extension.",
    category: "Projects",
  },
];
