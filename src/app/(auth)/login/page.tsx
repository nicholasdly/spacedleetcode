import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

import { LogInForm } from "./login-form";

export default async function Page() {
  const { user } = await auth();
  if (user) redirect("/");

  return (
    <main className="mx-auto flex h-dvh max-w-sm items-center p-4">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-semibold text-nowrap">Sign in</h1>
          <p className="text-muted-foreground text-center text-sm text-pretty">
            Log in to your account with your email address and password.
          </p>
        </div>
        <LogInForm />
        <p className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?&nbsp;
          <Button variant="link" className="h-fit p-0" asChild>
            <Link
              href="/register"
              className="text-foreground font-semibold hover:underline"
            >
              Register
            </Link>
          </Button>
        </p>
      </div>
    </main>
  );
}
