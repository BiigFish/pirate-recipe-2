"use client";

import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { faDownLong } from "@fortawesome/free-solid-svg-icons/faDownLong";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  label?: string;
  values: string[];
  setValues: (v: string[]) => void;
}

const MultiInput: React.FC<Props> = ({ label, values, setValues }) => {
  const handleRemoveValue = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
  };

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;

    if (index === newValues.length - 1) {
      newValues.push("");
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
      <p>{label}</p>
      {values.map((value, index) => (
        <div
          key={index}
          className={`flex items-center gap-x-4 mt-2 ${
            index === values.length - 1 && "mr-[82px] text-gray-400"
          }`}
        >
          <label className="shrink-0">{index + 1}.</label>
          <input
            type="text"
            value={value}
            onChange={(e) => handleValueChange(index, e.target.value)}
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

export default MultiInput;
