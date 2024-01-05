import Link from "next/link";
import React from "react";

export default function frontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-x-4">
      <Link href="page1">page1</Link>
      <Link href="page2">page2</Link>
      <Link href="page3">page3</Link>
      <Link href="page4">page4</Link>
      <Link href="page5">page5</Link>
      <Link href="page6">page6</Link>
      <Link href="page7">page7</Link>
      {children}
    </div>
  );
}
