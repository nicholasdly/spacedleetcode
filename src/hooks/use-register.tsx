import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { tc } from "@/lib/utils";
import { registerFormSchema } from "@/lib/validation";

export async function register(values: z.infer<typeof registerFormSchema>) {
  const [response] = await tc(
    fetch("/api/register", {
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

  if (response?.status === 409) {
    return {
      success: false as const,
      error: "An account already exists with that email.",
    };
  }

  return {
    success: false as const,
    error: "Something went wrong! Try again later.",
  };
}

export function useRegister() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const action = async (values: z.infer<typeof registerFormSchema>) => {
    startTransition(async () => {
      const { success, error } = await register(values);
      if (success) {
        router.push("/study");
      } else {
        toast.error(error);
      }
    });
  };

  return { register: action, isPending };
}
