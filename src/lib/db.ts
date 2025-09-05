import Dexie, { type EntityTable } from "dexie";

import { problems } from "./problems";

export type Review = {
  id: string;
  problem: number;
  interval: number;
  ease: number;
  due: Date;
  count: number;
};

type Database = Dexie & {
  reviews: EntityTable<Review, "id">;
};

const database = new Dexie("spacedleetcode_db") as Database;

database.version(1).stores({ reviews: "id" });

database.on("ready", async (x) => {
  const db = x as Database; // Purely doing this for type safety.

  return db.reviews.count(async (count) => {
    if (count === problems.length) return;

    console.warn(
      "The number of reviews do not match the number of problems; attempting to add missing reviews.",
    );

    const existing = await db.reviews.toArray();
    const reviews: Review[] = problems
      .filter((p) => !existing.some((r) => r.id === p.slug))
      .map((problem, index) => ({
        id: problem.slug,
        problem: index,
        interval: 1,
        ease: 2.2,
        due: new Date(),
        count: 0,
      }));

    return db.reviews.bulkAdd(reviews);
  });
});

export { database as db };
