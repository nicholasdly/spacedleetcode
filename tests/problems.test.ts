import { expect, it } from "vitest";

import { difficulties, problems, topics } from "../src/lib/problems";

it("should have correct difficulty ordering", () => {
  expect(difficulties["Easy"]).toBe(0);
  expect(difficulties["Medium"]).toBe(1);
  expect(difficulties["Hard"]).toBe(2);
});

it("should have correct topic ordering", () => {
  expect(topics["Arrays & Hashing"]).toBe(0);
  expect(topics["Two Pointers"]).toBe(1);
  expect(topics["Sliding Window"]).toBe(2);
  expect(topics["Stack"]).toBe(3);
  expect(topics["Binary Search"]).toBe(4);
  expect(topics["Linked List"]).toBe(5);
  expect(topics["Trees"]).toBe(6);
  expect(topics["Heap / Priority Queue"]).toBe(7);
  expect(topics["Backtracking"]).toBe(8);
  expect(topics["Tries"]).toBe(9);
  expect(topics["Graphs"]).toBe(10);
  expect(topics["Advanced Graphs"]).toBe(11);
  expect(topics["1-D Dynamic Programming"]).toBe(12);
  expect(topics["2-D Dynamic Programming"]).toBe(13);
  expect(topics["Greedy"]).toBe(14);
  expect(topics["Intervals"]).toBe(15);
  expect(topics["Math & Geometry"]).toBe(16);
  expect(topics["Bit Manipulation"]).toBe(17);
});

it("should have correct number of problems", () => {
  expect(problems.length).toBe(75);
});
