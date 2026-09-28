// Hardcoded data for building the UI shell. Replace with API calls later.

export type Price = "$" | "$$" | "$$$";

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
};

export type Cafe = {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distanceMi: number;
  price: Price;
  tags: string[];
  address: string;
  fullAddress: string;
  phone: string;
  website: string;
  description: string;
  hours: { days: string; time: string }[];
  isOpen: boolean;
  statusNote: string;
  reviews: Review[];
  saved: boolean;
  // Position on the placeholder map, as percentages of its width/height
  pin: { x: number; y: number };
};

export const SEARCH_LOCATION = "Shoreditch, London";

export const mockCafes: Cafe[] = [
  {
    id: "marrow-and-co",
    name: "Marrow & Co.",
    rating: 4.2,
    reviewCount: 128,
    distanceMi: 0.4,
    price: "$$",
    tags: ["Wifi", "Quiet", "Outdoor seating", "Power outlets"],
    address: "14 Redchurch St, London E2",
    fullAddress: "14 Redchurch St, London E2 7DJ",
    phone: "+44 20 7946 0142",
    website: "marrowandco.example",
    description:
      "House-roasted single origin, laptop-friendly upstairs, communal table downstairs.",
    hours: [
      { days: "Mon – Fri", time: "7:00 AM – 6:00 PM" },
      { days: "Sat – Sun", time: "8:00 AM – 5:00 PM" },
    ],
    isOpen: true,
    statusNote: "closes 6:00 PM",
    reviews: [
      {
        id: "r1",
        author: "Priya S.",
        rating: 5,
        text: "Quiet upstairs with plenty of plugs. The filter coffee rotates weekly and is always good.",
      },
      {
        id: "r2",
        author: "Tom W.",
        rating: 4,
        text: "Great flat white. Gets busy around lunch, so come early if you need a table.",
      },
    ],
    saved: true,
    pin: { x: 28, y: 27 },
  },
  {
    id: "the-grind-house",
    name: "The Grind House",
    rating: 4.8,
    reviewCount: 301,
    distanceMi: 0.6,
    price: "$",
    tags: ["Outdoor seating"],
    address: "3 Club Row, London E2",
    fullAddress: "3 Club Row, London E2 7EY",
    phone: "+44 20 7946 0388",
    website: "grindhouse.example",
    description:
      "Tiny espresso bar with a sunny courtyard and the best-value cortado in the area.",
    hours: [
      { days: "Mon – Fri", time: "6:30 AM – 5:00 PM" },
      { days: "Sat – Sun", time: "8:00 AM – 4:00 PM" },
    ],
    isOpen: true,
    statusNote: "closes 5:00 PM",
    reviews: [
      {
        id: "r1",
        author: "Aisha K.",
        rating: 5,
        text: "The courtyard is a hidden gem. Friendly baristas, quick service.",
      },
    ],
    saved: true,
    pin: { x: 52, y: 48 },
  },
  {
    id: "foglight-coffee",
    name: "Foglight Coffee",
    rating: 4.0,
    reviewCount: 86,
    distanceMi: 0.9,
    price: "$$",
    tags: ["Wifi"],
    address: "88 Curtain Rd, London EC2",
    fullAddress: "88 Curtain Rd, London EC2A 3AA",
    phone: "+44 20 7946 0921",
    website: "foglight.example",
    description:
      "Bright, minimal space with long tables and reliable wifi. Pastries baked in-house.",
    hours: [
      { days: "Mon – Fri", time: "8:00 AM – 7:00 PM" },
      { days: "Sat – Sun", time: "9:00 AM – 6:00 PM" },
    ],
    isOpen: false,
    statusNote: "opens 8:00 AM",
    reviews: [
      {
        id: "r1",
        author: "Marco L.",
        rating: 4,
        text: "Solid wifi and good light. Music can get a bit loud in the afternoon.",
      },
    ],
    saved: true,
    pin: { x: 71, y: 22 },
  },
  {
    id: "lantern-roasters",
    name: "Lantern Roasters",
    rating: 4.5,
    reviewCount: 204,
    distanceMi: 1.1,
    price: "$$$",
    tags: ["Wifi", "Quiet", "Power outlets"],
    address: "21 Hoxton Sq, London N1",
    fullAddress: "21 Hoxton Sq, London N1 6NN",
    phone: "+44 20 7946 0555",
    website: "lanternroasters.example",
    description:
      "Specialty roastery with a calm reading room and pour-over bar.",
    hours: [
      { days: "Mon – Fri", time: "7:30 AM – 6:00 PM" },
      { days: "Sat – Sun", time: "9:00 AM – 5:00 PM" },
    ],
    isOpen: true,
    statusNote: "closes 6:00 PM",
    reviews: [],
    saved: false,
    pin: { x: 38, y: 68 },
  },
];

export function getCafe(id: string) {
  return mockCafes.find((cafe) => cafe.id === id);
}
