import { config } from "dotenv";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "../schema";

config({ path: [".env", ".env.local"] });

const db = drizzle(process.env.DATABASE_URL!, { schema, casing: "snake_case" });

async function seedBlind75() {
  console.log(`🌱 Seeding the Blind 75 problem collection...`);

  await db.transaction(async (tx) => {
    const [collection] = await tx
      .insert(schema.collectionsTable)
      .values({
        name: "Blind 75",
        description:
          "The Blind 75 is a popular, curated list of 75 coding problems created by Yangshun Tay designed to help developers prepare for technical interviews by covering fundamental data structures and algorithms patterns.",
      })
      .returning()
      .onConflictDoNothing();

    const problems = await tx
      .insert(schema.problemsTable)
      .values([
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
          solution:
            "https://neetcode.io/solutions/product-of-array-except-self",
          difficulty: "Medium",
          topic: "Arrays & Hashing",
        },
        {
          title: "Longest Consecutive Sequence",
          description:
            "Find the maximum length of a streak of consecutive integers that can be formed from the array’s values (order doesn’t matter), using a linear-time approach.",
          url: "https://neetcode.io/problems/longest-consecutive-sequence?list=blind75",
          solution:
            "https://neetcode.io/solutions/longest-consecutive-sequence",
          difficulty: "Medium",
          topic: "Arrays & Hashing",
        },
        {
          title: "Valid Palindrome",
          description: "",
          url: "https://neetcode.io/problems/is-palindrome?list=blind75",
          solution: "https://neetcode.io/solutions/valid-palindrome",
          difficulty: "Easy",
          topic: "Two Pointers",
        },
        {
          title: "3Sum",
          description: "",
          url: "https://neetcode.io/problems/three-integer-sum?list=blind75",
          solution: "https://neetcode.io/solutions/3sum",
          difficulty: "Medium",
          topic: "Two Pointers",
        },
        {
          title: "Container with Most Water",
          description: "",
          url: "https://neetcode.io/problems/max-water-container?list=blind75",
          solution: "https://neetcode.io/solutions/container-with-most-water",
          difficulty: "Medium",
          topic: "Two Pointers",
        },
        {
          title: "Best Time to Buy and Sell Stock",
          description: "",
          url: "https://neetcode.io/problems/buy-and-sell-crypto?list=blind75",
          solution:
            "https://neetcode.io/solutions/best-time-to-buy-and-sell-stock",
          difficulty: "Easy",
          topic: "Sliding Window",
        },
        {
          title: "Longest Substring Without Repeating Characters",
          description: "",
          url: "https://neetcode.io/problems/longest-substring-without-duplicates?list=blind75",
          solution:
            "https://neetcode.io/solutions/longest-substring-without-repeating-characters",
          difficulty: "Medium",
          topic: "Sliding Window",
        },
        {
          title: "Longest Repeating Character Replacement",
          description: "",
          url: "https://neetcode.io/problems/longest-repeating-substring-with-replacement?list=blind75",
          solution:
            "https://neetcode.io/solutions/longest-repeating-character-replacement",
          difficulty: "Medium",
          topic: "Sliding Window",
        },
        {
          title: "Minimum Window Substring",
          description: "",
          url: "https://neetcode.io/problems/minimum-window-with-characters?list=blind75",
          solution: "https://neetcode.io/solutions/minimum-window-substring",
          difficulty: "Hard",
          topic: "Sliding Window",
        },
        {
          title: "Valid Parentheses",
          description: "",
          url: "https://neetcode.io/problems/validate-parentheses?list=blind75",
          solution: "https://neetcode.io/solutions/valid-parentheses",
          difficulty: "Easy",
          topic: "Stack",
        },
        {
          title: "Find Minimum In Rotated Sorted Array",
          description: "",
          url: "https://neetcode.io/problems/find-minimum-in-rotated-sorted-array?list=blind75",
          solution:
            "https://neetcode.io/solutions/find-minimum-in-rotated-sorted-array",
          difficulty: "Medium",
          topic: "Binary Search",
        },
        {
          title: "Search In Rotated Sorted Array",
          description: "",
          url: "https://neetcode.io/problems/find-target-in-rotated-sorted-array?list=blind75",
          solution:
            "https://neetcode.io/solutions/search-in-rotated-sorted-array",
          difficulty: "Medium",
          topic: "Binary Search",
        },
        {
          title: "Reverse Linked List",
          description: "",
          url: "https://neetcode.io/problems/reverse-a-linked-list?list=blind75",
          solution: "https://neetcode.io/solutions/reverse-linked-list",
          difficulty: "Easy",
          topic: "Linked List",
        },
        {
          title: "Merge Two Sorted Lists",
          description: "",
          url: "https://neetcode.io/problems/merge-two-sorted-linked-lists?list=blind75",
          solution: "https://neetcode.io/solutions/merge-two-sorted-lists",
          difficulty: "Easy",
          topic: "Linked List",
        },
        {
          title: "Linked List Cycle",
          description: "",
          url: "https://neetcode.io/problems/linked-list-cycle-detection?list=blind75",
          solution: "https://neetcode.io/solutions/linked-list-cycle",
          difficulty: "Easy",
          topic: "Linked List",
        },
        {
          title: "Reorder List",
          description: "",
          url: "https://neetcode.io/problems/reorder-linked-list?list=blind75",
          solution: "https://neetcode.io/solutions/reorder-list",
          difficulty: "Medium",
          topic: "Linked List",
        },
        {
          title: "Remove Nth Node From End of List",
          description: "",
          url: "https://neetcode.io/problems/remove-node-from-end-of-linked-list?list=blind75",
          solution:
            "https://neetcode.io/solutions/remove-nth-node-from-end-of-list",
          difficulty: "Medium",
          topic: "Linked List",
        },
        {
          title: "Merge K Sorted Lists",
          description: "",
          url: "https://neetcode.io/problems/merge-k-sorted-linked-lists?list=blind75",
          solution: "https://neetcode.io/solutions/merge-k-sorted-lists",
          difficulty: "Hard",
          topic: "Linked List",
        },
        {
          title: "Invert Binary Tree",
          description: "",
          url: "https://neetcode.io/problems/invert-a-binary-tree?list=blind75",
          solution: "https://neetcode.io/solutions/invert-binary-tree",
          difficulty: "Easy",
          topic: "Trees",
        },
        {
          title: "Maximum Depth of Binary Tree",
          description: "",
          url: "https://neetcode.io/problems/depth-of-binary-tree?list=blind75",
          solution:
            "https://neetcode.io/solutions/maximum-depth-of-binary-tree",
          difficulty: "Easy",
          topic: "Trees",
        },
        {
          title: "Same Tree",
          description: "",
          url: "https://neetcode.io/problems/same-binary-tree?list=blind75",
          solution: "https://neetcode.io/solutions/same-tree",
          difficulty: "Easy",
          topic: "Trees",
        },
        {
          title: "Subtree of Another Tree",
          description: "",
          url: "https://neetcode.io/problems/subtree-of-a-binary-tree?list=blind75",
          solution: "https://neetcode.io/solutions/subtree-of-another-tree",
          difficulty: "Easy",
          topic: "Trees",
        },
        {
          title: "Lowest Common Ancestor of a Binary Search Tree",
          description: "",
          url: "https://neetcode.io/problems/lowest-common-ancestor-in-binary-search-tree?list=blind75",
          solution:
            "https://neetcode.io/solutions/lowest-common-ancestor-of-a-binary-search-tree",
          difficulty: "Medium",
          topic: "Trees",
        },
        {
          title: "Binary Tree Level Order Traversal",
          description: "",
          url: "https://neetcode.io/problems/level-order-traversal-of-binary-tree?list=blind75",
          solution:
            "https://neetcode.io/solutions/binary-tree-level-order-traversal",
          difficulty: "Medium",
          topic: "Trees",
        },
        {
          title: "Validate Binary Search Tree",
          description: "",
          url: "https://neetcode.io/problems/valid-binary-search-tree?list=blind75",
          solution: "https://neetcode.io/solutions/validate-binary-search-tree",
          difficulty: "Medium",
          topic: "Trees",
        },
        {
          title: "Kth Smallest Element In a Bst",
          description: "",
          url: "https://neetcode.io/problems/kth-smallest-integer-in-bst?list=blind75",
          solution:
            "https://neetcode.io/solutions/kth-smallest-element-in-a-bst",
          difficulty: "Medium",
          topic: "Trees",
        },
        {
          title: "Construct Binary Tree From Preorder And Inorder Traversal",
          description: "",
          url: "https://neetcode.io/problems/binary-tree-from-preorder-and-inorder-traversal?list=blind75",
          solution:
            "https://neetcode.io/solutions/construct-binary-tree-from-preorder-and-inorder-traversal",
          difficulty: "Medium",
          topic: "Trees",
        },
        {
          title: "Binary Tree Maximum Path Sum",
          description: "",
          url: "https://neetcode.io/problems/binary-tree-maximum-path-sum?list=blind75",
          solution:
            "https://neetcode.io/solutions/binary-tree-maximum-path-sum",
          difficulty: "Hard",
          topic: "Trees",
        },
        {
          title: "Serialize And Deserialize Binary Tree",
          description: "",
          url: "https://neetcode.io/problems/serialize-and-deserialize-binary-tree?list=blind75",
          solution:
            "https://neetcode.io/solutions/serialize-and-deserialize-binary-tree",
          difficulty: "Hard",
          topic: "Trees",
        },
        {
          title: "Find Median From Data Stream",
          description: "",
          url: "https://neetcode.io/problems/find-median-in-a-data-stream?list=blind75",
          solution:
            "https://neetcode.io/solutions/find-median-from-data-stream",
          difficulty: "Hard",
          topic: "Heap / Priority Queue",
        },
        {
          title: "Combination Sum",
          description: "",
          url: "https://neetcode.io/problems/combination-target-sum?list=blind75",
          solution: "https://neetcode.io/solutions/combination-sum",
          difficulty: "Medium",
          topic: "Backtracking",
        },
        {
          title: "Word Search",
          description: "",
          url: "https://neetcode.io/problems/search-for-word?list=blind75",
          solution: "https://neetcode.io/solutions/word-search",
          difficulty: "Medium",
          topic: "Backtracking",
        },
        {
          title: "Implement Trie Prefix Tree",
          description: "",
          url: "https://neetcode.io/problems/implement-prefix-tree?list=blind75",
          solution: "https://neetcode.io/solutions/implement-trie-prefix-tree",
          difficulty: "Medium",
          topic: "Tries",
        },
        {
          title: "Design Add And Search Words Data Structure",
          description: "",
          url: "https://neetcode.io/problems/design-word-search-data-structure?list=blind75",
          solution:
            "https://neetcode.io/solutions/design-add-and-search-words-data-structure",
          difficulty: "Medium",
          topic: "Tries",
        },
        {
          title: "Word Search II",
          description: "",
          url: "https://neetcode.io/problems/search-for-word-ii?list=blind75",
          solution: "https://neetcode.io/solutions/word-search-ii",
          difficulty: "Hard",
          topic: "Tries",
        },
        {
          title: "Number of Islands",
          description: "",
          url: "https://neetcode.io/problems/count-number-of-islands?list=blind75",
          solution: "https://neetcode.io/solutions/number-of-islands",
          difficulty: "Medium",
          topic: "Graphs",
        },
        {
          title: "Clone Graph",
          description: "",
          url: "https://neetcode.io/problems/clone-graph?list=blind75",
          solution: "https://neetcode.io/solutions/clone-graph",
          difficulty: "Medium",
          topic: "Graphs",
        },
        {
          title: "Pacific Atlantic Water Flow",
          description: "",
          url: "https://neetcode.io/problems/pacific-atlantic-water-flow?list=blind75",
          solution: "https://neetcode.io/solutions/pacific-atlantic-water-flow",
          difficulty: "Medium",
          topic: "Graphs",
        },
        {
          title: "Course Schedule",
          description: "",
          url: "https://neetcode.io/problems/course-schedule?list=blind75",
          solution: "https://neetcode.io/solutions/course-schedule",
          difficulty: "Medium",
          topic: "Graphs",
        },
        {
          title: "Graph Valid Tree",
          description: "",
          url: "https://neetcode.io/problems/valid-tree?list=blind75",
          solution: "https://neetcode.io/solutions/graph-valid-tree",
          difficulty: "Medium",
          topic: "Graphs",
        },
        {
          title: "Number of Connected Components In An Undirected Graph",
          description: "",
          url: "https://neetcode.io/problems/count-connected-components?list=blind75",
          solution:
            "https://neetcode.io/solutions/number-of-connected-components-in-an-undirected-graph",
          difficulty: "Medium",
          topic: "Graphs",
        },
        {
          title: "Alien Dictionary",
          description: "",
          url: "https://neetcode.io/problems/foreign-dictionary?list=blind75",
          solution: "https://neetcode.io/solutions/alien-dictionary",
          difficulty: "Hard",
          topic: "Advanced Graphs",
        },
        {
          title: "Climbing Stairs",
          description: "",
          url: "https://neetcode.io/problems/climbing-stairs?list=blind75",
          solution: "https://neetcode.io/solutions/climbing-stairs",
          difficulty: "Easy",
          topic: "1-D Dynamic Programming",
        },
        {
          title: "House Robber",
          description: "",
          url: "https://neetcode.io/problems/house-robber?list=blind75",
          solution: "https://neetcode.io/solutions/house-robber",
          difficulty: "Medium",
          topic: "1-D Dynamic Programming",
        },
        {
          title: "House Robber II",
          description: "",
          url: "https://neetcode.io/problems/house-robber-ii?list=blind75",
          solution: "https://neetcode.io/solutions/house-robber-ii",
          difficulty: "Medium",
          topic: "1-D Dynamic Programming",
        },
        {
          title: "Longest Palindromic Substring",
          description: "",
          url: "https://neetcode.io/problems/longest-palindromic-substring?list=blind75",
          solution:
            "https://neetcode.io/solutions/longest-palindromic-substring",
          difficulty: "Medium",
          topic: "1-D Dynamic Programming",
        },
        {
          title: "Palindromic Substrings",
          description: "",
          url: "https://neetcode.io/problems/palindromic-substrings?list=blind75",
          solution: "https://neetcode.io/solutions/palindromic-substrings",
          difficulty: "Medium",
          topic: "1-D Dynamic Programming",
        },
        {
          title: "Decode Ways",
          description: "",
          url: "https://neetcode.io/problems/decode-ways?list=blind75",
          solution: "https://neetcode.io/solutions/decode-ways",
          difficulty: "Medium",
          topic: "1-D Dynamic Programming",
        },
        {
          title: "Coin Change",
          description: "",
          url: "https://neetcode.io/problems/coin-change?list=blind75",
          solution: "https://neetcode.io/solutions/coin-change",
          difficulty: "Medium",
          topic: "1-D Dynamic Programming",
        },
        {
          title: "Maximum Product Subarray",
          description: "",
          url: "https://neetcode.io/problems/maximum-product-subarray?list=blind75",
          solution: "https://neetcode.io/solutions/maximum-product-subarray",
          difficulty: "Medium",
          topic: "1-D Dynamic Programming",
        },
        {
          title: "Word Break",
          description: "",
          url: "https://neetcode.io/problems/word-break?list=blind75",
          solution: "https://neetcode.io/solutions/word-break",
          difficulty: "Medium",
          topic: "1-D Dynamic Programming",
        },
        {
          title: "Longest Increasing Subsequence",
          description: "",
          url: "https://neetcode.io/problems/longest-increasing-subsequence?list=blind75",
          solution:
            "https://neetcode.io/solutions/longest-increasing-subsequence",
          difficulty: "Medium",
          topic: "1-D Dynamic Programming",
        },
        {
          title: "Unique Paths",
          description: "",
          url: "https://neetcode.io/problems/count-paths?list=blind75",
          solution: "https://neetcode.io/solutions/unique-paths",
          difficulty: "Medium",
          topic: "2-D Dynamic Programming",
        },
        {
          title: "Longest Common Subsequence",
          description: "",
          url: "https://neetcode.io/problems/longest-common-subsequence?list=blind75",
          solution: "https://neetcode.io/solutions/longest-common-subsequence",
          difficulty: "Medium",
          topic: "2-D Dynamic Programming",
        },
        {
          title: "Maximum Subarray",
          description: "",
          url: "https://neetcode.io/problems/maximum-subarray?list=blind75",
          solution: "https://neetcode.io/solutions/maximum-subarray",
          difficulty: "Medium",
          topic: "Greedy",
        },
        {
          title: "Jump Game",
          description: "",
          url: "https://neetcode.io/problems/jump-game?list=blind75",
          solution: "https://neetcode.io/solutions/jump-game",
          difficulty: "Medium",
          topic: "Greedy",
        },
        {
          title: "Insert Interval",
          description: "",
          url: "https://neetcode.io/problems/insert-new-interval?list=blind75",
          solution: "https://neetcode.io/solutions/insert-interval",
          difficulty: "Medium",
          topic: "Intervals",
        },
        {
          title: "Merge Intervals",
          description: "",
          url: "https://neetcode.io/problems/merge-intervals?list=blind75",
          solution: "https://neetcode.io/solutions/merge-intervals",
          difficulty: "Medium",
          topic: "Intervals",
        },
        {
          title: "Non Overlapping Intervals",
          description: "",
          url: "https://neetcode.io/problems/non-overlapping-intervals?list=blind75",
          solution: "https://neetcode.io/solutions/non-overlapping-intervals",
          difficulty: "Medium",
          topic: "Intervals",
        },
        {
          title: "Meeting Rooms",
          description: "",
          url: "https://neetcode.io/problems/meeting-schedule?list=blind75",
          solution: "https://neetcode.io/solutions/meeting-rooms",
          difficulty: "Easy",
          topic: "Intervals",
        },
        {
          title: "Meeting Rooms II",
          description: "",
          url: "https://neetcode.io/problems/meeting-schedule-ii?list=blind75",
          solution: "https://neetcode.io/solutions/meeting-rooms-ii",
          difficulty: "Medium",
          topic: "Intervals",
        },
        {
          title: "Rotate Image",
          description: "",
          url: "https://neetcode.io/problems/rotate-matrix?list=blind75",
          solution: "https://neetcode.io/solutions/rotate-image",
          difficulty: "Medium",
          topic: "Math & Geometry",
        },
        {
          title: "Spiral Matrix",
          description: "",
          url: "https://neetcode.io/problems/spiral-matrix?list=blind75",
          solution: "https://neetcode.io/solutions/spiral-matrix",
          difficulty: "Medium",
          topic: "Math & Geometry",
        },
        {
          title: "Set Matrix Zeroes",
          description: "",
          url: "https://neetcode.io/problems/set-zeroes-in-matrix?list=blind75",
          solution: "https://neetcode.io/solutions/set-matrix-zeroes",
          difficulty: "Medium",
          topic: "Math & Geometry",
        },
        {
          title: "Number of 1 Bits",
          description: "",
          url: "https://neetcode.io/problems/number-of-one-bits?list=blind75",
          solution: "https://neetcode.io/solutions/number-of-1-bits",
          difficulty: "Easy",
          topic: "Bit Manipulation",
        },
        {
          title: "Counting Bits",
          description: "",
          url: "https://neetcode.io/problems/counting-bits?list=blind75",
          solution: "https://neetcode.io/solutions/counting-bits",
          difficulty: "Easy",
          topic: "Bit Manipulation",
        },
        {
          title: "Reverse Bits",
          description: "",
          url: "https://neetcode.io/problems/reverse-bits?list=blind75",
          solution: "https://neetcode.io/solutions/reverse-bits",
          difficulty: "Easy",
          topic: "Bit Manipulation",
        },
        {
          title: "Missing Number",
          description: "",
          url: "https://neetcode.io/problems/missing-number?list=blind75",
          solution: "https://neetcode.io/solutions/missing-number",
          difficulty: "Easy",
          topic: "Bit Manipulation",
        },
        {
          title: "Sum of Two Integers",
          description: "",
          url: "https://neetcode.io/problems/sum-of-two-integers?list=blind75",
          solution: "https://neetcode.io/solutions/sum-of-two-integers",
          difficulty: "Easy",
          topic: "Bit Manipulation",
        },
      ])
      .returning()
      .onConflictDoNothing();

    const relations: InferInsertModel<typeof schema.collectionProblemsTable>[] =
      problems.map((problem) => ({
        collectionId: collection!.id,
        problemId: problem.id,
      }));

    await tx
      .insert(schema.collectionProblemsTable)
      .values(relations)
      .onConflictDoNothing();
  });
}

async function main() {
  console.log("⏳ Started database seed script...");

  try {
    await seedBlind75();
  } catch (error) {
    console.error("❌ Error occurred during seeding:", error);
    process.exit(1);
  }

  console.log("✅ Seeding complete!");
  process.exit(0);
}

main();
