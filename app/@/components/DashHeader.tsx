import { User } from "../lib/types";
import { UserNav } from "./UserNav";

export default function DashHeader({ user }: { user: User | null }) {
  return (
    <header className=" w-full py-0">
      <div className="flex items-center justify-between h-auto pt-4 px-4 pr-8">
        <div className="ml-auto flex items-center space-x-4">
          <UserNav user={user} />
        </div>
      </div>
    </header>
  );
}
