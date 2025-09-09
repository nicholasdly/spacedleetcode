"use client";

import { use } from "react";

import ReviewDialog from "@/components/custom/review-dialog";
import { Problem, Study } from "@/db/types";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../ui/data-table";

const columns: ColumnDef<{ problem: Problem; study: Study }>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const problem = row.original.problem;
      const study = row.original.study;

      return <ReviewDialog problem={problem} study={study} />;
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.original.problem.difficulty;

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
    cell: ({ row }) => {
      const topic = row.original.problem.topic;

      return <div>{topic}</div>;
    },
  },
];

export default function ProblemsDataTable({
  data,
}: {
  data: Promise<{ problem: Problem; study: Study }[]>;
}) {
  const results = use(data);

  return <DataTable columns={columns} data={results} />;
}
