import React from "react";
import {
  StarIcon,
  CurrencyEuroIcon,
  ArrowPathIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/solid";
import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { CURRENCY } from "../constants";
import toast from "react-hot-toast";

type Props = {};

const AdminControls = (props: Props) => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: operatorTotalCommission } = useContractRead(
    contract,
    "operatorTotalCommission"
  );
  const { mutateAsync: DrawWinnerTicket } = useContractWrite(
    contract,
    "DrawWinnerTicket"
  );

  const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll");

  const { mutateAsync: RestartDraw } = useContractWrite(
    contract,
    "restartDraw"
  );

  const { mutateAsync: WithdrawCommission } = useContractWrite(
    contract,
    "WithdrawCommission"
  );

  const drawWinner = async () => {
    const notification = toast.loading("Picking a lucky winner...");

    try {
      const data = await DrawWinnerTicket([{}]);
      // console.info("contract call successs", data);
      toast.success("Winner has been selected", {
        id: notification,
      });
    } catch (err) {
      toast.error("Ooops. Something went wrong!", {
        id: notification,
      });
    }
  };

  const restartDraw = async () => {
    const notification = toast.loading("Restarting the draw...");

    try {
      const data = await RestartDraw([{}]);
      // console.info("contract call successs", data);
      toast.success("Draw restarted successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Ooops. Something went wrong!", {
        id: notification,
      });
    }
  };

  const refundAll = async () => {
    const notification = toast.loading("Refunding all...");

    try {
      const data = await RefundAll([{}]);
      // console.info("contract call successs", data);
      toast.success("Winnings refunded successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Ooops. Something went wrong!", {
        id: notification,
      });
    }
  };

  const withdrawCommission = async () => {
    const notification = toast.loading("Withdrawing commission...");

    try {
      const data = await WithdrawCommission([{}]);
      // console.info("contract call successs", data);
      toast.success("Commission withdrawn successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Ooops. Something went wrong!", {
        id: notification,
      });
    }
  };

  return (
    <div className="text-center px-5 py-3 rounded-md border border-emerald-300/20">
      <h2 className="font-bold">Admin Controls</h2>
      <p className="mb-5">
        Total Commision to be withdrawn:{" "}
        <span className="font-semibold">
          {operatorTotalCommission &&
            ethers.utils.formatEther(operatorTotalCommission)}{" "}
        </span>
        {CURRENCY}
      </p>

      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <button onClick={drawWinner} className="admin-button">
          <StarIcon className="h-6 mx-auto mb-2" />
          Draw Winner
        </button>
        <button onClick={withdrawCommission} className="admin-button">
          <CurrencyEuroIcon className="h-6 mx-auto mb-2" />
          Withdraw Commission
        </button>
        <button onClick={restartDraw} className="admin-button">
          <ArrowPathIcon className="h-6 mx-auto mb-2" />
          Restart Draw
        </button>
        <button onClick={refundAll} className="admin-button">
          <ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
          Refund All
        </button>
      </div>
    </div>
  );
};

export default AdminControls;
