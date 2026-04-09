"use client";
import { useState, useEffect, type ChangeEvent, type FormEvent, type MouseEvent } from "react";
import { isGoogleFormConfigured, submitLeadToGoogleForm } from "@/lib/google-form-lead";

const PHONE = "9122427077";
const WA = "7488545901";
const WA_MSG = encodeURIComponent("Hi! I want to know more about BCA admission at Grace Skill Academy, Dehri.");

/* ─── DATA ─────────────────────────────────────────────── */
const stats = [
  { value: "100%", label: "Placement Assistance" },
  { value: "₹0", label: "Upfront Fee" },
  { value: "3 LPA", label: "Avg Package" },
  { value: "3", label: "Months Paid Internship" },
];

/** Poster & campus images live in /public/images — URL-encode spaces for the poster file */
const campusGallery = [
  { src: "/images/Skill_Grace_Academy_dehri_classroom_and_training_center_image.jpeg", alt: "Grace Skill Academy classroom and training center" },
  { src: "/images/Skill_Grace_Academy_dehri_inside_office_image.jpeg", alt: "Grace Skill Academy office" },
  { src: "/images/Grace_Skill%20Academy_dehri%20_poster.jpeg", alt: "Grace Skill Academy poster" },
] as const;

const uspPoints = [
  { n: "01", title: "Training within course period", desc: "Complete structured training on schedule — no open-ended gaps." },
  { n: "02", title: "WWH format (What, Why, How)", desc: "Every topic is taught with clarity on what it is, why it matters, and how to apply it." },
  { n: "03", title: "Outcome-based learning", desc: "Lessons map to measurable skills and job-ready outcomes, not rote coverage." },
  { n: "04", title: "Scratch to advanced level", desc: "Start from fundamentals and progress to advanced, industry-level depth." },
  { n: "05", title: "Individual placement training", desc: "One-on-one guidance for resume, profiles, and your placement journey." },
  { n: "06", title: "Client project mandatory", desc: "Real client-style projects are compulsory so you build a credible portfolio." },
  { n: "07", title: "Personality development & communication", desc: "Dedicated focus on soft skills, speaking, and professional presence." },
  { n: "08", title: "Online test on every unit", desc: "Objective assessment after each unit to lock in understanding." },
  { n: "09", title: "Mock interviews — twice a month", desc: "Regular mock interview practice with feedback to build confidence." },
  { n: "10", title: "Initial consultation before joining", desc: "We estimate your prior knowledge so we can place you on the right learning path." },
  { n: "11", title: "Award-level competitions", desc: "Competitive events that push you to excel and get recognised." },
  { n: "12", title: "Individual tracking & doubt clearance", desc: "Performance tracking per student with dedicated doubt-solving support." },
] as const;

const studentCommitments = [
  "Minimum 80% attendance",
  "Complete all assignments on time",
  "At least 2 hours of self-study or revision daily",
] as const;

const whyUs = [
  { icon: "💻", title: "Free laptop — first 30 students", desc: "Hurry — complimentary laptop for the first 30 admitted students only. Limited seats; confirm early." },
  { icon: "🏛️", title: "AICTE Approved & AKU Affiliated", desc: "Degree awarded by Exalt College of Engineering & Technology, Patna. Nationally recognised." },
  { icon: "💳", title: "100% Free via Student Credit Card", desc: "Bihar Student Credit Card covers the full ₹2,70,000 fee. You pay nothing from pocket." },
  { icon: "💼", title: "Paid Industry Internship", desc: "3-month paid internship during college — real companies, real salary, real experience. After three months: ranking-wise awards, certification, and support that helps with job placement." },
  { icon: "🎯", title: "6-Month Placement Training", desc: "Dedicated placement prep: mock interviews, aptitude, soft skills, then actual company interviews." },
  { icon: "🖥️", title: "Hybrid Classes Daily", desc: "Modern digital lab + experienced faculty. Attend in Dehri or online — your choice every day." },
  { icon: "📜", title: "Industry Certifications", desc: "Get certified in every skill domain — certifications employers actually look for." },
  { icon: "🧑‍🏫", title: "AICTE Curriculum + Industry Experts", desc: "Standard AICTE syllabus taught by real industry practitioners — not just textbook professors." },
];

const skills = [
  { name: "Full Stack Development", icon: "🌐" },
  { name: "Artificial Intelligence & ML", icon: "🤖" },
  { name: "Data Science & Analytics", icon: "📊" },
  { name: "Cyber Security", icon: "🔐" },
  { name: "Digital Marketing", icon: "📣" },
  { name: "Cloud & DevOps", icon: "☁️" },
];

const curriculum = [
  { sem: "Sem 1–2", title: "Foundation + live projects", topics: "Programming fundamentals, Maths, Web basics, digital lab from Day 1. From the second semester: live project training on Java, Python, AI, and algorithms. When this training phase completes, every student submits three live projects to the organisation." },
  { sem: "Sem 3–4", title: "Core + Skills", topics: "Data Structures, DBMS, Full Stack Dev, AI/ML depth, personality development, continued project work." },
  { sem: "Sem 5", title: "Specialisation", topics: "Choose your track: AI/ML, Cyber Security, Data Science or Digital Marketing" },
  { sem: "Sem 6", title: "Paid internship & placement", topics: "3-month paid internship within the course period; after completion — ranking-wise awards and certification that help with job placement. Plus placement training + drives. 100% guaranteed placement assistance through mock interviews, drives, and support until you are placed." },
];

const steps = [
  { n: "01", t: "Free Consultation", d: "Call or WhatsApp Mr. Krishna Bihari Singh. All doubts cleared in 10 min." },
  { n: "02", t: "Student Credit Card", d: "We guide you step-by-step to apply for Bihar Student Credit Card — completely free." },
  { n: "03", t: "Admission + Laptop (first 30)", d: "Complete your registration — complimentary laptop for the first 30 students only. Limited seats; hurry." },
  { n: "04", t: "Skill Building Begins", d: "Offline/online classes, industry experts, and digital lab access from the very first week." },
  { n: "05", t: "Paid Internship", d: "3-month paid internship — work with real teams and earn while you study. After three months: ranking-wise awards, certification, and support for job placement." },
  { n: "06", t: "100% placement assistance", d: "Mock interviews (twice a month), drives, and guidance until you get placement support through offer stage." },
];

const placementProcess = [
  { icon: "📚", step: "Skill & Placement Training", desc: "6 months of intensive industry-ready training covering communication, aptitude & tech skills." },
  { icon: "🎤", step: "Mock Interviews", desc: "Mock interviews twice a month with real industry feedback to build confidence." },
  { icon: "🏢", step: "Company Drives", desc: "Top companies like TATA and others visit for campus placement drives." },
  { icon: "📄", step: "Offer Letter", desc: "Every student gets placement assistance until they receive a confirmed offer letter." },
];

const offers = [
  { icon: "🎁", title: "Free laptop — first 30 only", desc: "Limited seats: complimentary laptop for the first 30 admitted students. Hurry — confirm your seat early." },
  { icon: "💳", title: "Zero Fee via Student Card", desc: "Bihar Student Credit Card loan facility covers the entire ₹2,70,000 course fee." },
  { icon: "🏆", title: "Internship + placement support", desc: "3-month paid internship; after completion — ranking-wise awards and certification that help with job placement, plus 100% guaranteed placement assistance — a complete career launch." },
];

const eligibility = [
  "12th Pass from any stream (Arts, Science, Commerce)",
  "Minimum 40% marks in Class 12",
  "Any age — no upper age limit",
  "Bihar domicile preferred (for Student Credit Card benefit)",
  "Drop-year students are welcome",
];

const faqs = [
  { q: "क्या सच में पूरी पढ़ाई फ्री होती है?", a: "हाँ। Bihar Student Credit Card से पूरे ₹2,70,000 का loan मिलता है जो सीधे college को जाता है। आपको अपनी जेब से कुछ नहीं देना।" },
  { q: "Laptop कब और किसे मिलेगा?", a: "यह सीमित offer है — केवल पहले 30 admitted students को Day 1 पर complimentary laptop मिलेगा। Seats Limited हैं, जल्दी confirm करें।" },
  { q: "Placement assistance का मतलब क्या है?", a: "Grace Skill Academy 100% guaranteed placement assistance देती है — mock interviews (महीने में दो बार), company drives, और लगातार guidance जब तक आप offer तक पहुँचने में मदद पाते रहें।" },
  { q: "क्या online classes भी होती हैं?", a: "हाँ। Classes hybrid हैं — आप Dehri campus में आकर पढ़ सकते हैं या घर से online join कर सकते हैं।" },
  { q: "Internship paid होगी?", a: "हाँ। 3 महीने की paid internship industry में होगी और stipend/salary मिलेगी। तीन महीने के बाद ranking के अनुसार award, certification, और job placement में मदद मिलेगी।" },
  { q: "Degree किस university से मिलेगी?", a: "Degree Exalt College of Engineering & Technology, Patna से मिलेगी जो AKU (Aryabhatta Knowledge University) से affiliated और AICTE approved है।" },
];

/* ─── STYLES ────────────────────────────────────────────── */
const S = {
  label: { color: "#f59e0b", fontWeight: 600, letterSpacing: 2, fontSize: 12, marginBottom: 12, textTransform: "uppercase", display: "block" },
  h2: { fontSize: "clamp(1.7rem,4vw,2.7rem)", fontWeight: 800, margin: "0 0 12px" },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 28 },
  gold: { background: "linear-gradient(135deg,#f59e0b,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  btn: { background: "linear-gradient(135deg,#f59e0b,#ef4444)", color: "#000", padding: "16px 36px", borderRadius: 50, fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", boxShadow: "0 0 32px rgba(245,158,11,.35)" },
  waBtn: { background: "#25D366", color: "#fff", padding: "16px 32px", borderRadius: 50, fontWeight: 700, fontSize: "1rem", textDecoration: "none", display: "inline-block" },
};

export default function GraceSkillAcademy() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", stream: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzOPc1hrweQIyMtWcbvHz0loGjFcKwsrMkjp4048sk-AEygQi8f7R5etkRoze8GmaFQ/exec"; // ← paste your deployed URL

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
      setForm({ name: "", phone: "", city: "", stream: "" });
    } catch {
      // no-cors means we can't read the response, but data still saves
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  const hover = (el: HTMLElement, on: boolean) => {
    el.style.borderColor = on ? "rgba(245,158,11,.45)" : "rgba(255,255,255,0.07)";
    el.style.transform = on ? "translateY(-4px)" : "none";
  };

  return (
    <div style={{ fontFamily: "'Poppins',sans-serif", background: "#080808", color: "#fff", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&family=Baloo+2:wght@700;800&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 100, padding: "12px 24px",
        background: scrolled ? "rgba(8,8,8,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid #1a1a1a" : "none",
        transition: "all .3s", display: "flex", justifyContent: "space-between", alignItems: "center",
        boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            className="w-[38px] h-[38px] text-base lg:w-12 lg:h-12 lg:text-xl shrink-0"
            style={{ borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}
          >
            G
          </div>
          <div>
            <div className="font-extrabold text-[1.1375rem] leading-tight lg:text-[1.5078125rem]">
              Grace Skill Academy
            </div>
            <div className="text-[0.8125rem] leading-tight text-[#888] lg:text-[1.0765625rem]">
              Exalt Student Counseling Center
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href={`tel:${PHONE}`} style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)", color: "#000", padding: "7px 16px", borderRadius: 24, fontWeight: 800, fontSize: 11, textDecoration: "none" }}>📞 Call Now</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: "110px 20px 70px",
        background: "radial-gradient(ellipse at 50% -10%, #1c0e00 0%, #080808 65%)", position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 15% 60%, rgba(245,158,11,0.06) 0%, transparent 45%), radial-gradient(circle at 85% 25%, rgba(239,68,68,0.06) 0%, transparent 45%)", pointerEvents: "none" }} />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 24 }}>
          <span style={{ background: "rgba(245,158,11,.12)", border: "1px solid rgba(245,158,11,.35)", borderRadius: 30, padding: "5px 18px", fontSize: 12, fontWeight: 700, color: "#f59e0b" }}>🎓 ADMISSION OPEN 2026</span>
          <span style={{ background: "rgba(37,211,102,.1)", border: "1px solid rgba(37,211,102,.3)", borderRadius: 30, padding: "5px 18px", fontSize: 12, fontWeight: 700, color: "#25D366" }}>✅ BIHAR&apos;S FIRST GUARANTEED PROGRAM</span>
        </div>

        <h1 style={{ fontFamily: "'Baloo 2',cursive", fontSize: "clamp(2.4rem,7.5vw,5rem)", fontWeight: 800, lineHeight: 1.08, margin: "0 0 22px", maxWidth: 820 }}>
          BCA की पढ़ाई<br />
          <span style={S.gold}>बिल्कुल मुफ्त</span> 🎓<br />
          <span style={{ fontSize: "65%", color: "#ccc" }}>+ Free Laptop 💻 for first 30 students </span>
          <span style={{ fontSize: "65%", color: "#ccc" }}>Hurry UP! </span>
        </h1>

        <p style={{ fontSize: "clamp(.95rem,2.2vw,1.15rem)", color: "#999", maxWidth: 620, margin: "0 0 10px", lineHeight: 1.75 }}>
          Bihar Student Credit Card से पूरे <strong style={{ color: "#f59e0b" }}>₹2,70,000</strong> की BCA degree बिल्कुल फ्री।
          AICTE Approved, AKU Affiliated degree + <strong style={{ color: "#fff" }}>100% Guaranteed Placement Assistance</strong> + <strong style={{ color: "#fff" }}>Paid Internship</strong>.
        </p>
        <p style={{ fontSize: 13, color: "#555", marginBottom: 36 }}>📍 Opp. Nehru College, Dehri on Sone, Rohtas · Part of <strong style={{ color: "#f59e0b" }}>Exalt College of Engineering & Technology</strong>, Patna</p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 52 }}>
          <a href={`https://wa.me/91${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
            style={{ ...S.waBtn, boxShadow: "0 0 30px rgba(37,211,102,.35)" }}>💬 WhatsApp Now</a>
          <button onClick={() => setOpen(true)} style={S.btn}>Apply Free — Takes 60 Seconds →</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 16, maxWidth: 700, width: "100%" }}>
          {stats.map(s => (
            <div key={s.label} style={{ ...S.card, padding: "22px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Baloo 2',cursive", fontSize: "2rem", fontWeight: 800, ...S.gold }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#777", marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFER STRIP */}
      <div style={{ background: "linear-gradient(90deg,#c2410c,#f59e0b,#c2410c)", padding: "16px 24px", textAlign: "center" }}>
        <p style={{ margin: 0, fontWeight: 800, fontSize: "clamp(.85rem,2vw,1.05rem)", color: "#000" }}>
          🔥 LIMITED SEATS FOR 2026 — Laptop (first 30) + Zero Fee + Paid Internship + 100% Placement Assistance. Hurry Up!
        </p>
      </div>

      {/* TRUST BADGES */}
      <section style={{ padding: "60px 20px", borderBottom: "1px solid #111" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <span style={S.label}>Powered By & Affiliated To</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", marginTop: 24 }}>
            {[
              { title: "Exalt College of Engineering & Technology", sub: "Franchise Partner · Patna, Bihar", icon: "🏫" },
              { title: "AICTE Approved", sub: "All India Council for Technical Education", icon: "✅" },
              { title: "AKU Affiliated", sub: "Aryabhatta Knowledge University, Patna", icon: "🎓" },
              { title: "Bihar Student Credit Card", sub: "Official Govt. Loan Facility for Fee", icon: "💳" },
            ].map(b => (
              <div key={b.title} style={{ ...S.card, flex: "1 1 180px", maxWidth: 230, textAlign: "center", padding: "24px 18px" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{b.icon}</div>
                <div style={{ fontWeight: 700, fontSize: ".88rem", marginBottom: 4 }}>{b.title}</div>
                <div style={{ fontSize: 11, color: "#555" }}>{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXALT COLLEGE CAMPUS — A Part of */}
      <section style={{ padding: "70px 20px", borderTop: "1px solid #111", borderBottom: "1px solid #111", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <span style={S.label}>A Part of</span>
          <h2 style={S.h2}>
            Exalt College of Engineering &amp; Technology, <span style={S.gold}>Patna</span>
          </h2>
          <p style={{ color: "#666", maxWidth: 620, margin: "12px auto 32px", lineHeight: 1.7 }}>
            Your BCA runs under Exalt College — AICTE-approved, AKU-affiliated — with the campus infrastructure and academic backing of Patna.
          </p>
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#111", maxWidth: 920, margin: "0 auto" }}>
            <img
              src="/images/Exalt_college_campus_image.webp"
              alt="Exalt College of Engineering and Technology campus, Patna"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* BRANCHES — Exalt Student Counseling Centers */}
      <section style={{ padding: "60px 20px", borderBottom: "1px solid #111", background: "rgba(245,158,11,0.03)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={S.label}>Our centres</span>
            <h2 style={S.h2}>Exalt Student Counseling — <span style={S.gold}>Dehri & Nasriganj</span></h2>
            <p style={{ color: "#666", marginTop: 10, maxWidth: 560, margin: "10px auto 0" }}>Grace Skill Academy operates as Exalt Student Counseling Centers across two regions in Rohtas district.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            <div style={{ ...S.card, padding: "26px 24px" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>📍</div>
              <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 8, color: "#f59e0b" }}>Dehri on Sone</h3>
              <p style={{ color: "#888", fontSize: ".88rem", margin: 0, lineHeight: 1.65 }}>Exalt Student Counseling Center at Grace Skill Academy — Opp. Nehru College, Dehri on Sone, Rohtas, Bihar 821305 (near Karup Bazar, Tata Motors, Bikramganj Road).</p>
            </div>
            <div style={{ ...S.card, padding: "26px 24px" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>📍</div>
              <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 8, color: "#f59e0b" }}>Karup · Nasriganj · Rohtas</h3>
              <p style={{ color: "#888", fontSize: ".88rem", margin: 0, lineHeight: 1.65 }}>Second Exalt Student Counseling Center branch serving Karup, Nasriganj, and Rohtas — same BCA counselling, admissions guidance, and hybrid program support. Visit or call for the nearest desk timings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={S.label}>Why Grace Skill Academy</span>
          <h2 style={S.h2}>Everything That Sets Us <span style={S.gold}>Apart</span></h2>
          <p style={{ color: "#666", marginTop: 10, maxWidth: 540, margin: "10px auto 0" }}>Not just a degree — a complete career launch system with zero financial burden on your family.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 18 }}>
          {whyUs.map(f => (
            <div key={f.title} style={{ ...S.card, transition: "border-color .2s, transform .2s", cursor: "default" }}
              onMouseEnter={(e: MouseEvent<HTMLDivElement>) => hover(e.currentTarget, true)} onMouseLeave={(e: MouseEvent<HTMLDivElement>) => hover(e.currentTarget, false)}>
              <div style={{ fontSize: 34, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: "#666", fontSize: ".875rem", margin: 0, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* USP */}
      <section style={{ padding: "70px 20px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={S.label}>Our USP</span>
            <h2 style={S.h2}>Twelve reasons students <span style={S.gold}>choose us</span></h2>
            <p style={{ color: "#666", marginTop: 10, maxWidth: 560, margin: "10px auto 0" }}>Clear teaching, real projects, and personal support — built into every semester.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
            {uspPoints.map(u => (
              <div key={u.n} style={{ ...S.card, padding: "20px 22px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ minWidth: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#f59e0b,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, color: "#000", flexShrink: 0 }}>{u.n}</div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: ".9rem", margin: "0 0 6px" }}>{u.title}</h3>
                  <p style={{ color: "#666", fontSize: ".82rem", margin: 0, lineHeight: 1.6 }}>{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS GALLERY */}
      <section style={{ padding: "70px 20px", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <span style={S.label}>Campus & training center</span>
          <h2 style={S.h2}>A glimpse of <span style={S.gold}>Grace Skill Academy</span></h2>
          <p style={{ color: "#666", marginBottom: 36, maxWidth: 520, margin: "12px auto 36px" }}>Classroom, office, and centre poster — see where you will learn and build projects.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {campusGallery.map(img => (
              <div key={img.src} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "#111" }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL OFFERS */}
      <section style={{ padding: "70px 20px", background: "linear-gradient(135deg,rgba(245,158,11,0.07),rgba(239,68,68,0.04))", borderTop: "1px solid rgba(245,158,11,.1)", borderBottom: "1px solid rgba(245,158,11,.1)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <span style={S.label}>Current Offers Running</span>
          <h2 style={S.h2}>Join Now & Get <span style={S.gold}>These Exclusive Benefits</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginTop: 44 }}>
            {offers.map(o => (
              <div key={o.title} style={{ background: "rgba(0,0,0,.4)", border: "1px solid rgba(245,158,11,.22)", borderRadius: 20, padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{o.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: "#f59e0b", marginBottom: 10 }}>{o.title}</h3>
                <p style={{ color: "#777", fontSize: ".88rem", margin: 0, lineHeight: 1.65 }}>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ padding: "80px 20px", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <span style={S.label}>Industry Skills You&apos;ll Master</span>
        <h2 style={S.h2}>Skills That Get You <span style={S.gold}>Hired at Top Companies</span></h2>
        <p style={{ color: "#666", marginBottom: 40, maxWidth: 540, margin: "12px auto 40px" }}>Beyond standard BCA curriculum — you&apos;ll be job-ready from Semester 1 itself.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16 }}>
          {skills.map(s => (
            <div key={s.name} style={{ background: "rgba(245,158,11,.05)", border: "1px solid rgba(245,158,11,.18)", borderRadius: 16, padding: "20px", display: "flex", alignItems: "center", gap: 14, textAlign: "left" }}>
              <span style={{ fontSize: 32 }}>{s.icon}</span>
              <span style={{ fontWeight: 700, fontSize: ".95rem" }}>{s.name}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "#444", fontSize: 13, marginTop: 20 }}>+ Co-curricular activities & Personality Development Program included in every semester</p>
      </section>

      {/* CURRICULUM */}
      <section style={{ padding: "70px 20px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={S.label}>Course Structure</span>
            <h2 style={S.h2}>3-Year BCA <span style={S.gold}>Curriculum Roadmap</span></h2>
            <p style={{ color: "#666", marginTop: 10 }}>AICTE-based curriculum taught by best industry experts. Skill building starts from Day 1.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {curriculum.map(c => (
              <div key={c.sem} style={{ display: "flex", gap: 20, alignItems: "flex-start", ...S.card }}>
                <div style={{ minWidth: 76, background: "linear-gradient(135deg,#f59e0b,#ef4444)", borderRadius: 10, padding: "8px 10px", textAlign: "center", fontWeight: 800, fontSize: 11, color: "#000", lineHeight: 1.5, flexShrink: 0 }}>{c.sem}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: ".95rem", marginBottom: 5 }}>{c.title}</div>
                  <div style={{ color: "#777", fontSize: ".87rem", lineHeight: 1.6 }}>{c.topics}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, ...S.card, padding: "18px 24px", display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 22 }}>📜</span>
            <p style={{ margin: 0, fontSize: ".88rem", color: "#888" }}><strong style={{ color: "#f59e0b" }}>Certifications Provided:</strong> Industry-recognised certificates awarded in every specialisation domain on completion.</p>
          </div>
        </div>
      </section>

      {/* PLACEMENT */}
      <section style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={S.label}>Placement & Career</span>
          <h2 style={S.h2}>100% Guaranteed <span style={S.gold}>Placement Assistance</span></h2>
          <p style={{ color: "#666", marginTop: 10, maxWidth: 580, margin: "10px auto 0" }}>Every enrolled student receives structured placement assistance — mock interviews twice a month, drives, and guidance through the offer process. Average package: <strong style={{ color: "#f59e0b" }}>3 LPA</strong>. Hiring partners include <strong style={{ color: "#fff" }}>TATA</strong> and other top companies.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 18 }}>
          {placementProcess.map(p => (
            <div key={p.step} style={{ ...S.card, textAlign: "center", padding: "30px 20px" }}>
              <div style={{ fontSize: 38, marginBottom: 14 }}>{p.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: ".92rem", marginBottom: 10, color: "#f59e0b" }}>{p.step}</h3>
              <p style={{ color: "#666", fontSize: ".84rem", margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 22, background: "linear-gradient(135deg,rgba(37,211,102,.07),rgba(37,211,102,.02))", border: "1px solid rgba(37,211,102,.18)", borderRadius: 18, padding: "26px 32px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1rem", color: "#25D366", marginBottom: 6 }}>✅ 3-month paid internship</div>
            <div style={{ color: "#777", fontSize: ".88rem" }}>3-month industrial internship with salary/stipend during your degree. After three months: ranking-wise awards and certification that help with job placement — part of our 100% guaranteed assistance pathway for every student.</div>
          </div>
          <button onClick={() => setOpen(true)} style={{ ...S.btn, background: "#25D366", color: "#000", boxShadow: "0 0 20px rgba(37,211,102,.25)", whiteSpace: "nowrap" }}>Claim Your Seat →</button>
        </div>
      </section>

      {/* RECRUITMENT PARTNERS */}
      <section style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto", borderTop: "1px solid #111" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={S.label}>Our recruitment partners</span>
          <h2 style={S.h2}>
            <span style={S.gold}>100+ Hiring Partners</span>
            <br />
            <span style={{ fontSize: "clamp(1.2rem,3.5vw,1.85rem)", fontWeight: 700, color: "#ccc" }}>
              &amp; direct placement facilities
            </span>
          </h2>
          <p style={{ color: "#666", marginTop: 14, maxWidth: 560, margin: "14px auto 0", lineHeight: 1.75 }}>
            Strong industry tie-ups and placement drives so you interview with real recruiters — not just classroom training.
          </p>
        </div>
        <div style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "#0a0a0a", padding: 12 }}>
          <img
            src="/images/our_recruitement_partners.jpeg"
            alt="Grace Skill Academy hiring and recruitment partner logos"
            style={{ width: "100%", maxWidth: "100%", height: "auto", display: "block", objectFit: "contain" }}
          />
        </div>
      </section>

      {/* ADMISSION PROCESS */}
      <section style={{ padding: "70px 20px", background: "radial-gradient(ellipse at 50% 50%,rgba(245,158,11,0.05) 0%,transparent 70%)", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={S.label}>Admission Process</span>
            <h2 style={S.h2}>6 Simple Steps to Your <span style={S.gold}>Free BCA Degree</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
            {steps.map(s => (
              <div key={s.n} style={{ display: "flex", gap: 16, alignItems: "flex-start", ...S.card }}>
                <div style={{ minWidth: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#000", flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: ".93rem", marginBottom: 5 }}>{s.t}</div>
                  <div style={{ color: "#666", fontSize: ".84rem", lineHeight: 1.6 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEE + ELIGIBILITY */}
      <section style={{ padding: "70px 20px", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 40 }}>
          <div>
            <span style={S.label}>Fee Structure</span>
            <h2 style={{ ...S.h2, fontSize: "clamp(1.5rem,3vw,2.1rem)" }}>How You Pay <span style={S.gold}>₹0 from Pocket</span></h2>
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Total Course Fee", val: "₹2,70,000", note: "Tuition + Registration + Exams included" },
                { label: "Your Payment", val: "₹0", note: "Covered by Bihar Student Credit Card" },
                { label: "Loan Repayment", val: "After Job", note: "Start repaying only after you get placed" },
                { label: "Free Laptop", val: "First 30", note: "Complimentary laptop on Day 1 — first 30 admitted students only; limited seats" },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...S.card, padding: "14px 20px", borderRadius: 14 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: ".88rem" }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{r.note}</div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: ".95rem", color: "#f59e0b", whiteSpace: "nowrap", marginLeft: 12 }}>{r.val}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span style={S.label}>Eligibility</span>
            <h2 style={{ ...S.h2, fontSize: "clamp(1.5rem,3vw,2.1rem)" }}>Who Can <span style={S.gold}>Apply?</span></h2>
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              {eligibility.map(e => (
                <div key={e} style={{ display: "flex", alignItems: "center", gap: 12, ...S.card, padding: "13px 18px", borderRadius: 12 }}>
                  <span style={{ color: "#f59e0b", fontSize: "1rem", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: ".88rem", fontWeight: 500 }}>{e}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, background: "rgba(245,158,11,.06)", border: "1px solid rgba(245,158,11,.18)", borderRadius: 12, padding: "14px 18px", fontSize: ".84rem", color: "#999" }}>
              🎯 <strong style={{ color: "#f59e0b" }}>Targeting:</strong> 12th Pass, Drop-year students, and students from Dehri, Rohtas & surrounding districts of Bihar.
            </div>
            <div style={{ marginTop: 20 }}>
              <span style={S.label}>What we expect from you</span>
              <h3 style={{ fontWeight: 800, fontSize: "1.05rem", margin: "10px 0 14px" }}>Student commitments</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {studentCommitments.map(c => (
                  <div key={c} style={{ display: "flex", alignItems: "center", gap: 12, ...S.card, padding: "13px 18px", borderRadius: 12 }}>
                    <span style={{ color: "#ef4444", fontSize: "1rem", flexShrink: 0 }}>!</span>
                    <span style={{ fontSize: ".88rem", fontWeight: 500 }}>{c}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "#555", marginTop: 12, lineHeight: 1.6 }}>These norms keep batches effective for everyone — attendance, assignments, and daily revision are mandatory.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COUNSELOR */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <span style={S.label}>Talk to Our Counselor</span>
          <h2 style={{ ...S.h2, marginBottom: 10 }}>Speak with <span style={S.gold}>Mr. Krishna Bihari Singh</span></h2>
          <p style={{ color: "#666", marginBottom: 32 }}>Our admission counselor responds within 30 minutes on both Call and WhatsApp — real guidance, no bots.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            <a href={`tel:${PHONE}`} style={{ ...S.card, textDecoration: "none", color: "#fff", padding: "15px 26px", display: "flex", alignItems: "center", gap: 10, fontWeight: 700, borderRadius: 50 }}>📞 {PHONE}</a>
            <a href={`https://wa.me/91${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" style={{ ...S.waBtn, padding: "15px 26px", borderRadius: 50 }}>💬 WhatsApp: {WA}</a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 18 }}>
            {["📅 Mon–Sat", "🕘 9:00 AM – 5:00 PM IST", "📍 Dehri on Sone, Rohtas", "🌐 graceacademy.com"].map(t => (
              <span key={t} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1c1c1c", borderRadius: 30, padding: "6px 16px", fontSize: 12, color: "#666" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "70px 20px", background: "rgba(255,255,255,0.012)", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={S.label}>FAQs</span>
            <h2 style={S.h2}>आपके <span style={S.gold}>Common सवाल</span></h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ ...S.card, cursor: "pointer", borderColor: faqOpen === i ? "rgba(245,158,11,.4)" : "rgba(255,255,255,0.07)", transition: "border-color .2s" }}
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: ".92rem" }}>{f.q}</span>
                  <span style={{ color: "#f59e0b", fontSize: 22, flexShrink: 0, transition: "transform .2s", transform: faqOpen === i ? "rotate(45deg)" : "none", display: "inline-block" }}>+</span>
                </div>
                {faqOpen === i && <p style={{ margin: "14px 0 0", color: "#888", fontSize: ".87rem", lineHeight: 1.7 }}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section style={{ padding: "70px 20px", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span style={S.label}>Location</span>
          <h2 style={{ ...S.h2, marginBottom: 8 }}>Visit Us in <span style={S.gold}>Dehri on Sone</span></h2>
          <p style={{ color: "#666", marginBottom: 28 }}>Opp. Nehru College, Dehri on Sone, Rohtas, Bihar 821305<br />Near Karup Bazar, Tata Motors, Bikramganj Road</p>
          <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: 20, overflow: "hidden", marginBottom: 24 }}>
            <iframe src="https://maps.google.com/maps?q=Grace+Skill+Academy+BCA+Dehri+on+Sone+Bihar&output=embed"
              width="100%" height="300" style={{ border: "none", display: "block" }} loading="lazy" title="Grace Skill Academy Location" />
          </div>
          <a href="https://maps.google.com/?q=Grace+Skill+Academy+BCA+Dehri+Bihar" target="_blank" rel="noopener noreferrer"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #222", color: "#f59e0b", padding: "12px 28px", borderRadius: 50, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
            📍 Open in Google Maps
          </a>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "90px 20px", background: "radial-gradient(ellipse at 50% 100%,#1c0e00 0%,#080808 60%)", borderTop: "1px solid rgba(245,158,11,.1)", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.28)", borderRadius: 30, padding: "5px 18px", fontSize: 12, fontWeight: 700, color: "#ef4444", marginBottom: 22 }}>⚡ SEATS FILLING FAST — 2026 BATCH</div>
        <h2 style={{ fontFamily: "'Baloo 2',cursive", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, margin: "0 0 16px" }}>
          अभी Apply करें —<br /><span style={S.gold}>ज़िंदगी बदलने का मौका!</span>
        </h2>
        <p style={{ color: "#777", fontSize: "1rem", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.75 }}>
          Laptop for the first 30 students — hurry. Limited seats. Zero fees. Paid internship in the course period. 100% placement assistance.<br />Bihar&apos;s first complete BCA career program — Exalt Student Counseling Centers in Dehri on Sone and Karup / Nasriganj, Rohtas.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setOpen(true)} style={{ ...S.btn, fontSize: "1.05rem", padding: "18px 44px" }}>🎓 Apply Free in 60 Seconds →</button>
          <a href={`https://wa.me/91${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" style={{ ...S.waBtn, fontSize: "1.05rem", padding: "18px 36px" }}>💬 WhatsApp Now</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "28px 20px", borderTop: "1px solid #111", textAlign: "center" }}>
        <p style={{ color: "#333", fontSize: 12, margin: 0, lineHeight: 1.9 }}>
          © 2026 <strong style={{ color: "#555" }}>Grace Skill Academy</strong> · Opp. Nehru College, Dehri on Sone, Rohtas, Bihar 821305<br />
          Part of <strong style={{ color: "#f59e0b" }}>Exalt College of Engineering & Technology</strong>, Patna · AICTE Approved · AKU Affiliated<br />
          📧 kb9122427077@gmail.com · <a href="https://www.graceacademy.com" target="_blank" rel="noopener noreferrer" style={{ color: "#f59e0b", textDecoration: "none" }}>graceacademy.com</a>
        </p>
      </footer>

      {/* MODAL */}
      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.9)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setOpen(false)}>
          <div style={{ background: "#0e0e0e", border: "1px solid #1e1e1e", borderRadius: 24, padding: "40px 32px", maxWidth: 440, width: "100%", boxSizing: "border-box" }}
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            {!sent ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <h3 style={{ fontWeight: 800, fontSize: "1.3rem", margin: 0 }}>Apply for Free Admission</h3>
                  <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#555", fontSize: 22, cursor: "pointer", padding: 0 }}>✕</button>
                </div>
                <p style={{ color: "#555", fontSize: ".84rem", marginBottom: 26 }}>Mr. Krishna Bihari Singh will call you back within 30 minutes. No spam, ever.</p>
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {([
                    ["Your Full Name *", "name", "text"],
                    ["WhatsApp Number *", "phone", "tel"],
                    ["Your City / District *", "city", "text"],
                  ] as const).map(([ph, key, type]) => (
                    <input key={key} type={type} placeholder={ph} required value={form[key]}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [key]: e.target.value }))}
                      style={{ background: "#171717", border: "1px solid #242424", borderRadius: 12, padding: "14px 18px", color: "#fff", fontSize: ".95rem", outline: "none", width: "100%", boxSizing: "border-box" }} />
                  ))}
                  <select value={form.stream} onChange={(e: ChangeEvent<HTMLSelectElement>) => setForm(p => ({ ...p, stream: e.target.value }))}
                    style={{ background: "#171717", border: "1px solid #242424", borderRadius: 12, padding: "14px 18px", color: form.stream ? "#fff" : "#666", fontSize: ".95rem", outline: "none" }}>
                    <option value="">Your 12th Stream (optional)</option>
                    <option>Arts</option><option>Science</option><option>Commerce</option><option>Other</option>
                  </select>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      ...S.btn,
                      borderRadius: 12,
                      padding: "15px",
                      fontSize: "1rem",
                      marginTop: 4,
                      width: "100%",
                      textAlign: "center",
                      opacity: submitting ? 0.75 : 1,
                      cursor: submitting ? "wait" : "pointer",
                    }}
                  >
{submitting ? "Sending…" : "Submit Application →"}
                  </button>
                </form>
                <p style={{ fontSize: 11, color: "#333", textAlign: "center", marginTop: 12 }}>📍 Grace Skill Academy · Dehri on Sone, Rohtas, Bihar</p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div style={{ fontSize: 60, marginBottom: 14 }}>🎉</div>
                <h3 style={{ fontWeight: 800, fontSize: "1.25rem" }}>Application Sent!</h3>
                <p style={{ color: "#777", fontSize: ".9rem" }}>Mr. Krishna Bihari Singh will contact you within <strong style={{ color: "#f59e0b" }}>30 minutes</strong> (WhatsApp or call).</p>
                <a href={`https://wa.me/91${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
                  style={{ ...S.waBtn, marginTop: 20, borderRadius: 12, padding: "13px 28px", display: "inline-block" }}>💬 Also ping us on WhatsApp</a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STICKY WA */}
      <a href={`https://wa.me/91${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
        style={{ position: "fixed", bottom: 24, right: 24, background: "#25D366", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, zIndex: 99, boxShadow: "0 4px 24px rgba(37,211,102,.5)", textDecoration: "none" }}>
        💬
      </a>
    </div>
  );
}