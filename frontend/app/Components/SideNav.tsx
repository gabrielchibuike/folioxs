"use client";
import { TbTemplate } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { BsPalette } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { AiOutlineAppstore } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHandsHelping } from "react-icons/fa";

function SideNav({ link }: { link?: string }) {
  const Navigation = useRouter();

  const navList = [
    {
      navName: "Links",
      icon: <AiOutlineAppstore className=" text-2xl" />,
      navigate: "/dashboard",
    },
    {
      navName: "Apperance",
      icon: <BsPalette className=" text-2xl" />,
      navigate: "#",
      comingSoon: "coming soon",
    },
    {
      navName: "Templates",
      icon: <TbTemplate className=" text-2xl" />,
      navigate: "/templates",
    },
    {
      navName: "Settings",
      icon: <CiSettings className=" text-2xl" />,
      navigate: "/order",
    },
  ];

  return (
    <>
      <div className="w-full max-w-[250px] h-screen flex flex-col px-3  justify-between surface max-lg:hidden">
        <div>
          <div className="flex gap-2 items-center py-5 px-4">
            <div className="p-1 bg-pink-700 rounded-md flex justify-center items-center">
              <FaHandsHelping className="text-2xl text-white" />
            </div>
            <div className="font-bold text-2xl text-pink-700 max-lg:text-xl">
              <Link href={"/"}>Foliox</Link>
            </div>
          </div>
          <div className="mt-4">
            {navList.map((loop, index) => (
              <div
                className="  py-3  cursor-pointer flex flex-col justify-around "
                key={index}
              >
                <Link href={loop.navigate}>
                  <div className=" ">
                    <div
                      className={`w-full font-bold rounded-lg text-sm   flex flex-row py-2 px-2 items-center  gap-4 ${
                        link == loop.navigate ? "styles primary" : "hover"
                      }`}
                    >
                      <div>{loop.icon}</div>
                      <div className=" max-lg:hidden">{loop.navName}</div>
                      <div className="flex  mt-3 ml-1 ">
                        <span className="text-xs">{loop.comingSoon}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='"h-[60px] pt-8  cursor-pointer flex flex-col justify-around"'>
          <div className="h-[40px] flex items-center gap-4   rounded transition-all ">
            <div className="pl-3">
              <CgLogOut className="text-2xl" />
            </div>
            <div
              className=" text-sm  font-bold max-lg:hidden"
              onClick={() => {
                //   localStorage.clear("token");
                setTimeout(() => {
                  Navigation.push("/");
                }, 5000);
              }}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
