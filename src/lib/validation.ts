import { z } from "zod";

import { ratingEnum } from "@/db/schema";

export const attemptSchema = z
  .object({
    studyId: z.string(),
    rating: z.enum(ratingEnum.enumValues),
  })
  .strict();
