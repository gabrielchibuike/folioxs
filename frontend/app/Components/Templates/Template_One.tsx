"use client";
import { MdContentCopy } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { domain } from "@/app/config/domain";

import Link from "next/link";
import { useMyContext } from "@/app/Redux/Store";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { decoded } from "@/app/lib/getDecodedToken";

function Template_One() {
  const { setProjectLink, projectLink, template_one, setTemplate_one } =
    useMyContext();

  // const [template_one, setTemplate_one] = useState([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const route = useRouter();

  async function getTemplate() {
    if (typeof window === "undefined") return; // Ensure it runs only on the client

    const token = localStorage.getItem("AccessToken");
    if (!token) return;

    const result = await fetch(`${domain}/api/user_template/${decoded?.id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    try {
      if (!result.ok) throw new Error("failed to fetch");

      const data: any = await result.json();

      console.log(data);

      setTemplate_one(data);

      const newData = data[0].links;

      setProjectLink(newData);
    } catch (err) {
      if (result.status == 403) route.push("/auth/login");
    }
  }

  useEffect(() => {
    getTemplate();
  }, []);

  return (
    <>
      {template_one.length === 0 ? (
        <div className="flex items-center justify-center space-y-2 flex-col w-full h-[450px] max-lg:min-h-screen">
          <p className="text-base font-semibold surface-text text-center">
            No template yet, select template to continue
          </p>
          <Button
            additionalclass=""
            btn_text={"Select template"}
            handleClick={() => {
              route.push("/templates");
            }}
          />
        </div>
      ) : (
        template_one.map((ele: any, i) => (
          <section
            key={i}
            className="w-full rounded-2xl max-lg:max-w-full min-h-screen bg-black"
          >
            <div className=" w-full  max-md:max-w-full min-h-screen backdrop-blur-lg">
              <div
                className="w-full min-h-screen  flex flex-col justify-center items-center py-20  max-md:px-6 px-4"
                key={i}
              >
                <div className="">
                  <Image
                    src={`${domain}/${ele.profilePictureUrl}`}
                    alt=""
                    className="h-[130px] rounded-full "
                    width={130}
                    height={130}
                  />
                </div>
                <div className="text-center">
                  <div className="text-white text-2xl font-bold py-3">
                    {ele.profileName}
                  </div>
                  <p className="w-full text-center text-zinc-300 text-lg max-md:text-base ">
                    {ele.bio}
                  </p>
                  {/* Social Media Icons */}
                </div>
                <div className="w-full py-7">
                  <div className="w-full flex flex-col items-center  space-y-2">
                    <div className="w-full max-w-[450px] flex justify-start">
                      <h1 className="text-zinc-300 text-sm font-bold py-1">
                        {`${ele.profileName}`} project
                      </h1>
                    </div>
                    <div className="space-y-2 w-full max-w-[450px]">
                      {projectLink == null
                        ? ""
                        : projectLink.map((e: any, i: number) => (
                            <Link
                              key={i}
                              href={e.url == undefined ? "#" : e.url}
                              className="w-full max-w-[450px] max-lg:max-w-full h-14 bg-[black] flex justify-between items-center p-2 cursor-pointer"
                            >
                              {e.linkImage == "" ? (
                                <div className="w-10 h-10 "></div>
                              ) : (
                                <div className=" bg-gray-800 rounded-md overflow-hidden ">
                                  <Image
                                    src={`${domain}/${
                                      e.linkImage && e.linkImage
                                    }`}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 "
                                  />
                                </div>
                              )}
                              {e.title && (
                                <p className="text-center text-zinc-300 text-sm">
                                  {`Click for ${e.title.toLowerCase()}`}
                                </p>
                              )}

                              <div className=" text-zinc-300/50 text-xl">
                                <BiDotsVerticalRounded />
                              </div>
                            </Link>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))
      )}
    </>
  );
}

export default Template_One;
