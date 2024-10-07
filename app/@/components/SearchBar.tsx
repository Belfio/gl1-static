import { Input } from "./ui/input";
import { Search } from "lucide-react";
export function SearchBar({
  className,
  width,
  setSearch,
  search,
  placeholder,
}: {
  className?: string;
  width?: string;
  setSearch: (search: string) => void;
  search: string;
  placeholder?: string;
}) {
  return (
    <div className={`${className} flex items-center gap-2`}>
      <Search />
      <Input
        type="search"
        placeholder={placeholder || "Search..."}
        className={`md:w-[100px] lg:w-[300px] ${width}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
