import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="grow text-center flex flex-col justify-center items-center gap-y-4">
      <h1 className="text-xl">Page not found!</h1>
      <Link href="/" className="text-blue-500">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
