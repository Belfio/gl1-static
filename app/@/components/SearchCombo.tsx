import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Link } from "@remix-run/react";

export default function SearchCombo<
  T extends { value: string; label: string }
>({
  list,
  placeholder,
  search,
  setSearch,
  className,
  width = "w-[300px]",
}: {
  list: T[];
  placeholder?: string;
  search: string;
  setSearch: (search: string) => void;
  className?: string;
  width?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className, width)}
        >
          {search
            ? list.find((element) => element.value === search)?.label
            : placeholder || "Select..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", width)}>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>Not found</CommandEmpty>
            <CommandGroup>
              {list.map((element) => (
                <button
                  key={element.value}
                  onClick={() => {
                    setSearch(element.value);
                    setOpen(false);
                  }}
                  className="text-left capitalize w-full "
                >
                  <CommandItem
                    className="m-0 px-2"
                    value={element.label}
                    onSelect={(currentValue) => {
                      setSearch(
                        currentValue === search
                          ? ""
                          : list.find(
                              (element) => element.label === currentValue
                            )?.value || ""
                      );
                      setOpen(false);
                    }}
                  >
                    {element.label.toLowerCase()}
                  </CommandItem>
                </button>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
