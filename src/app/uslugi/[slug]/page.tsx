import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import ServiceCta from "@/components/ServiceCta";
import {
  brand,
  categories,
  doctors,
  formatPrice,
  getService,
  legal,
  services,
} from "@/content/clinic";

type Params = { params: Promise<{ slug: string }> };

/** Every procedure is its own indexable landing page. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: `${service.title} в Москве`,
    description: service.summary,
    alternates: { canonical: `/uslugi/${service.slug}` },
    openGraph: {
      title: `${service.title}. ${brand.name}`,
      description: service.summary,
      url: `/uslugi/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const category = categories.find((c) => c.id === service.category);
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: brand.url },
          { "@type": "ListItem", position: 2, name: category?.label, item: `${brand.url}/#services` },
          { "@type": "ListItem", position: 3, name: service.title },
        ],
      },
      {
        "@type": "MedicalProcedure",
        name: service.title,
        description: service.summary,
        howPerformed: service.includes.join(". "),
        preparation: "Консультация врача, оценка противопоказаний",
        followup: service.recovery,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article>
        <header className="relative overflow-hidden bg-graphite pb-20 pt-40 lg:pb-28 lg:pt-48">
          <Photo
            src={service.photo}
            seed={service.photoSeed}
            tone="dark"
            spec="1920 x 1080"
            label={`${service.title}: процедура в кабинете, широкий план`}
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/80 to-graphite/30" />
          <div className="u-grain absolute inset-0" />

          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
            <nav aria-label="Хлебные крошки" className="u-meta text-warm-white/45">
              <Link href="/" className="transition-colors hover:text-warm-white">
                Главная
              </Link>
              <span className="px-2">/</span>
              <Link href="/#services" className="transition-colors hover:text-warm-white">
                {category?.label}
              </Link>
            </nav>

            <h1 className="mt-7 max-w-[16ch] text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.06] text-gold">
              {service.title}
            </h1>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-warm-white/70 lg:text-[18px]">
              {service.summary}
            </p>

            <div className="mt-10">
              <ServiceCta service={service.title} />
            </div>
          </div>
        </header>

        <section className="bg-warm-white py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20">
              <div>
                <Reveal>
                  <h2 className="text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight text-bronze">
                    Что входит в процедуру
                  </h2>
                </Reveal>
                <ul className="mt-8 space-y-6">
                  {service.includes.map((item, index) => (
                    <Reveal as="li" key={item} delay={index * 0.06}>
                      <div className="flex gap-5 border-b border-charcoal/10 pb-6">
                        <span className="font-display text-[20px] tabular-nums text-warm-gray">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="max-w-[54ch] leading-relaxed">{item}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>

                <Reveal>
                  <p className="mt-10 max-w-[60ch] leading-relaxed text-warm-gray">
                    Точный протокол врач определяет на консультации: он зависит от исходного
                    состояния кожи, сопутствующих состояний и того, что вы уже делали раньше.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.1}>
                <aside className="sticky top-28 rounded-card border border-charcoal/12 p-8">
                  <p className="u-meta text-warm-gray">Стоимость</p>
                  <p className="mt-3 font-display text-[38px] leading-none tabular-nums">
                    от {formatPrice(service.priceFrom)} ₽
                  </p>

                  <dl className="mt-8 space-y-5 border-t border-charcoal/10 pt-6 text-[15px]">
                    {[
                      ["Длительность", service.duration],
                      ["Анестезия", service.anesthesia],
                      ["Восстановление", service.recovery],
                      ["Результат", service.result],
                    ].map(([term, value]) => (
                      <div key={term}>
                        <dt className="u-meta text-warm-gray">{term}</dt>
                        <dd className="mt-1.5 leading-relaxed">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-8">
                    <ServiceCta service={service.title} tone="light" />
                  </div>

                  <p className="mt-6 text-[12px] leading-relaxed text-warm-gray">{legal.warning}</p>
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-pearl py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight text-bronze">
                Кто проводит процедуру
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {doctors.map((doctor, index) => (
                <Reveal as="article" key={doctor.slug} delay={index * 0.06}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-charcoal">
                    <Photo
                      seed={doctor.photoSeed}
                      tone="dark"
                      spec="800 x 1066"
                      label={`Портрет: ${doctor.name}, ${doctor.role}`}
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-[22px] leading-tight text-warm-white">
                        {doctor.name}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-warm-white/65">{doctor.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-warm-white py-20 lg:py-28">
            <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
              <Reveal>
                <h2 className="text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight text-bronze">
                  Другие процедуры направления
                </h2>
              </Reveal>

              <ul className="mt-10 divide-y divide-charcoal/10 border-t border-charcoal/10">
                {related.map((item, index) => (
                  <Reveal as="li" key={item.slug} delay={index * 0.05}>
                    <Link
                      href={`/uslugi/${item.slug}`}
                      className="group flex flex-wrap items-baseline justify-between gap-4 py-6"
                    >
                      <span className="font-display text-[24px] leading-tight transition-colors group-hover:text-sage-deep">
                        {item.title}
                      </span>
                      <span className="tabular-nums text-warm-gray">
                        от {formatPrice(item.priceFrom)} ₽
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
