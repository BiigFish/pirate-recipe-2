import { Button } from "@/components/ui/button";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <div className="grow w-full flex items-center justify-center">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin " size="6x" />
      </div>
    </div>
  );
};

export default LoadingRecipePage;
