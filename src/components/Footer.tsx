import Wordmark from "./Wordmark";
import { brand, categories, contacts, legal, servicesByCategory } from "@/content/clinic";

export default function Footer() {
  return (
    <footer className="u-grain relative overflow-hidden bg-graphite pb-10 pt-20 text-warm-white/70">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Wordmark tone="light" />
            <p className="mt-6 max-w-[34ch] font-display text-[26px] leading-[1.25] text-warm-white">
              {brand.tagline}
            </p>
            <address className="mt-8 not-italic leading-relaxed">
              {contacts.address}
              <br />
              Метро {contacts.metro}, {contacts.metroWalk}
            </address>
            <a
              href={`tel:${contacts.phoneHref}`}
              className="mt-5 block text-[22px] font-medium tabular-nums text-warm-white"
            >
              {contacts.phone}
            </a>
            <a href={`mailto:${contacts.email}`} className="mt-1 block hover:text-warm-white">
              {contacts.email}
            </a>
            <div className="mt-7 flex gap-5">
              {contacts.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="u-meta text-warm-white/55 transition-colors hover:text-warm-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 2).map((category) => (
              <nav key={category.id} aria-label={category.label}>
                <h2 className="u-meta text-warm-white/65">{category.label}</h2>
                <ul className="mt-4 space-y-2.5">
                  {servicesByCategory(category.id).map((service) => (
                    <li key={service.slug}>
                      <a href={`/uslugi/${service.slug}`} className="transition-colors hover:text-warm-white">
                        {service.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label="Документы">
              <h2 className="u-meta text-warm-white/65">Документы</h2>
              <ul className="mt-4 space-y-2.5">
                {legal.documents.map((doc) => (
                  <li key={doc.href}>
                    <a href={doc.href} className="transition-colors hover:text-warm-white">
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>

              <h2 className="u-meta mt-8 text-warm-white/65">Контролирующие органы</h2>
              <ul className="mt-4 space-y-2.5">
                {legal.supervisors.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="transition-colors hover:text-warm-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Required notice for any medical advertising in Russia. Kept at full
            contrast rather than tucked into the fine print. */}
        <p className="mt-10 border border-white/15 px-5 py-4 text-center text-[15px] text-warm-white">
          {legal.warning}
        </p>

        <div className="mt-10 flex flex-col gap-4 text-[13px] leading-relaxed text-warm-white/65 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[70ch]">
            {legal.entity}. ИНН {legal.inn}, ОГРН {legal.ogrn}. Лицензия на осуществление медицинской
            деятельности {legal.license} от {legal.licenseDate}, выдана{" "}
            {legal.licenseAuthority}.
          </p>
          <p>
            {new Date().getFullYear()} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
