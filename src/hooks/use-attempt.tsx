import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Rating } from "@/db/types";
import { tc } from "@/lib/utils";
import { attemptSchema } from "@/lib/validation";

export async function attempt(values: z.infer<typeof attemptSchema>) {
  const [response] = await tc(
    fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }),
  );

  if (response?.ok) {
    return {
      success: true as const,
      error: null,
    };
  }

  return {
    success: false as const,
    error: "Something went wrong! Try again later.",
  };
}

export function useAttempt(studyId: string) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const action = async (rating: Rating) => {
    startTransition(async () => {
      const { success, error } = await attempt({ studyId, rating });
      if (success) {
        router.refresh();
      } else {
        toast.error(error);
      }
    });
  };

  return { attempt: action, isPending };
}
