import { config } from "dotenv";
import { InferInsertModel, getTableName } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "../schema";

config({ path: [".env", ".env.local"] });

const db = drizzle(process.env.DATABASE_URL!, {
  schema,
  casing: "snake_case",
});

async function seedProblems() {
  console.log(`🌱 Seeding "${getTableName(schema.problemsTable)}" table...`);

  const problems: InferInsertModel<typeof schema.problemsTable>[] = [
    {
      title: "Contains Duplicate",
      description:
        "Determine whether the array contains any duplicate values and return true if it does, false if all values are unique.",
      url: "https://neetcode.io/problems/duplicate-integer?list=blind75",
      solution: "https://neetcode.io/solutions/contains-duplicate",
      difficulty: "Easy",
      topic: "Arrays & Hashing",
    },
    {
      title: "Valid Anagram",
      description:
        "Check whether the two strings contain exactly the same characters with the same frequencies, regardless of order, and return true or false accordingly.",
      url: "https://neetcode.io/problems/is-anagram?list=blind75",
      solution: "https://neetcode.io/solutions/valid-anagram",
      difficulty: "Easy",
      topic: "Arrays & Hashing",
    },
    {
      title: "Two Sum",
      description:
        "Find two distinct numbers in the array that add up to the target and return their indices, with the smaller index first.",
      url: "https://neetcode.io/problems/two-integer-sum?list=blind75",
      solution: "https://neetcode.io/solutions/two-sum",
      difficulty: "Easy",
      topic: "Arrays & Hashing",
    },
    {
      title: "Group Anagrams",
      description:
        "Group the strings into lists where each list contains words that are anagrams of each other, and return all such groups.",
      url: "https://neetcode.io/problems/anagram-groups?list=blind75",
      solution: "https://neetcode.io/solutions/group-anagrams",
      difficulty: "Medium",
      topic: "Arrays & Hashing",
    },
    {
      title: "Top K Frequent Elements",
      description:
        "Return the top K numbers that appear most often in the list; you may output them in any order.",
      url: "https://neetcode.io/problems/top-k-elements-in-list?list=blind75",
      solution: "https://neetcode.io/solutions/top-k-frequent-elements",
      difficulty: "Medium",
      topic: "Arrays & Hashing",
    },
    {
      title: "Encode and Decode Strings",
      description:
        "Create a method to convert a list of strings into a single string representation and another method to reconstruct the original list from that encoded string.",
      url: "https://neetcode.io/problems/string-encode-and-decode?list=blind75",
      solution: "https://neetcode.io/solutions/encode-and-decode-strings",
      difficulty: "Medium",
      topic: "Arrays & Hashing",
    },
    {
      title: "Product of Array Except Self",
      description:
        "Return a new array where each element is the product of all other elements except itself, ideally computed in linear time without using division.",
      url: "https://neetcode.io/problems/products-of-array-discluding-self?list=blind75",
      solution: "https://neetcode.io/solutions/product-of-array-except-self",
      difficulty: "Medium",
      topic: "Arrays & Hashing",
    },
    {
      title: "Longest Consecutive Sequence",
      description:
        "Find the maximum length of a streak of consecutive integers that can be formed from the array’s values (order doesn’t matter), using a linear-time approach.",
      url: "https://neetcode.io/problems/longest-consecutive-sequence?list=blind75",
      solution: "https://neetcode.io/solutions/longest-consecutive-sequence",
      difficulty: "Medium",
      topic: "Arrays & Hashing",
    },
  ];

  await db.insert(schema.problemsTable).values(problems).onConflictDoNothing();
}

async function main() {
  console.log("⏳ Started database seed script...");

  try {
    await seedProblems();
  } catch (error) {
    console.error("❌ Error occurred during seeding:", error);
  }

  console.log("✅ Seeding complete!");
  process.exit();
}

main();
