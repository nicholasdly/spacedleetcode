import { useLiveQuery } from "dexie-react-hooks";
import { InfoIcon } from "lucide-react";

import { GitHubIcon } from "@/components/custom/icons";
import ReviewTable from "@/components/custom/review-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Review, db } from "@/lib/db";
import { difficulties, problems, topics } from "@/lib/problems";

function sort(reviews: Review[]) {
  // Sort by topic.
  reviews.sort((a, b) => {
    const x = problems[a.problem].topic;
    const y = problems[b.problem].topic;
    return topics[x] - topics[y];
  });

  // Sort by difficulty.
  reviews.sort((a, b) => {
    const x = problems[a.problem].difficulty;
    const y = problems[b.problem].difficulty;
    return difficulties[x] - difficulties[y];
  });

  // Sort by ease, decending.
  reviews.sort((a, b) => b.ease - a.ease);

  // Sort by due date, ascending.
  reviews.sort((a, b) => a.due.getTime() - b.due.getTime());
}

export default function App() {
  const reviews = useLiveQuery(() => db.reviews.toArray());

  if (reviews) sort(reviews);

  return (
    <div className="mx-auto max-w-2xl p-4">
      <header className="mb-4">
        <div className="flex justify-between">
          <h1 className="mb-1 text-xl font-semibold sm:text-2xl">
            spacedleetcode.com
          </h1>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" asChild>
                <a
                  href="https://github.com/nicholasdly/spacedleetcode"
                  target="_blank"
                >
                  <GitHubIcon />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Star this on GitHub!</TooltipContent>
          </Tooltip>
        </div>
        <p className="text-muted-foreground max-w-3/4 text-sm sm:text-base">
          A spaced repetition system for effectively studying popular technical
          interview problems.
        </p>
      </header>
      <main className="w-full space-y-4">
        <Alert>
          <InfoIcon />
          <AlertTitle>How does it work?</AlertTitle>
          <AlertDescription>
            <p>
              Spaced repetition helps you retain problem-solving patterns by
              reviewing them right before you forget. It builds long-term
              recall, keeps solutions fresh, and makes interview prep more
              efficient long-term.
            </p>
          </AlertDescription>
        </Alert>
        <ReviewTable reviews={reviews ?? []} />
      </main>
    </div>
  );
}
