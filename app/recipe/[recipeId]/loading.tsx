import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";

const LoadingRecipePage = () => {
  return (
    <div className="w-full flex h-full grow flex-col">
      <div className="mb-4">
        <Button variant="secondary" asChild>
          <Link href="/">Go Back</Link>
        </Button>
      </div>
      <Skeleton className="h-9 w-32 rounded-full" />
      <Skeleton className="rounded-lg px-1 capitalize text-sm h-3.5 w-14" />
      <Skeleton className="my-4 h-3.5 w-14" />
      <div className="grow border border-black w-full h-full" />
    </div>
  );
};

export default LoadingRecipePage;
