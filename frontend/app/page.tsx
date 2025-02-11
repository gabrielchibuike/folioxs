"use client";
import Link from "next/link";
import React from "react";
import { FaHandsHelping } from "react-icons/fa";
import Button from "./Components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Home() {
  const route = useRouter();
  return (
    <>
      <div className="w-full min-h-screen px-10 surface max-lg:px-2">
        <div className="flex justify-between  items-center">
          <div className="flex gap-2 items-center py-3 ">
            <div className="p-1 bg-pink-700 rounded-md flex justify-center items-center">
              <FaHandsHelping className="text-2xl text-white" />
            </div>
            <div className="font-bold text-2xl text-pink-700 max-lg:text-xl">
              <Link href={"/"}>Foliox</Link>
            </div>
          </div>
          <div>
            <Button
              btn_text={"Login"}
              additionalclass="border bg-transparent border-pink-700 primary-text"
              handleClick={() => {
                route.push("/auth/login");
              }}
            />
          </div>
        </div>
        <div className="flex justify-center flex-col items-center w-full py-36 space-y-4">
          <h1 className="text-6xl max-lg:text-4xl font-bold font-[poppins] text-center primary-text">
            Foliox - No One Portfiolo Builder
          </h1>
          <p className="py-4 text-lg max-lg:text-base font-medium text-center surface-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio nemo
            similique repellendus cum aliquid <br />
            temporibus sapiente ducimus ab provident, fugiat, aliquam tempora
          </p>
          <div>
            <Button
              btn_text={"Get Started"}
              additionalclass=""
              handleClick={() => {
                route.push("/auth/signup");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
