import { Link } from "@remix-run/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { EPCrating, StackDataEmissionsVsEPC } from "~/@/data/data";
import { PieChartUI } from "./PieChart";
import { StackBarChartUI } from "./StackBarChart";

export default function PortfolioOverviwew() {
  return (
    <div className="pt-4">
      <Card className="">
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
          <p className="text-sm text-gray-500">
            Projected CO2 emissions trend vs. reduction target
          </p>
        </CardHeader>
        <CardContent className="pl-2 flex w-full">
          <PieChartUI data={EPCrating} minWidth={300} radius={160} />
          <div className="w-full">
            <h2 className="text-xl font-bold ml-[78px]">
              Emissions vs EPC rating
            </h2>
            <StackBarChartUI data={StackDataEmissionsVsEPC} />
            <div className="text-right">
              <Link to="/dashboard/portfolio">
                <Button>Review portfolio</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
