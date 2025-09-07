import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth/sessions";

import { RegisterForm } from "./register-form";

export default async function Page() {
  const { user } = await getCurrentSession();
  if (user) redirect("/");

  return (
    <main className="mx-auto flex h-dvh max-w-sm items-center p-4">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-semibold text-nowrap">
            Create an account
          </h1>
          <p className="text-muted-foreground text-center text-sm text-pretty">
            Create an account using your email address and password.
          </p>
        </div>
        <RegisterForm />
        <p className="text-muted-foreground text-center text-sm">
          Already have an account?&nbsp;
          <Button variant="link" className="h-fit p-0" asChild>
            <Link
              href="/login"
              className="text-foreground font-semibold hover:underline"
            >
              Log in
            </Link>
          </Button>
        </p>
      </div>
    </main>
  );
}
