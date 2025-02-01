"use client";
import React, { useContext, useState } from "react";
import SideNav from "../../Components/SideNav";
import AdminDashBoard from "./AdminDashBoard";
import ButtonNav from "../../Components/ButtonNav";
import { FaHandsHelping } from "react-icons/fa";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";
import PopUp from "../../Components/PopUp";
import DeletePopUpModel from "@/app/Components/DeletePopUpModel";

function page() {
  return (
    <>
      <div className="flex w-full background">
        <SideNav link="/dashboard" />
        <div className="w-full">
          <div className="w-full p-1 px-6 surface lg:hidden flex justify-between items-center">
            <div className="flex gap-2 items-center py-2 ">
              <div className="p-1 bg-pink-700 rounded-md flex justify-center items-center">
                <FaHandsHelping className="text-2xl text-white" />
              </div>
              <div className="font-bold text-2xl text-pink-700 max-lg:text-xl">
                <Link href={"/"}>Foliox</Link>
              </div>
            </div>
            <div className="cursor-pointer">
              <CiSettings className=" text-2xl" />
            </div>
          </div>
          <AdminDashBoard />
        </div>
        {/* <Organizer_dashboard /> */}
      </div>
      <ButtonNav link="/dashboard" />
      <PopUp />
      <DeletePopUpModel />
    </>
  );
}

export default page;
