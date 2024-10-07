import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./dataTableColumnHeader";
import {
  // labels,
  // priorities,
  // statuses,
  PropertyTableColumnsType,
} from "~/@/data/tableData";
// import { Badge } from "../ui/badge";
import { DataTableRowActions } from "./dataTableRowActions";
// import { Checkbox } from "../ui/checkbox";
import { Link } from "@remix-run/react";

export const columns: ColumnDef<PropertyTableColumnsType>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Ref number" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-[80px] underline">
  //       <Link to={`/dashboard/properties/${row.getValue("id")}`}>
  //         {row.getValue("id")}
  //       </Link>
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "postcode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Postcode" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("postcode")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Link to={`/properties/${row.getValue("id")}`}>
            <span className="max-w-[500px] truncate font-medium underline capitalize">
              {row.getValue("address")}
            </span>{" "}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => <div className="w-0 display-none"></div>,
    cell: ({ row }) => <div className="w-0 display-none"></div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "epc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EPC" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("epc")}</div>,

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "emission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emission" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue("emission")}</div>
    ),

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "emissionIntensity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emission Intensity" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue("emissionIntensity")}</div>
    ),

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
