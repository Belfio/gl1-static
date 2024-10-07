import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  roles: z.array(z.string()),
  createdAt: z.string(),
  name: z.string(),
  avatar: z.string(),
  surname: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const PropertySchema = z.object({
  propertyAttributes: z.object({
    address: z.string(),
    potential_eer: z.number(),
    potential_co2_emissions: z.number(),
    current_co2_emissions: z.number(),
    potential_co2_reduction_pc: z.number(),
    potential_savings: z.number(),
    number_of_habitable_rooms: z.number(),
    built_form: z.string(),
    "number of habitable rooms": z.number(),
    "built form": z.string(),
    local_authority_area: z.string(),
    total_floor_area: z.number(),
    citytown: z.string(),
    BUILDING_REFERENCE_NUMBER: z.string(),
    potential_epc_band: z.string(),
    postcode: z.string().optional(),
    current_epc_band: z.string(),
    construction_age_category: z.string(),
  }),
  valueDetails: z.object({
    latestValuation: z.number(),
    dateOfLatestValuation: z.string(),
    yearOfLatestValuation: z.string(),
    loanOutstanding: z.number(),
    portfolioImpact: z.string(),
  }),
  predictedEfficiency: z.object({
    predicted_eer: z.number(),
    predicted_epc_band: z.string(),
    predicted_emissions: z.number(),
  }),
  potentialSavingsFromEPC: z.object({
    "total potential savings": z.number(),
    total_potential_savings: z.number(),
  }),
  landRegistryData: z.array(
    z.object({
      price_paid: z.number(),
      date_of_transfer: z.string(),
    })
  ),
  maxCashback: z.number().optional(),
  maxAPR: z.number().optional(),
  retrofitOptions: z.array(
    z.object({
      option: z.string(),
      currentValue: z.number(),
      checked: z.boolean(),
      retrofittable: z.boolean(),
    })
  ),
  retrofitVariables: z.object({
    option: z.string(),
    currentValue: z.number(),
    checked: z.boolean(),
    retrofittable: z.boolean(),
  }),
  id: z.string(),
});

export type Property = z.infer<typeof PropertySchema>;

export const InterventionSchema = z.object({
  key: z.string(),
  value: z.string(),
});

export type Intervention = z.infer<typeof InterventionSchema>;

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;

export const CredSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string(),
  createdAt: z.string(),
  userId: z.string(),
});

export type Cred = z.infer<typeof CredSchema>;

// export type Intervention = {
//   key: string;
//   value: string;
// };
// export type Property = {
//   propertyAttributes: {
//     address: string;
//     potential_eer: number;
//     potential_co2_emissions: number;
//     current_co2_emissions: number;
//     potential_co2_reduction_pc: number;
//     potential_savings: number;
//     number_of_habitable_rooms: number;
//     built_form: string;
//     "number of habitable rooms": number;
//     "built form": string;
//     local_authority_area: string;
//     total_floor_area: number;
//     citytown: string;
//   };
//   valueDetails: {
//     latestValuation: number;
//     dateOfLatestValuation: string;
//     yearOfLatestValuation: string;
//     loanOutstanding: number;
//     portfolioImpact: string;
//   };
//   predictedEfficiency: {
//     predicted_eer: number;
//   };
//   potentialSavingsFromEPC: {
//     "total potential savings": number;
//     total_potential_savings: number;
//   };
//   landRegistryData: {
//     price_paid: number;
//     date_of_transfer: string;
//   }[];
//   maxCashback: number;
//   maxAPR: number;
//   retrofitVariables:
//     | {
//         option: string;
//         currentValue: number;
//         checked: boolean;
//         retrofittable: boolean;
//       }[]
//     | 0;
//   retrofitOptions: {
//     option_num: number;
//     expectedNewEER: number;
//     expectedNewEPCBand: string;
//     indicativeCosts: number;
//     predictedValueUplift: number;
//     predictedFutureValuation: number;
//     interventions: Intervention[];
//     indicative_costs: string;
//   }[];
//   originalRetrofitVariables: {
//     option: string;
//     currentValue: number;
//     checked: boolean;
//     retrofittable: boolean;
//   }[];
//   originalRetrofitOptions: {
//     option: string;
//     currentValue: number;
//     checked: boolean;
//     retrofittable: boolean;
//   }[];
//   formatted: boolean;
//   LandRegistry: {
//     price_paid: number;
//     date_of_transfer: string;
//   }[];
// };

export const PropertyDataSchema = z.object({
  properties: z.array(PropertySchema),
  addressOptions: z.array(z.string()),
  propertiesWithLandRegistryData: z.array(PropertySchema),
});

export type PropertyData = z.infer<typeof PropertyDataSchema>;

export type OverviewPropertiesType = {
  numberProperties: number;
  totalCO2Emission: number;
  totalCO2EmissionPerSqMt: number;
  averageCO2EmissionPerSqMt: number;
  numberOfPropertiesEPCCOrHigher: number;
};

export const TargetSchema = z.object({
  targetId: z.string(),
  userId: z.string(),
  region: z.string(),
  propertyId: z.string(),
});

export type Target = z.infer<typeof TargetSchema>;
