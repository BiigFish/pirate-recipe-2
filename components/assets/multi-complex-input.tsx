"use client";

import {
  faTrash,
  faUpLong,
  faDownLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Ingredient {
  amount: string;
  ingredient: string;
}

interface Props {
  values: Ingredient[];
  setValues: (v: Ingredient[]) => void;
}

const MultiComplexInput: React.FC<Props> = ({ values, setValues }) => {
  const handleRemoveValue = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
  };

  const handleValueChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const newValues = [...values];
    newValues[index][field] = value;

    if (index === newValues.length - 1) {
      newValues.push({ amount: "", ingredient: "" });
    }
    setValues(newValues);
  };

  const handleMoveValue = (index: number, direction: "up" | "down") => {
    const newValues = [...values];
    const currentIndex = index;
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newValues.length) {
      const temp = newValues[currentIndex];
      newValues[currentIndex] = newValues[newIndex];
      newValues[newIndex] = temp;
      setValues(newValues);
    }
  };
  return (
    <div>
      <div className="flex ml-7 justify-between w-7/12 md:w-[415px]">
        <p>Amount</p>
        <p>Ingredient</p>
      </div>
      {values.map((value, index) => (
        <div
          key={index}
          className={`flex items-center gap-x-4 mt-2 ${
            index === values.length - 1 && "mr-[82px] text-gray-400"
          }`}
        >
          <div className="shrink-0">&#x2022;</div>
          <input
            type="text"
            value={value.amount}
            onChange={(e) => handleValueChange(index, "amount", e.target.value)}
            className="border rounded-md w-full px-1 py-px"
          />
          <input
            type="text"
            value={value.ingredient}
            onChange={(e) =>
              handleValueChange(index, "ingredient", e.target.value)
            }
            className="border rounded-md w-full px-1 py-px"
          />
          {index < values.length - 1 && (
            <>
              <button
                disabled={index === 0}
                tabIndex={-1}
                type="button"
                onClick={() => handleMoveValue(index, "up")}
                className="disabled:text-gray-400"
              >
                <FontAwesomeIcon icon={faUpLong} />
              </button>
              <button
                disabled={index === values.length - 2}
                tabIndex={-1}
                type="button"
                onClick={() => handleMoveValue(index, "down")}
                className="disabled:text-gray-400"
              >
                <FontAwesomeIcon icon={faDownLong} />
              </button>
              <button
                tabIndex={-1}
                type="button"
                onClick={() => handleRemoveValue(index)}
              >
                <FontAwesomeIcon icon={faTrash} className="text-red-500" />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiComplexInput;
