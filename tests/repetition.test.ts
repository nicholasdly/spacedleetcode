import { describe, expect, it } from "vitest";

import {
  type Rating,
  calculateDueDate,
  calculateNewEase,
  calculateNewInterval,
} from "../src/lib/repetition";

describe("calculateNewEase", () => {
  it("should decrease ease when rated again", () => {
    const ease: number = 2.2;
    const rating: Rating = "again";

    const result = calculateNewEase(ease, rating);

    expect(result).toBe(ease - 0.2);
  });

  it("should decrease ease when rated hard", () => {
    const ease: number = 2.2;
    const rating: Rating = "hard";

    const result = calculateNewEase(ease, rating);

    expect(result).toBe(ease - 0.15);
  });

  it("should maintain ease when rated good", () => {
    const ease: number = 2.2;
    const rating: Rating = "good";

    const result = calculateNewEase(ease, rating);

    expect(result).toBe(ease);
  });

  it("should increase ease when rated easy", () => {
    const ease: number = 2.2;
    const rating: Rating = "easy";

    const result = calculateNewEase(ease, rating);

    expect(result).toBe(ease + 0.15);
  });

  it("should not decrease ease below minimum", () => {
    const ease: number = 1.3;
    const rating: Rating = "again";

    const result = calculateNewEase(ease, rating);

    expect(result).toBe(1.3);
  });

  it("should not increase ease above maximum", () => {
    const ease: number = 3.0;
    const rating: Rating = "easy";

    const result = calculateNewEase(ease, rating);

    expect(result).toBe(3.0);
  });
});

describe("calculateNewInterval", () => {
  it("should reset interval when rated again", () => {
    const interval: number = 2;
    const ease: number = 2.2;
    const rating: Rating = "again";

    const result = calculateNewInterval(interval, ease, rating);

    expect(result).toBe(1);
  });

  it("should increase interval when rated hard", () => {
    const interval: number = 2;
    const ease: number = 2.2;
    const rating: Rating = "hard";

    const result = calculateNewInterval(interval, ease, rating);

    expect(result).toBe(2.4);
  });

  it("should increase interval when rated good", () => {
    const interval: number = 2;
    const ease: number = 2.2;
    const rating: Rating = "good";

    const result = calculateNewInterval(interval, ease, rating);

    expect(result).toBe(4.4);
  });

  it("should increase interval when rated easy", () => {
    const interval: number = 2;
    const ease: number = 2.2;
    const rating: Rating = "easy";

    const result = calculateNewInterval(interval, ease, rating);

    expect(result).toBe(5.28);
  });

  it("should not increase interval above 14 when rated hard", () => {
    const interval: number = 14;
    const ease: number = 2.2;
    const rating: Rating = "hard";

    const result = calculateNewInterval(interval, ease, rating);

    expect(result).toBe(14);
  });

  it("should not increase interval above 30 when rated good", () => {
    const interval: number = 30;
    const ease: number = 2.2;
    const rating: Rating = "good";

    const result = calculateNewInterval(interval, ease, rating);

    expect(result).toBe(30);
  });

  it("should not increase interval above 90 when rated easy", () => {
    const interval: number = 90;
    const ease: number = 2.2;
    const rating: Rating = "easy";

    const result = calculateNewInterval(interval, ease, rating);

    expect(result).toBe(90);
  });

  it("should not decrease interval below 1", () => {
    const interval: number = 0.5;
    const ease: number = 2.2;
    const rating: Rating = "again";

    const result = calculateNewInterval(interval, ease, rating);

    expect(result).toBe(1);
  });
});

describe("calculateDueDate", () => {
  it("should calculate future due date", () => {
    const interval: number = 3;

    const result = calculateDueDate(interval);

    expect(result.getTime()).toBeGreaterThan(new Date().getTime());
  });

  it("should truncate to midnight", () => {
    const interval: number = 3;

    const result = calculateDueDate(interval);

    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });
});
