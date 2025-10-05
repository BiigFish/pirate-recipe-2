"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tags } from "@/app/models/recipes";

interface Props {
  searchParams?: {
    tag: string;
    owner: string;
  };
  loggedIn?: boolean;
}

const ListControls: React.FC<Props> = ({ searchParams, loggedIn }) => {
  const tagParam = searchParams?.tag || "All";
  const ownerParam = searchParams?.owner || "All";
  const router = useRouter();

  const changeTag = (tag: string) => {
    const tagString = tag.toString();
    const ownerString = ownerParam === "All" ? "" : `&owner=${ownerParam}`;
    const newUrl = `/?tag=${tagString}${ownerString}`;

    if (tagString === "All" && ownerParam === "All") {
      router.push("/");
    } else {
      router.push(newUrl);
    }
  };

  const changeOwner = (owner: string) => {
    const ownerString = owner.toString();
    const tagString = tagParam === "All" ? "" : `&tag=${tagParam}`;
    const newUrl = `/?owner=${ownerString}${tagString}`;

    if (ownerString === "All" && tagParam === "All") {
      router.push("/");
    } else {
      router.push(newUrl);
    }
  };

  return (
    <div className="space-y-2">
        {loggedIn && (
      <div>
        <ToggleGroup
          defaultValue={ownerParam}
          type="single"
          onValueChange={changeOwner}
          variant="outline"
          className="justify-start flex-wrap"
        >
          <ToggleGroupItem value={"All"}>All Recipes</ToggleGroupItem>
          <ToggleGroupItem value={"Mine"}>My Recipes</ToggleGroupItem>
        </ToggleGroup>
      </div>
        )}      
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
    </div>
  );
};

export default ListControls;
