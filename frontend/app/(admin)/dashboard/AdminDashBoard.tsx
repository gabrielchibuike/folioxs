"use client";

import { IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../Components/Button";
import LinkInputModel from "../../Components/LinkInputModel";
import Template_One from "@/app/Components/Templates/Template_One";
import Link from "next/link";
import { useMyContext } from "../../Redux/Store";
import { useRouter } from "next/navigation";

function AdminDashBoard() {
  const { PopUpModel, projectLink, template_one } = useMyContext();

  const previewRef = useRef<HTMLDivElement>(null);

  const disabledBtn = useRef<HTMLButtonElement>(null);

  const [ToggleText, setToggleText] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (template_one.length === 0) {
  //       disabledBtn.current!.disabled = true;
  //       console.log(template_one.length);
  //     }
  //   }, 10000);
  // }, [template_one]);

  return (
    <>
      <div className="w-full background relative h-screen p-5">
        <div className=" flex  gap-5 relative">
          <div className="w-full h-[calc(100vh-20px)] max-lg:min-h-full overflow-y-scroll ">
            {(projectLink && projectLink.length == 0) || projectLink == null ? (
              <div className="surface rounded-xl relative p-3 h-[200px] flex items-center justify-center   my-8">
                <div className="space-y-6">
                  <div className="flex flex-col items-center ">
                    <h1 className="text-lg font-semibold surface-text">
                      Add project links
                    </h1>
                    <span className="text-xs surface-text ">
                      eg Facebook, TikTok...
                    </span>
                  </div>
                  <div>
                    <Button
                      additionalclass={`${
                        template_one.length == 0 ? "!cursor-not-allowed " : ""
                      }`}
                      btn_text={"Add social media"}
                      handleClick={() => {
                        PopUpModel.current?.classList.replace("hidden", "flex");
                      }}
                      disabled={disabledBtn}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-32">
                <div className="w-full pt-4">
                  <Button
                    additionalclass="w-full p-3"
                    btn_text={"Add link"}
                    handleClick={() => {
                      PopUpModel.current?.classList.replace("hidden", "flex");
                    }}
                  />
                </div>
                <div className=" ">
                  {projectLink == undefined
                    ? ""
                    : projectLink.map((ele: any, i: number) => (
                        <div key={i}>
                          <LinkInputModel ele={ele} />
                        </div>
                      ))}
                </div>
              </div>
            )}
          </div>
          <div
            className="w-full max-w-[350px] max-lg:max-w-full  flex flex-col   space-y-3 max-lg:hidden max-lg:absolute top-0 "
            ref={previewRef}
          >
            <div className=" bg-black">
              <div className="surface space-y-4">
                <div className="w-full max-w-[350px] max-lg:max-w-full  flex justify-between  p-3 rounded-2xl">
                  <p className="text-xs surface-text font-medium">
                    Your foliox is live:{" "}
                    <Link href={"/linktr.ee/gabbysoft2002"}>
                      foliox/gabbysoft2002
                    </Link>
                  </p>
                  <div className="text-xs max-lg:text-center surface-text rounded-full primary flex justify-center items-center p-1 w-40 cursor-pointer">
                    Copy your foliox URL
                  </div>
                </div>
                <div className="w-full max-w-[350px] max-lg:max-w-full h-[450px] max-lg:min-h-screen  overflow-y-scroll px-2 rounded-2xl surface py-2 ">
                  <Template_One />
                </div>
              </div>
            </div>
          </div>
          <div className="fixed  bottom-14 left-0 w-full flex justify-center">
            {ToggleText == false && (
              <button
                className=" py-2 px-5 primary surface-text lg:hidden rounded-full font-bold flex  items-center text-sm gap-2"
                onClick={() => {
                  previewRef.current?.classList.replace(
                    "max-lg:hidden",
                    "max-lg:block"
                  );
                  setToggleText(true);
                }}
              >
                <p> Preview changes</p>
              </button>
            )}

            {ToggleText == true && (
              <button
                className=" p-1 px-5 primary surface-text lg:hidden rounded-full font-bold flex  items-center text-sm gap-2"
                onClick={() => {
                  previewRef.current?.classList.replace(
                    "max-lg:block",
                    "max-lg:hidden"
                  );
                  setToggleText(false);
                }}
              >
                <p> Close</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashBoard;
