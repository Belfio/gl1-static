import { Button } from "~/@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { FlowSteps } from ".";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";
const TARGETS = [
  {
    value: "EPCmin",
    label: "Improve to EPC C or above",
  },
  {
    value: "Emission",
    label: "Decrease total emissions by",
  },
  {
    value: "EmissionIntensity",
    label: "Decrease average emissions to",
  },
];

const TARGET_DETAIL_INPUT = {
  EPCmin: (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Input
          type="number"
          placeholder="percentage"
          defaultValue="50"
          min="0"
          max="100"
          className="pr-5 max-w-[84px]"
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          %
        </span>
      </div>
      <p className="text-gray-500 min-w-[160px] font-semibold">
        of the properties
      </p>
    </div>
  ),
  Emission: (
    <div className="flex items-center space-x-2 ">
      <div className="relative">
        <Input
          type="number"
          placeholder="percentage"
          defaultValue="50"
          min="0"
          max="100"
          className="pr-5 max-w-[84px]"
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          %
        </span>
      </div>
      <p className="pl-4 font-semibold text-gray-500">or of</p>
      <Input
        type="number"
        placeholder="percentage"
        defaultValue="50"
        min="0"
        max="100"
        className="max-w-[64px]"
      />{" "}
      <p className="font-semibold text-gray-500">tnCO2</p>
    </div>
  ),
  EmissionIntensity: (
    <div className="flex items-center space-x-2 ">
      <div className="relative">
        <Input
          type="number"
          placeholder="10"
          defaultValue={50}
          min={0}
          max={100}
          className="pr-5 max-w-[84px]"
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          %
        </span>
      </div>
      <p className="pl-4 font-semibold text-gray-500">or of</p>
      <Input
        type="number"
        placeholder="percentage"
        defaultValue="50"
        min="0"
        max="100"
        className="max-w-[64px]"
      />{" "}
      <p className="font-semibold text-gray-500">tnCO2/sqmt</p>
    </div>
  ),
};
export function Target({ setPath }: { setPath: (path: FlowSteps) => void }) {
  const [targetSelected, setTarget] = useState<string | undefined>("EPCmin");
  return (
    <DialogHeader className="h-full">
      <DialogTitle>
        <h1 className="text-3xl">Select your Target</h1>
      </DialogTitle>
      <DialogDescription className="mt-2 h-full flex flex-col justify-between">
        <div className="flex my-8 items-center space-x-4 px-8">
          <p className="text-md text-gray-500 font-semibold">By</p>
          <Input
            type="text"
            placeholder="Year"
            defaultValue="2035"
            className="max-w-[64px]"
            pattern="\d{4}"
            title="Please enter a valid year in the format yyyy"
            min="2024"
            max="2135"
          />
          <p className="text-md text-gray-500 font-semibold">we want to</p>

          <RadioGroup defaultValue="comfortable">
            {TARGETS.map((t) => (
              <div className="flex items-center space-x-2" key={t.value}>
                <RadioGroupItem
                  id={t.value}
                  value={t.value}
                  onClick={() => setTarget(t.value)}
                  checked={targetSelected === t.value}
                />
                <Label
                  className={`text-gray-300 hover:text-gray-700 ${
                    targetSelected === t.value && "text-gray-700"
                  }`}
                  onClick={() => setTarget(t.value)}
                >
                  {t.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {
            TARGET_DETAIL_INPUT[
              targetSelected as keyof typeof TARGET_DETAIL_INPUT
            ]
          }
        </div>
        <div className="flex justify-end gap-4 ">
          <Button
            className="mt-4 w-fit"
            onClick={() => setPath("welcome")}
            variant="secondary"
          >
            Back
          </Button>
          <Button className="mt-4 w-fit" onClick={() => setPath("summary")}>
            Continue
          </Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  );
}
