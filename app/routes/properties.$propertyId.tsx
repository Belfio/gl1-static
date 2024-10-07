import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Property } from "~/@/lib/types";
import { useProperties } from "~/hooks/useProperties";

import PropertyPage from "~/pages/property";

export default function Index() {
  const [prop, setProp] = useState<Property | null>(null);
  const { properties } = useProperties();
  const pathParams = useParams();

  useEffect(() => {
    const propertyId = pathParams.propertyId;
    console.log("propertyId", propertyId);
    console.log("properties", properties);
    const property = properties.find((p: Property) => p.id === propertyId);
    console.log("property", property);
    if (!property) {
      console.error("Property not found");
      return;
    }
    setProp(property);
  }, [pathParams.propertyId, properties]);
  return prop ? <PropertyPage property={prop} /> : <div>Loading...</div>;
}
