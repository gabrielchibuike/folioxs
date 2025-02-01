import React, { ReactNode } from "react";

function RoundedCircle({
  additional_class,
  children,
}: {
  additional_class: string;
  children: ReactNode;
}) {
  return (
    <>
      <div
        className={`w-[100px] h-[100px] primary-opacity rounded-full flex justify-center items-center ${additional_class}`}
      >
        {children}
      </div>
    </>
  );
}

export default RoundedCircle;
