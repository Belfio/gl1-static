export const EPCrating = [
  { name: "A rating", value: 6 },
  { name: "B rating", value: 12 },
  { name: "C rating", value: 23 },
  { name: "D rating", value: 25 },
  { name: "E rating", value: 13 },
  { name: "F rating", value: 7 },
  { name: "G rating", value: 3 },
];

export const Emissions = [
  { name: "<30", value: 20 },
  { name: "30 - 50", value: 8 },
  { name: "50 - 70", value: 2 },
  { name: "70 - 90", value: 10 },
  { name: ">90", value: 60 },
];

export const EmissionsTrend = [
  {
    name: "Trend",
    data: [
      { category: "2024", value: 12 },
      { category: "2025", value: Math.random() * 10 + 8 },
      { category: "2026", value: Math.random() * 10 + 8 },
      { category: "2027", value: Math.random() * 10 + 8 },
      { category: "2028", value: Math.random() * 10 + 8 },
      { category: "2029", value: Math.random() * 10 + 8 },
      { category: "2030", value: Math.random() * 10 + 8 },
      { category: "2031", value: Math.random() * 10 + 8 },
      { category: "2032", value: Math.random() * 10 + 8 },
      { category: "2033", value: Math.random() * 10 + 8 },
      { category: "2034", value: Math.random() * 10 + 8 },
      { category: "2035", value: Math.random() * 10 + 8 },
    ],
  },
  {
    name: "Optimal target",
    data: [
      { category: "2024", value: 12 },
      { category: "2025", value: Math.random() * 8 + 8 },
      { category: "2026", value: Math.random() * 8 + 6 },
      { category: "2027", value: Math.random() * 8 + 4 },
      { category: "2028", value: Math.random() * 12 },
      { category: "2029", value: Math.random() * 10 },
      { category: "2030", value: Math.random() * 8 },
      { category: "2031", value: Math.random() * 7 },
      { category: "2032", value: Math.random() * 6 },
      { category: "2033", value: Math.random() * 5 },
      { category: "2034", value: Math.random() * 4 },
      { category: "2035", value: Math.random() * 4 },
    ],
  },
];

export const StackDataEmissionsVsEPC = [
  {
    name: "<30",
    A: 20,
    B: 40,
    C: 18,
    D: 5,
    E: 2,
    F: 4,
    G: 1,
  },
  {
    name: "30 - 50",
    A: 8,
    B: 30,
    C: 32,
    D: 15,
    E: 2,
    F: 2,
    G: 1,
  },
  {
    name: "50 - 70",
    A: 2,
    B: 11,
    C: 37,
    D: 18,
    E: 12,
    F: 6,
    G: 4,
  },
  {
    name: "70 - 90",
    A: 0,
    B: 9,
    C: 23,
    D: 37,
    E: 13,
    F: 4,
    G: 4,
  },
  {
    name: ">90",
    A: 2,
    B: 9,
    C: 42,
    D: 18,
    E: 10,
    F: 4,
    G: 5,
  },
];
