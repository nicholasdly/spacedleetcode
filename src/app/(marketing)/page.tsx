import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="mx-auto flex h-svh max-w-md flex-col items-center justify-center p-4">
      <header className="mb-3">
        <h1 className="font-semibold">anko</h1>
      </header>
      <main className="flex items-center gap-1.5">
        <Button size="sm" variant="outline" asChild>
          <Link href="/login">Sign in</Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </main>
    </div>
  );
}
