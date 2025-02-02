"use client";

import { MdOutlineDragIndicator } from "react-icons/md";
import { AiOutlineArrowUp } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiShare } from "react-icons/bi";
import { AiOutlineLink } from "react-icons/ai";
import { AiOutlinePicture } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import CustomInput from "./CustomInput";
import { domain } from "../config/domain";
import { decoded } from "../lib/getDecodedToken";
import { useMyContext } from "../Redux/Store";

function LinkInputModel({ ele }: { ele: any }) {
  const { TrashPopUpModel, setLinkId, setProjectLink } = useMyContext();

  const [IsTitle, setIsTitle] = useState<boolean>(false);

  const [IsLink, setIsLink] = useState<boolean>(false);

  const targetInput = useRef<HTMLInputElement>(null);

  const styleInput = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>("");

  const [link, setLink] = useState<string>("");

  const [linkImage, setLinkImage] = useState<any>();

  const [msg, setMsg] = useState("");

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("AccessToken") || "token");
    }
  }, []);

  async function handleSubmit() {
    const data = {
      email: decoded.email,
      title,
      link,
      linkId: ele.linkId,
    };

    const formData = new FormData();
    formData.append("file", linkImage);
    formData.append("jsonData", JSON.stringify(data));

    const option = {
      method: "POST",
      headers: {
        "x-auth-token": token as string,
      },
      body: formData,
    };

    const request = await fetch(`${domain}/api/edit_project`, option);

    if (request.ok) {
      const result = await request.json();
      setMsg("completed");
      const newData = result.selected_template[0].links;
      setProjectLink(newData);
      // console.log(result);
    } else {
      const result = await request.text();
      setMsg("couldn't edit try again");
      console.log(result);
    }
  }

  //  {
  //    msg == "completed" ? (
  //      <p className="text-xs text-green-600">{msg}</p>
  //    ) : (
  //      <p className="text-xs text-red-600">{msg}</p>
  //    );
  //  }

  // async function handleDelete() {
  //   console.log(ele.linkId);
  //   const data = {
  //     linkId: ele.linkId,
  //     email: decoded.email,
  //   };

  //   const option = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   };

  //   const request = await fetch(`${domain}/api/remove_project`, option);
  //   if (request.ok) {
  //     const result = await request.json();
  //     // const newData = result.selected_template[0].links;
  //     // setProjectLink(newData);
  //     console.log(result);
  //   } else {
  //     const result = await request.text();
  //     console.log(result);
  //   }
  // }

  // useEffect(() => {
  //   console.log(linkImage);
  // }, [linkImage]);

  useEffect(() => {
    setTitle(ele.title);
    setLink(ele.url);
  }, [ele.title, ele.url]);
  return (
    <>
      <div className="w-full surface rounded-xl relative flex items-center p-3 h-[130px]  my-5  border  border-pink-700/20 ">
        <div className="w-full flex justify-between  items-center ">
          <div className="flex gap-5 items-center ">
            <MdOutlineDragIndicator className="text-2xl max-lg:hidden" />
            <div className="w-[200px] h-[100px] flex flex-col justify-center space-y-3 ">
              <div>
                {IsTitle ? (
                  <CustomInput
                    additionalclass="!bg-transparent !font-medium !py-0 !px-0 w-0 focus!:border focus:!border-transparent"
                    placeholder="Title"
                    InputRef={targetInput}
                    value={title}
                    handleInput={(e: ChangeEvent<HTMLInputElement>) => {
                      setTitle(e.target.value);
                    }}
                    handleBlur={() => {
                      setIsTitle(false);
                    }}
                  />
                ) : (
                  <div
                    className="w-fit flex gap-2 items-center "
                    onClick={() => {
                      setIsTitle(true);
                      setTimeout(() => {
                        targetInput.current?.focus();
                        // targetInput.current?.value = Title
                      }, 100);
                    }}
                  >
                    <p
                      className={` text-sm surface-text font-medium text-ellipsis overflow-hidden text-nowrap ${
                        title && title.length > 30 ? "w-80" : "w-fit"
                      }`}
                    >
                      {title}
                    </p>

                    <AiOutlineEdit className="cursor-pointer text-lg" />
                  </div>
                )}
              </div>
              <div>
                {IsLink ? (
                  <CustomInput
                    additionalclass="!bg-transparent !font-medium !py-0 px-0 w-0 focus!:border focus:!border-transparent"
                    placeholder="links"
                    InputRef={targetInput}
                    value={link}
                    handleInput={(e: ChangeEvent<HTMLInputElement>) => {
                      setLink(e.target.value);
                    }}
                    handleBlur={() => {
                      setIsLink(false);
                    }}
                  />
                ) : (
                  <div
                    className="w-fit flex gap-2 items-center"
                    onClick={() => {
                      setIsLink(true);
                      setTimeout(() => {
                        targetInput.current?.focus();
                        // targetInput.current?.value = Title
                      }, 100);
                    }}
                  >
                    <p
                      className={`text-sm surface-text font-medium text-ellipsis overflow-hidden text-nowrap ${
                        link && link.length > 30 ? "w-20" : "w-fit"
                      }`}
                    >
                      {link}
                    </p>
                    <AiOutlineEdit className="cursor-pointer text-lg" />
                  </div>
                )}
              </div>
              <div className="w-full flex gap-4   cursor-pointer text-zinc-500/90">
                <input
                  type="file"
                  className="hidden"
                  ref={styleInput}
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files![0];
                    setLinkImage(file);
                    // console.log(file);
                  }}
                />
                <div
                  onClick={() => {
                    styleInput.current?.click();
                  }}
                >
                  <AiOutlinePicture />
                </div>
                <AiOutlineLink />
                <BiShare />
                <div
                  className=""
                  onClick={() => {
                    TrashPopUpModel.current?.classList.replace(
                      "hidden",
                      "flex"
                    );
                    setLinkId(ele.linkId);
                  }}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2  flex flex-col items-center">
            <div
              className="p-3 bg-green-600 rounded-full w-10 h-10"
              onClick={handleSubmit}
            >
              <AiOutlineArrowUp />
            </div>

            {/* <AiOutlineArrowDown /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default LinkInputModel;
