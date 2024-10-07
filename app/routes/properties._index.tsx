import { Await } from "@remix-run/react";
import { PropertyData } from "~/@/lib/types";
import PropertiesPage from "~/pages/properties";

import { Suspense } from "react";
import { useProperties } from "~/hooks/useProperties";

export default function Index() {
  const { properties } = useProperties();
  return (
    <div className="px-4">
      <Suspense
        fallback={
          <>
            <PropertiesPage properties={[]} />
          </>
        }
      >
        <Await resolve={properties}>
          {(properties) => <PropertiesPage properties={properties} />}
        </Await>
      </Suspense>
    </div>
  );
}
