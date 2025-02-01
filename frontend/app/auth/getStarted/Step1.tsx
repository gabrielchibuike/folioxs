"use client";
import { AiOutlinePlus } from "react-icons/ai";
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "@/app/Components/Button";
import { domain } from "@/app/config/domain";
import CustomInput from "@/app/Components/CustomInput";
import { BiLoaderAlt } from "react-icons/bi";
import { useFormik } from "formik";
import { InputsTypes } from "@/app/interface";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

function Step1({
  Inputs,
  handleStep,
  handleChange,
  setSelectedFile,
  selectedFile,
}: {
  Inputs: InputsTypes;
  handleStep: (index: number) => void;
  handleChange: any;
  setSelectedFile: any;
  selectedFile: any;
}) {
  const disabledBtn = useRef<HTMLButtonElement>(null);

  const styleInput = useRef<HTMLInputElement>(null);

  const [DisplayImage, setDisplayImage] = useState("");

  // useEffect(() => {
  //   console.log(selectedFile);
  // }, [selectedFile]);
  return (
    <>
      <section className="background  w-full h-screen flex items-center justify-center ">
        <div className="  w-full  max-w-[500px]  p-4">
          <div>
            <h1 className="background-text py-1  font-bold text-2xl ">
              Create your profile
            </h1>
            <h1 className="background-text py-5 font-semibold text-sm">
              Select a profile image
            </h1>
            <div className="flex gap-3">
              <input
                type="file"
                className="hidden"
                ref={styleInput}
                onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files![0];
                  console.log(file);

                  if (file) {
                    setDisplayImage(URL.createObjectURL(file));
                    setSelectedFile(file);
                  }
                }}
              />
              <div className="w-28 h-28 rounded-full surface overflow-hidden flex justify-center   ">
                <Image
                  src={DisplayImage ? DisplayImage : "/avater.png"}
                  alt=""
                  className="rounded-full  object-cover"
                  width={120}
                  height={120}
                  // style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div
                className="w-28 h-28 rounded-full surface flex justify-center items-center cursor-pointer"
                onClick={() => {
                  styleInput.current?.click();
                }}
              >
                <AiOutlinePlus className="text-5xl surface-text" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="background-text py-2 font-semibold  text-sm">
              Add Title and Bio
            </h1>
            <form className="  w-full  max-w-[500px] rounded-lg flex flex-col justify-center space-y-5 my-2 max-lg:shadow-transparent">
              <CustomInput
                additionalclass={``}
                placeholder="profile title"
                name={"title"}
                value={Inputs.title}
                type="text"
                handleInput={handleChange}
              />
              <CustomInput
                additionalclass={``}
                placeholder="Enter bio.."
                name={"bio"}
                value={Inputs.bio}
                type="text"
                handleInput={handleChange}
              />

              <Button
                type="submit"
                btn_text={"Continue"}
                additionalclass="p-3"
                handleClick={handleStep}
                disabled={disabledBtn}
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Step1;
