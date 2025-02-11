"use client";

import { AiOutlineClose } from "react-icons/ai";

import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import CustomInput from "./CustomInput";
import Button from "./Button";
import Image from "next/image";
import { useMyContext } from "../Redux/Store";
import { decoded } from "../lib/getDecodedToken";
import { domain } from "../config/domain";
import { generateUUID } from "../lib/generateUUID";
import { BiLoaderAlt } from "react-icons/bi";

const socialMediaIcons = [
  {
    img: "/170984_music_icon.png",
    title: "Apple music",
    link: "",
    linkImage: "",
  },
  {
    img: "/1298766_spotify_music_sound_icon.png",
    title: "Spotify",
    link: "",
    linkImage: "",
  },
  {
    img: "/4102606_applications_media_social_whatsapp_icon.png",
    title: "Whatsapp",
    link: "",
    linkImage: "",
  },
  {
    img: "/4375133_logo_youtube_icon.png",
    title: "YouTube",
    link: "",
    linkImage: "",
  },
  {
    img: "/6929237_instagram_icon.png",
    title: "Instagram",
    link: "",
    linkImage: "",
  },
  {
    img: "/6929237_instagram_icon.png",
    title: "Instagram",
    link: "",
    linkImage: "",
  },
];

function PopUp() {
  const { PopUpModel, setProjectLink } = useMyContext();

  const displayBorder = useRef<HTMLDivElement[]>([]);

  const displayCicle = useRef<HTMLDivElement[]>([]);

  const [linkData, setLinkData] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const disabledBtn = useRef<HTMLButtonElement>(null);

  async function selectLink(ele: any, index: number) {
    const uuid = await generateUUID();
    setLinkData((prev) => {
      return [
        ...prev,
        {
          Id: index,
          linkId: uuid,
          email: decoded?.email,
          title: "blog",
          link: "https://blog.com",
          linkImage: "",
        },
      ];
    });
    displayBorder.current[index].classList.replace("border-none", "border");
    displayCicle.current[index].classList.replace("hidden", "flex");
  }

  async function removeLink(index: number) {
    if (linkData.length > 0) {
      setLinkData((prev) => {
        const newLinkData = linkData.filter((ele) => ele.Id != index);
        return newLinkData;
      });
    }
    displayBorder.current[index].classList.replace("border", "border-none");
    displayCicle.current[index].classList.replace("flex", "hidden");
  }

  async function createLink() {
    for (const ele of linkData) {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":
            localStorage && (localStorage.getItem("AccessToken") as string),
        },
        body: JSON.stringify(ele),
      };
      setIsLoading(true);
      disabledBtn.current!.disabled = true;
      const request = await fetch(`${domain}/api/create_project`, option);
      if (request.ok) {
        const result = await request.json();

        console.log(result);

        const newData = result.selected_template[0].links;

        setProjectLink(newData);

        setLinkData([]);

        displayBorder.current.forEach((ele, _) => {
          ele.classList.replace("border", "border-none");
        });

        displayCicle.current.forEach((ele, _) => {
          ele.classList.replace("flex", "hidden");
        });

        PopUpModel.current?.classList.replace("flex", "hidden");

        setIsLoading(false);

        disabledBtn.current!.disabled = false;
      } else {
        setIsLoading(false);

        disabledBtn.current!.disabled = false;

        const result = await request.text();
        console.log(result);
      }
    }
  }

  useEffect(() => {
    console.log(linkData);
  }, [linkData]);

  return (
    <>
      <div
        className="w-full  h-screen  justify-center items-center backdrop-blur-md hidden  absolute max-lg:fixed top-0 "
        ref={PopUpModel}
      >
        <div className="w-[530px] max-lg:h-screen max-lg:w-full bg-black rounded-xl ">
          <div className="w-[530px] max-lg:h-screen max-lg:w-full surface rounded-xl p-5 ">
            <div className="w-full flex justify-end">
              <div
                className="hover:bg-zinc-500/50 cursor-pointer w-6 h-6 flex justify-center items-center  rounded-full "
                onClick={() => {
                  PopUpModel.current?.classList.replace("flex", "hidden");
                }}
              >
                <AiOutlineClose className="text-zinc-300" />
              </div>
            </div>
            <h1 className="text-base font-medium surface-text ">Enter URl</h1>
            <div className="w-full h-16 flex gap-5 items-center">
              <div className="w-full">
                <CustomInput additionalclass="!bg-gray-900/50" />
              </div>
              <div>
                <Button btn_text={"Add"} additionalclass="" />
              </div>
            </div>

            <div>
              <h1 className="py-3 text-base surface-text font-normal">
                Inspired by your interests
              </h1>
              <div className="flex w-full overflow-x-scroll gap-4 ">
                {socialMediaIcons.map((ele, i) => (
                  <div className="relative flex gap-4 flex-shrink-0" key={i}>
                    <div
                      className="text-center"
                      onClick={() => selectLink(ele, i)}
                      key={i}
                    >
                      <div
                        className="p-3 bg-gray-900/50 relative cursor-pointer rounded-2xl flex gap-3 border-none primary-border"
                        ref={(e: HTMLDivElement) => {
                          displayBorder.current[i] = e;
                        }}
                      >
                        <Image src={ele.img} alt="" width={50} height={50} />
                      </div>
                      <span className="text-sm surface-text">{ele.title}</span>
                    </div>
                    <div
                      className="w-[70px] h-[70px] rounded-2xl hidden gap-2 justify-end absolute top-0 left-0 "
                      ref={(e: HTMLDivElement) => {
                        displayCicle.current[i] = e;
                      }}
                      onClick={() => removeLink(i)}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <Button
              additionalclass="w-full p-3"
              btn_text={
                isLoading ? (
                  <div className="animate-spin w-full flex justify-center  text-2xl">
                    <BiLoaderAlt className="text-white" />
                  </div>
                ) : (
                  "Continue"
                )
              }
              handleClick={createLink}
              disabled={disabledBtn}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PopUp;
