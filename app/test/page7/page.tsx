import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Simpli Events",
};

const PrivacyPolicy = () => {
  return (
    <>
      <div className="mx-2 mt-16 md:mx-6 md:mt-32 md:px-10">
        <div className="mx-auto mb-16">
          <h1 className="text-center text-4xl font-bold md:text-7xl">7 fast</h1>
        </div>
        <div>
          <div className="align-left gap-y-2 pb-20 text-left leading-[25px] md:mx-6 md:leading-[20px]">
            <h1 className="mt-6 text-xl">
              1. Simpli Events and Related Services
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
