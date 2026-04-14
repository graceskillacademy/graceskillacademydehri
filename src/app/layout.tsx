import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins, Baloo_2 } from "next/font/google";
import "./globals.css";

const fontSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const baloo2 = Baloo_2({
  variable: "--font-baloo-2",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Grace Skill Academy | BCA · Exalt Student Counseling Center · Dehri & Rohtas, Bihar",
  description:
    "BCA with Bihar Student Credit Card, paid internship, 100% placement assistance, and Exalt Student Counseling Centers in Dehri on Sone and Karup / Nasriganj, Rohtas, Bihar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${poppins.variable} ${baloo2.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
