import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import BookingForm from "../BookingForm";
import { contacts } from "@/content/clinic";

/**
 * Contacts.
 *
 * The map, the practical detail and the form sit in one composition, because a
 * visitor who has scrolled this far is deciding whether it is convenient to get
 * here. Parking and metro walking time answer that faster than a phone number.
 *
 * MAP: an OpenStreetMap embed is used so the page works with no API key. For a
 * Russian audience, replace it with a Yandex Maps constructor embed pointing at
 * the clinic's real organisation card. See docs/CONTENT-CHECKLIST.md.
 */
const bbox = [
  contacts.geo.lng - 0.006,
  contacts.geo.lat - 0.003,
  contacts.geo.lng + 0.006,
  contacts.geo.lat + 0.003,
].join("%2C");

const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${contacts.geo.lat}%2C${contacts.geo.lng}`;

export default function Contacts() {
  return (
    <section id="contacts" className="bg-warm-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHead
          eyebrow="Как добраться"
          align="wide"
          title={
            <>
              Клиника в двух шагах от <span className="italic">метро</span>
            </>
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] [&>*]:min-w-0">
          <Reveal kind="settle" className="min-w-0 overflow-hidden rounded-card bg-ivory">
            <iframe
              src={mapSrc}
              title="Карта проезда до клиники"
              loading="lazy"
              className="h-[380px] w-full max-w-full border-0 lg:h-full lg:min-h-[560px]"
            />
          </Reveal>

          <div className="grid min-w-0 gap-6 [&>*]:min-w-0">
            <Reveal delay={0.08}>
              <div className="rounded-card border border-charcoal/12 p-7">
                <h3 className="font-display text-[24px] leading-tight">Адрес</h3>
                <address className="mt-4 not-italic leading-relaxed text-warm-gray">
                  {contacts.address}
                </address>

                <dl className="mt-6 space-y-4 border-t border-charcoal/10 pt-6 text-[15px]">
                  <div>
                    <dt className="u-meta text-warm-gray">Метро</dt>
                    <dd className="mt-1.5">
                      {contacts.metro}, {contacts.metroWalk}
                    </dd>
                  </div>
                  <div>
                    <dt className="u-meta text-warm-gray">Парковка</dt>
                    <dd className="mt-1.5 leading-relaxed">{contacts.parking}</dd>
                  </div>
                  <div>
                    <dt className="u-meta text-warm-gray">Часы работы</dt>
                    <dd className="mt-1.5 space-y-1">
                      {contacts.hours.map((row) => (
                        <span key={row.days} className="flex justify-between gap-4">
                          <span className="text-warm-gray">{row.days}</span>
                          <span className="tabular-nums">{row.time}</span>
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <a
                  href={`tel:${contacts.phoneHref}`}
                  className="mt-6 block font-display text-[26px] tabular-nums"
                >
                  {contacts.phone}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="rounded-card bg-pearl p-7">
                <h3 className="font-display text-[24px] leading-tight">Записаться</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-warm-gray">
                  Оставьте номер, администратор перезвонит и подберёт врача и время.
                </p>
                <div className="mt-6">
                  <BookingForm compact />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
