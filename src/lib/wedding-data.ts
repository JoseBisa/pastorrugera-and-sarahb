import hero from "@/assets/hero-couple.jpg.asset.json";
import couple1 from "@/assets/IMG-20260616-WA0009.jpg.asset.json";
import couple2 from "@/assets/IMG-20260616-WA0010.jpg.asset.json";
import couple3 from "@/assets/IMG-20260616-WA0008.jpg.asset.json";
import couple4 from "@/assets/IMG-20260616-WA0004.jpg.asset.json";
import couple5 from "@/assets/IMG-20260616-WA0007.jpg.asset.json";
import ring from "@/assets/IMG-20260616-WA0001.jpg.asset.json";
import family from "@/assets/IMG-20260616-WA0002.jpg.asset.json";
import venue from "@/assets/IMG-20260616-WA0000.jpg.asset.json";
import ceremony from "@/assets/IMG-20260616-WA0003.jpg.asset.json";

export const IMG = {
  hero: hero.url,
  couple1: couple1.url,
  couple2: couple2.url,
  couple3: couple3.url,
  couple4: couple4.url,
  couple5: couple5.url,
  ring: ring.url,
  family: family.url,
  venue: venue.url,
  ceremony: ceremony.url,
};

export const WEDDING = {
  bride: "Sarah",
  groom: "Ruge",
  dateISO: "2026-12-20T10:00:00+03:00",
  dateLabel: "20 December 2026",
  tagline: "Forever Begins Here",
  location: "Dar es Salaam, Tanzania",
};

export const STORY = [
  { title: "How We Met", year: "2018", image: IMG.couple5, text: "On a quiet evening in Dar es Salaam, a chance encounter became the beginning of everything. A shared laugh over coffee turned into hours of conversation we never wanted to end." },
  { title: "First Date", year: "2018", image: IMG.couple4, text: "A candle-lit dinner by the ocean, where the world seemed to slow down. We talked about dreams, family, and the kind of life we wanted to build." },
  { title: "First Trip Together", year: "2020", image: IMG.couple3, text: "Zanzibar — sun, spice and salt air. Long walks on the beach turned into the kind of memories that anchor a lifetime." },
  { title: "The Proposal", year: "2025", image: IMG.ring, text: "Down on one knee, with the sapphire he had chosen with her in mind. One question. One yes. A forever began." },
  { title: "Wedding Day", year: "2026", image: IMG.couple1, text: "On 20 December 2026, surrounded by the people we love, we say I do — and step into forever, together." },
];

export const GALLERY = [
  { src: IMG.couple1, category: "Engagement" },
  { src: IMG.couple2, category: "Dates & Adventures" },
  { src: IMG.couple3, category: "Family Moments" },
  { src: IMG.couple4, category: "Dates & Adventures" },
  { src: IMG.couple5, category: "Dates & Adventures" },
  { src: IMG.ring, category: "Proposal" },
  { src: IMG.family, category: "Family Moments" },
  { src: IMG.venue, category: "Wedding Preparations" },
  { src: IMG.ceremony, category: "Wedding Preparations" },
  { src: IMG.hero, category: "Engagement" },
];

export const EVENTS = [
  {
    title: "Church Ceremony",
    time: "10:00 AM",
    venue: "Masaki English SDA Church",
    address: "Masaki, Dar es Salaam",
    map: "https://www.google.com/maps/search/?api=1&query=Masaki+English+SDA+Church+Dar+es+Salaam",
    desc: "An elegant church ceremony celebrating the union of Sarah and Ruge.",
  },
  {
    title: "Cocktails",
    time: "1:00 PM",
    venue: "Church Venue",
    address: "Masaki, Dar es Salaam",
    map: "https://www.google.com/maps/search/?api=1&query=Masaki+English+SDA+Church+Dar+es+Salaam",
    desc: "Light refreshments and social gathering after the ceremony.",
  },
  {
    title: "Reception",
    time: "4:00 PM",
    venue: "JC Hall Bahari Beach",
    address: "Bahari Beach, Dar es Salaam",
    map: "https://www.google.com/maps/search/?api=1&query=JC+Hall+Bahari+Beach+Dar+es+Salaam",
    desc: "Reception, dinner, speeches, dancing, and celebration.",
  },
];

export const PARTY = {
  bride: [
    { name: "Amani Mushi", role: "Maid of Honor", bio: "Sarah's sister and lifelong confidante." },
    { name: "Neema Joseph", role: "Bridesmaid", bio: "University best friend and travel partner." },
    { name: "Zawadi Kimaro", role: "Bridesmaid", bio: "Cousin, sister at heart, the steady one." },
    { name: "Halima Said", role: "Bridesmaid", bio: "Childhood friend from Mwanza." },
  ],
  groom: [
    { name: "David Mwakyusa", role: "Best Man", bio: "Ruge's brother and partner in mischief." },
    { name: "Emmanuel Tindwa", role: "Groomsman", bio: "Best friend since secondary school." },
    { name: "Joseph Lema", role: "Groomsman", bio: "Cousin and confidant." },
    { name: "Brian Mtui", role: "Groomsman", bio: "University roommate, brother for life." },
  ],
};
