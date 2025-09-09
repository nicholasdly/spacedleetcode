import { LoaderCircleIcon } from "lucide-react";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export default function Loading({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <LoaderCircleIcon className="size-5 animate-spin" />
    </div>
  );
}
