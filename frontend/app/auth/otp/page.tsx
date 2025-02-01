"use client";

import Button from "@/app/Components/Button";
import Image from "next/image";
import { useRef, useState } from "react";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import AccountVerifyModel from "./AccountVerifyModel";
import { domain } from "@/app/config/domain";
function Otp() {
  const [IsDisplaySuccessBox, setIsDisplaySuccessBox] = useState(false);
  let otpcode = "";
  let inputs: any[] = [];
  for (let i = 0; i < 5; i++) {
    inputs[i] = useRef(null);
  }

  function handleInput(index: number) {
    if (index == inputs.length - 1) {
      inputs[index].current.disabled = "true";
    } else {
      inputs[index + 1].current?.focus();
      inputs[index].current.disabled = "true";
    }
    return new Promise((resovle) => {
      resovle((otpcode += inputs[index].current?.value));
    });
  }

  async function handleVerifyOtp() {
    const con = otpcode;
    console.log(con);

    const data = {
      otp_code: con,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
      body: JSON.stringify(data),
    };

    const resquest = await fetch(`${domain}/api/access/verify_otp`, option);

    if (resquest.ok) {
      const result = await resquest.text();
      setIsDisplaySuccessBox(true);
    } else {
      const result = await resquest.text();

      console.log(result);
    }
  }

  return (
    <>
      <section className="w-full h-screen background p-5 flex gap-4 justify-center items-center ">
        {IsDisplaySuccessBox == false ? (
          <div className="flex flex-col justify-center items-center">
            <div className="relative ">
              <Image src={"/blob.png"} alt="" width={200} height={200} />
              <BsFillEnvelopeAtFill className="text-[70px] text-white absolute top-10 right-16" />
            </div>

            <div className="w-full max-w-[450px] rounded-2xl space-y-3 max-lg:bg-[transparent] p-4 ">
              <div>
                <h1 className="background-text py-2 font-semibold text-center text-xl">
                  {" "}
                  verify your email
                </h1>
                <p className="surface-text font-semibold py-2  text-sm text-center">
                  we ve just sent a four digit code to your email. Enter the
                  four digit code to complete verification
                </p>
              </div>
              <div className="space-y-  w-full flex flex-col justify-center">
                <div className="flex justify-between my-3">
                  {inputs.map((loop, index) => (
                    <input
                      type="text"
                      maxLength={1}
                      ref={loop}
                      onChange={() => handleInput(index)}
                      className={`surface surface-text w-[50px] h-[50px] text-center outline-none focus:border focus:border-pink-700 `}
                      key={index}
                    />
                  ))}
                </div>

                <div className="space-y-4 flex flex-col justify-center my-7">
                  <Button
                    type="submit"
                    btn_text={"Continue"}
                    additionalclass="p-3"
                    handleClick={handleVerifyOtp}
                    // disabled={disabledBtn}
                  />
                  <Button
                    type="submit"
                    btn_text={"Resend"}
                    additionalclass="p-3 !bg-transparent !text-pink-700"
                    // handleClick={handleSubmit}
                    // disabled={disabledBtn}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <AccountVerifyModel />
        )}
      </section>
    </>
  );
}

export default Otp;
