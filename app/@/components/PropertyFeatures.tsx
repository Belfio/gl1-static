import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { BrickWall, Heater } from "lucide-react";
import { Property } from "../lib/types";
import { Button } from "./ui/button";

interface PropertyFeature {
  name: string;
  checked: boolean;
  type: "fabric" | "heating";
}

const features = {
  fabric: [
    "Roof insulation",
    "Wall insulation",
    "Energy efficiency rating of main heating",
    "Floor insulation",
    "Low energy lighting",
    "Heat recovery waste water system",
    "Area with thermostat control",
  ],
  heating: [
    "Solar panels",
    "Solar heated hot water system",
    "Thermostatic radiator valves",
    "Heating control programmer",
    "Multi-glazing window coverage",
    "Heat recovery flue gas system",
  ],
};

const featuresState: PropertyFeature[] = [
  ...features.fabric.map((feature) => ({
    name: feature,
    checked: false,
    type: "fabric" as const,
  })),
  ...features.heating.map((feature) => ({
    name: feature,
    checked: false,
    type: "heating" as const,
  })),
];

const potentialFeaturesState: PropertyFeature[] = [
  ...features.fabric.map((feature) => ({
    name: feature,
    checked: true,
    type: "fabric" as const,
  })),
  ...features.heating.map((feature) => ({
    name: feature,
    checked: true,
    type: "heating" as const,
  })),
];

export function PropertyFeatures({
  property,
  isOperational = false,
}: {
  property: Property;
  isOperational?: boolean;
}) {
  const [currentFeatures, setCurrentFeatures] =
    useState<PropertyFeature[]>(featuresState);
  const [potentialFeatures, setPotentialFeatures] = useState<PropertyFeature[]>(
    potentialFeaturesState
  );
  const [toChange, setToChange] = useState<boolean>(false);

  const handleCurrentFeatureChange = (name: string) => {
    const updatedFeatures = [...currentFeatures];
    const index = updatedFeatures.findIndex((feature) => feature.name === name);
    updatedFeatures[index].checked = !updatedFeatures[index].checked;
    setCurrentFeatures(updatedFeatures);
    setToChange(true);
  };

  const handlePotentialFeatureChange = (name: string) => {
    const updatedFeatures = [...potentialFeatures];
    const index = updatedFeatures.findIndex((feature) => feature.name === name);
    updatedFeatures[index].checked = !updatedFeatures[index].checked;
    setPotentialFeatures(updatedFeatures);
    setToChange(true);
  };

  const handleSubmit = () => {
    console.log(currentFeatures);
    console.log(potentialFeatures);
  };

  const handleCancel = () => {
    window.location.reload();
    setCurrentFeatures(featuresState);
    setPotentialFeatures(potentialFeaturesState);
    setToChange(false);
  };

  return (
    <div className="font-sans">
      <h2 className="text-2xl mb-4">Property features</h2>

      <div className="flex flex-row gap-2 items-center pl-2">
        <div className="w-4 h-4 bg-[--darkblue]"></div>
        <p className="">Current property features.</p>
      </div>
      <div className="flex flex-row gap-2 items-center mb-6 pl-2">
        <div className="w-4 h-4 bg-[--blue]"></div>
        <p className=""> Potential features for retrofits.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8 ">
        <div className="flex flex-col gap-4 p-4 border border-[--darkblue] relative pt-6">
          <div className="absolute top-[-16px] bg-white left-4 flex items-center gap-2">
            <BrickWall className="w-6 h-6 text-[--darkblue]" />
            <h3 className="text-lg">Fabric</h3>
          </div>
          {currentFeatures
            .filter((feature) => feature.type === "fabric")
            .map((feature, index) => (
              <div key={feature.name} className="flex items-center space-x-2">
                {isOperational ? (
                  <Checkbox
                    id={`current-${feature.name}`}
                    checked={feature.checked}
                    onCheckedChange={() =>
                      handleCurrentFeatureChange(feature.name)
                    }
                  />
                ) : (
                  <div className="w-4 h-4 bg-[--darkblue]"></div>
                )}
                {isOperational ? (
                  <Checkbox
                    id={`potential-${feature.name}`}
                    checked={potentialFeatures[index].checked}
                    onCheckedChange={() =>
                      handlePotentialFeatureChange(feature.name)
                    }
                    className="data-[state=checked]:bg-[--blue]"
                  />
                ) : (
                  <div className="w-4 h-4 bg-[--blue]"></div>
                )}
                <Label htmlFor={`current-${feature.name}`}>
                  {feature.name}
                </Label>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-4 p-4 border border-[--darkblue] relative pt-6">
          <div className="absolute top-[-16px] bg-white left-4 flex items-center gap-2">
            <Heater className="w-6 h-6 text-[--darkblue]" />
            <h3 className="text-lg">Heating</h3>
          </div>
          {currentFeatures
            .filter((feature) => feature.type === "heating")
            .map((feature, index) => (
              <div key={feature.name} className="flex items-center space-x-2">
                {isOperational ? (
                  <Checkbox
                    id={`current-${feature.name}`}
                    checked={feature.checked}
                    onCheckedChange={() =>
                      handleCurrentFeatureChange(feature.name)
                    }
                  />
                ) : (
                  <div className="w-4 h-4 bg-[--darkblue]"></div>
                )}
                {isOperational ? (
                  <Checkbox
                    id={`potential-${feature.name}`}
                    // checked={potentialFeatures[index].checked}
                    onCheckedChange={() =>
                      handlePotentialFeatureChange(feature.name)
                    }
                    className="data-[state=checked]:bg-[--blue]"
                  />
                ) : (
                  <div className="w-4 h-4 bg-[--blue]"></div>
                )}
                <Label htmlFor={`current-${feature.name}`}>
                  {feature.name}
                </Label>
              </div>
            ))}
        </div>
      </div>
      <div className="flex h-16 w-full">
        {toChange && (
          <div className="flex flex-row gap-2 items-center mb-6 pl-2 justify-end w-full">
            <p>Would you like to save the changes?</p>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        )}
      </div>
    </div>
  );
}
