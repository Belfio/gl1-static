import { DataTable } from "~/@/components/DataTable";
import { columns } from "~/@/components/DataTable/columns";
import { MultiBarChartUI } from "~/@/components/MultiBarChart";
import { PieChartUI } from "~/@/components/PieChart";
import { StackBarChartUI } from "~/@/components/StackBarChart";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/@/components/ui/tabs";
import { Emissions, EPCrating, StackDataEmissionsVsEPC } from "~/@/data/data";
import { Property } from "~/@/lib/types";
import { parsePropertyForTable } from "~/@/lib/utils";

export default function PortfolioPage({
  properties,
}: {
  properties: Property[];
}) {
  const propertyTableParsed = parsePropertyForTable(properties);

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Portfolio </h1>
      <p className="text-sm text-gray-500">
        Explore your portfolio and get insights on your properties.
      </p>
      <Tabs defaultValue="Emissions" className="space-y-4 mt-8">
        <TabsList>
          <TabsTrigger value="Emissions">Emissions</TabsTrigger>
          <TabsTrigger value="rating">EPC rating</TabsTrigger>
          <TabsTrigger value="subsidy">Subsidy</TabsTrigger>
          <TabsTrigger value="property">Property Size</TabsTrigger>
        </TabsList>
        <TabsContent value="Emissions" className="space-y-4">
          <h1 className="text-xl">Emissions </h1>
          <div className="flex">
            <PieChartUI className=" w-[400px]" data={Emissions} />
            <StackBarChartUI
              className="mt-8 w-[200px]"
              data={StackDataEmissionsVsEPC}
            />
            <div className="mt-12">
              <h1 className="text-xl">Analysis </h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                eget risus sed dolor ultricies lacinia. Nullam nec nunc
                vestibulum, tincidunt nunc vel, fermentum odio.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="rating" className="space-y-4">
          <h1 className="text-xl">EPC rating </h1>
          <div className="flex">
            <PieChartUI className="mt-8" data={EPCrating} />
            <MultiBarChartUI className="mt-8" />
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-8">
        <p className="text-sm text-gray-500 my-8 max-w-[600px]">
          By clicking on the charts on top, you can filter the properties listed
          below. i.e. you click 60% which represents emissions between 70-90,
          and only the properties in that bracket will be shown below.
        </p>
        <DataTable data={propertyTableParsed} columns={columns} />
      </div>
    </div>
  );
}
