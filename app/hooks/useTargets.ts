import { useEffect, useState } from "react";
import db from "~/@/lib/db";
import { Target } from "~/@/lib/types";

const fetchTargets = async (userId: string) => {
  const targets = await db.target.getAll(userId);
  return targets;
};
export function useTargets(userId: string): {
  targets: Target[] | [];
  setTargets: (targets: Target[]) => void;
} {
  const [targets, setTargets] = useState<Target[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTargets(userId);
      setTargets(data);
    }

    fetchData();
  }, []);

  return { targets, setTargets };
}
