"use client";
import { BsShieldCheck } from "react-icons/bs";
import Button from "@/app/Components/Button";
import RoundedCircle from "@/app/Components/RoundedCircle";
import React from "react";
import { useRouter } from "next/navigation";

function AccountVerifyModel() {
  const route = useRouter();
  return (
    <>
      {/* <section className='className="w-full h-screen background flex flex-col justify-center items-center "'> */}
      <div className="w-full max-w-[500px] h-[300px] surface flex flex-col justify-center items-center rounded-xl">
        <RoundedCircle additional_class="">
          <BsShieldCheck className="text-5xl text-pink-700" />
        </RoundedCircle>
        <h1 className="background-text py-2 font-semibold text-center text-xl">
          Your account has been verify.
        </h1>
        <div className="py-4 w-full px-4">
          <Button
            btn_text={"Continue"}
            additionalclass="p-3 w-full"
            handleClick={() => {
              route.push("/dashboard");
            }}
          />
        </div>
      </div>
      {/* </section> */}
    </>
  );
}

export default AccountVerifyModel;
