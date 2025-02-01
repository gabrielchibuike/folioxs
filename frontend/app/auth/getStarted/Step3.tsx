import React from "react";
import { IoIosArrowBack } from "react-icons/io";

import CustomInput from "@/app/Components/CustomInput";
import Button from "@/app/Components/Button";
import { InputsTypes } from "@/app/interface";
function Step3({
  Inputs,
  handleStep,
  handleStepBackward,
  handleChange,
  Err,
}: {
  Inputs: InputsTypes;
  handleStep: (index: number) => void;
  handleStepBackward: (index: number) => void;
  handleChange: any;
  Err: string;
}) {
  return (
    <>
      <section className="background  w-full h-screen flex items-center justify-center ">
        <div className="w-full max-w-[500px]">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => handleStepBackward(2)}
          >
            <IoIosArrowBack className="text-pink-700 font-bold text-lg" />
            <p className="text-pink-700 font-bold text-sm">Back</p>
          </div>
          <h1 className="background-text py-4 font-bold text-2xl ">
            Choose your username
          </h1>
          <h1 className="background-text py-2 font-semibold text-sm">
            cliam your free link
          </h1>
          <div className="flex ">
            <div className="w-full max-w-[50px] py-3 px-2 outline-0 font-medium text-sm surface surface-text  focus:border focus:border-pink-700 ">
              <p className="  ">foliox/</p>
            </div>
            <CustomInput
              additionalclass="rounded-none focus:!border-none "
              placeholder="username"
              value={Inputs.userName}
              name={"userName"}
              handleInput={handleChange}
              err_msg={Err}
            />
          </div>
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

export default Step3;
