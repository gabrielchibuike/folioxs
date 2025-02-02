"use client";
import Button from "@/app/Components/Button";
import CustomInput from "@/app/Components/CustomInput";
import { loginSchema } from "@/app/validation";
import { useFormik } from "formik";
import Link from "next/link";
import React, { ChangeEvent, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FaHandsHelping } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { domain } from "@/app/config/domain";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const disabledBtn = useRef<HTMLButtonElement>(null);
  const [Toast, setToast] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const route = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  async function handleLogin() {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    setIsLoading(true);
    disabledBtn.current!.disabled = true;
    const request = await fetch(`${domain}/api/access/login`, option);

    if (request.ok) {
      const result = await request.text();
      setIsLoading(false);
      disabledBtn.current!.disabled = false;

      if (typeof window !== "undefined" || localStorage) {
        localStorage.setItem("AccessToken", result);
      }
      setTimeout(() => {
        if (typeof window !== "undefined") window.location.href = "/dashboard";
      }, 1000);
    } else {
      const result = await request.text();
      setErrMsg(result);
      disabledBtn.current!.disabled = false;
      setIsLoading(false);
      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 9000);
    }
  }
  return (
    <>
      <section>
        <div className="w-full h-screen py-16  flex justify-center items-center flex-col">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-pink-700 rounded-md flex justify-center items-center">
                <FaHandsHelping className="text-2xl text-white" />
              </div>
              <div className="font-bold text-3xl text-pink-700 ">Foliox</div>
            </div>
            <p className="font-medium text-zinc-600 ">
              Login to continue with Foliox
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-4 w-full  max-w-[500px] rounded-lg flex flex-col justify-center space-y-5 my-2 max-lg:shadow-transparent"
          >
            <CustomInput
              additionalclass={``}
              placeholder="Email"
              name={"email"}
              value={values.email}
              type="email"
              handleInput={handleChange}
              err_msg={errors.email}
            />
            <CustomInput
              additionalclass={``}
              placeholder="Password"
              name={"password"}
              value={values.password}
              type="password"
              handleInput={handleChange}
              err_msg={errors.password}
            />

            {Toast && (
              <div className="w-full bg-red-600/10  flex justify-center p-3">
                <p className="text-red-600/90 text-sm font-base">{errMsg}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-2">
                <input type="checkbox" />
                <div className="text-sm text-zinc-600 font-medium">
                  Remember me
                </div>
              </div>
              <Link
                href={"/verify-email"}
                className="text-sm text-zinc-600 font-medium"
              >
                {" "}
                Forget Password{" "}
              </Link>
            </div>
            <Button
              type="submit"
              btn_text={
                isLoading ? (
                  <div className="animate-spin w-full flex justify-center  text-2xl">
                    <BiLoaderAlt className="text-white" />
                  </div>
                ) : (
                  "Login"
                )
              }
              additionalclass="p-3"
              // handleClick={handleSubmit}
              disabled={disabledBtn}
            />
            <div className="flex justify-between gap-5">
              <p className="text-sm text-zinc-600 font-medium">
                You don&apos;t have an account ?{" "}
              </p>{" "}
              <Link
                href={"/auth/signup"}
                className="text-pink-700 text-sm font-bold"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
