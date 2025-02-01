"use client";

import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { GiBurningTree } from "react-icons/gi";
import { MdContentCopy } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdOutlineWhatsapp } from "react-icons/md";
import { TbBrandTiktok } from "react-icons/tb";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import NavBar from "../NaxBar";
import Image from "next/image";
function Template_Two() {
  return (
    <>
      <section className="w-full rounded-2xl  max-md:max-w-full min-h-screen  bg-black bg-[url('/image.jpg')] bg-center  bg-no-repeat bg-cover">
        <div className=" w-full  max-md:max-w-full min-h-screen bg-[#000000ca] backdrop-blur-lg relative">
          <div className="w-full min-h-screen  flex flex-col justify-center items-center py-20  max-md:px-6 px-4">
            <div className="w-[150px] h-[150px] max-md:w-[100px] max-md:h-[100px] bg-white rounded-full">
              <Image
                src="/image.jpg"
                alt=""
                className="rounded-full"
                width={150}
                height={150}
              />
            </div>
            <div className="text-center">
              <div className="text-white text-2xl font-bold py-3">
                Awesome Emmanuel
              </div>
              <p className="w-full text-center text-zinc-300 text-lg max-md:text-base ">
                Music producer, Songwriter, Saxophonist, Worship Leader
              </p>
              <div className="flex gap-5 w-full justify-center text-zinc-300 text-3xl py-5">
                <FaInstagram />
                <AiOutlineYoutube />
                <CiFacebook />
                <TbBrandTiktok />
                <MdOutlineWhatsapp />
              </div>
            </div>
            <div className="w-full py-7">
              <div className="w-full flex flex-col items-center  space-y-2">
                <div className="w-full max-w-[450px] flex justify-start">
                  <h1 className="text-zinc-300 text-sm font-bold py-1">
                    Awesome project
                  </h1>
                </div>
                <div className="w-full max-w-[450px] h-14 bg-[black] flex justify-between items-center p-2 cursor-pointer">
                  <div className="w-10 h-10 bg-gray-800 rounded-md overflow-hidden "></div>
                  <p className="text-center text-zinc-300 text-sm">
                    Click for video
                  </p>
                  <div className=" text-zinc-300/50 text-3xl">
                    <BiDotsVerticalRounded />
                  </div>
                </div>

                <div className="w-full max-w-[450px] h-14 bg-[black] flex justify-between items-center p-2 cursor-pointer">
                  <div className="w-10 h-10 bg-gray-800 rounded-md overflow-hidden "></div>
                  <p className="text-center text-zinc-300 text-sm">
                    Click for Audio
                  </p>
                  <div className=" text-zinc-300/50 text-3xl">
                    <BiDotsVerticalRounded />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full py-3">
              <div className="w-full flex flex-col items-center space-y-2">
                <div className="w-full max-w-[450px] flex justify-start">
                  <h1 className="text-zinc-300 text-sm font-bold py-1">
                    Support this project
                  </h1>
                </div>
                <div className="w-full max-w-[450px] bg-[black] flex justify-between items-center p-2 cursor-pointer">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-md overflow-hidden "></div>
                    <div className="flex flex-col">
                      <p className=" text-zinc-300 font-medium text-xs">
                        Access Bank
                      </p>
                      <p className=" text-zinc-400 font-medium text-xs">
                        2345889937
                      </p>
                      <p className=" text-zinc-400 font-medium text-xs">
                        Awesome Emmanuel
                      </p>
                    </div>
                  </div>
                  <div className=" text-zinc-300/50 text-xl">
                    <MdContentCopy />
                  </div>
                </div>
                <div className="w-full  max-w-[450px] bg-[black] flex justify-between items-center p-2 cursor-pointer">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-md overflow-hidden "></div>
                    <div className="flex flex-col">
                      <p className=" text-zinc-300 font-medium text-xs">
                        Access Bank
                      </p>
                      <p className=" text-zinc-400 font-medium text-xs">
                        2345889937
                      </p>
                      <p className=" text-zinc-400 font-medium text-xs">
                        Awesome Emmanuel
                      </p>
                    </div>
                  </div>
                  <div className=" text-zinc-300/50 text-xl">
                    <MdContentCopy />
                  </div>
                </div>
              </div>
            </div>

            <button className="p-2 bg-white text-black  rounded-full font-bold flex items-center text-sm gap-2 mt-6">
              <GiBurningTree />
              <p> Join Awesome on linktree</p>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Template_Two;
