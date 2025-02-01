"use client";
import { BsPalette, BsShareFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { TbTemplate } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { AiOutlineAppstore } from "react-icons/ai";

function ButtonNav({ link }: { link?: string }) {
  const MobileNavList = [
    {
      navName: "Links",
      icon: <AiOutlineAppstore className=" text-xl" />,
      navigate: "/dashboard",
    },
    {
      navName: "Template",
      icon: <TbTemplate className=" text-xl" />,
      navigate: "/templates",
    },
    {
      navName: "Apperance",
      icon: <BsPalette className=" text-xl" />,
      navigate: "/recently-added",
    },
    {
      navName: "Settings",
      icon: <CiSettings className=" text-xl" />,
      navigate: "/order",
    },
  ];
  return (
    <>
      <div className="w-full h-[50px] background fixed bottom-0  hidden max-lg:block">
        <div className="w-full h-[50px] surface ">
          <div className="h-[50px] flex justify-between items-center px-4">
            {MobileNavList.map((loop, index) => (
              <div className="" key={index}>
                <Link href={loop.navigate}>
                  <div
                    className={`w-[90p flex justify-center items-center gap-2 dark:text-white text-zinc-700 px-3  py-2 rounded-full ${
                      link == loop.navigate ? "styles primary" : ""
                    }`}
                    key={index}
                  >
                    <div className=" ">{loop.icon}</div>
                    <div
                      className={`text-[14px] font-medium  ${
                        link == loop.navigate ? "block" : "hidden"
                      }`}
                    >
                      {loop.navName}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ButtonNav;
