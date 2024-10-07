import MainKpi from "~/@/components/MainKpi";

import Tile from "~/@/components/Tiles";
import { OverviewPropertiesType } from "~/@/lib/types";

export default function OverviewPage({
  propertyOverview,
}: {
  propertyOverview: OverviewPropertiesType;
}) {
  return (
    <div className="font-sans p-4">
      {/* <h1 className="text-3xl">Overview </h1> */}

      <div className="mt-0 ">
        <MainKpi />
        <div className="flex justify-center gap-8 mt-8">
          <Tile
            title="Number of properties"
            value={String(propertyOverview.numberProperties)}
            description="Leicester"
            // variant="ghost"
          />
          <Tile
            title="Total mortgage value"
            value="£ 1.2B"
            description="Leicester"
          />
          <Tile
            title="Average emissions/property"
            value={String(
              propertyOverview.averageCO2EmissionPerSqMt.toFixed(2)
            )}
            description="tonneC02 /sq mt / year"
            // variant="ghost"
          />
          <Tile
            title="EPC rating"
            value={`${(
              (propertyOverview.numberOfPropertiesEPCCOrHigher /
                propertyOverview.numberProperties) *
              100
            ).toFixed(2)}%`}
            description={`${propertyOverview.numberOfPropertiesEPCCOrHigher}  properties with EPC C or higher`}
            // variant="ghost"
          />
        </div>
      </div>
    </div>
  );
}
