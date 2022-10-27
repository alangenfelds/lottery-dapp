import React from "react";
import { useMetamask } from "@thirdweb-dev/react";

type Props = {};

const Login = (props: Props) => {
  const connectWithMetaMask = useMetamask();
  return (
    <div className="min-h-screen bg-[#091B18] flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <img
          className="rounded-full h-56 w-56 mb-10"
          src="/PinClipart.com_poker-clip-art_5799809.png"
          alt="login screen logo"
        />
        <h1 className="text-6xl text-white font-bold">WEB3 LOTTERY</h1>
        <h2 className="mt-5 text-white">
          Get started by connecting to your wallet
        </h2>

        <button
          onClick={connectWithMetaMask}
          className="mt-10 px-8 py-5 bg-gray-100 hover:bg-white rounded-lg shadow-lg font-bold"
        >
          Connect MetaMask Wallet
        </button>
      </div>
    </div>
  );
};

export default Login;
