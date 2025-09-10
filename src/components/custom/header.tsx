import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold">anko</h1>
      </div>
      <div className="flex items-center gap-2">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
