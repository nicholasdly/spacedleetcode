export type Rating = "again" | "hard" | "good" | "easy";

/**
 * Calculates an updated ease factor.
 * @param currentEase The current ease factor.
 * @param rating The attempt rating.
 * @returns The updated ease factor.
 */
export function calculateNewEase(currentEase: number, rating: Rating): number {
  let ease = currentEase;

  if (rating === "again") ease = currentEase - 0.2;
  if (rating === "hard") ease = currentEase - 0.15;
  if (rating === "easy") ease = currentEase + 0.15;

  ease = Math.max(1.3, ease);
  ease = Math.min(3.0, ease);

  return ease;
}

/**
 * Calculates an updated study interval (days).
 * @param currentInterval The current study interval (days).
 * @param ease The ease factor.
 * @param rating The attempt rating.
 * @returns The updated study interval (days).
 */
export function calculateNewInterval(
  currentInterval: number,
  ease: number,
  rating: Rating,
): number {
  if (rating === "again") return 1;

  let interval = currentInterval;

  if (rating === "hard") interval = Math.min(14, interval * 1.2);
  if (rating === "good") interval = Math.min(30, interval * ease);
  if (rating === "easy") interval = Math.min(90, interval * ease * 1.2);

  return Math.max(1, interval);
}

/**
 * Calculates a due date based off the current date.
 * @param interval The study interval (days).
 * @returns The due date.
 */
export function calculateDueDate(interval: number): Date {
  const date = new Date(Date.now() + interval * 1000 * 60 * 60 * 24);
  date.setHours(0, 0, 0, 0); // Truncates to midnight.
  return date;
}
