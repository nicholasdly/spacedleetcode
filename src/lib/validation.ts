import { z } from "zod";

import { ratingEnum } from "@/db/schema";

export const loginFormSchema = z
  .object({
    email: z.email("Please enter a valid email address."),
    password: z.string().min(1, "Please enter a valid password."),
  })
  .strict();

export const registerFormSchema = z
  .object({
    email: z.email("Please enter a valid email address."),
    password: z
      .string()
      .min(6, "Your password must be at least 6 characters.")
      .max(255, "Your password must not exceed 255 characters."),
  })
  .strict();

export const attemptSchema = z
  .object({
    studyId: z.string(),
    rating: z.enum(ratingEnum.enumValues),
  })
  .strict();
