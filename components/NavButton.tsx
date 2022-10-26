import React from "react";

type Props = {
  title: string;
  isActive?: boolean;
};

const NavButton = ({ title, isActive }: Props) => {
  return (
    <button
      className={`${
        isActive && "bg-[#036756]"
      } hover:bg-[#036756] text-white font-semibold py-2 px-4 rounded`}
    >
      {title}
    </button>
  );
};

export default NavButton;
