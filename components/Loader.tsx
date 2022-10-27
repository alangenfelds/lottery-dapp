import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="bg-[#091B18] h-screen flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 mb-10">
        <img
          className="rounded-full h-20 w-20"
          src="/3d-lottery-keno-number-ballgold-260nw-590591747.webp"
          alt="login screen logo"
        />
        <h1 className="text-lg text-white font-bold">
          Loading the WEB3 LOTTERY
        </h1>
      </div>
      <PropagateLoader color="white" size={30} />
    </div>
  );
};

export default Loader;
