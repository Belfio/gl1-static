import propertiesRaw from "@/data/demo_property_recommendations_leicester_cheapest500_toC_old.json?raw";
import fs from "fs";
// import propertiesRaw from '/properties.json?raw'
// import propertiesRaw from './src/data/demo_property_recommendations_leicester_highestCO2reduction_100.json?raw'
import Papa from "papaparse";

// import propertiesRawWithLandRegistryData from './src/data/demo_property_recommendations_leicester_highestCO2reduction_100_with_land_registry_data.json?raw'
import propertiesRawWithLandRegistryData from "@/data/demo_property_recommendations_leicester_cheapest500_toC_with_land_registry_data.json?raw";

import JSON5 from "json5";
import {
  Intervention,
  OverviewPropertiesType,
  Property,
  PropertyData,
} from "./types";

// Then, update the propertyData declaration
const propertyData: PropertyData = {
  properties: [],
  addressOptions: [],
  propertiesWithLandRegistryData: [],
};

function capitalizeFirstLetter(tt: string) {
  if (!tt) return tt;
  return tt.charAt(0).toUpperCase() + tt.slice(1);
}

// Function to determine if a checkbox should be checked
function shouldBeChecked(value: number) {
  return !(value === 0 || value.toString().toLowerCase().startsWith("no"));
}

function formatVariableName(name: string) {
  let key = name
    .replace(/% of /gi, "")
    .replace(/% /gi, "")
    .replace(/presence of /gi, "");
  if (key === "PV coverage on roof") key = "Solar panels";
  return capitalizeFirstLetter(key.trim());
}

// Function to transform interventions into a key-value format and apply consistent naming/capitalization
function formatInterventions(interventions: Intervention[]) {
  return interventions.map((intervention) => {
    // console.log("original intervention", JSON.parse(JSON.stringify(intervention)))
    let [key, value] = intervention.key.split(":"); // Split at the colon to separate the key and value
    value = value.trim(); // Clean up value
    if (key.includes("%")) {
      value = `${parseFloat(value).toFixed(0)}%`;
    } else {
      value = capitalizeFirstLetter(value);
    }
    key = formatVariableName(key); // Capitalize and clean up key
    // console.log("updated intervention", JSON.parse(JSON.stringify({ key, value })))
    return { key, value };
  });
}

function formatAddress(address: string) {
  // Regular expression to match UK postcodes
  const postcodeRegex = /([A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2})/g;

  // Find all postcodes in the string
  const postcodes = address.match(postcodeRegex) || [];

  // Replace postcodes with a placeholder
  let formattedAddress = address;
  postcodes.forEach((postcode: string, index: number) => {
    formattedAddress = formattedAddress.replace(
      postcode,
      `__postcode${index}__`
    );
  });

  // Convert to title case
  formattedAddress = formattedAddress
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());

  // Restore postcodes
  postcodes.forEach((postcode: string, index: number) => {
    formattedAddress = formattedAddress.replace(
      `__postcode${index}__`,
      postcode
    );
  });

  return formattedAddress;
}

// Eports
const loanDurationMonths = 8 * 12 + 3; // 8 years and 3 months in months

function postProcessProperty(property: Property) {
  property.propertyAttributes.address = formatAddress(
    property.propertyAttributes.address
  );
  property.predictedEfficiency.predicted_eer = parseFloat(
    property.predictedEfficiency.predicted_eer.toString()
  );
  property.propertyAttributes.potential_eer = parseFloat(
    property.propertyAttributes.potential_eer.toString()
  );
  property.propertyAttributes.current_co2_emissions = parseFloat(
    property.propertyAttributes.current_co2_emissions.toString()
  );
  property.propertyAttributes.potential_co2_emissions = parseFloat(
    property.propertyAttributes.potential_co2_emissions.toString()
  );
  property.propertyAttributes.potential_co2_reduction_pc =
    ((property.propertyAttributes.potential_co2_emissions -
      property.propertyAttributes.current_co2_emissions) /
      property.propertyAttributes.current_co2_emissions) *
    100;

  property.propertyAttributes.potential_savings =
    property.potentialSavingsFromEPC["total potential savings"] ??
    property.potentialSavingsFromEPC.total_potential_savings;
  property.propertyAttributes.number_of_habitable_rooms =
    property.propertyAttributes.number_of_habitable_rooms ??
    Math.round(property.propertyAttributes["number of habitable rooms"]);
  property.propertyAttributes.built_form =
    property.propertyAttributes.built_form ??
    property.propertyAttributes["built form"];

  // randomly select out of "Low", "Medium", "High"
  // but seeded with the address
  const seed =
    parseInt(
      property.propertyAttributes.address
        .split("")
        .map((char) => char.charCodeAt(0))
        .join("")
    ) / 6.28318530718;
  // console.log("seed", seed)
  // generate random number using seed
  const random = Math.abs(Math.sin(seed));
  const portfolioImpact =
    random < 0.33 ? "Low" : random < 0.66 ? "Medium" : "High";
  // generate random max cashback
  const maxCashback = (8 + Math.floor(Math.random() * 8)) * 100;
  property.maxCashback = maxCashback;
  property.maxAPR = 20;

  const loanOutsandingProportion = 0.2;
  // property.propertyAttributes.citytown = capitalizeFirstLetter(property.landRegistryData?.[0]?.town.toLowerCase())
  property.propertyAttributes.citytown =
    property.propertyAttributes.local_authority_area;
  property.valueDetails = {
    latestValuation: parseInt(
      property.landRegistryData?.[0]?.price_paid.toString()
    ),
    dateOfLatestValuation: property.landRegistryData?.[0]?.date_of_transfer,
    yearOfLatestValuation:
      property.landRegistryData?.[0]?.date_of_transfer?.split("-")[0],
    loanOutstanding:
      loanOutsandingProportion * property.landRegistryData?.[0]?.price_paid,
    portfolioImpact: portfolioImpact,
  };

  // Transform retrofitVariables into an array of objects with capitalized keys for rendering
  property.retrofitVariables = Object.entries(property.retrofitVariables).map(
    ([key, value]) => {
      if (!value) {
        // console.log("property", property, "key", key, "value", value)
        value = 0;
      }
      return {
        option: formatVariableName(key), // Capitalize the first letter of the key
        currentValue: value,
        checked: shouldBeChecked(value),
        retrofittable: true,
      };
    }
  );

  // property.retrofitVariableToggles = property.retrofitVariables.map(({ option, checked }) => {
  //     return { option, forcedOn: checked, checked: true };
  // });

  // Transform retrofitOptions interventions
  property.retrofitOptions = property.retrofitOptions.map((option) => {
    // log each component of this calc: Math.round(property.valueDetails.latestValuation + 5000 * (option.expectedNewEER-property.predictedEfficiency.predicted_eer))
    // console.log("property.valueDetails.latestValuation", property.valueDetails.latestValuation, "option.expectedNewEER", option.expectedNewEER, "property.predictedEfficiency.predicted_eer", property.predictedEfficiency.predicted_eer, "5000 * (option.expectedNewEER-property.predictedEfficiency.predicted_eer)", 5000 * (option.expectedNewEER-property.predictedEfficiency.predicted_eer))

    let indicativeCosts = parseFloat(
      option.indicative_costs.replace(/[^0-9.]/, "")
    );
    // console.log("option.indicative_costs", option.indicative_costs, "parseFloat(option.indicative_costs.replace(\"[^0-9.]\", \"\"))", parseFloat(option.indicative_costs.replace(/[^0-9.]/, "")))

    // delete option.indicative_costs;

    // if option.interventions includes roof insulation, recalculate roof price using propertyAttributes.total_floor_area
    // then add the difference between the resulting roof insulation cost and 225 to the indicative costs
    if (
      option.interventions.some((intervention) =>
        intervention.key.toLowerCase().includes("roof")
      )
    ) {
      // actually cap total_fllor_area at 50,150
      const total_floor_area =
        Math.max(
          50,
          Math.min(150, property.propertyAttributes.total_floor_area)
        ) - 50;
      const roofInsulationCost =
        400 + Math.round((total_floor_area * 2.25) / 25) * 25;
      indicativeCosts += roofInsulationCost - 225;
      // console.log("roofInsulationCost", roofInsulationCost, "indicativeCosts", indicativeCosts)
    }

    return {
      ...option, // Spread existing properties
      apr: 7, // Default APR
      cashback: 0, // Default cashback
      monthlyPayment: calculateMonthlyPayment(
        indicativeCosts,
        0.07 / 12,
        loanDurationMonths
      ), // Calculate monthly payment
      option_num: option.option_num,
      expectedNewEER: option.expectedNewEER,
      expectedNewEPCBand: option.expectedNewEPCBand,
      indicativeCosts: indicativeCosts,
      predictedValueUplift: Math.round(
        2000 *
          (option.expectedNewEER - property.predictedEfficiency.predicted_eer)
      ), // Predicted future valuation
      predictedFutureValuation: Math.round(
        property.valueDetails.latestValuation +
          5000 *
            (option.expectedNewEER - property.predictedEfficiency.predicted_eer)
      ), // Predicted future valuation
      interventions: formatInterventions(option.interventions), // Apply transformation to interventions
    };
  });

  // actually, should be checked should be based on whether it appears in any intervention lists

  property.retrofitVariables = property.retrofitVariables.map(
    ({ option, currentValue }) => {
      const checked =
        shouldBeChecked(currentValue) &&
        !property.retrofitOptions.some(({ interventions }) =>
          interventions.some(({ key }) => key === option)
        );
      return { option, checked, retrofittable: true, currentValue };
    }
  );

  property.originalRetrofitVariables = JSON.parse(
    JSON.stringify(property.retrofitVariables)
  );
  property.originalRetrofitOptions = JSON.parse(
    JSON.stringify(property.retrofitOptions)
  );
  // console.log(property);
  property.formatted = true;
}

function calculateMonthlyPayment(
  principal: number,
  monthlyInterestRate: number,
  loanTerm: number
) {
  const numerator =
    principal *
    monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, loanTerm);
  const denominator = Math.pow(1 + monthlyInterestRate, loanTerm) - 1;
  return numerator / denominator;
}

async function loadPropertyData(limit?: number): Promise<PropertyData> {
  const USE_SERVER = false;
  const SAVE_TO_FILE = false;
  const propertyData: PropertyData = {
    properties: [],
    addressOptions: [],
    propertiesWithLandRegistryData: [],
  };
  // let addressOptions = [
  //     "159 Baldwins Lane B28 0PY",
  //     "10 Cranley Place SW7 3AB",
  //     "68 Springbank Road, Gildersome, Morley LS27 7DJ",
  //     // "65 St. Anns Road W11 4SH",
  //     "62 College Park Close SE13 5HA",
  //     "10 Cromwell Road SO15 2JF",
  //     // "1 PARKSIDE DRIVE, SEACROFT LS14 6FP",
  //     "16 Charleville Road B19 1DA",
  //     "1 Mead Way LS15 9JP",
  //     "54 Finch Road B19 1HR",
  //     "9 Heath Villas, Vale Of Health NW3 1AW",
  //     "77 Belper Street LE4 6EB",
  //     "96 Plumstead Common Road SE18 3RE",
  //     // "56 Gowers Walk E1 8BS",
  //     // "7 Reizel Close, Stamford Hill N16 5GY"
  // ]
  // .slice(0, 1) // for testing purposes, only use the first address;

  // addressOptions = addressOptions.filter(address => properties.find(property => property.propertyAttributes.address === address)?.landRegistryData[0].price_paid)
  // sleep for 1 second to simulate loading time
  // }

  let properties;
  if (USE_SERVER) {
    // property = await fetch(`http://127.0.0.1:5000/epc_recommendations/${encodeURIComponent(params.address)}`)
    // .then(r => r.json())

    if (SAVE_TO_FILE) {
      const propertiesWithoutLandRegistryData = JSON5.parse(propertiesRaw);
      console.log(
        "propertiesWithoutLandRegistryData.length",
        propertiesWithoutLandRegistryData.length
      );
      // actually let's store all the objects in a properties array and write that to properties.json
      // const properties = await Promise.all(propertiesWithoutLandRegistryData.map(async property => {
      properties = [];
      for (const property of propertiesWithoutLandRegistryData) {
        const address = property.propertyAttributes.address;
        // return fetch(`http://127.0.0.1:5000/epc_recommendations/${encodeURIComponent(address)}`)
        // .then(r => r.json()).then(async property => {
        console.log(property);

        // split address into house number, street name and postcode
        const addressParts = address.split(" ");
        const houseNumber = addressParts[0];
        const streetName = addressParts.slice(1, -2).join(" ");
        const postcode = addressParts.slice(-2).join(" ");

        // retrieve data from https://landregistry.data.gov.uk/app/ppd/ppd_data.csv?et%5B%5D=lrcommon%3Afreehold&et%5B%5D=lrcommon%3Aleasehold&limit=100&nb%5B%5D=true&nb%5B%5D=false&paon=159+&postcode=B28+0PY&ptype%5B%5D=lrcommon%3Adetached&ptype%5B%5D=lrcommon%3Asemi-detached&ptype%5B%5D=lrcommon%3Aterraced&ptype%5B%5D=lrcommon%3Aflat-maisonette&ptype%5B%5D=lrcommon%3AotherPropertyType&street=Baldwins+Lane+&tc%5B%5D=ppd%3AstandardPricePaidTransaction&tc%5B%5D=ppd%3AadditionalPricePaidTransaction
        // and store it in properties.json

        const landRegistryDataUrl = `https://landregistry.data.gov.uk/app/ppd/ppd_data.csv?header=true&et%5B%5D=lrcommon%3Afreehold&et%5B%5D=lrcommon%3Aleasehold&limit=100&nb%5B%5D=true&nb%5B%5D=false&paon=${encodeURIComponent(
          houseNumber
        )}+&postcode=${encodeURIComponent(
          postcode
        )}&ptype%5B%5D=lrcommon%3Adetached&ptype%5B%5D=lrcommon%3Asemi-detached&ptype%5B%5D=lrcommon%3Aterraced&ptype%5B%5D=lrcommon%3Aflat-maisonette&ptype%5B%5D=lrcommon%3AotherPropertyType&street=${encodeURIComponent(
          streetName
        )}&tc%5B%5D=ppd%3AstandardPricePaidTransaction&tc%5B%5D=ppd%3AadditionalPricePaidTransaction`;
        console.log("landRegistryDataUrl", landRegistryDataUrl);
        const res = await fetch(landRegistryDataUrl);
        const data = await res.text();
        console.log("ppd_data", data, "from", landRegistryDataUrl);
        // parse the csv
        const parsedData = Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
        });
        console.log(parsedData, "from", landRegistryDataUrl);

        property.landRegistryData = parsedData.data;

        properties.push(property);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // })
        // }))
      }
      console.log("writing output to file");
      fs.writeFileSync(
        "@/data/demo_property_recommendations_leicester_highestCO2reduction_1000_with_land_registry_data.json",
        JSON.stringify(properties, null, 2)
      );
      console.log("done writing output to file");
      if (properties.length > 0) {
        propertyData.properties = properties;
      }
    }
  } else {
    // const properties = fs.readFileSync('properties.json').toString()
    // actually let's import
    // console.log("properties", propertiesRaw)
    // const properties = JSON.parse(propertiesRaw)
    properties = JSON5.parse(propertiesRawWithLandRegistryData);
    properties = properties.map((property: Property) => {
      const { LandRegistry, ...rest } = property;
      return {
        ...rest,
        landRegistryData: Array.isArray(LandRegistry)
          ? LandRegistry
          : [LandRegistry],
      };
    });
    console.log("loadProperties(): Properties length", properties.length);

    // addressOptions = properties.filter(property => property.landRegistryData[0]?.price_paid).map(property => property.propertyAttributes.address)
  }
  if (limit) {
    properties = properties.slice(0, limit);
  }

  const addressOptions = properties.map((property: Property) =>
    formatAddress(property.propertyAttributes.address)
  );
  propertyData.properties = properties;
  properties.forEach((property: Property, i: number) => {
    propertyData.properties[i].propertyAttributes.postcode = getPostCode(
      property.propertyAttributes.address
    );
    propertyData.properties[i].propertyAttributes.address = removePostCode(
      property.propertyAttributes.address,
      propertyData.properties[i].propertyAttributes.postcode
    );
  });

  const propertiesWithLandRegistryData = properties.filter(
    (property: Property) => property.landRegistryData?.[0]?.price_paid
  );

  propertyData.addressOptions = addressOptions;
  propertyData.propertiesWithLandRegistryData = propertiesWithLandRegistryData;

  return propertyData;
}

async function getProperties(limit?: number): Promise<Property[]> {
  const USE_SERVER = false;
  const SAVE_TO_FILE = false;
  const propertyData: PropertyData = {
    properties: [],
    addressOptions: [],
    propertiesWithLandRegistryData: [],
  };
  // let addressOptions = [
  //     "159 Baldwins Lane B28 0PY",
  //     "10 Cranley Place SW7 3AB",
  //     "68 Springbank Road, Gildersome, Morley LS27 7DJ",
  //     // "65 St. Anns Road W11 4SH",
  //     "62 College Park Close SE13 5HA",
  //     "10 Cromwell Road SO15 2JF",
  //     // "1 PARKSIDE DRIVE, SEACROFT LS14 6FP",
  //     "16 Charleville Road B19 1DA",
  //     "1 Mead Way LS15 9JP",
  //     "54 Finch Road B19 1HR",
  //     "9 Heath Villas, Vale Of Health NW3 1AW",
  //     "77 Belper Street LE4 6EB",
  //     "96 Plumstead Common Road SE18 3RE",
  //     // "56 Gowers Walk E1 8BS",
  //     // "7 Reizel Close, Stamford Hill N16 5GY"
  // ]
  // .slice(0, 1) // for testing purposes, only use the first address;

  // addressOptions = addressOptions.filter(address => properties.find(property => property.propertyAttributes.address === address)?.landRegistryData[0].price_paid)
  // sleep for 1 second to simulate loading time
  // }

  let properties;
  if (USE_SERVER) {
    // property = await fetch(`http://127.0.0.1:5000/epc_recommendations/${encodeURIComponent(params.address)}`)
    // .then(r => r.json())

    if (SAVE_TO_FILE) {
      const propertiesWithoutLandRegistryData = JSON5.parse(propertiesRaw);
      console.log(
        "propertiesWithoutLandRegistryData.length",
        propertiesWithoutLandRegistryData.length
      );
      // actually let's store all the objects in a properties array and write that to properties.json
      // const properties = await Promise.all(propertiesWithoutLandRegistryData.map(async property => {
      properties = [];
      for (const property of propertiesWithoutLandRegistryData) {
        const address = property.propertyAttributes.address;
        // return fetch(`http://127.0.0.1:5000/epc_recommendations/${encodeURIComponent(address)}`)
        // .then(r => r.json()).then(async property => {
        console.log(property);

        // split address into house number, street name and postcode
        const addressParts = address.split(" ");
        const houseNumber = addressParts[0];
        const streetName = addressParts.slice(1, -2).join(" ");
        const postcode = addressParts.slice(-2).join(" ");

        // retrieve data from https://landregistry.data.gov.uk/app/ppd/ppd_data.csv?et%5B%5D=lrcommon%3Afreehold&et%5B%5D=lrcommon%3Aleasehold&limit=100&nb%5B%5D=true&nb%5B%5D=false&paon=159+&postcode=B28+0PY&ptype%5B%5D=lrcommon%3Adetached&ptype%5B%5D=lrcommon%3Asemi-detached&ptype%5B%5D=lrcommon%3Aterraced&ptype%5B%5D=lrcommon%3Aflat-maisonette&ptype%5B%5D=lrcommon%3AotherPropertyType&street=Baldwins+Lane+&tc%5B%5D=ppd%3AstandardPricePaidTransaction&tc%5B%5D=ppd%3AadditionalPricePaidTransaction
        // and store it in properties.json

        const landRegistryDataUrl = `https://landregistry.data.gov.uk/app/ppd/ppd_data.csv?header=true&et%5B%5D=lrcommon%3Afreehold&et%5B%5D=lrcommon%3Aleasehold&limit=100&nb%5B%5D=true&nb%5B%5D=false&paon=${encodeURIComponent(
          houseNumber
        )}+&postcode=${encodeURIComponent(
          postcode
        )}&ptype%5B%5D=lrcommon%3Adetached&ptype%5B%5D=lrcommon%3Asemi-detached&ptype%5B%5D=lrcommon%3Aterraced&ptype%5B%5D=lrcommon%3Aflat-maisonette&ptype%5B%5D=lrcommon%3AotherPropertyType&street=${encodeURIComponent(
          streetName
        )}&tc%5B%5D=ppd%3AstandardPricePaidTransaction&tc%5B%5D=ppd%3AadditionalPricePaidTransaction`;
        console.log("landRegistryDataUrl", landRegistryDataUrl);
        const res = await fetch(landRegistryDataUrl);
        const data = await res.text();
        console.log("ppd_data", data, "from", landRegistryDataUrl);
        // parse the csv
        const parsedData = Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
        });
        console.log(parsedData, "from", landRegistryDataUrl);

        property.landRegistryData = parsedData.data;

        properties.push(property);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // })
        // }))
      }
      console.log("writing output to file");
      fs.writeFileSync(
        "@/data/demo_property_recommendations_leicester_highestCO2reduction_1000_with_land_registry_data.json",
        JSON.stringify(properties, null, 2)
      );
      console.log("done writing output to file");
      if (properties.length > 0) {
        propertyData.properties = properties;
      }
    }
  } else {
    // const properties = fs.readFileSync('properties.json').toString()
    // actually let's import
    // console.log("properties", propertiesRaw)
    // const properties = JSON.parse(propertiesRaw)
    properties = JSON5.parse(propertiesRawWithLandRegistryData);
    properties = properties.map((property: Property) => {
      const { LandRegistry, ...rest } = property;
      return {
        ...rest,
        landRegistryData: Array.isArray(LandRegistry)
          ? LandRegistry
          : [LandRegistry],
      };
    });
    console.log("loadProperties(): Properties length", properties.length);

    // addressOptions = properties.filter(property => property.landRegistryData[0]?.price_paid).map(property => property.propertyAttributes.address)
  }
  if (limit) {
    properties = properties.slice(0, limit);
  }

  const addressOptions = properties.map((property: Property) =>
    formatAddress(property.propertyAttributes.address)
  );
  propertyData.properties = properties;
  properties.forEach((property: Property, i: number) => {
    propertyData.properties[i].propertyAttributes.postcode = getPostCode(
      property.propertyAttributes.address
    );
    propertyData.properties[i].id =
      propertyData.properties[i].propertyAttributes.BUILDING_REFERENCE_NUMBER;
    propertyData.properties[i].propertyAttributes.address = removePostCode(
      property.propertyAttributes.address,
      propertyData.properties[i].propertyAttributes.postcode
    );
  });

  const propertiesWithLandRegistryData = properties.filter(
    (property: Property) => property.landRegistryData?.[0]?.price_paid
  );

  propertyData.addressOptions = addressOptions;
  propertyData.propertiesWithLandRegistryData = propertiesWithLandRegistryData;

  return propertyData.properties;
}

async function loadProperty(buildingRefNum: string) {
  const limit = 500;
  const USE_SERVER = false;
  const SAVE_TO_FILE = false;

  // let addressOptions = [
  //     "159 Baldwins Lane B28 0PY",
  //     "10 Cranley Place SW7 3AB",
  //     "68 Springbank Road, Gildersome, Morley LS27 7DJ",
  //     // "65 St. Anns Road W11 4SH",
  //     "62 College Park Close SE13 5HA",
  //     "10 Cromwell Road SO15 2JF",
  //     // "1 PARKSIDE DRIVE, SEACROFT LS14 6FP",
  //     "16 Charleville Road B19 1DA",
  //     "1 Mead Way LS15 9JP",
  //     "54 Finch Road B19 1HR",
  //     "9 Heath Villas, Vale Of Health NW3 1AW",
  //     "77 Belper Street LE4 6EB",
  //     "96 Plumstead Common Road SE18 3RE",
  //     // "56 Gowers Walk E1 8BS",
  //     // "7 Reizel Close, Stamford Hill N16 5GY"
  // ]
  // .slice(0, 1) // for testing purposes, only use the first address;

  // addressOptions = addressOptions.filter(address => properties.find(property => property.propertyAttributes.address === address)?.landRegistryData[0].price_paid)
  // sleep for 1 second to simulate loading time
  // }

  let properties;
  if (USE_SERVER) {
    // property = await fetch(`http://127.0.0.1:5000/epc_recommendations/${encodeURIComponent(params.address)}`)
    // .then(r => r.json())

    if (SAVE_TO_FILE) {
      const propertiesWithoutLandRegistryData = JSON5.parse(propertiesRaw);
      console.log(
        "propertiesWithoutLandRegistryData.length",
        propertiesWithoutLandRegistryData.length
      );
      // actually let's store all the objects in a properties array and write that to properties.json
      // const properties = await Promise.all(propertiesWithoutLandRegistryData.map(async property => {
      properties = [];
      for (const property of propertiesWithoutLandRegistryData) {
        const address = property.propertyAttributes.address;
        // return fetch(`http://127.0.0.1:5000/epc_recommendations/${encodeURIComponent(address)}`)
        // .then(r => r.json()).then(async property => {
        console.log(property);

        // split address into house number, street name and postcode
        const addressParts = address.split(" ");
        const houseNumber = addressParts[0];
        const streetName = addressParts.slice(1, -2).join(" ");
        const postcode = addressParts.slice(-2).join(" ");

        // retrieve data from https://landregistry.data.gov.uk/app/ppd/ppd_data.csv?et%5B%5D=lrcommon%3Afreehold&et%5B%5D=lrcommon%3Aleasehold&limit=100&nb%5B%5D=true&nb%5B%5D=false&paon=159+&postcode=B28+0PY&ptype%5B%5D=lrcommon%3Adetached&ptype%5B%5D=lrcommon%3Asemi-detached&ptype%5B%5D=lrcommon%3Aterraced&ptype%5B%5D=lrcommon%3Aflat-maisonette&ptype%5B%5D=lrcommon%3AotherPropertyType&street=Baldwins+Lane+&tc%5B%5D=ppd%3AstandardPricePaidTransaction&tc%5B%5D=ppd%3AadditionalPricePaidTransaction
        // and store it in properties.json

        const landRegistryDataUrl = `https://landregistry.data.gov.uk/app/ppd/ppd_data.csv?header=true&et%5B%5D=lrcommon%3Afreehold&et%5B%5D=lrcommon%3Aleasehold&limit=100&nb%5B%5D=true&nb%5B%5D=false&paon=${encodeURIComponent(
          houseNumber
        )}+&postcode=${encodeURIComponent(
          postcode
        )}&ptype%5B%5D=lrcommon%3Adetached&ptype%5B%5D=lrcommon%3Asemi-detached&ptype%5B%5D=lrcommon%3Aterraced&ptype%5B%5D=lrcommon%3Aflat-maisonette&ptype%5B%5D=lrcommon%3AotherPropertyType&street=${encodeURIComponent(
          streetName
        )}&tc%5B%5D=ppd%3AstandardPricePaidTransaction&tc%5B%5D=ppd%3AadditionalPricePaidTransaction`;
        console.log("landRegistryDataUrl", landRegistryDataUrl);
        const res = await fetch(landRegistryDataUrl);
        const data = await res.text();
        console.log("ppd_data", data, "from", landRegistryDataUrl);
        // parse the csv
        const parsedData = Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
        });
        console.log(parsedData, "from", landRegistryDataUrl);

        property.landRegistryData = parsedData.data;

        properties.push(property);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // })
        // }))
      }
      console.log("writing output to file");
      fs.writeFileSync(
        "@/data/demo_property_recommendations_leicester_highestCO2reduction_1000_with_land_registry_data.json",
        JSON.stringify(properties, null, 2)
      );
      console.log("done writing output to file");
      if (properties.length > 0) {
        propertyData.properties = properties;
      }
    }
  } else {
    // const properties = fs.readFileSync('properties.json').toString()
    // actually let's import
    // console.log("properties", propertiesRaw)
    // const properties = JSON.parse(propertiesRaw)
    properties = JSON5.parse(propertiesRawWithLandRegistryData);
    properties = properties.map((property: Property) => {
      const { LandRegistry, ...rest } = property;
      return {
        ...rest,
        landRegistryData: Array.isArray(LandRegistry)
          ? LandRegistry
          : [LandRegistry],
      };
    });
    console.log("properties", properties.length);

    // addressOptions = properties.filter(property => property.landRegistryData[0]?.price_paid).map(property => property.propertyAttributes.address)
  }

  if (limit) {
    properties = properties.slice(0, limit);
  }
  const addressOptions = properties.map((property: Property) =>
    formatAddress(property.propertyAttributes.address)
  );

  const propertiesWithLandRegistryData = properties.filter(
    (property: Property) => property.landRegistryData?.[0]?.price_paid
  );

  propertyData.properties = properties;
  properties.forEach((property: Property, i: number) => {
    propertyData.properties[i].propertyAttributes.postcode = getPostCode(
      property.propertyAttributes.address
    );
    propertyData.properties[i].propertyAttributes.address = removePostCode(
      property.propertyAttributes.address,
      propertyData.properties[i].propertyAttributes.postcode
    );
  });

  propertyData.addressOptions = addressOptions;
  propertyData.propertiesWithLandRegistryData = propertiesWithLandRegistryData;

  const prop = properties.find(
    (p: Property) =>
      p.propertyAttributes.BUILDING_REFERENCE_NUMBER === buildingRefNum
  );
  return prop;
}

export function getEnergyRating(score: number) {
  if (score >= 92) {
    return "A";
  } else if (score >= 81 && score <= 91) {
    return "B";
  } else if (score >= 69 && score <= 80) {
    return "C";
  } else if (score >= 55 && score <= 68) {
    return "D";
  } else if (score >= 39 && score <= 54) {
    return "E";
  } else if (score >= 21 && score <= 38) {
    return "F";
  } else if (score >= 1 && score <= 20) {
    return "G";
  } else {
    return "Invalid score";
  }
}

export function getPostCode(address: string) {
  const addressParts = address.split(" ");
  const postcode = addressParts.slice(-2).join(" ");
  return postcode;
}

export function removePostCode(address: string, postcode: string) {
  // const addressParts = address.split(" ");
  const addressWithoutPostcode = address.replace(postcode, "");

  return addressWithoutPostcode.split(",")[0].trim();
}

async function overviewProperties(): Promise<OverviewPropertiesType> {
  const properties = await getProperties();
  return {
    numberProperties: properties.length,
    totalCO2Emission: properties.reduce(
      (acc, curr) =>
        acc + Number(curr.propertyAttributes.current_co2_emissions),
      0
    ),
    totalCO2EmissionPerSqMt: properties.reduce(
      (acc, curr) =>
        acc +
        Number(curr.propertyAttributes.current_co2_emissions) /
          Number(curr.propertyAttributes.total_floor_area),
      0
    ),
    averageCO2EmissionPerSqMt:
      properties.reduce(
        (acc, curr) =>
          acc +
          Number(curr.propertyAttributes.current_co2_emissions) /
            Number(curr.propertyAttributes.total_floor_area),
        0
      ) / properties.length,
    numberOfPropertiesEPCCOrHigher: properties.filter(
      (p: Property) =>
        p.propertyAttributes.potential_epc_band === "C" ||
        p.propertyAttributes.potential_epc_band === "B" ||
        p.propertyAttributes.potential_epc_band === "A"
    ).length,
  };
}

const pp = {
  getEnergyRating,
  postProcessProperty,
  loadPropertyData,
  loadProperty,
  calculateMonthlyPayment,
  LOAN_DURATION_MONTHS: loanDurationMonths,
  overviewProperties,
  getProperties,
};
export default pp;
