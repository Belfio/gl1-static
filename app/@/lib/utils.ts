import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PropertyTableColumnsType } from "../data/tableData";
import { Property, PropertyData } from "./types";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePropertyForTable(
  properties: Property[] | undefined
): PropertyTableColumnsType[] {
  if (!properties) {
    return [];
  }
  return properties.map((property) => ({
    id: property.propertyAttributes.BUILDING_REFERENCE_NUMBER || "id",
    address:
      String(property.propertyAttributes.address).toLowerCase() || "address",
    status:
      String(property.propertyAttributes.current_co2_emissions) || "status",
    label: property.propertyAttributes.built_form || "label",
    priority: property.propertyAttributes.potential_epc_band || "priority",
    epc:
      property.propertyAttributes.current_epc_band ||
      property.predictedEfficiency.predicted_epc_band + "(predicted)",
    postcode: property.propertyAttributes.postcode || "postcode",
    emission: property.propertyAttributes.current_co2_emissions || "N/A",
    emissionIntensity:
      parseFloat(
        parseFloat(
          String(
            property.propertyAttributes.current_co2_emissions /
              property.propertyAttributes.total_floor_area
          )
        ).toFixed(2)
      ) || "N/A",
  }));
}

export function isEmail(email: string) {
  const emailSchema = z.string().email({ message: "Invalid email address" });

  const result = emailSchema.safeParse(email);

  if (result.success) {
    console.log("Valid email:", result.data);
  } else {
    console.log("Validation error:", result.error.errors);
  }
  return result.success;
}

export function isPassword(password: string) {
  const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters" });

  const result = passwordSchema.safeParse(password);

  if (result.success) {
    console.log("Valid password:", result.data);
  } else {
    console.log("Validation error:", result.error.errors);
  }
  return result.success;
}
