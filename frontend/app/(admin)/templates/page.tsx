"use client";
import ButtonNav from "@/app/Components/ButtonNav";
import ReuseableTemplate from "@/app/Components/ReuseableTemplate";
import SideNav from "@/app/Components/SideNav";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";
import { FaHandsHelping } from "react-icons/fa";

function page() {
  // const [allTemplate, setAllTemplate] = useState<{}[]>([]);

  // async function getTemplate() {
  //   try {
  //     const templates = await fetch(`${domain}/api/get_all_template`);
  //     if (!templates.ok) throw new Error("failed to fetch");
  //     const data: any = await templates.json();
  //     setAllTemplate(data);
  //     // console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // useEffect(() => {
  //   getTemplate();
  // }, []);

  // async function handleSelect(temp: any) {
  //   const option = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(temp),
  //   };

  //   const request = await fetch(
  //     `${domain}/api/select_template/${decoded.id}/${decoded.email}`,
  //     option
  //   );
  //   if (request.ok) {
  //     const result = await request.text();
  //     console.log(result);
  //   } else {
  //     const result = await request.text();
  //     console.log(result);
  //   }
  // }

  return (
    <>
      <div className="flex w-full">
        <SideNav link="/templates" />
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
          <div className="w-full h-screen py-5 px-5 ">
            <ReuseableTemplate />
          </div>
        </div>
      </div>
      <ButtonNav link="/templates" />
    </>
  );
}

export default page;
