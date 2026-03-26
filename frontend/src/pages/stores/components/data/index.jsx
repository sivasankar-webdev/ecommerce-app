


/* ═══════════════════════════════════════════════════
   STORE DATA — 3 stores, real Unsplash images
═══════════════════════════════════════════════════ */
export const STORES = [
  {
    id:      1,
    name:    "Berlin Germany Store",
    address: "259 Daniel Road, FKT 2589 Berlin, Germany.",
    contact: "+856 (76) 259 6328",
    email:   "info@example.com",
    image:   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    hours: [
      { day:"Mon", time:"8:00AM – 10:00 PM" },
      { day:"Tue", time:"8:00AM – 10:00 PM" },
      { day:"Wed", time:"8:00AM – 10:00 PM" },
      { day:"Thu", time:"8:00AM – 10:00 PM" },
      { day:"Fri", time:"8:00AM – 10:00 PM" },
      { day:"Sat", time:"8:00AM – 10:00 PM" },
      { day:"Sun", time:"8:00AM – 10:00 PM" },
      { day:"Mon", time:"8:00AM – 10:00 PM" },
    ],
  },
  {
    id:      2,
    name:    "New York Central Store",
    address: "48 Park Avenue, Suite 100, New York, NY 10016.",
    contact: "+1 (212) 555 0192",
    email:   "ny@example.com",
    image:   "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    hours: [
      { day:"Mon", time:"9:00AM – 9:00 PM" },
      { day:"Tue", time:"9:00AM – 9:00 PM" },
      { day:"Wed", time:"9:00AM – 9:00 PM" },
      { day:"Thu", time:"9:00AM – 9:00 PM" },
      { day:"Fri", time:"9:00AM – 11:00 PM" },
      { day:"Sat", time:"9:00AM – 11:00 PM" },
      { day:"Sun", time:"10:00AM – 8:00 PM" },
      { day:"Mon", time:"9:00AM – 9:00 PM" },
    ],
  },
  {
    id:      3,
    name:    "Tokyo Japan Branch",
    address: "3-1-1 Marunouchi, Chiyoda-ku, Tokyo 100-8994.",
    contact: "+81 3-1234-5678",
    email:   "tokyo@example.com",
    image:   "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=600&q=80",
    hours: [
      { day:"Mon", time:"8:00AM – 10:00 PM" },
      { day:"Tue", time:"8:00AM – 10:00 PM" },
      { day:"Wed", time:"8:00AM – 10:00 PM" },
      { day:"Thu", time:"8:00AM – 10:00 PM" },
      { day:"Fri", time:"8:00AM – 11:00 PM" },
      { day:"Sat", time:"8:00AM – 11:00 PM" },
      { day:"Sun", time:"Closed",            off: true },
      { day:"Mon", time:"8:00AM – 10:00 PM" },
    ],
  },
];