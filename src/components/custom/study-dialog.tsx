import { differenceInCalendarDays } from "date-fns";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Problem, Rating, Study } from "@/db/types";
import { useAttempt } from "@/hooks/use-attempt";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { calculateDueDate, calculateNewInterval } from "@/lib/repetition";
import { UTCDate, utc } from "@date-fns/utc";
import { DialogClose } from "@radix-ui/react-dialog";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function getTooltipText(interval: number, ease: number, rating: Rating) {
  if (rating === "again") return "Tomorrow";

  const due = calculateDueDate(calculateNewInterval(interval, ease, rating));
  const days = differenceInCalendarDays(due, new UTCDate(), { in: utc });

  return days > 1 ? `${days} days` : `${days} day`;
}

export default function StudyDialog({
  problem,
  study,
}: {
  problem: Problem;
  study: Study;
}) {
  const isMobile = useIsMobile();
  const problemButtonRef = useRef<HTMLButtonElement>(null);

  const { attempt } = useAttempt(study.id);

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
              <Link
                className="flex items-center"
                href={problem.url}
                target="_blank"
              >
                <p className="text-sm">Problem</p>
                <ExternalLinkIcon className="size-3.5" />
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-fit rounded-full"
              asChild
            >
              {problem.solution && (
                <Link
                  className="flex items-center"
                  href={problem.solution}
                  target="_blank"
                >
                  <p className="text-sm">Solution</p>
                  <ExternalLinkIcon className="size-3.5" />
                </Link>
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
                    onClick={() => attempt("again")}
                  >
                    Again
                  </Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getTooltipText(study.interval, study.ease, "again")}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-amber-500 bg-amber-50 text-amber-500 hover:bg-amber-100 hover:text-amber-500"
                    onClick={() => attempt("hard")}
                  >
                    Hard
                  </Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getTooltipText(study.interval, study.ease, "hard")}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500"
                    onClick={() => attempt("good")}
                  >
                    Good
                  </Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent side={isMobile ? "bottom" : "top"}>
                <p>{getTooltipText(study.interval, study.ease, "good")}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-green-500 bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500"
                    onClick={() => attempt("easy")}
                  >
                    Easy
                  </Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent side={isMobile ? "bottom" : "top"}>
                <p>{getTooltipText(study.interval, study.ease, "easy")}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
