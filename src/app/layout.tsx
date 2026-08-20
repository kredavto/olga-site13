import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

import { BookingProvider } from "@/components/BookingProvider";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import { brand, contacts, legal } from "@/content/clinic";

/**
 * Faces.
 *
 * The design system names three licensed faces: Financier Display, Ftbase and
 * Fragment Mono. None can be fetched here, so each token stack names the real
 * face first and falls back to the nearest free equivalent that ships a real
 * Cyrillic subset. Dropping the licensed files in is the only step needed to
 * switch: no component references a face directly, they all go through the
 * three font tokens.
 *
 * The Cyrillic requirement is not a nicety. A Latin only display face falls
 * back silently on every Russian heading, which collapses the typography
 * without producing an error anywhere.
 */
const editorialSerif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial-serif",
  display: "swap",
});

const grotesque = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesque",
  display: "swap",
});

const monoFace = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
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
    <html lang="ru" className={`${editorialSerif.variable} ${grotesque.variable} ${monoFace.variable}`}>
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
