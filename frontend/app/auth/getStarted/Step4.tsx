import Button from "@/app/Components/Button";
import ReuseableTemplate from "@/app/Components/ReuseableTemplate";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

function Step4({
  handleStep,
  handleStepBackward,
}: {
  handleStep: (index: number) => void;
  handleStepBackward: (index: number) => void;
}) {
  return (
    <>
      <section className="background  w-full h-screen flex items-center justify-center ">
        <div className="w-full max-w-[800px]">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => handleStepBackward(2)}
          >
            <IoIosArrowBack className="text-pink-700 font-bold text-lg" />
            <p className="text-pink-700 font-bold text-sm">Back</p>
          </div>
          <h1 className="background-text py-3 font-bold text-2xl ">
            Select a Template
          </h1>
          <h1 className="background-text py-2 font-semibold text-sm">
            Select one to get started
          </h1>
          <ReuseableTemplate />
          <div className="my-3 w-full">
            <Button
              btn_text={"Continue"}
              additionalclass="w-full p-3"
              handleClick={handleStep}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Step4;
