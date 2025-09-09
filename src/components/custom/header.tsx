import Link from "next/link";

import { auth } from "@/lib/auth";

import { Button } from "../ui/button";
import LogoutButton from "./logout-button";

export default async function Header() {
  const { user } = await auth();

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold">anko</h1>
      </div>
      <div className="flex items-center gap-2">
        {user && <LogoutButton />}
        {!user && (
          <>
            <Button size="sm" variant="outline" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
