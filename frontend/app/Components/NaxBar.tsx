import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <>
      <ul className="w-full max-w-[350px] flex items-center justify-between  p-4  max-md:px-4 absolute text-zinc-200 z-50">
        <div className="font-medium text-orange-400">AEmmanuel</div>

        <div className="font-medium flex gap-4 text-sm ">
          <Link
            href="/dashboard"
            className="hover:text-orange-400 text-zinc-300"
          >
            My DashBoard
          </Link>
          <Link href="/about" className="hover:text-orange-400 text-zinc-300">
            Logout
          </Link>
        </div>
      </ul>
    </>
  );
}

export default NavBar;
