import React from "react";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";

import NavButton from "./NavButton";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
// import Image from "next/image";

type Props = {};

const Header = (props: Props) => {
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center">
      <div className="flex items-center space-x-2">
        <img
          className="rounded-full h-20 w-20"
          alt="lottery ball"
          src="/PinClipart.com_poker-clip-art_5799809.png"
        />
        <div>
          <h1 className="text-lg text-white font-bold">Web3 Lottery</h1>
          <p className="text-xs text-emerald-500 truncate">
            Account: {address?.substring(0, 5)}...
            {address?.substring(address.length, address.length - 5)}
          </p>
        </div>
      </div>

      <div className="hidden md:flex md:col-span-3 justify-self-center items-center rounded-md">
        <div className="bg-[#0A1F1C] p-4 space-x-2">
          <NavButton isActive title="Buy tickets" />
          <NavButton title="Logout" onClick={disconnect} />
        </div>
      </div>

      <div className="flex flex-col ml-auto text-right">
        <Bars3BottomRightIcon className="h-8 w-8 mx-auto text-white cursor-pointer" />
        <span className="md:hidden">
          <NavButton title="Logout" onClick={disconnect} />
        </span>
      </div>
    </header>
  );
};

export default Header;
