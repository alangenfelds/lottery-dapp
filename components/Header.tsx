import React from "react";
import NavButton from "./NavButton";
// import Image from "next/image";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <img
          className="rounded-full h-20 w-20"
          alt="lottery ball"
          src="/PinClipart.com_poker-clip-art_5799809.png"
        />
        <div>
          <h1 className="text-lg text-white font-bold">Web3 Lottery</h1>
          <p className="text-xs text-emerald-500 truncate">User logged in</p>
        </div>
      </div>

      <div>
        <div className="bg-[#0A1F1C]">
          <NavButton />
          <NavButton />
        </div>
      </div>

      <div>Right</div>
    </div>
  );
};

export default Header;
