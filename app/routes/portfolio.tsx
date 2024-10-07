import { useProperties } from "~/hooks/useProperties";
import PortfolioPage from "~/pages/portfolio";

export default function Index() {
  const { properties } = useProperties();

  return (
    <div className="px-4">
      {properties && <PortfolioPage properties={properties} />}
    </div>
  );
}
