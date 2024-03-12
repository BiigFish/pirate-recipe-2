"use client";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  recipeId: string;
}

const Fav: React.FC<Props> = ({ recipeId }) => {
  return (
    <div className="cursor-pointer">
      <FontAwesomeIcon icon={faHeart} />
    </div>
  );
};

export default Fav;
