import React, { useEffect, useRef, useState } from "react";
import { domain } from "../config/domain";
import { decoded } from "../lib/getDecodedToken";
import Image from "next/image";
import Button from "./Button";
import { useMyContext } from "../Redux/Store";

function ReuseableTemplate() {
  const [allTemplate, setAllTemplate] = useState<{}[]>([]);

  const { selectedTemplate, setSelectedTemplate } = useMyContext();

  const displayBorder = useRef<HTMLDivElement[]>([]);

  async function getTemplate() {
    try {
      const templates = await fetch(`${domain}/api/get_all_template`, {
        headers: {
          "x-auth-token":
            localStorage && (localStorage.getItem("AccessToken") as string),
        },
      });

      if (!templates.ok) throw new Error("failed to fetch");
      const data: any = await templates.json();
      setAllTemplate(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getTemplate();
  }, []);

  //   async function handleSelect(temp: any) {
  //     const option = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(temp),
  //     };

  //     const request = await fetch(
  //       `${domain}/api/select_template/${decoded.id}/${decoded.email}`,
  //       option
  //     );
  //     if (request.ok) {
  //       const result = await request.text();
  //       console.log(result);
  //     } else {
  //       const result = await request.text();
  //       console.log(result);
  //     }
  //   }

  function handleSelect(temp: any, index: number) {
    setSelectedTemplate([temp]);

    displayBorder.current.forEach((ele, _) => {
      ele.classList.replace("border", "border-none");
    });

    displayBorder.current[index].classList.replace("border-none", "border");
  }

  //   useEffect(() => {
  //     console.log(selectedTemplate);
  //   }, [selectedTemplate]);
  return (
    <>
      <div className="w-full">
        <div className=" w-full  max-lg:py-3 max-lg:px-6">
          <div className=" grid  grid-cols-3 max-lg:justify-items-center gap-4 max-lg:grid-cols-2  max-lg:gap-">
            {allTemplate.map((temp: any, i: any) => (
              <div
                className="w-[260px] h-[390px] max-lg:w-[130px] max-lg:h-[170px] cursor-pointer border-none primary-border"
                key={i}
                onClick={() => handleSelect(temp, i)}
                ref={(e: HTMLDivElement) => {
                  displayBorder.current[i] = e;
                }}
              >
                <Image
                  src={`${domain}/staticImages/${temp.templateImage}`}
                  width={200}
                  height={200}
                  alt=""
                  className=" w-[260px] h-full max-lg:w-[150px] max-lg:h-[170px]"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReuseableTemplate;
