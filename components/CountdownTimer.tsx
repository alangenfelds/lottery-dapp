import React from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Coundtdown, { CountdownRenderProps } from "react-countdown";

type Props = {};

const CountdownTimer = (props: Props) => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );

  const { data: expriration, isLoading } = useContractRead(
    contract,
    "expiration"
  );

  const renderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <div>
          <h2 className="text-white text-xl- text-center animate-bounce">
            Ticket sales have now CLOSED for this draw
          </h2>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="text-white text-sm mb-2 italic">Time Remaining</h3>
          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="countdown animate-pulse">
                {isLoading ? "__" : hours}
              </div>
              <div className="countdown-label">hours</div>
            </div>
            <div className="flex-1">
              <div className="countdown animate-pulse">
                {isLoading ? "__" : minutes}
              </div>
              <div className="countdown-label">minutes</div>
            </div>
            <div className="flex-1">
              <div className="countdown animate-pulse">
                {isLoading ? "__" : seconds}
              </div>
              <div className="countdown-label">seconds</div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Coundtdown date={new Date(expriration * 1000)} renderer={renderer} />
    </div>
  );
};

export default CountdownTimer;
