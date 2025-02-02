"use client";

import { useRef, useState } from "react";
import Button from "@/app/Components/Button";
import Image from "next/image";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import AccountVerifyModel from "./AccountVerifyModel";
import { domain } from "@/app/config/domain";

const Otp = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(5).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    console.log("OTP Entered:", otpCode);

    const response = await fetch(`${domain}/api/access/verify_otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("AccessToken") || "",
      },
      body: JSON.stringify({ otp_code: otpCode }),
    });

    if (response.ok) {
      console.log(await response.text());
      setIsSuccess(true);
    } else {
      console.error("OTP Verification Failed:", await response.text());
    }
  };

  return (
    <section className="w-full h-screen background p-5 flex gap-4 justify-center items-center">
      {!isSuccess ? (
        <div className="flex flex-col justify-center items-center">
          <div className="relative">
            <Image src="/blob.png" alt="Blob" width={200} height={200} />
            <BsFillEnvelopeAtFill className="text-[70px] text-white absolute top-10 right-16" />
          </div>

          <div className="w-full max-w-[450px] rounded-2xl space-y-3 p-4">
            <h1 className="background-text py-2 font-semibold text-center text-xl">
              Verify Your Email
            </h1>
            <p className="surface-text font-semibold py-2 text-sm text-center">
              We just sent a four-digit code to your email. Enter the code to
              complete verification.
            </p>

            <div className="flex justify-between my-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  // @ts-ignore
                  ref={(el: HTMLInputElement) =>
                    (inputRefs.current[index] = el!)
                  }
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="surface surface-text w-[50px] h-[50px] text-center outline-none focus:border focus:border-pink-700"
                />
              ))}
            </div>

            <div className="space-y-4 flex flex-col justify-center my-7">
              <Button
                type="submit"
                btn_text="Continue"
                additionalclass="p-3"
                handleClick={handleVerifyOtp}
              />
              <Button
                type="submit"
                btn_text="Resend"
                additionalclass="p-3 !bg-transparent !text-pink-700"
              />
            </div>
          </div>
        </div>
      ) : (
        <AccountVerifyModel />
      )}
    </section>
  );
};

export default Otp;
