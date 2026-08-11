import Hero from "@/components/sections/Hero";
import Advantages from "@/components/sections/Advantages";
import Services from "@/components/sections/Services";
import Doctors from "@/components/sections/Doctors";
import Results from "@/components/sections/Results";
import Equipment from "@/components/sections/Equipment";
import Drugs from "@/components/sections/Drugs";
import About from "@/components/sections/About";
import Prices from "@/components/sections/Prices";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
import Contacts from "@/components/sections/Contacts";
import { faq } from "@/content/clinic";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Advantages />
      <Services />
      <Doctors />
      <Results />
      <Equipment />
      <Drugs />
      <About />
      <Prices />
      <Reviews />
      <Faq />
      <Contacts />
    </>
  );
}
