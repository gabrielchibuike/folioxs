"use client";

import React from "react";

import { CgProfile } from "react-icons/cg";
import { BiMenu } from "react-icons/bi";
import Button from "../Components/Button";
import { useContext, useRef, useState } from "react";
// import { ContextApi } from "../App";
import { FaHandsHelping } from "react-icons/fa";
// import Profile from "../User_pages/Profile";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Foliox_navbar({ activeRoute }: { activeRoute?: string }) {
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  //   const { toggleSideNav } = useContext(ContextApi);

  const menu = useRef<HTMLDivElement>(null);

  const navigate = useRouter();

  const routesArray = [
    {
      routes: "/",
      routes_text: "Home",
    },
    {
      routes: "/about",
      routes_text: "About Us",
    },
    {
      routes: "/contact",
      routes_text: "Contact Us",
    },
  ];

  //   const token = localStorage.getItem("AccessToken");
  //   function viewMenu() {
  //     toggleSideNav.current?.classList.replace("hidden", "block");
  //     setTimeout(() => {
  //       toggleSideNav.current?.classList.replace(
  //         "translate-x-full",
  //         "translate-x-0"
  //       );
  //     }, 300);
  //     // document.body.classList.add('overflow-hidden')
  //   }

  function handlePop() {
    setIsProfileClicked(true);
  }

  return (
    <>
      <div className="w-full h-auto flex justify-between px-20 max-lg:px-3 max-lg:p-2 shadow-sm shadow-zinc-400">
        <div className="flex items-center gap-16">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-blue-700 rounded-md flex justify-center items-center">
              <FaHandsHelping className="text-2xl text-white" />
            </div>
            <div className="font-bold text-2xl text-blue-700 max-lg:text-xl">
              <Link href={"/"}>Foliox</Link>
            </div>
          </div>
          <div className="flex items-center justify-between  gap-9 text-sm font-semibold  text-gray-500 cursor-pointer max-lg:hidden">
            {routesArray.map((routesArray, index: number) => (
              <Link href={routesArray.routes} key={index}>
                <div
                  className={`h-[60px] flex items-center ${
                    activeRoute == routesArray.routes
                      ? "border-b border-blue-700"
                      : " hover:border-blue-700 hover:border-b"
                  }`}
                >
                  {routesArray.routes_text}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex  items-center gap-3 max-lg:gap-2  font-semibold cursor-pointer text-gray-500">
          <Link href={"/my_app"}>
            <div className="h-[60px] flex items-center  hover:border-blue-700 hover:border-b  max-lg:hidden">
              Back to my page
            </div>
          </Link>
          {/* <div onClick={viewMenu}>
            <div className="hidden max-lg:text-2xl max-lg:block" ref={menu}>
              <BiMenu />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Foliox_navbar;
