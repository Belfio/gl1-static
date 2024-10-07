import { Separator } from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { DecarboFlow } from "~/@/components/DecarboFlow";

import { LineChartUI } from "~/@/components/LineChart";
import { Button } from "~/@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/@/components/ui/card";
import { EmissionsTrend } from "~/@/data/data";
import { Target } from "~/@/lib/types";

export default function DecarboPage({ targets }: { targets: Target[] }) {
  const navigate = useNavigate();
  const [isFlowOpen, setIsFlowOpen] = useState(true);
  // if (!targets || targets.length === 0) {
  if (isFlowOpen) {
    return <DecarboFlow setIsFlowOpen={setIsFlowOpen} />;
  }
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Decarbonisation Pathways </h1>
      <p className="text-sm text-gray-500">
        Plan your decarbonisation strategy and get insights on your properties.
      </p>
      <>
        <Card className="mt-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle> Model and progress </CardTitle>
            </div>
            <p className="text-gray-500">
              Create a strategy based on GL1 models to decarbonise your mortgage
              portfolio.
            </p>
          </CardHeader>
          <CardContent className="pl-2 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <LineChartUI className="col-span-4" series={EmissionsTrend} />
            <div className="col-span-3 relative pl-8">
              <div className="absolute ">
                <Button
                  onClick={() => navigate("/dashboard/decarbonisation/start")}
                >
                  Explore new target
                </Button>
              </div>
              <div className="mt-12">
                <p className="text-sm text-gray-500">
                  10% reduction from last year
                </p>
                <p className="text-sm text-gray-500">20% reduction from 2019</p>
                <Separator className="my-4" />
                <p className="text-gray-500 text-sm">
                  65 retrofitting projects started in 2024
                </p>
                <p className="text-gray-500 text-sm">
                  89 retrofitting projects to complete the 2024 target
                </p>
              </div>
              <div className="absolute bottom-8">{}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="my-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle> Priority actions </CardTitle>
            </div>
            <p className="text-gray-500">
              Create a strategy based on GL1 models to decarbonise your mortgage
              portfolio.
            </p>
          </CardHeader>
          <CardContent className="">
            <p className="text-gray-500">
              Create a strategy based on GL1 models to decarbonise your mortgage
              portfolio.
            </p>{" "}
            <p className="text-gray-500">
              Create a strategy based on GL1 models to decarbonise your mortgage
              portfolio.
            </p>{" "}
            <p className="text-gray-500">
              Create a strategy based on GL1 models to decarbonise your mortgage
              portfolio.
            </p>
          </CardContent>
        </Card>
      </>
    </div>
  );
}
