import { redirect } from "next/navigation";
import { Suspense } from "react";

import Header from "@/components/custom/header";
import Loading from "@/components/custom/loading";
import ProblemsDataTable from "@/components/custom/problems-data-table";
import { getStudyProblemCollections } from "@/db/queries";
import { auth } from "@/lib/auth";

export default async function Page() {
  const { user } = await auth();
  if (!user) redirect("/");

  const promise = getStudyProblemCollections.execute({ userId: user.id });

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <Header />
      <main className="flex flex-col">
        <div>
          <Suspense fallback={<Loading className="my-8" />}>
            <ProblemsDataTable promise={promise} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
