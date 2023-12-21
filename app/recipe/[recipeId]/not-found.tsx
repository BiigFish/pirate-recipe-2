import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="text-center mt-6 space-y-4">
      <h1 className="text-xl">Recipe not found!</h1>
      <Link href="/" className="text-blue-500">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
