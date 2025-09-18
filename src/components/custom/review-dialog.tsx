import { differenceInCalendarDays } from "date-fns";
import { ExternalLinkIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { type Review, db } from "@/lib/db";
import type { Problem } from "@/lib/problems";
import {
  type Rating,
  calculateDueDate,
  calculateNewEase,
  calculateNewInterval,
} from "@/lib/repetition";

import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

async function submit(id: string, rating: Rating) {
  await db.transaction("readwrite", db.reviews, async (tx) => {
    const review = await tx.reviews.get(id);
    if (!review) throw Error("Review does not exist!");

    const ease = calculateNewEase(review.ease, rating);
    const interval = calculateNewInterval(review.interval, review.ease, rating);
    const due = calculateDueDate(interval);
    const count = review.count + 1;

    await tx.reviews.update(id, { ease, interval, due, count });

    const days = differenceInCalendarDays(due, new Date());

    const message =
      days > 1
        ? `Nice job! Do this problem again in ${days} days!`
        : "Don't worry, try this problem again tomorrow!";

    toast.success(message);
  });
}

function getTooltipText(interval: number, ease: number, rating: Rating) {
  if (rating === "again") return "Tomorrow";

  const due = calculateDueDate(calculateNewInterval(interval, ease, rating));
  const days = differenceInCalendarDays(due, new Date());

  return days > 1 ? `${days} days` : `${days} day`;
}

export default function ReviewDialog({
  problem,
  review,
}: {
  problem: Problem;
  review: Review;
}) {
  const isMobile = useIsMobile();
  const problemButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger className="max-w-48 cursor-pointer text-left text-wrap text-blue-500 underline-offset-2 hover:text-blue-700 hover:underline">
        {problem.title}
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          problemButtonRef.current?.focus();
        }}
      >
        <DialogHeader className="sm:text-center">
          <DialogTitle>{problem.title}</DialogTitle>
          <div className="my-2 flex justify-center gap-2">
            <Button
              ref={problemButtonRef}
              size="sm"
              variant="outline"
              className="w-fit rounded-full"
              asChild
            >
              <a
                className="flex items-center"
                href={problem.url}
                target="_blank"
              >
                <p className="text-sm">Problem</p>
                <ExternalLinkIcon className="size-3.5" />
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-fit rounded-full"
              asChild
            >
              {problem.solution && (
                <a
                  className="flex items-center"
                  href={problem.solution}
                  target="_blank"
                >
                  <p className="text-sm">Solution</p>
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              )}
            </Button>
          </div>
          <DialogDescription className="text-foreground my-1 text-left">
            {problem.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:justify-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-1.5 sm:grid-cols-4 sm:grid-rows-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-red-500 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => submit(review.id, "again")}
                  >
                    Again
                  </Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getTooltipText(review.interval, review.ease, "again")}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-amber-500 bg-amber-50 text-amber-500 hover:bg-amber-100 hover:text-amber-500"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => submit(review.id, "hard")}
                  >
                    Hard
                  </Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getTooltipText(review.interval, review.ease, "hard")}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => submit(review.id, "good")}
                  >
                    Good
                  </Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent side={isMobile ? "bottom" : "top"}>
                <p>{getTooltipText(review.interval, review.ease, "good")}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-green-500 bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => submit(review.id, "easy")}
                  >
                    Easy
                  </Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent side={isMobile ? "bottom" : "top"}>
                <p>{getTooltipText(review.interval, review.ease, "easy")}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
