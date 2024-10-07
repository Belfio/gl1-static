import { useTargets } from "~/hooks/useTargets";
import DecarboPage from "~/pages/decarbo";

import { authenticator } from "~/services/auth";

export default function Index() {
  const { targets } = useTargets("1");
  return (
    <div className="font-sans px-4">
      <DecarboPage targets={targets} />
    </div>
  );
}
