import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

import { BookingProvider } from "@/components/BookingProvider";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import { brand, contacts, legal } from "@/content/clinic";

/**
 * Display face is a Didone: the reference screenshots are almost all
 * high-contrast serif over photography, and that contrast is what makes the
 * type read as couture rather than as a medical brochure.
 *
 * The choice is constrained by language. The site is in Russian, so the display
 * face must ship a real Cyrillic subset. A Latin-only Didone silently falls back
 * to the sans for every heading, which collapses the whole typographic idea.
 * Manrope carries every functional string, so the serif never has to do UI work.
 */
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name}. ${brand.descriptor}`,
    template: `%s. ${brand.name}`,
  },
  description:
    "Клиника медицинской косметологии: врачи-дерматологи, оригинальные препараты, сертифицированное оборудование и индивидуальные программы лечения.",
  keywords: [
    "медицинская косметология",
    "клиника косметологии Москва",
    "инъекционная косметология",
    "аппаратная косметология",
    "SMAS-лифтинг",
    "трихология",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: brand.url,
    siteName: brand.name,
    title: `${brand.name}. ${brand.descriptor}`,
    description:
      "Врачи-дерматологи, оригинальные препараты и сертифицированное оборудование. Индивидуальные программы вместо универсальных схем.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name}. ${brand.descriptor}`,
    description: "Медицинская косметология и дерматология в Москве.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fcfcfa",
  width: "device-width",
  initialScale: 1,
};

const medicalClinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: brand.name,
  description: brand.descriptor,
  url: brand.url,
  telephone: contacts.phone,
  email: contacts.email,
  medicalSpecialty: ["Dermatology", "PlasticSurgery"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressCountry: "RU",
    streetAddress: contacts.addressShort,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: contacts.geo.lat,
    longitude: contacts.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  // Sample legal identifier. Replace before launch.
  identifier: legal.license,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${playfair.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalClinicSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[80] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-warm-white"
        >
          Перейти к содержанию
        </a>
        <BookingProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StickyCta />
        </BookingProvider>
      </body>
    </html>
  );
}
