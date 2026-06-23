import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M13 22v-8h2.7l.3-3H13V9c0-.9.3-1.5 1.5-1.5H16V5c-.4 0-1.5-.1-2.3-.1-2.4 0-3.7 1.4-3.7 4V11H7v3h3v8h3Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.8c-.8-.9-1.3-2-1.4-3.3h-3v13.2c0 1.6-1.3 2.9-2.9 2.9s-2.9-1.3-2.9-2.9 1.3-2.9 2.9-2.9c.3 0 .6 0 .9.1V9.8c-.3 0-.6-.1-.9-.1-3.3 0-5.9 2.7-5.9 5.9s2.7 5.9 5.9 5.9 5.9-2.7 5.9-5.9V9.7c1.3.9 2.9 1.4 4.6 1.4V8c-1.1 0-2.2-.4-3.2-1.1V5.8Z" />
    </svg>
  );
}

// Prefix anchors with "/" so they always land on the home page's anchors,
// not the current route. Routes that exist as real pages link directly.
const nav = [
  { href: "/admitere", label: "Admitere" },
  { href: "/activitati", label: "Activități" },
  { href: "/campus", label: "Campus" },
  { href: "/profesori", label: "Profesori" },
  { href: "/#", label: "Erasmus+" },
];

const studentLinks = [
  { href: "/orar", label: "Orar" },
  { href: "/burse", label: "Burse" },
  { href: "/bacalaureat", label: "Bacalaureat" },
  { href: "/atestat-profesional", label: "Atestat profesional" },
  { href: "/istoric", label: "Istoric" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-navy-deep text-white/72 text-sm">
      <div className="wrap grid gap-10 py-[clamp(3rem,6vw,5rem)] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/assets/noBgLogo.png"
              alt=""
              width={521}
              height={479}
              className="h-16 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
            />
            <b className="font-serif text-lg font-semibold leading-tight text-white">
              Seminarul Teologic Ortodox
              <br />„{siteConfig.patron}”
            </b>
          </div>
          <p className="max-w-xs text-white/72">
            {siteConfig.tagline}, sub oblăduirea {siteConfig.diocese}.
          </p>
          <div className="mt-5 flex gap-2">
            <SocialLink
              href={siteConfig.social.facebook}
              label="Facebook"
              icon={<FacebookIcon />}
            />
            <SocialLink
              href={siteConfig.social.tiktok}
              label="TikTok"
              icon={<TikTokIcon />}
            />
            <SocialLink
              href={siteConfig.social.instagram}
              label="Instagram"
              icon={<InstagramIcon />}
            />
          </div>
        </div>

        <FooterCol title="Navigare" items={nav} />
        <FooterCol title="Informații utile" items={studentLinks} />

        <div>
          <h3 className="mb-4 font-sans text-base font-semibold text-white">
            Contact
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href={siteConfig.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1 hover:text-gold-light"
              >
                {siteConfig.address.street}, {siteConfig.address.city}{" "}
                {siteConfig.address.postalCode}
              </a>
            </li>
            <li>
              <Link
                href={`tel:${siteConfig.contact.phone}`}
                className="hover:text-gold-light"
              >
                {siteConfig.contact.phoneDisplay}
              </Link>
            </li>
            <li>
              <Link
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-gold-light"
              >
                {siteConfig.contact.email}
              </Link>
            </li>
            <li>{siteConfig.contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="wrap flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-xs text-white/50">
        <span>
          © 2026 Seminarul Teologic Ortodox „{siteConfig.patron}”{" "}
          {siteConfig.city}
        </span>
        <span>Prototip de design · v0.1</span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 font-sans text-base font-semibold text-white">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="hover:text-gold-light">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-navy-deep"
    >
      {icon}
    </Link>
  );
}
