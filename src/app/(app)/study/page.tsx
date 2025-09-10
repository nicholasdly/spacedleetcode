import { Suspense } from "react";

import Header from "@/components/custom/header";
import Loading from "@/components/custom/loading";
import ProblemsDataTable from "@/components/custom/problems-data-table";
import { getStudyProblemCollections } from "@/db/prepared";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();
  const promise = getStudyProblemCollections.execute({ userId });

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
