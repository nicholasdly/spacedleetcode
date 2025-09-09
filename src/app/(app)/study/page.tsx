import { redirect } from "next/navigation";
import { Suspense } from "react";

import Header from "@/components/custom/header";
import ProblemsDataTable from "@/components/custom/problems-data-table";
import { getStudyProblems } from "@/db/queries";
import { auth } from "@/lib/auth";

export default async function Page() {
  const { user } = await auth();
  if (!user) redirect("/");

  const problems = getStudyProblems(user.id);

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <Header />
      <main className="flex flex-col">
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <ProblemsDataTable data={problems} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
