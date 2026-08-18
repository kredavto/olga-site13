/**
 * Single source of content for the site.
 *
 * READ BEFORE LAUNCH
 * ------------------
 * Every value marked with the `PLACEHOLDER` comment is sample content written
 * to build and review the layout. None of it describes a real clinic, a real
 * doctor, a real licence or a real price. Replace all of it with the client's
 * verified data before the site goes public. Legal identifiers in particular
 * (licence, INN, OGRN) are deliberately written in an obviously invalid form
 * so they cannot be mistaken for genuine records.
 *
 * See docs/CONTENT-CHECKLIST.md for the full replacement checklist.
 */

export const PLACEHOLDER_LEGAL = true;

export const brand = {
  /** PLACEHOLDER: clinic name. */
  name: "LUMERA",
  nameRu: "Люмера",
  descriptor: "Клиника медицинской косметологии в Москве",
  tagline: "Медицина, которая сохраняет естественную красоту",
  url: "https://lumera.clinic",
} as const;

export const contacts = {
  /** PLACEHOLDER: all contact data. */
  phone: "+7 495 172 41 06",
  phoneHref: "+74951724106",
  email: "clinic@lumera.clinic",
  address: "Москва, Пресненская набережная, 12, вход со стороны сквера",
  addressShort: "Пресненская набережная, 12",
  metro: "Деловой центр",
  metroWalk: "4 минуты пешком",
  parking: "Подземный паркинг здания, первые 90 минут для пациентов бесплатно",
  hours: [
    { days: "Понедельник - пятница", time: "09:00 - 21:00" },
    { days: "Суббота", time: "10:00 - 20:00" },
    { days: "Воскресенье", time: "10:00 - 18:00" },
  ],
  geo: { lat: 55.7494, lng: 37.5397 },
  social: [
    { label: "Telegram", href: "https://t.me/" },
    { label: "VK", href: "https://vk.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
} as const;

export const legal = {
  /**
   * PLACEHOLDER: legal identifiers.
   * The zeroed form below is intentional. Do not replace it with plausible
   * looking digits, replace it with the clinic's actual registry data.
   */
  entity: "ООО «Люмера Клиник»",
  inn: "0000000000",
  ogrn: "0000000000000",
  license: "ЛО-00-00-000000",
  licenseDate: "00.00.0000",
  licenseAuthority: "Департамент здравоохранения города Москвы",
  supervisors: [
    { label: "Минздрав России", href: "https://minzdrav.gov.ru" },
    { label: "Росздравнадзор", href: "https://roszdravnadzor.gov.ru" },
    { label: "Роспотребнадзор", href: "https://rospotrebnadzor.ru" },
  ],
  documents: [
    { label: "Политика конфиденциальности", href: "/legal/privacy" },
    { label: "Согласие на обработку персональных данных", href: "/legal/consent" },
    { label: "Правила оказания платных медицинских услуг", href: "/legal/rules" },
    { label: "Лицензия и приложения", href: "/legal/license" },
  ],
  warning: "Имеются противопоказания. Необходима консультация специалиста.",
} as const;

export type ServiceCategory = "injection" | "hardware" | "aesthetic" | "trichology";

export const categories: { id: ServiceCategory; label: string; blurb: string }[] = [
  {
    id: "injection",
    label: "Инъекционная косметология",
    blurb: "Работа с объёмом, тонусом и качеством кожи препаратами с доказанным профилем.",
  },
  {
    id: "hardware",
    label: "Аппаратная косметология",
    blurb: "Ультразвук, лазер и радиочастота на сертифицированных платформах.",
  },
  {
    id: "aesthetic",
    label: "Эстетическая косметология",
    blurb: "Программы ухода и пилинги, которые готовят кожу и удерживают результат.",
  },
  {
    id: "trichology",
    label: "Трихология",
    blurb: "Диагностика и лечение выпадения волос по протоколу с контролем динамики.",
  },
];

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  /** PLACEHOLDER: sample price in roubles. */
  priceFrom: number;
  duration: string;
  recovery: string;
  anesthesia: string;
  result: string;
  includes: string[];
  photoSeed: string;
  /** Path under /public. Every procedure now has its own frame. */
  photo: string;
};

export const services: Service[] = [
  {
    slug: "botulinum",
    title: "Ботулинотерапия",
    category: "injection",
    summary:
      "Расслабление мимических мышц в зонах лба, межбровья и вокруг глаз. Мимика сохраняется, заломы разглаживаются.",
    priceFrom: 14900,
    duration: "30 минут",
    recovery: "Без ограничений, кроме первых 4 часов",
    anesthesia: "Не требуется",
    result: "Проявляется на 3-7 день, держится 4-6 месяцев",
    includes: [
      "Осмотр и оценка мимического паттерна",
      "Расчёт индивидуальной схемы введения",
      "Препарат Xeomin или Dysport на выбор",
      "Контрольный визит на 14 день",
    ],
    photoSeed: "lumera-botulinum",
    photo: "/photo/services/botulinum.jpg",
  },
  {
    slug: "fillers",
    title: "Контурная пластика филлерами",
    category: "injection",
    summary:
      "Восполнение объёма скул, подбородка и носослёзной борозды. Работаем на естественную анатомию, а не на изменение черт.",
    priceFrom: 28500,
    duration: "45-60 минут",
    recovery: "Отёк до 3 дней",
    anesthesia: "Аппликационный крем",
    result: "Виден сразу, окончательно через 2 недели, держится 9-18 месяцев",
    includes: [
      "Разметка по анатомическим ориентирам",
      "Филлер Juvederm, Restylane или Belotero",
      "Канюльная техника в зонах риска",
      "Осмотр через 14 дней",
    ],
    photoSeed: "lumera-fillers",
    photo: "/photo/services/fillers.jpg",
  },
  {
    slug: "biorevitalization",
    title: "Биоревитализация",
    category: "injection",
    summary:
      "Насыщение кожи гиалуроновой кислотой. Возвращает плотность и тонус там, где кожа стала тонкой и тусклой.",
    priceFrom: 16400,
    duration: "40 минут",
    recovery: "Папулы рассасываются за 1-2 дня",
    anesthesia: "Аппликационный крем",
    result: "Курс из 3-4 процедур, эффект удерживается до 8 месяцев",
    includes: [
      "Диагностика гидратации кожи",
      "Препарат Profhilo или монофазная гиалуроновая кислота",
      "Постпроцедурный уход в подарок",
      "План поддержки на год",
    ],
    photoSeed: "lumera-biorevi",
    photo: "/photo/services/biorevitalization.jpg",
  },
  {
    slug: "smas-lifting",
    title: "SMAS-лифтинг Ultraformer",
    category: "hardware",
    summary:
      "Сфокусированный ультразвук уплотняет глубокие слои и подтягивает овал лица без разрезов и восстановительного периода.",
    priceFrom: 62000,
    duration: "90 минут",
    recovery: "Возвращение к делам в тот же день",
    anesthesia: "Аппликационный крем по показаниям",
    result: "Нарастает 2-3 месяца, держится до 18 месяцев",
    includes: [
      "УЗ-разметка глубины воздействия",
      "Работа на платформе Ultraformer MPT",
      "Охлаждающий уход после процедуры",
      "Контроль результата через 90 дней",
    ],
    photoSeed: "lumera-smas",
    photo: "/photo/services/smas-lifting.jpg",
  },
  {
    slug: "laser-resurfacing",
    title: "Лазерная шлифовка Fotona",
    category: "hardware",
    summary:
      "Фракционное обновление рельефа. Работает с постакне, рубцами и мелкими морщинами за счёт управляемой регенерации.",
    priceFrom: 34000,
    duration: "60 минут",
    recovery: "Покраснение и шелушение 4-7 дней",
    anesthesia: "Аппликационный крем",
    result: "Курс из 2-3 процедур с интервалом в месяц",
    includes: [
      "Тест-зона перед первой процедурой",
      "Платформа Fotona SP Dynamis",
      "Восстанавливающий уход на период заживления",
      "Осмотр на 7 день",
    ],
    photoSeed: "lumera-laser",
    photo: "/photo/services/laser-resurfacing.jpg",
  },
  {
    slug: "rf-microneedling",
    title: "RF-микроигольчатый лифтинг Morpheus8",
    category: "hardware",
    summary:
      "Радиочастота на контролируемой глубине. Уплотняет кожу и работает с нижней третью лица и подбородком.",
    priceFrom: 47000,
    duration: "75 минут",
    recovery: "Сетчатый след и отёк 2-4 дня",
    anesthesia: "Аппликационный крем или инфильтрационная",
    result: "Курс из 2-3 процедур, оценка через 3 месяца",
    includes: [
      "Подбор глубины и энергии по типу кожи",
      "Платформа Morpheus8",
      "Стерильный одноразовый картридж при пациенте",
      "Программа домашнего ухода",
    ],
    photoSeed: "lumera-rf",
    photo: "/photo/services/rf-microneedling.jpg",
  },
  {
    slug: "hydrafacial",
    title: "HydraFacial",
    category: "aesthetic",
    summary:
      "Аппаратная чистка с вакуумной экстракцией и подачей сывороток. Без механического травмирования кожи.",
    priceFrom: 12800,
    duration: "50 минут",
    recovery: "Отсутствует",
    anesthesia: "Не требуется",
    result: "Виден сразу, поддержка раз в 4-6 недель",
    includes: [
      "Диагностика состояния кожи",
      "Три этапа: очищение, экстракция, насыщение",
      "Подбор сыворотки под задачу",
      "Рекомендации по домашнему уходу",
    ],
    photoSeed: "lumera-hydra",
    photo: "/photo/services/hydrafacial.jpg",
  },
  {
    slug: "peeling",
    title: "Срединные и поверхностные пилинги",
    category: "aesthetic",
    summary:
      "Контролируемое обновление кожи кислотами. Подбираем глубину под задачу и сезон, а не по универсальной схеме.",
    priceFrom: 9400,
    duration: "40 минут",
    recovery: "От нуля до 5 дней в зависимости от глубины",
    anesthesia: "Не требуется",
    result: "Курс из 4-6 процедур",
    includes: [
      "Подготовка кожи за 2 недели",
      "Пилинг подобранной глубины",
      "Постпилинговый уход",
      "Схема защиты от солнца",
    ],
    photoSeed: "lumera-peeling",
    photo: "/photo/services/peeling.jpg",
  },
  {
    slug: "hair-diagnostics",
    title: "Трихологическая диагностика",
    category: "trichology",
    summary:
      "Трихоскопия, фототрихограмма и лабораторная панель. Находим причину выпадения до назначения лечения.",
    priceFrom: 6800,
    duration: "60 минут",
    recovery: "Отсутствует",
    anesthesia: "Не требуется",
    result: "Протокол лечения на руки в день визита",
    includes: [
      "Трихоскопия с картированием зон",
      "Фототрихограмма с подсчётом плотности",
      "Направление на лабораторную панель",
      "Письменный план лечения",
    ],
    photoSeed: "lumera-tricho",
    photo: "/photo/services/hair-diagnostics.jpg",
  },
  {
    slug: "hair-prp",
    title: "Плазмотерапия волосистой части головы",
    category: "trichology",
    summary:
      "Инъекции обогащённой тромбоцитами плазмы. Поддерживает фолликул в фазе роста при диффузном выпадении.",
    priceFrom: 13500,
    duration: "45 минут",
    recovery: "Чувствительность в течение суток",
    anesthesia: "Аппликационный крем",
    result: "Курс из 4 процедур, контроль трихоскопией",
    includes: [
      "Забор крови в клинике",
      "Двойное центрифугирование",
      "Инъекции по зонам разрежения",
      "Контрольная трихоскопия через 3 месяца",
    ],
    photoSeed: "lumera-prp",
    photo: "/photo/services/hair-prp.jpg",
  },
];

export type Doctor = {
  slug: string;
  name: string;
  role: string;
  experience: string;
  education: string;
  focus: string;
  credentials: string[];
  photoSeed: string;
  /** Path under /public. PLACEHOLDER portrait, see docs/CONTENT-CHECKLIST.md. */
  photo: string;
  /**
   * Where the portrait's 3:4 crop is anchored. These sources are taller than
   * the card, so a centred crop takes a slice off the top as well as the
   * bottom, and on the frames where the subject stands high it takes the top
   * of their hair with it. Anchoring to the top spends the whole crop on the
   * coat below instead.
   */
  photoPosition?: "top" | "center";
};

/** PLACEHOLDER: sample specialists. Replace with the clinic's real team. */
export const doctors: Doctor[] = [
  {
    slug: "vereschagina",
    name: "Алина Верещагина",
    role: "Дерматовенеролог, косметолог",
    experience: "12 лет практики",
    education: "Первый МГМУ имени И. М. Сеченова, ординатура по дерматовенерологии",
    focus: "Инъекционные протоколы и работа с возрастными изменениями средней зоны лица",
    credentials: [
      "Сертификат Allergan Medical Institute",
      "Член Общества эстетической медицины",
      "Публикации по коррекции носослёзной борозды",
    ],
    photoSeed: "lumera-doctor-av",
    photo: "/photo/doctors/vereschagina.jpg",
    photoPosition: "top",
  },
  {
    slug: "oganesyan",
    name: "Марк Оганесян",
    role: "Дерматолог, специалист по лазерным технологиям",
    experience: "9 лет практики",
    education: "РНИМУ имени Н. И. Пирогова, ординатура по дерматовенерологии",
    focus: "Лазерное омоложение, работа с постакне и сосудистыми образованиями",
    credentials: [
      "Сертификат Fotona Laser Academy",
      "Курс лазерной дерматологии, Вена",
      "Спикер профильных конференций по лазерной шлифовке",
    ],
    photoSeed: "lumera-doctor-mo",
    photo: "/photo/doctors/oganesyan.jpg",
  },
  {
    slug: "dorofeeva",
    name: "Ксения Дорофеева",
    role: "Косметолог, трихолог",
    experience: "14 лет практики",
    education: "СЗГМУ имени И. И. Мечникова, специализация по трихологии",
    focus: "Диагностика выпадения волос и длительные протоколы восстановления",
    credentials: [
      "Сертификат Европейской ассоциации трихологов",
      "Курс фототрихограммы и цифровой трихоскопии",
      "Ведёт научную работу по андрогенной алопеции",
    ],
    photoSeed: "lumera-doctor-kd",
    photo: "/photo/doctors/dorofeeva.jpg",
  },
  {
    slug: "yagudin",
    name: "Рустам Ягудин",
    role: "Врач-косметолог, аппаратные методики",
    experience: "8 лет практики",
    education: "Казанский ГМУ, ординатура по дерматовенерологии",
    focus: "SMAS-лифтинг, радиочастотные методики, программы подготовки к событию",
    credentials: [
      "Сертификат Ultraformer Academy",
      "Сертификат InMode по Morpheus8",
      "Наставник по аппаратным протоколам в клинике",
    ],
    photoSeed: "lumera-doctor-ry",
    photo: "/photo/doctors/yagudin.jpg",
    photoPosition: "top",
  },
];

export type Device = {
  name: string;
  maker: string;
  country: string;
  purpose: string;
  advantage: string;
  photoSeed: string;
  /** Path under /public. Every platform has its own frame. */
  photo: string;
  /** Where the crop anchors. Portrait sources of tall consoles need "top". */
  photoPosition?: "top" | "center";
};

export const devices: Device[] = [
  {
    name: "Ultraformer MPT",
    maker: "Classys",
    country: "Южная Корея",
    purpose: "Сфокусированный ультразвук для SMAS-лифтинга",
    advantage: "Работа на четырёх глубинах за один сеанс, меньше болевых ощущений",
    photoSeed: "lumera-device-ultraformer",
    photo: "/photo/devices/ultraformer.jpg",
  },
  {
    name: "Fotona SP Dynamis",
    maker: "Fotona",
    country: "Словения",
    purpose: "Эрбиевый и неодимовый лазер",
    advantage: "Две длины волны, от мягкого обновления до фракционной шлифовки",
    photoSeed: "lumera-device-fotona",
    photo: "/photo/devices/fotona.jpg",
  },
  {
    name: "Morpheus8",
    maker: "InMode",
    country: "Израиль",
    purpose: "Радиочастотный микроигольчатый лифтинг",
    advantage: "Контроль глубины до 8 мм, работа с нижней третью лица",
    photoSeed: "lumera-device-morpheus",
    photo: "/photo/devices/morpheus.jpg",
  },
  {
    name: "HydraFacial Syndeo",
    maker: "BeautyHealth",
    country: "США",
    purpose: "Аппаратная чистка и насыщение кожи",
    advantage: "Вакуумная экстракция без механического травмирования",
    photoSeed: "lumera-device-hydra",
    photo: "/photo/devices/hydrafacial.jpg",
  },
  {
    // The supplied photograph is a GentleLase Pro, so the record follows the
    // photograph rather than the other way round: that model is the 755nm
    // alexandrite on its own, where the GentleMax Pro named here before is the
    // dual alexandrite and Nd:YAG. A photograph of a GentleMax Pro restores
    // the original entry.
    name: "GentleLase Pro",
    maker: "Candela",
    country: "США",
    purpose: "Александритовый лазер 755 нм",
    advantage: "Криогенное охлаждение кожи в момент импульса",
    photoSeed: "lumera-device-candela",
    photo: "/photo/devices/candela.jpg",
    photoPosition: "top",
  },
  {
    name: "M22",
    maker: "Lumenis",
    country: "Израиль",
    purpose: "Фотоомоложение и работа с сосудами",
    advantage: "Сменные фильтры под конкретную задачу и фототип",
    photoSeed: "lumera-device-lumenis",
    photo: "/photo/devices/lumenis.jpg",
  },
];

export type Drug = {
  name: string;
  group: string;
  note: string;
};

export const drugs: Drug[] = [
  { name: "Juvederm", group: "Филлеры", note: "Стабилизированная гиалуроновая кислота, линейка под разные зоны" },
  { name: "Restylane", group: "Филлеры", note: "Работа с объёмом и коррекция контура" },
  { name: "Belotero", group: "Филлеры", note: "Мягкая интеграция в тонкой коже" },
  { name: "Radiesse", group: "Стимуляторы", note: "Гидроксиапатит кальция, отложенный коллагеногенез" },
  { name: "Profhilo", group: "Биоремоделирование", note: "Высокая концентрация гиалуроновой кислоты без сшивки" },
  { name: "Sculptra", group: "Стимуляторы", note: "Полимолочная кислота, постепенное восстановление объёма" },
  { name: "Xeomin", group: "Ботулотоксин", note: "Без комплексообразующих белков" },
  { name: "Dysport", group: "Ботулотоксин", note: "Широкая зона диффузии, работа по большим зонам" },
];

export const drugPromise = [
  "Каждый препарат закупается напрямую у официального дистрибьютора.",
  "Ампулу и упаковку вскрывают в кабинете при пациенте.",
  "Серию и срок годности вносят в протокол процедуры.",
  "Сертификат на препарат показываем по первой просьбе.",
];

export type Case = {
  id: string;
  problem: string;
  method: string;
  drugs: string;
  sessions: string;
  outcome: string;
  recovery: string;
  beforeSeed: string;
  afterSeed: string;
  /** Paths under /public. Split from a single before/after composite each. */
  beforePhoto: string;
  afterPhoto: string;
};

/** PLACEHOLDER: sample cases. Real before and after photography requires
 *  written patient consent, see docs/CONTENT-CHECKLIST.md. */
export const cases: Case[] = [
  {
    id: "case-1",
    problem: "Потеря чёткости овала лица после 45 лет",
    method: "SMAS-лифтинг Ultraformer, два сеанса с интервалом в 6 месяцев",
    drugs: "Без инъекционной поддержки",
    sessions: "2 процедуры",
    outcome: "Подтянутая линия нижней челюсти, уменьшение брылей",
    recovery: "Без восстановительного периода",
    beforeSeed: "lumera-case1-before",
    afterSeed: "lumera-case1-after",
    beforePhoto: "/photo/results/case-1-before.jpg",
    afterPhoto: "/photo/results/case-1-after.jpg",
  },
  {
    id: "case-2",
    problem: "Постакне и неровный рельеф щёк",
    method: "Фракционная лазерная шлифовка Fotona, курс из трёх процедур",
    drugs: "Постпроцедурный восстанавливающий уход",
    sessions: "3 процедуры",
    outcome: "Выравнивание рельефа, сглаживание атрофических рубцов",
    recovery: "5 дней после каждой процедуры",
    beforeSeed: "lumera-case2-before",
    afterSeed: "lumera-case2-after",
    beforePhoto: "/photo/results/case-2-before.jpg",
    afterPhoto: "/photo/results/case-2-after.jpg",
  },
  {
    id: "case-3",
    problem: "Тусклая обезвоженная кожа, мелкие морщины",
    method: "Курс биоревитализации Profhilo и программа домашнего ухода",
    drugs: "Profhilo",
    sessions: "4 процедуры",
    outcome: "Плотность и ровный тон, кожа держит увлажнение",
    recovery: "Папулы рассасываются за сутки",
    beforeSeed: "lumera-case3-before",
    afterSeed: "lumera-case3-after",
    beforePhoto: "/photo/results/case-3-before.jpg",
    afterPhoto: "/photo/results/case-3-after.jpg",
  },
];

export const advantages = [
  {
    title: "Врачи с медицинским образованием",
    body: "Каждый специалист клиники это врач с дипломом и действующим сертификатом, а не мастер после курсов.",
  },
  {
    title: "Медицинская лицензия",
    body: "Клиника работает по лицензии на медицинскую деятельность. Документ доступен в клинике и на сайте.",
  },
  {
    title: "Только оригинальные препараты",
    body: "Прямые поставки от дистрибьюторов. Ампулу вскрывают при пациенте, серия попадает в протокол.",
  },
  {
    title: "Сертифицированное оборудование",
    body: "Все платформы имеют регистрационные удостоверения и проходят плановое сервисное обслуживание.",
  },
  {
    title: "Причина, а не следствие",
    body: "На первой консультации ищем источник проблемы. Иногда это дерматолог или эндокринолог, а не процедура.",
  },
  {
    title: "Честный отказ",
    body: "Если процедура вам не нужна или противопоказана, мы говорим об этом прямо и предлагаем альтернативу.",
  },
];

export const faq = [
  {
    q: "Чем медицинская косметология отличается от салонной",
    a: "Медицинские процедуры затрагивают глубокие слои кожи, поэтому их проводит врач в лицензированной клинике. Салонный уход работает на поверхности и не требует медицинского образования. Инъекции, лазер и аппаратный лифтинг относятся к медицинским вмешательствам.",
  },
  {
    q: "Как проходит первая консультация",
    a: "Врач собирает анамнез, осматривает кожу, при необходимости использует диагностику. Дальше вы вместе обсуждаете задачу, возможные методы, сроки и стоимость. Консультация занимает около 40 минут, вы уходите с письменным планом.",
  },
  {
    q: "Будет ли заметно, что я что-то делала",
    a: "Задача врача сохранить вашу мимику и черты. Мы работаем небольшими объёмами и растягиваем изменения во времени. Если вы просите эффект, который выглядит неестественно, врач объяснит риски и предложит другой путь.",
  },
  {
    q: "Больно ли это",
    a: "Большинство процедур проходят под аппликационным анестетиком, который наносят за 20 минут до начала. Ощущения сравнимы с лёгким покалыванием. Для отдельных методик применяется инфильтрационная анестезия.",
  },
  {
    q: "Какие есть противопоказания",
    a: "Беременность и лактация, острые инфекции, декомпенсированные хронические заболевания, нарушения свёртываемости, онкология в активной фазе, аутоиммунные состояния в обострении. Полный список врач проверяет на консультации.",
  },
  {
    q: "Можно ли совмещать несколько процедур",
    a: "Да, но по определённой последовательности и с интервалами. Например, аппаратный лифтинг и инъекции обычно разводят по времени. Схему совмещения составляет врач, самостоятельно комбинировать методики не стоит.",
  },
  {
    q: "Как долго держится результат",
    a: "Зависит от методики. Ботулинотерапия держится 4-6 месяцев, филлеры от 9 до 18 месяцев, SMAS-лифтинг до полутора лет. Срок зависит от возраста, образа жизни и исходного состояния кожи.",
  },
  {
    q: "Что делать, если результат не понравился",
    a: "Приходите на осмотр. Часть эффектов корректируется: филлер можно частично растворить, ботулотоксин со временем выводится. Мы разбираем ситуацию вместе с врачом и предлагаем решение.",
  },
  {
    q: "Как понять, что препарат оригинальный",
    a: "Попросите показать упаковку до вскрытия. Врач вскрывает ампулу при вас, вносит серию и срок годности в протокол процедуры. Сертификат на препарат мы показываем по первой просьбе.",
  },
  {
    q: "Нужна ли подготовка к процедуре",
    a: "За неделю до инъекций стоит отменить препараты, разжижающие кровь, по согласованию с лечащим врачом. Перед лазерными процедурами нужно избегать загара. Точные рекомендации вы получаете на консультации.",
  },
  {
    q: "С какого возраста можно начинать",
    a: "Не по возрасту, а по показаниям. Уходовые программы и чистки подходят с подросткового возраста при участии дерматолога. Инъекционные методики обычно обсуждают после 25 лет, аппаратный лифтинг после 35.",
  },
  {
    q: "Делаете ли вы процедуры мужчинам",
    a: "Да. Около трети наших пациентов мужчины. Протоколы отличаются: другая анатомия, другие дозировки, другие зоны внимания. Врач учитывает это при составлении плана.",
  },
];

/** PLACEHOLDER: sample reviews. Replace with verified reviews from the
 *  clinic's real profiles before launch. */
export const reviews = [
  {
    text: "Пришла с запросом убрать носогубные складки, врач отговорила и предложила работать со скулами. Результат выглядит так, будто я просто выспалась.",
    author: "Наталья Р.",
    source: "Яндекс Карты",
    rating: 5,
  },
  {
    text: "Первый раз попал к косметологу и боялся выглядеть неестественно. Врач подробно объяснил, что делает и зачем. Через две недели пришёл на контроль, всё ровно.",
    author: "Денис К.",
    source: "ПроДокторов",
    rating: 5,
  },
  {
    text: "Долго лечила выпадение волос без результата. Здесь сначала отправили сдавать анализы, нашли дефицит ферритина. Через полгода плотность вернулась.",
    author: "Марина В.",
    source: "2ГИС",
    rating: 5,
  },
  {
    text: "Делала лазерную шлифовку после акне. Предупредили честно про пять дней шелушения, так и вышло. Рельеф стал заметно ровнее уже после второй процедуры.",
    author: "Алёна С.",
    source: "Яндекс Карты",
    rating: 5,
  },
];

export const ratings = [
  { source: "Яндекс Карты", value: "4.9", count: "312 отзывов" },
  { source: "ПроДокторов", value: "4.8", count: "184 отзыва" },
  { source: "2ГИС", value: "4.9", count: "97 отзывов" },
];

export const navItems = [
  { label: "Услуги", href: "#services" },
  { label: "Врачи", href: "#doctors" },
  { label: "Результаты", href: "#results" },
  { label: "Оборудование", href: "#equipment" },
  { label: "Цены", href: "#prices" },
  { label: "Контакты", href: "#contacts" },
];

export function servicesByCategory(category: ServiceCategory) {
  return services.filter((s) => s.category === category);
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}
