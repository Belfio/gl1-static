import { Button } from "~/@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FlowSteps } from ".";

export function Summary({ setPath }: { setPath: (path: FlowSteps) => void }) {
  return (
    <DialogHeader className="h-full">
      <DialogTitle>
        <h1 className="text-3xl">Summary</h1>
      </DialogTitle>
      <DialogDescription className="mt-2 h-full flex flex-col justify-between">
        <p className="text-sm text-gray-500">
          Review your decarbonisation pathway. Click &quot;Back&quot; to modify
          or &quot;Confirm&quot; to make your decarbonisation pathway active.
        </p>
        <div className="justify-end flex items-center gap-4 ">
          <Button
            className="mt-4 w-fit"
            onClick={() => setPath("welcome")}
            variant="secondary"
          >
            Back
          </Button>
          <Button className="mt-4 w-fit" onClick={() => setPath("end")}>
            Confirm
          </Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  );
}
