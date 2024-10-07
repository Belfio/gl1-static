import { Link } from "@remix-run/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChartUI } from "./LineChart";
import { EmissionsTrend } from "~/@/data/data";
import { Separator } from "./ui/separator";
import { BarChartUI } from "./BarChart";

export default function MainKpi({ className }: { className?: string }) {
  return (
    <div className={`pt-4 flex w-fit m-auto ${className}`}>
      <Card className="w-[900px] h-[580px]  bg-white ">
        <CardHeader>
          <CardTitle className="font-semibold">
            Absolute Emissions Forecast
          </CardTitle>
          <p className="text-sm text-gray-500">
            Projected CO2 emissions trend vs. reduction target
          </p>
        </CardHeader>
        <CardContent className="pl-2 grid gap-4 md:grid-cols-2 ">
          <LineChartUI className="col-span-4 px-6" series={EmissionsTrend} />
        </CardContent>
      </Card>
      <div className="w-1/4 min-w-[364px] ml-4 bg-white">
        <Card className="h-[580px]  bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg ">Monthly result</CardTitle>
          </CardHeader>
          <CardContent className="pl-2 ">
            <div className="mx-4 ">
              <div className="flex items-end">
                <h1 className="text-8xl font-bold">-10</h1>
                <p className="text-sm text-gray-500 font-normal pb-3 pl-2">
                  kgC02 /sq mt / year <br />
                  on 350 properties
                </p>
              </div>
              <Separator className="my-8" />
              <div className="bottom-8 flex justify-start gap-4 items-center">
                <h1 className="text-lg font-semibold">Annual target gap</h1>
                <Link to="/dashboard/decarbonisation">
                  <Button>Review targets</Button>
                </Link>
              </div>
              <div className="my-0">
                <BarChartUI
                  yHide={true}
                  height={260}
                  width={240}
                  className="mx-auto mt-4"
                  data={[
                    {
                      name: "Completed",
                      total: [0, 34],
                    },
                    {
                      name: "Pending",
                      total: [34, 76],
                    },
                    {
                      name: "Total",
                      total: [0, 76],
                    },
                  ]}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
