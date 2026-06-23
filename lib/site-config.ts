export const siteConfig = {
  name: "Seminarul Teologic Ortodox „Sfântul Ioan Gură de Aur”",
  shortName: "Seminarul Teologic Târgoviște",
  city: "Târgoviște",
  patron: "Sf. Ioan Gură de Aur",
  tagline: "De peste 30 de ani în slujba Bisericii și a Educației",
  diocese: "Arhiepiscopia Târgoviștei",
  address: {
    street: "Bd. Unirii 28",
    city: "Târgoviște",
    postalCode: "130034",
    country: "România",
    /**
     * Google Maps deep link to the seminary. Uses the `search?api=1`
     * format which works on both desktop and mobile (mobile auto-opens
     * the Google Maps app on Android / iOS Maps via universal link).
     */
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "Seminarul Teologic Ortodox Sfantul Ioan Gura de Aur, Bd. Unirii 28, Targoviste 130034",
      ),
  },
  contact: {
    phone: "+40245614505",
    phoneDisplay: "0245 614 505",
    email: "seminarul.tgv@scolidb.ro",
    hours: "Luni–Vineri: 08:00–16:00",
  },
  geo: {
    // approximate location of the seminary in Targoviste
    lat: 44.9251,
    lng: 25.4567,
  },
  social: {
    facebook:
      "https://www.facebook.com/p/Seminarul-Teologic-Ortodox-Sf%C3%A2ntul-Ioan-Gur%C4%83-de-Aur-T%C3%A2rgovi%C5%9Fte-100063548945996/",
    tiktok: "https://www.tiktok.com/@seminartargoviste",
    instagram: "#",
  },
  admission: {
    cycle: "2026–2027",
    spots: 26,
    program: "Teologie Pastorală",
    session: "mai 2026",
  },
} as const;

export type SiteConfig = typeof siteConfig;
