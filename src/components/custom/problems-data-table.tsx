"use client";

import { differenceInCalendarDays } from "date-fns";
import { useQueryState } from "nuqs";
import { use } from "react";

import StudyDialog from "@/components/custom/study-dialog";
import { Collection, Problem, Study } from "@/db/types";
import { slugify } from "@/lib/utils";
import { UTCDate, utc } from "@date-fns/utc";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type RawTableData = { study: Study; problem: Problem; collection: Collection };

type TableData = Record<
  string,
  {
    id: Problem["id"];
    title: Problem["title"];
    description: Problem["description"];
    url: Problem["url"];
    solution: Problem["solution"];
    difficulty: Problem["difficulty"];
    topic: Problem["topic"];
    study: Study;
  }[]
>;

const columns: ColumnDef<TableData[string][number]>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <StudyDialog problem={row.original} study={row.original.study} />
    ),
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
      const due = row.original.study.dueAt;
      if (due.getTime() === 0) {
        return <div className="text-purple-400">new</div>;
      }

      const days = differenceInCalendarDays(due, new UTCDate(), { in: utc });
      if (days < 0) return <div className="text-red-400">overdue</div>;
      if (days === 0) return <div className="text-green-400">today</div>;
      if (days === 1) return <div className="text-neutral-500">tomorrow</div>;

      return <div className="text-neutral-400">in {days} days</div>;
    },
  },
];

export default function ProblemsDataTable({
  promise,
}: {
  promise: Promise<RawTableData[]>;
}) {
  const data = use(promise);
  const [collection, setCollection] = useQueryState("collection", {
    defaultValue: "blind-75",
  });

  const problems = data.reduce<TableData>(
    (accumlator, { study, problem, collection }) => {
      const key = collection.name;

      if (!accumlator[key]) accumlator[key] = [];
      accumlator[key].push({ study, ...problem });

      return accumlator;
    },
    {},
  );

  const collections = Object.keys(problems).map((collection) => ({
    slug: slugify(collection),
    name: collection,
  }));

  return (
    <div>
      <Tabs value={collection} onValueChange={setCollection}>
        {collections.length > 1 && (
          <TabsList>
            {collections.map(({ slug, name }) => (
              <TabsTrigger key={slug} value={slug}>
                {name}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        {collections.map(({ slug, name }) => (
          <TabsContent key={slug} value={slug}>
            <DataTable columns={columns} data={problems[name]!} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
