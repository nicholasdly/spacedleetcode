import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="mx-auto flex h-dvh max-w-fit items-center">
      <SignUp />
    </main>
  );
}
