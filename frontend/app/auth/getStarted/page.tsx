"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { InputsTypes, socialHandleType } from "@/app/interface";
import Step3 from "./Step3";
import { domain } from "@/app/config/domain";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { decoded } from "@/app/lib/getDecodedToken";
import Step4 from "./Step4";
import { useMyContext } from "@/app/Redux/Store";
function GetStarted() {
  const route = useRouter();
  const [Inputs, setInputs] = useState<InputsTypes>({
    title: "",
    bio: "",
    socialHandle: [],
    userName: "",
  });

  const [SocialInputTag, setSocialInputTag] = useState<any>({
    Spotify: "",
    YouTube: "",
    Whatsapp: "",
    X: "",
    Instagram: "",
  });

  const [step, setSteps] = useState<number>(0);

  const { selectedTemplate } = useMyContext();

  const [Records, setRecords] = useState<InputsTypes>({
    title: "",
    bio: "",
    socialHandle: [],
    userName: "",
    selected_template: [],
  });

  const [err, setErr] = useState("");

  const [selectSocialHandle, setSelectSocialHandle] = useState<
    socialHandleType[]
  >([]);

  const [selectedFile, setSelectedFile] = useState<any>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  }

  // interface newJwtPayLoad extends JwtPayload {
  //   id: string;
  //   email: string;
  // }
  // const token = localStorage.getItem("AccessToken");
  // const decoded: newJwtPayLoad = jwtDecode(token!);

  // console.log(decoded);

  // useEffect(() => {
  //   console.log(selectedTemplate);
  // }, [selectedTemplate]);

  function handleStep(index: number) {
    if (index == 1) {
      setSteps(1);
      setRecords((previnfo) => {
        return {
          ...previnfo,
          id: decoded.id,
          email: decoded.email,
          title: Inputs.title,
          bio: Inputs.bio,
        };
      });
    } else if (index == 2) {
      setRecords((previnfo) => {
        return {
          ...previnfo,
          socialHandle: [SocialInputTag],
        };
      });
      setSteps(2);
    } else if (index == 3) {
      validateUserName(Inputs.userName);
    } else if (index == 4) {
      setRecords((previnfo) => {
        return {
          ...previnfo,
          selected_template: selectedTemplate[0],
        };
      });
      setSteps(4);
    }
  }

  async function validateUserName(value: string) {
    if (value === "") {
      return setErr("This field cannot be empty");
    }
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: value }),
    };

    const request = await fetch(
      `${domain}/api/access/validateUserName`,
      option
    );

    if (request.ok) {
      setRecords((previnfo) => {
        return {
          ...previnfo,
          userName: Inputs.userName,
        };
      });
      setSteps(3);
    } else {
      setErr(await request.text());
    }
  }

  setTimeout(() => {
    setErr("");
  }, 2000);

  function handleStepBackward(index: number) {
    if (index == 1) {
      setSteps(0);
    } else if (index == 2) {
      setSteps(1);
    }
  }

  // async function routeNext() {
  //   console.log(Records);
  //   const formData = new FormData();
  //   formData.append("file", selectedFile);
  //   formData.append("jsonData", JSON.stringify(Records));
  //   const option = {
  //     method: "POST",
  //     body: formData,
  //   };
  //   const request = await fetch(`${domain}/api/access/get_started`, option);

  //   if (request.ok) {
  //     const result = await request.text();
  //     console.log(result);

  //     localStorage.setItem("AccessToken", result);
  //     route.push("/auth/otp");
  //   } else {
  //     const result = await request.text();
  //     console.log(result);
  //   }
  // }

  const routeNext = useCallback(async () => {
    console.log(Records);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("jsonData", JSON.stringify(Records));

    const option = {
      method: "POST",
      body: formData,
    };

    const request = await fetch(`${domain}/api/access/get_started`, option);

    if (request.ok) {
      const result = await request.text();
      console.log(result);

      if (typeof window !== "undefined" || localStorage) {
        localStorage.setItem("AccessToken", result);
      }
      route.push("/auth/otp");
    } else {
      const result = await request.text();
      console.log(result);
    }
  }, [Records, selectedFile, route]);

  useEffect(() => {
    if (step == 4) {
      routeNext();
    }
  }, [step, routeNext]);

  return (
    <>
      <div className="flex gap-3">
        {step == 0 ? (
          <Step1
            Inputs={Inputs}
            handleStep={() => handleStep(1)}
            handleChange={handleChange}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        ) : step == 1 ? (
          <Step2
            SocialInputTag={SocialInputTag}
            setSocialInputTag={setSocialInputTag}
            handleStep={() => handleStep(2)}
            handleStepBackward={() => handleStepBackward(1)}
            selectSocialHandle={selectSocialHandle}
            setSelectSocialHandle={setSelectSocialHandle}
          />
        ) : step == 2 ? (
          <Step3
            Inputs={Inputs}
            handleStep={() => handleStep(3)}
            handleStepBackward={() => handleStepBackward(2)}
            handleChange={handleChange}
            Err={err}
          />
        ) : step == 3 ? (
          <Step4
            handleStep={() => handleStep(4)}
            handleStepBackward={() => handleStepBackward(3)}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default GetStarted;
