import { Button } from "~/@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FlowSteps } from ".";
import Top from "@/assets/images/topView.jpg";
export function Welcome({ setPath }: { setPath: (path: FlowSteps) => void }) {
  return (
    <DialogHeader className="h-full">
      <DialogTitle className="relative z-10">
        <h1 className="text-3xl">Welcome to GL1 Decarbonisation</h1>
        <p className="text-sm text-gray-500">
          GL1 Decarbonisation is a tool that helps you plan your decarbonisation
          strategy and get insights on your properties.
        </p>
      </DialogTitle>
      <DialogDescription className=" z-10 mt-2 h-full flex flex-col justify-between">
        <div className="flex items-center space-x-12 m-auto">
          <div className="">
            <h3 className="text-lg mt-4">1 - Select the regions</h3>
            <p className="text-sm text-gray-500">
              We will use this information to get the properties in the selected
              regions.
            </p>
            <h3 className="text-lg mt-4">2 - Select the properties</h3>
            <p className="text-sm text-gray-500">
              We will use this information to get the properties in the selected
              regions.
            </p>
            <h3 className="text-lg mt-4">3 - Select the properties</h3>
            <p className="text-sm text-gray-500">
              We will use this information to get the properties in the selected
              regions.
            </p>
          </div>
          <img src={Top} alt="Building" className="w-[280px]" />
        </div>
        <div className="flex justify-end mt-4">
          <Button className="mt-4 w-fit" onClick={() => setPath("region")}>
            Get started
          </Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  );
}
