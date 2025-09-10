import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Skeleton } from "../ui/skeleton";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-lg font-semibold">spacedleetcode.com</h1>
      <div className="flex items-center gap-2">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton fallback={<Skeleton className="size-7 rounded-full" />} />
        </SignedIn>
      </div>
    </header>
  );
}
