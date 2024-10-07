import { useContext } from "react";
import OverviewPage from "~/pages/overview";
import { UserContext } from "~/providers/userContext";
import { useProperties } from "~/hooks/useProperties";

export default function Index() {
  const { propertyOverview } = useProperties();
  const { setUser } = useContext(UserContext);

  return (
    <div className="font-sans p-4">
      {propertyOverview && <OverviewPage propertyOverview={propertyOverview} />}
    </div>
  );
}
