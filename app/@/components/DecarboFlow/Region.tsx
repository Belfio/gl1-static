import { Button } from "~/@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FlowSteps } from ".";
// import { MultiSelectorComplete } from "../ui/multicombo";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
const REGIONS = [
  {
    value: "Portfolio",
    label: "Whole portfolio",
  },
  {
    value: "Leicester",
    label: "Leicester",
  },
  {
    value: "London",
    label: "London",
  },
  {
    value: "Birmingham",
    label: "Birmingham",
  },
  {
    value: "Manchester",
    label: "Manchester",
  },
];
export type Regions =
  | "Portfolio | Leicester | London | Birmingham | Manchester"
  | undefined;
export function Region({ setPath }: { setPath: (path: FlowSteps) => void }) {
  const [regions, setRegions] = useState<Regions[]>([]);
  return (
    <DialogHeader className="h-full">
      <DialogTitle>
        <h1 className="text-3xl">Target regions</h1>
      </DialogTitle>
      <DialogDescription className="mt-2 h-full flex flex-col justify-between">
        <p className="text-sm text-gray-500">
          Select the regions you want to target with your new decarbonisation
          pathway.
        </p>

        {/* <MultiSelectorComplete
              placeholder="Select a region or the whole portfolio"
              values={regions}
              onValuesChange={(values) => setRegions(values as Regions[])}
              arrow={true}
              options={[
                {
                  value: "Portfolio",
                  label: "Portfolio",
                },
                {
                  value: "Leicester",
                  label: "Leicester",
                },
              ]}
            />
            */}
        <div className="flex flex-col gap-2 my-4 mx-4">
          {REGIONS.map((region) => (
            <div key={region.value} className="flex items-center gap-2">
              <Checkbox
                id={region.value}
                onCheckedChange={(checked) => {
                  console.log(region.value);
                  if (checked) {
                    if (region.value === "Portfolio")
                      setRegions(REGIONS.map((r) => r.value) as Regions[]);
                    else setRegions([...regions, region.value as Regions]);
                  } else {
                    if (region.value === "Portfolio") setRegions([]);
                    else setRegions(regions.filter((r) => r !== region.value));
                  }
                }}
                checked={regions.includes(region.value as Regions)}
              />
              <Label htmlFor={region.value}>{region.label}</Label>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center w-ful mt-4">
          <Button
            variant="link"
            className="p-0 "
            onClick={() => setPath("loadProps")}
          >
            Add other properties
          </Button>
          <div className="flex justify-end gap-4 z-[1]">
            <Button
              className="mt-4 w-fit"
              onClick={() => setPath("welcome")}
              variant="secondary"
            >
              Back
            </Button>
            <Button className="mt-4 w-fit" onClick={() => setPath("target")}>
              Continue
            </Button>
          </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  );
}
