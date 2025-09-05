import { differenceInCalendarDays } from "date-fns";

import type { Review } from "@/lib/db";
import { type Problem, problems } from "@/lib/problems";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../ui/data-table";
import ReviewDialog from "./review-dialog";

const columns: ColumnDef<Problem & { review: Review }>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const problem = row.original;
      const review = row.original.review;
      return <ReviewDialog problem={problem} review={review} />;
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.original.difficulty;
      switch (difficulty) {
        case "Easy":
          return <div className="text-green-500">{difficulty}</div>;
        case "Medium":
          return <div className="text-amber-500">{difficulty}</div>;
        case "Hard":
          return <div className="text-red-500">{difficulty}</div>;
        default:
          return <div>{difficulty}</div>;
      }
    },
  },
  {
    accessorKey: "topic",
    header: "Topic",
    cell: ({ row }) => <div className="text-wrap">{row.original.topic}</div>,
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: ({ row }) => {
      const count = row.original.review.count;
      if (count === 0) return <div className="text-purple-400">new</div>;

      const due = row.original.review.due;
      const days = differenceInCalendarDays(due, new Date());
      if (days < 0) return <div className="text-red-400">overdue</div>;
      if (days === 0) return <div className="text-green-400">today</div>;
      if (days === 1) return <div className="text-neutral-500">tomorrow</div>;

      return <div className="text-neutral-400">in {days} days</div>;
    },
  },
];

export default function ReviewTable({ reviews }: { reviews: Review[] }) {
  const data: (Problem & { review: Review })[] = reviews.map((review) => ({
    review,
    ...problems[review.problem],
  }));

  return (
    <div className="container">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
