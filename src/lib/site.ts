/* ------------------------------------------------------------------ */
/* Verdant Clean — central content. Copy lives here, UI lives in        */
/* components.                                                         */
/* ------------------------------------------------------------------ */

export interface NavLink {
  label: string;
  target: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Services", target: "services" },
  { label: "How It Works", target: "how-it-works" },
  { label: "Commercial", target: "commercial" },
  { label: "About", target: "about" },
  { label: "Journal", target: "journal" },
];

/* ------------------------------ Services --------------------------- */

export interface Service {
  index: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
  cta: string;
  target: string;
  objectPosition?: string;
}

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Home Cleaning",
    copy: "Regular and deep cleaning for apartments and homes — calm, consistent, and built around your routine.",
    image: "/images/service-home.jpg",
    alt: "A warm, freshly cleaned premium apartment living room",
    cta: "Explore Home Cleaning",
    target: "plans",
  },
  {
    index: "02",
    title: "Office Cleaning",
    copy: "Professional cleaning for productive workplaces, scheduled around your team's working hours.",
    image: "/images/service-office.jpg",
    alt: "A bright, spotless modern office lounge",
    cta: "Explore Office Cleaning",
    target: "commercial",
    objectPosition: "50% 20%",
  },
  {
    index: "03",
    title: "Short-Stay Cleaning",
    copy: "Fast, reliable turnover cleaning for Airbnb and short-stay properties — guest-ready, every time.",
    image: "/images/service-shortstay.jpg",
    alt: "A pristine short-stay apartment bedroom with hotel-quality linen",
    cta: "Explore Short-Stay",
    target: "commercial",
    objectPosition: "50% 30%",
  },
  {
    index: "04",
    title: "Commercial Cleaning",
    copy: "Flexible cleaning solutions for larger commercial environments, from retail to hospitality.",
    image: "/images/service-commercial.jpg",
    alt: "A spotless minimal retail boutique interior",
    cta: "Explore Commercial",
    target: "commercial",
  },
];

/* ---------------------------- Why Verdant -------------------------- */

export interface Benefit {
  index: string;
  title: string;
  copy: string;
}

export const BENEFITS: Benefit[] = [
  {
    index: "01",
    title: "Verified professionals",
    copy: "Trained and trusted cleaning specialists — background-checked, supervised, and genuinely proud of the work.",
  },
  {
    index: "02",
    title: "Flexible scheduling",
    copy: "Choose a schedule that works around your life or business. Early mornings, weekends, after-hours — your call.",
  },
  {
    index: "03",
    title: "Consistent quality",
    copy: "Every cleaning follows a structured quality process with checklists, inspections, and photo confirmation.",
  },
  {
    index: "04",
    title: "Simple communication",
    copy: "Book, communicate, and manage your service over WhatsApp — without unnecessary friction or phone tag.",
  },
];

/* ---------------------------- Before / After ----------------------- */

export interface CompareRoom {
  id: string;
  label: string;
  image: string;
  alt: string;
  note: string;
}

export const COMPARE_ROOMS: CompareRoom[] = [
  {
    id: "kitchen",
    label: "Kitchen",
    image: "/images/ba-kitchen.jpg",
    alt: "A spotless modern kitchen with sage cabinets and quartz island",
    note: "Degreased, descaled, and polished — including inside the microwave.",
  },
  {
    id: "bathroom",
    label: "Bathroom",
    image: "/images/ba-bathroom.jpg",
    alt: "A pristine marble bathroom with glass shower",
    note: "Grout, glass, and chrome detailed until they shine.",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    image: "/images/ba-bedroom.jpg",
    alt: "A serene neutral bedroom with crisp hotel-style bedding",
    note: "Dusted top to bottom, linen refreshed, calm restored.",
  },
  {
    id: "office",
    label: "Office",
    image: "/images/service-office.jpg",
    alt: "A clean, organised modern workspace",
    note: "Desks, screens, and shared spaces reset for Monday morning.",
  },
];

/* ------------------------------ Process ---------------------------- */

export interface Step {
  index: string;
  title: string;
  copy: string;
}

export const STEPS: Step[] = [
  { index: "01", title: "Book", copy: "Tell us what you need — your space, your schedule, your standards." },
  { index: "02", title: "Match", copy: "We connect you with the right cleaning professional for your space." },
  { index: "03", title: "Clean", copy: "Your space gets the attention it deserves, checklist in hand." },
  { index: "04", title: "Relax", copy: "Come back to a cleaner, fresher space. That's the whole point." },
];

/* -------------------------------- Plans ---------------------------- */

export interface Plan {
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  featured: boolean;
  badge?: string;
  cta: string;
}

export const PLANS: Plan[] = [
  {
    name: "Essential",
    price: "₦35,000",
    period: "/ month",
    tagline: "1 cleaning per month. Suitable for occasional maintenance.",
    features: ["Full-home standard clean", "Kitchen & bathrooms detailed", "Linen change on request", "Easy rescheduling"],
    featured: false,
    cta: "Choose Essential",
  },
  {
    name: "Comfort",
    price: "₦65,000",
    period: "/ month",
    tagline: "2 cleanings per month. Our most-loved rhythm for busy homes.",
    features: [
      "Everything in Essential",
      "Priority scheduling",
      "Interior windows & glass",
      "A dedicated specialist",
    ],
    featured: true,
    badge: "Most popular",
    cta: "Choose Comfort",
  },
  {
    name: "Signature",
    price: "₦120,000",
    period: "/ month",
    tagline: "4 cleanings per month. Designed for customers who want consistent upkeep.",
    features: ["Weekly visits", "Rotating deep-clean focus", "Laundry & extras", "Priority support line"],
    featured: false,
    cta: "Choose Signature",
  },
];

/* ------------------------------ Commercial ------------------------- */

export const COMMERCIAL_INDUSTRIES: string[] = [
  "Offices",
  "Hotels",
  "Airbnb properties",
  "Restaurants",
  "Retail",
  "Property management",
  "Commercial spaces",
];

/* -------------------------------- Stats ---------------------------- */

export interface Stat {
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 2500, decimals: 0, prefix: "", suffix: "+", label: "Completed cleanings" },
  { value: 4.9, decimals: 1, prefix: "", suffix: "/5", label: "Average rating" },
  { value: 98, decimals: 0, prefix: "", suffix: "%", label: "Repeat customers" },
  { value: 7, decimals: 0, prefix: "", suffix: " days", label: "Availability" },
];

/* ---------------------------- Testimonials ------------------------- */

export interface Testimonial {
  quote: string;
  name: string;
  area: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Verdant Clean completely changed the way I manage cleaning at home. Everything feels easier and more consistent.",
    name: "Amaka O.",
    area: "Victoria Island",
    initials: "AO",
  },
  {
    quote: "I needed something reliable for my short-stay apartment. The consistency has been excellent.",
    name: "Daniel A.",
    area: "Lekki",
    initials: "DA",
  },
  {
    quote:
      "Our office feels noticeably better after every visit. The team is professional and easy to communicate with.",
    name: "Tunde O.",
    area: "Ikeja",
    initials: "TO",
  },
];

/* -------------------------------- Team ----------------------------- */

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  tone: "forest" | "sage" | "lime" | "charcoal";
  image: string;
  alt: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Amina",
    role: "Cleaning Specialist",
    initials: "A",
    tone: "forest",
    image:
      "https://images.pexels.com/photos/33646629/pexels-photo-33646629.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
    alt: "Portrait of Amina, Cleaning Specialist at Verdant Clean",
  },
  {
    name: "David",
    role: "Team Lead",
    initials: "D",
    tone: "sage",
    image:
      "https://images.pexels.com/photos/15929275/pexels-photo-15929275.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
    alt: "Portrait of David, Team Lead at Verdant Clean",
  },
  {
    name: "Tolu",
    role: "Cleaning Specialist",
    initials: "T",
    tone: "charcoal",
    image:
      "https://images.pexels.com/photos/33993456/pexels-photo-33993456.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
    alt: "Portrait of Tolu, Cleaning Specialist at Verdant Clean",
  },
  {
    name: "Grace",
    role: "Quality Supervisor",
    initials: "G",
    tone: "lime",
    image:
      "https://images.pexels.com/photos/11515380/pexels-photo-11515380.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
    alt: "Portrait of Grace, Quality Supervisor at Verdant Clean",
  },
];

/* ------------------------------ Locations -------------------------- */

export const LOCATIONS: string[] = [
  "Victoria Island",
  "Ikoyi",
  "Lekki",
  "Yaba",
  "Ikeja",
  "Surulere",
  "Ajah",
  "Lagos Island",
];

/* ------------------------------- Journal --------------------------- */

export interface Article {
  id: number;
  title: string;
  category: string;
  readTime: string;
  image: string;
  alt: string;
  objectPosition?: string;
  excerpt: string[];
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "How often should you deep-clean your home?",
    category: "Home care",
    readTime: "6 min read",
    image: "/images/journal-1.jpg",
    alt: "A bright, freshly deep-cleaned living room",
    excerpt: [
      "For most Lagos homes, a full deep-clean every three to four months keeps dust, humidity, and harmattan residue from settling into fabrics and corners. High-traffic homes with kids or pets do better on a two-month rhythm.",
      "Between deep-cleans, a lighter maintenance visit every two weeks is what keeps a space feeling new rather than just tidy. Consistency beats intensity — small, regular resets always win over the occasional big scrub.",
    ],
  },
  {
    id: 2,
    title: "The complete apartment reset checklist",
    category: "Checklists",
    readTime: "8 min read",
    image: "/images/journal-2.jpg",
    alt: "A calm, reset apartment living room with plants",
    excerpt: [
      "Our teams reset apartments room by room: declutter surfaces first, then dust top to bottom, then floors last. Kitchens get degreased and descaled; bathrooms get grout, glass, and chrome; bedrooms get linen and stillness.",
      "The secret is order — never vacuum before dusting, and always finish a room completely before moving on. Print the checklist, put on something good, and give yourself three unhurried hours.",
    ],
  },
  {
    id: 3,
    title: "How to prepare your Airbnb for the next guest",
    category: "Short-stay",
    readTime: "5 min read",
    image: "/images/service-shortstay.jpg",
    alt: "A guest-ready short-stay bedroom with fresh linen",
    objectPosition: "50% 15%",
    excerpt: [
      "Five-star turnover cleaning is a system, not a scramble: strip and inspect linen, sanitise high-touch points, restock consumables, then photograph every room before lock-up. Guests notice what hosts stop seeing.",
      "The details that earn reviews are small — a made bed with hospital corners, an empty bin with a fresh liner, a bathroom mirror without a single streak. Build a checklist per property and never skip it.",
    ],
  },
  {
    id: 4,
    title: "Cleaning routines for busy professionals",
    category: "Routines",
    readTime: "4 min read",
    image: "/images/service-office.jpg",
    alt: "A tidy workspace that stays clean with a simple routine",
    objectPosition: "50% 85%",
    excerpt: [
      "If you work long hours, your routine should be ruthless: ten minutes each evening for dishes, surfaces, and a halfway tidy — then outsource the rest. A fortnightly professional clean covers everything the ten minutes can't.",
      "Protect your weekends. The highest-value hour of cleaning is the one you don't do yourself — spend it resting, and let a standing booking handle the floors, bathrooms, and dust.",
    ],
  },
  {
    id: 5,
    title: "How to keep your kitchen looking new",
    category: "Kitchen",
    readTime: "6 min read",
    image: "/images/journal-5.jpg",
    alt: "A gleaming white kitchen with polished surfaces",
    excerpt: [
      "Kitchens age through grease and clutter, not time. Wipe the hob and splashback while they're still warm, keep counters two-thirds clear, and descale the kettle and taps monthly — Lagos water is unforgiving.",
      "Once a season, empty one cabinet or drawer completely, wipe it down, and only put back what you actually use. A kitchen that looks new is simply a kitchen where everything has a home.",
    ],
  },
  {
    id: 6,
    title: "What to look for in a professional cleaning service",
    category: "Guides",
    readTime: "7 min read",
    image: "/images/transform-cleaning.jpg",
    alt: "A professional cleaner detailing a marble countertop",
    objectPosition: "50% 40%",
    excerpt: [
      "Look past the price list: ask how teams are vetted and trained, whether there's a written checklist per visit, and what happens when something isn't right. A serious company answers all three without hesitation.",
      "Consistency is the real product. The same specialist, the same standards, the same easy communication — visit after visit. If a service can't promise that, it isn't a service; it's a gamble.",
    ],
  },
];

/* --------------------------------- FAQ ----------------------------- */

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "What does a standard cleaning include?",
    answer:
      "A standard clean covers every room: dusting, vacuuming and mopping, kitchen surfaces and appliances wiped down, bathrooms fully sanitised, mirrors and glass polished, bins emptied, and beds made. Deep-cleaning adds inside cabinets, grout detailing, windows, and more — just tell us what your space needs.",
  },
  {
    question: "Do I need to provide cleaning supplies?",
    answer:
      "No. Our teams arrive with professional-grade supplies and equipment, including eco-conscious products that are safe for kids and pets. If you prefer we use your own products for any reason, we're happy to.",
  },
  {
    question: "How long does a cleaning take?",
    answer:
      "A standard apartment clean typically takes 2–4 hours depending on size and condition. Larger homes and deep-cleans can take a full day with a team. We'll always confirm an estimated window when you book.",
  },
  {
    question: "Can I schedule recurring cleaning?",
    answer:
      "Absolutely — most of our customers do. Our Essential, Comfort, and Signature plans cover monthly rhythms, and short-stay or commercial clients can set fully custom schedules, including daily visits.",
  },
  {
    question: "Can I reschedule my cleaning?",
    answer:
      "Yes, life happens. You can reschedule free of charge up to 24 hours before your visit with a quick WhatsApp message. We'll find the next slot that works for you.",
  },
  {
    question: "Do you clean Airbnb properties?",
    answer:
      "Yes — short-stay turnover is one of our specialties. We handle linen changes, restocking, photo confirmation after every clean, and tight check-in/check-out windows across Lekki, Victoria Island, Ikoyi, and beyond.",
  },
  {
    question: "Which areas do you currently serve?",
    answer:
      "We serve Victoria Island, Ikoyi, Lekki, Yaba, Ikeja, Surulere, Ajah, and Lagos Island — plus selected surrounding areas on request. We're expanding across Nigeria, so ask us even if you're just outside the map.",
  },
  {
    question: "Do you offer commercial cleaning?",
    answer:
      "Yes. We build reliable cleaning routines for offices, hotels, restaurants, retail spaces, and managed properties — from daily upkeep to periodic deep-cleans. Request a commercial quote and we'll design a plan around how your business operates.",
  },
];

/* -------------------------------- Footer --------------------------- */

export interface FooterColumn {
  heading: string;
  links: Array<{ label: string; target: string }>;
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "Home Cleaning", target: "services" },
      { label: "Office Cleaning", target: "services" },
      { label: "Short-Stay", target: "services" },
      { label: "Commercial", target: "commercial" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", target: "about" },
      { label: "How It Works", target: "how-it-works" },
      { label: "Journal", target: "journal" },
      { label: "Careers", target: "team" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQ", target: "faq" },
      { label: "Contact", target: "book" },
      { label: "Service Areas", target: "locations" },
    ],
  },
];

export const SOCIALS: Array<{ label: string; href: string; icon: "instagram" | "tiktok" | "facebook" | "linkedin" }> = [
  { label: "Instagram", href: "https://instagram.com/verdantclean", icon: "instagram" },
  { label: "TikTok", href: "https://tiktok.com/@verdantclean", icon: "tiktok" },
  { label: "Facebook", href: "https://facebook.com/verdantclean", icon: "facebook" },
  { label: "LinkedIn", href: "https://linkedin.com/company/verdantclean", icon: "linkedin" },
];

export const BRAND = {
  name: "Verdant Clean",
  tagline: "We make spaces feel new.",
  developerName: "MurkingDev",
  developerUrl: "https://murking.vercel.app",
};
