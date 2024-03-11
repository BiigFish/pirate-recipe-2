"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tags } from "@/app/models/recipes";

interface Props {
  searchParams?: {
    tag: string;
  };
}

const ListControls: React.FC<Props> = ({ searchParams }) => {
  const tagParam = searchParams?.tag || "";
  const router = useRouter();

  const changeTag = (tag: string) => {
    const tagString = tag.toString();
    const newUrl = `/?tag=${tagString}`;

    if (tagString === "All") {
      router.push("/");
    } else {
      router.push(newUrl);
    }
  };

  return (
    <div>
      <ToggleGroup
        defaultValue={tagParam}
        type="single"
        onValueChange={changeTag}
        variant="outline"
        className="justify-start flex-wrap"
      >
        <ToggleGroupItem value={"All"}>All</ToggleGroupItem>
        {Tags.map((tag, index) => (
          <ToggleGroupItem key={index} value={tag}>
            {tag}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ListControls;
