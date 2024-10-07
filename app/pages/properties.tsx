import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { DataTable } from "~/@/components/DataTable";
import { columns } from "~/@/components/DataTable/columns";
import SearchCombo from "~/@/components/SearchCombo";
import { Property, PropertyData } from "~/@/lib/types";
import { parsePropertyForTable } from "~/@/lib/utils";

export default function PropertiesPage({
  properties,
}: {
  properties: Property[] | undefined;
}) {
  const [search, setSearch] = useState("");
  const propertyTableParsed = parsePropertyForTable(properties);
  const navigate = useNavigate();
  const handleSearch = (search: string) => {
    setSearch(search);
    navigate(`/properties/${search}`);
  };
  console.log(propertyTableParsed);
  return (
    <div className="font-sans p-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl">Properties</h1>
          <p className="text-gray-500 text-sm">
            Search and filter through the properties.
          </p>
        </div>
        <div>
          <SearchCombo
            list={propertyTableParsed.map((property) => ({
              value: property.id,
              label: property.address,
            }))}
            search={search}
            setSearch={handleSearch}
            placeholder="Search properties"
          />
        </div>
      </div>
      <div className="mt-8">
        <DataTable data={propertyTableParsed} columns={columns} />
      </div>
    </div>
  );
}
