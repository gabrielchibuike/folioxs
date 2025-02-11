"use client";

import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";
import { useMyContext } from "../Redux/Store";
import { decoded } from "../lib/getDecodedToken";
import { domain } from "../config/domain";

function DeletePopUpModel() {
  const { TrashPopUpModel, linkId, setProjectLink } = useMyContext();

  async function handleDelete() {
    const data = {
      linkId: linkId,
      // email: decoded.email,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          localStorage && (localStorage.getItem("AccessToken") as string),
      },
      body: JSON.stringify(data),
    };

    const request = await fetch(`${domain}/api/remove_project`, option);
    if (request.ok) {
      const result = await request.json();
      TrashPopUpModel.current?.classList.replace("flex", "hidden");
      const newData = result.selected_template[0].links;
      setProjectLink(newData);
      console.log(result);
    } else {
      const result = await request.text();
      console.log(result);
    }
  }
  return (
    <>
      <div
        className="w-full  h-screen hidden justify-center items-center backdrop-blur-md  absolute max-lg:fixed top-0 "
        ref={TrashPopUpModel}
      >
        <div className="w-[530px]  max-lg:h-screen max-lg:w-full  bg-black rounded-xl ">
          <div className="w-[530px] max-lg:h-screen max-lg:w-full   surface rounded-xl p-6 ">
            <div className="w-full flex justify-end">
              <div
                className="hover:bg-zinc-500/50 cursor-pointer w-6 h-6 flex justify-center items-center  rounded-full "
                onClick={() => {
                  TrashPopUpModel.current?.classList.replace("flex", "hidden");
                }}
              >
                <AiOutlineClose className="text-zinc-300" />
              </div>
            </div>
            <h1 className="surface-text py-4 text-center font-bold">
              Are you sure you want to delete this project
            </h1>
            <div>
              <div className="w-full my-5">
                <Button
                  additionalclass="w-full p-3"
                  btn_text={"Continue"}
                  handleClick={handleDelete}
                />
              </div>
              <div className="w-full my-5">
                <Button
                  additionalclass="w-full p-3 primary-border primary-text bg-transparent"
                  btn_text={"Cancle"}
                  handleClick={() => {
                    TrashPopUpModel.current?.classList.replace(
                      "flex",
                      "hidden"
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeletePopUpModel;
