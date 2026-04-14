"use client";
import { useState, useEffect } from "react";

const PHONE = "9122427077";
const WA = "7488545901";

/* ─── STYLES ────────────────────────────────────────────── */
const S = {
  label: { color: "#f59e0b", fontWeight: 600, letterSpacing: 2, fontSize: 12, marginBottom: 12, textTransform: "uppercase", display: "block" },
  h2: { fontSize: "clamp(1.7rem,4vw,2.7rem)", fontWeight: 800, margin: "0 0 12px" },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 28 },
  gold: { background: "linear-gradient(135deg,#f59e0b,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  btn: { background: "linear-gradient(135deg,#f59e0b,#ef4444)", color: "#000", padding: "16px 36px", borderRadius: 50, fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", boxShadow: "0 0 32px rgba(245,158,11,.35)" },
};

export default function TermsAndConditions() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

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
          <a href="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 10 }}>
            <div
              className="w-[38px] h-[38px] text-base lg:w-12 lg:h-12 lg:text-xl shrink-0"
              style={{ borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}
            >
              G
            </div>
            <div>
              <div className="font-extrabold text-[1.1375rem] leading-tight lg:text-[1.5078125rem]">
                GRACE SKILL ACADEMY
              </div>
              <div className="text-[0.8125rem] leading-tight text-[#888] lg:text-[1.0765625rem]">
                Powered by Exalt College of Engineering & Technology, Patna
              </div>
            </div>
          </a>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href={`tel:${PHONE}`} style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)", color: "#000", padding: "7px 16px", borderRadius: 24, fontWeight: 800, fontSize: 11, textDecoration: "none" }}>📞 Call Now</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: "110px 20px 70px",
        background: "radial-gradient(ellipse at 50% -10%, #1c0e00 0%, #080808 65%)", position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 15% 60%, rgba(245,158,11,0.06) 0%, transparent 45%), radial-gradient(circle at 85% 25%, rgba(239,68,68,0.06) 0%, transparent 45%)", pointerEvents: "none" }} />

        <h1 style={{ fontFamily: "'Baloo 2',cursive", fontSize: "clamp(2.4rem,7.5vw,4rem)", fontWeight: 800, lineHeight: 1.08, margin: "0 0 22px", maxWidth: 820 }}>
          <span style={S.gold}>Terms & Conditions</span>
        </h1>

        <p style={{ fontSize: "clamp(.95rem,2.2vw,1.15rem)", color: "#999", maxWidth: 620, margin: "0 0 20px", lineHeight: 1.75 }}>
          Important terms and conditions for admission and enrollment at Grace Skill Academy BCA program.
        </p>
        
        <a href="/" style={{ 
          background: "rgba(255,255,255,0.1)", 
          border: "1px solid rgba(255,255,255,0.2)", 
          color: "#f59e0b", 
          padding: "12px 28px", 
          borderRadius: 50, 
          textDecoration: "none", 
          fontWeight: 700, 
          fontSize: 14,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          transition: "all .2s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(245,158,11,0.1)";
          e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        }}>
          ← Back to Home
        </a>
      </section>

      {/* TERMS CONTENT */}
      <section style={{ padding: "70px 20px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          
          {/* About Grace Skill Academy */}
          <div style={S.card}>
            <h2 style={{ ...S.h2, fontSize: "1.5rem", marginBottom: 16 }}>About Grace Skill Academy</h2>
            <p style={{ color: "#ccc", lineHeight: 1.7, marginBottom: 12 }}>
              Grace Skill Academy operates as a <strong style={{ color: "#f59e0b" }}>career counseling and consultant firm</strong> for <strong style={{ color: "#fff" }}>Exalt College of Engineering & Technology, Patna</strong>. We provide comprehensive BCA degree programs under AICTE approval and AKU affiliation through our partnership with Exalt College.
            </p>
            <p style={{ color: "#ccc", lineHeight: 1.7 }}>
              Our centers are located at Dehri on Sone and Karup/Nasriganj in Rohtas district, Bihar, serving as official Exalt Student Counseling Centers.
            </p>
          </div>

          {/* Laptop Policy */}
          <div style={S.card}>
            <h2 style={{ ...S.h2, fontSize: "1.5rem", marginBottom: 16 }}>Free Laptop Policy</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.3)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <span style={{ fontSize: 24 }}>💻</span>
              <strong style={{ color: "#f59e0b" }}>Limited Offer: Complimentary laptop available ONLY for the first 30 admitted students.</strong>
            </div>
            <ul style={{ color: "#ccc", lineHeight: 1.7, paddingLeft: 20 }}>
              <li>Laptop distribution is on a <strong style={{ color: "#fff" }}>first-come, first-served basis</strong> based on admission confirmation date.</li>
              <li>Students must complete full registration and fee payment process to be eligible.</li>
              <li>Once 30 laptops are distributed, no additional laptops will be provided for subsequent admissions.</li>
              <li>Laptop remains the property of the student upon successful completion of the program.</li>
              <li>In case of program withdrawal, laptop return may be required as per college policy.</li>
            </ul>
          </div>

          {/* Registration & Fees */}
          <div style={S.card}>
            <h2 style={{ ...S.h2, fontSize: "1.5rem", marginBottom: 16 }}>Registration & Fee Structure</h2>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 12, marginBottom: 8 }}>
                <span style={{ color: "#ccc" }}>Total Course Fee</span>
                <strong style={{ color: "#f59e0b" }}>₹2,70,000</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 12 }}>
                <span style={{ color: "#ccc" }}>Registration Charges</span>
                <strong style={{ color: "#f59e0b" }}>As applicable during admission</strong>
              </div>
            </div>
            <ul style={{ color: "#ccc", lineHeight: 1.7, paddingLeft: 20 }}>
              <li><strong style={{ color: "#fff" }}>Registration charges are mandatory</strong> and must be paid during the admission process.</li>
              <li>Full course fee is covered through <strong style={{ color: "#f59e0b" }}>Bihar Student Credit Card</strong> facility.</li>
              <li>Students are responsible for completing Student Credit Card application with our guidance.</li>
              <li>Fee payment timeline must be adhered to as per college academic calendar.</li>
              <li>No refund of registration charges after admission confirmation.</li>
            </ul>
          </div>

          {/* Student Obligations */}
          <div style={S.card}>
            <h2 style={{ ...S.h2, fontSize: "1.5rem", marginBottom: 16 }}>Student Commitments & Obligations</h2>
            <ul style={{ color: "#ccc", lineHeight: 1.7, paddingLeft: 20 }}>
              <li><strong style={{ color: "#ef4444" }}>Minimum 80% attendance</strong> is mandatory for all classes and practical sessions.</li>
              <li>Complete all assignments, projects, and assessments within stipulated deadlines.</li>
              <li>Minimum <strong style={{ color: "#fff" }}>2 hours daily self-study</strong> or revision is expected.</li>
              <li>Participate in mandatory <strong style={{ color: "#f59e0b" }}>3-month paid internship</strong> program during course period.</li>
              <li>Attend mock interviews (twice a month) and placement preparation sessions.</li>
              <li>Maintain discipline and professional conduct throughout the program.</li>
              <li>Complete at least <strong style={{ color: "#fff" }}>3 live client projects</strong> as part of curriculum requirements.</li>
            </ul>
          </div>

          {/* Placement & Career Services */}
          <div style={S.card}>
            <h2 style={{ ...S.h2, fontSize: "1.5rem", marginBottom: 16 }}>Placement Assistance & Career Services</h2>
            <div style={{ background: "rgba(37,211,102,.1)", border: "1px solid rgba(37,211,102,.3)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <strong style={{ color: "#25D366" }}>✅ 100% Guaranteed Placement Assistance</strong>
            </div>
            <ul style={{ color: "#ccc", lineHeight: 1.7, paddingLeft: 20 }}>
              <li>Grace Skill Academy provides <strong style={{ color: "#fff" }}>placement assistance</strong>, not placement guarantee.</li>
              <li>Assistance includes resume building, interview preparation, and connecting with recruitment partners.</li>
              <li>Student's performance, skills, and interview results determine final job placement.</li>
              <li>Average package indication (3 LPA) is based on historical data and market conditions.</li>
              <li>Placement support continues until student receives suitable offer or for 6 months post-graduation, whichever is earlier.</li>
              <li>Students must actively participate in placement drives and company interviews arranged by the academy.</li>
            </ul>
          </div>

          {/* Program Delivery */}
          <div style={S.card}>
            <h2 style={{ ...S.h2, fontSize: "1.5rem", marginBottom: 16 }}>Program Delivery & Academic Terms</h2>
            <ul style={{ color: "#ccc", lineHeight: 1.7, paddingLeft: 20 }}>
              <li>Classes are conducted in <strong style={{ color: "#f59e0b" }}>hybrid mode</strong> - both offline (Dehri campus) and online options available.</li>
              <li>Curriculum follows AICTE guidelines with additional industry-focused training modules.</li>
              <li>Degree is awarded by <strong style={{ color: "#fff" }}>Exalt College of Engineering & Technology, Patna</strong> (AKU affiliated, AICTE approved).</li>
              <li>Program duration is 3 years (6 semesters) as per university norms.</li>
              <li>Industry certifications are provided upon successful completion of respective modules.</li>
              <li>Academic calendar and examination schedule follow university guidelines.</li>
            </ul>
          </div>

          {/* General Terms */}
          <div style={S.card}>
            <h2 style={{ ...S.h2, fontSize: "1.5rem", marginBottom: 16 }}>General Terms & Conditions</h2>
            <ul style={{ color: "#ccc", lineHeight: 1.7, paddingLeft: 20 }}>
              <li>Admission is subject to verification of documents and eligibility criteria.</li>
              <li>Grace Skill Academy reserves the right to modify course content, schedule, or policies with reasonable notice.</li>
              <li>Students must maintain updated contact information and inform about any changes promptly.</li>
              <li>Any fraudulent information or documents may result in immediate termination from the program.</li>
              <li>Disciplinary actions may be taken for misconduct, including program termination without fee refund.</li>
              <li>All disputes are subject to jurisdiction of courts in Rohtas district, Bihar.</li>
              <li>These terms are subject to change; updated versions will be communicated to enrolled students.</li>
            </ul>
          </div>

          {/* Contact for Clarifications */}
          <div style={{ ...S.card, textAlign: "center", background: "rgba(245,158,11,.05)", border: "1px solid rgba(245,158,11,.15)" }}>
            <h3 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 16, color: "#f59e0b" }}>Questions about Terms & Conditions?</h3>
            <p style={{ color: "#ccc", marginBottom: 20 }}>Contact our admission counselor for clarifications</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`tel:${PHONE}`} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "12px 24px", borderRadius: 50, textDecoration: "none", fontWeight: 700 }}>📞 {PHONE}</a>
              <a href="mailto:contactgraceskillacademy@gmail.com" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "12px 24px", borderRadius: 50, textDecoration: "none", fontWeight: 700 }}>📧 Email Us</a>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "28px 20px", borderTop: "1px solid #111", textAlign: "center" }}>
        <p style={{ color: "#333", fontSize: 12, margin: 0, lineHeight: 1.9 }}>
          © 2026 <strong style={{ color: "#555" }}>Grace Skill Academy</strong> · Opp. Nehru College, Dehri on Sone, Rohtas, Bihar 821305<br />
          Part of <strong style={{ color: "#f59e0b" }}>Exalt College of Engineering & Technology</strong>, Patna · AICTE Approved · AKU Affiliated<br />
          📧 <a href="mailto:contactgraceskillacademy@gmail.com" style={{ color: "#f59e0b", textDecoration: "none" }}>contactgraceskillacademy@gmail.com</a> · 
          <a href="/" style={{ color: "#f59e0b", textDecoration: "none", marginLeft: 8 }}>Back to Home</a>
        </p>
      </footer>

    </div>
  );
}