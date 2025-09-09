import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Problem, Study } from "@/db/types";
import { useAttempt } from "@/hooks/use-attempt";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { estimateNewInterval } from "@/lib/repetition";
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

export default function ReviewDialog({
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
      <DialogTrigger className="cursor-pointer text-blue-500 underline-offset-2 hover:text-blue-700 hover:underline">
        {problem.title}
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          problemButtonRef.current?.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle>{problem.title}</DialogTitle>
          <div className="my-2 flex justify-center gap-2 sm:justify-normal">
            <Button
              ref={problemButtonRef}
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
                <ExternalLinkIcon className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-fit rounded-full" asChild>
              {problem.solution && (
                <Link
                  className="flex items-center"
                  href={problem.solution}
                  target="_blank"
                >
                  <p className="text-sm">Solution</p>
                  <ExternalLinkIcon className="size-4" />
                </Link>
              )}
            </Button>
          </div>
          <DialogDescription className="text-foreground text-left">
            {problem.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:justify-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-1.5 sm:grid-cols-4 sm:grid-rows-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button onClick={() => attempt("again")}>Again</Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  &le;{" "}
                  {estimateNewInterval(study.interval, study.ease, "again")} day
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button onClick={() => attempt("hard")}>Hard</Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  &le; {estimateNewInterval(study.interval, study.ease, "hard")}{" "}
                  days
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button onClick={() => attempt("good")}>Good</Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent side={isMobile ? "bottom" : "top"}>
                <p>
                  &le; {estimateNewInterval(study.interval, study.ease, "good")}{" "}
                  days
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogClose asChild>
                  <Button onClick={() => attempt("easy")}>Easy</Button>
                </DialogClose>
              </TooltipTrigger>
              <TooltipContent side={isMobile ? "bottom" : "top"}>
                <p>
                  &le; {estimateNewInterval(study.interval, study.ease, "easy")}{" "}
                  days
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
