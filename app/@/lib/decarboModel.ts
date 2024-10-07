export type DecarboModelType = {
  title: string;
  type: string;
  id: string;
  options: OptionType[];
}[];
const decarboModel: DecarboModelType = [
  {
    title: "Measure improvement by:",
    type: "radio",
    id: "improvement_measure",
    options: [
      {
        title: "EPC rating",
        value: "epc_band",
        target: "goal_epc",
      },
      {
        title: "Emissions per property",
        value: "emissions",
        target: "goal_emissions",
      },
      {
        title: "Emission intensity (kg CO₂e / m²)",
        value: "emission_intensity",
        target: "goal_emission_intensity",
      },
      {
        title: "Total portfolio emissions",
        value: "portfolio_emissions",
        target: "goal_portfolio_emissions",
      },
    ],
  },
  {
    title: "With a goal of:",
    id: "goal_epc",
    type: "radio_range",
    options: [
      {
        title: "Target grade",
        value: "to_target",
        range: {
          min: 1,
          max: 7,
          step: 1,
          labels: ["G", "F", "E", "D", "C", "B", "A"],
        },
        target: "optimisation",
      },
      {
        title: "Grade improvement",
        value: "by_increase",
        range: {
          min: 1,
          max: 3,
          step: 1,
          labels: ["+1 grade", "+2 grades", "+3 grades"],
        },
        target: "optimisation",
      },
    ],
  },
  {
    title: "With a goal of:",
    id: "goal_emissions",
    type: "radio_range",
    options: [
      {
        title: "Target emissions",
        value: "to_target",
        range: {
          min: 0,
          max: 3,
          step: 0.1,
          unit: "tonnes",
        },
        target: "optimisation",
      },
      {
        title: "Emissions reduction",
        value: "by_reduction",
        range: {
          min: 0,
          max: 3,
          step: 0.1,
          unit: "tonnes",
        },
        target: "optimisation",
      },
    ],
  },
  {
    title: "With a goal of:",
    id: "goal_emission_intensity",
    type: "radio_range",
    options: [
      {
        title: "Target emissions",
        value: "to_target",
        range: {
          min: 0,
          max: 3,
          step: 0.1,
          unit: "kg CO₂e / m²",
        },
        target: "optimisation",
      },
    ],
  },
  {
    title: "With a goal of:",
    id: "goal_portfolio_emissions",
    type: "radio_range",
    options: [
      {
        title: "Total portfolio emissions",
        value: "to_target",
        range: {
          min: 0,
          max: 100,
          step: 5,
          unit: "%",
        },
        target: "optimisation",
      },
    ],
  },
  {
    title: "With a goal of:",
    id: "emission_intensity_goal",
    type: "radio_range",
    options: [
      {
        title: "Target emissions",
        value: "to_target",
        range: {
          min: 0,
          max: 50,
          step: 1,
          unit: "kg CO₂e / m²",
        },
        target: "optimisation",
      },
    ],
  },
  {
    title: "Optimising for:",
    id: "optimisation",
    type: "radio",
    options: [
      {
        title: "Lowest cost per property",
        value: "lowest_cost_retrofit",
        target: "submit",
      },
      {
        title: "Greatest emissions reduction per £",
        value: "emissions_per_pound_retrofit",
        target: "submit",
      },

      {
        title: "Lowest cost per property",
        value: "lowest_cost_subsidy",
        target: "submit",
      },
      {
        title: "Greatest emissions reduction per £",
        value: "emissions_per_pound_subsidy",
        target: "submit",
      },
    ],
  },
];

export type OptionType = {
  title: string;
  value: string;
  target: string;
  range?: {
    min: number;
    max: number;
    step: number;
    unit?: string;
    labels?: string[];
  };
};

export { decarboModel };
