import Button from "@/app/Components/Button";
import CustomInput from "@/app/Components/CustomInput";
import { InputsTypes, socialHandleType } from "@/app/interface";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

function Step2({
  SocialInputTag,
  setSocialInputTag,
  handleStep,
  handleStepBackward,
  selectSocialHandle,
  setSelectSocialHandle,
}: {
  SocialInputTag: any;
  setSocialInputTag: any;
  handleStep: (index: number) => void;
  handleStepBackward: (index: number) => void;
  selectSocialHandle: socialHandleType[];
  setSelectSocialHandle: React.Dispatch<
    React.SetStateAction<socialHandleType[]>
  >;
}) {
  const [currentEle, setCurrentEle] = useState<string>("");

  const socialMediaDetails = [
    {
      img: "/1298766_spotify_music_sound_icon.png",
      name: "Spotify",
      placeHolder: "Spotify",
      value: SocialInputTag.Spotify,
    },
    {
      img: "/11244080_x_twitter_elon musk_twitter new logo_icon.png",
      name: "X",
      placeHolder: "x username",
      value: SocialInputTag.X,
    },
    {
      img: "/4102606_applications_media_social_whatsapp_icon.png",
      name: "Whatsapp",
      placeHolder: "Phone number or WhatsApp URL",
      value: SocialInputTag.Whatsapp,
    },
    {
      img: "/4375133_logo_youtube_icon.png",
      name: "YouTube",
      placeHolder: "YouTube username",
      value: SocialInputTag.YouTube,
    },
    {
      img: "/6929237_instagram_icon.png",
      name: "Instagram",
      placeHolder: "Instagram username",
      value: SocialInputTag.IG,
    },
  ];

  function AddSocialHandle(ele: socialHandleType, index: number) {
    setSelectSocialHandle((prev) => {
      // Avoid adding duplicates
      if (prev.some((handle) => handle.name === ele.name)) return prev;
      return [...prev, ele];
    });
    setCurrentEle(ele.name);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSocialInputTag({ ...SocialInputTag, [name]: value });
  }

  return (
    <>
      <section className="background  w-full h-screen flex items-center justify-center ">
        <div className="w-full max-w-[500px]">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => handleStepBackward(1)}
          >
            <IoIosArrowBack className="text-pink-700 font-bold text-lg" />
            <p className="text-pink-700 font-bold text-sm">Back</p>
          </div>
          <h1 className="background-text py-1 font-bold text-2xl ">
            Choose your desired social handles
          </h1>
          <h1 className="background-text py-5 font-semibold text-sm">
            Add your social meadia handle
          </h1>

          <div className="flex w-full overflow-x-scroll  gap-4">
            {socialMediaDetails.map((ele, i) => (
              <div
                className="text-center flex-shrink-0"
                onClick={() => AddSocialHandle(ele, i)}
                key={i}
              >
                <div className="p-3 bg-gray-900/50 cursor-pointer rounded-2xl flex justify-center gap-3 ">
                  {/* <img src={ele.img} alt="" className="w-20" /> */}
                  <Image src={ele.img} alt="" width={40} height={40} />
                </div>
                <span className="text-sm surface-text">{ele.name}</span>
              </div>
            ))}
          </div>

          <div className="w-full">
            <div className="background-text py-3 font-semibold text-sm">
              Your selection
            </div>
            <div className="h-[200px] overflow-y-scroll ">
              {selectSocialHandle.length == 0 ? (
                <div className="h-[200px] flex justify-center items-center">
                  <div className="surface-text py-3 font-semibold text-lg">
                    select your social handles
                  </div>
                </div>
              ) : (
                selectSocialHandle.map((ele, i) => (
                  <div className="flex gap-2 items-center  my-1" key={i}>
                    <div className="p-2 bg-gray-900/50 cursor-pointer rounded-2xl flex justify-center gap-3 ">
                      {/* <img src={ele.img} alt="" className="w-20" /> */}
                      <Image src={ele.img} alt="" width={40} height={40} />
                    </div>
                    <div className=" w-full  max-w-[500px] ">
                      <CustomInput
                        placeholder={ele.placeHolder}
                        name={ele.name}
                        handleInput={handleChange}
                        value={SocialInputTag[ele.name] || ""}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="my-3 w-full">
              <Button
                btn_text={"Continue"}
                additionalclass="w-full p-3"
                handleClick={handleStep}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Step2;
