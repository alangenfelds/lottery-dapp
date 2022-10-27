import type { NextPage } from "next";
import Head from "next/head";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import toast from "react-hot-toast";

import Header from "../components/Header";
import Login from "../components/Login";
import Loader from "../components/Loader";
import { useState } from "react";
import { ethers } from "ethers";
import { CURRENCY } from "../constants";
import CountdownTimer from "../components/CountdownTimer";

// https://www.youtube.com/watch?v=oNlhptQmChc&t=2050s

// https://thirdweb.com/contracts/release/QmNSascG7Nce6Qjqkmp1buqrV8GKYkUToZ8KPdxHesQNPj

// https://thirdweb.com/mumbai/0xF5F4C3da2e87d2506506c34b5E6f25066412C7ea/

const Home: NextPage = () => {
  const [quantity, setQuantity] = useState(1);

  const address = useAddress();
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );

  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );
  const { data: currentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );
  const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
  const { data: ticketCommission } = useContractRead(
    contract,
    "ticketCommission"
  );

  const { data: expriration } = useContractRead(contract, "expiration");

  const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets");

  const handleBuyTicket = async () => {
    if (!ticketPrice) return;
    const data = await BuyTickets({
      value: ethers.utils.parseEther(
        Number(ethers.utils.formatEther(ticketPrice) * quantity).toString()
      ),
    });

    // console.info("contract call successs", data);
    const notification = toast.loading("Buying your tickets...");

    try {
      toast.success("SUCCESS!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Ooops. Something went wrong!", {
        id: notification,
      });
    }
  };

  if (isLoading) return <Loader />;

  if (!address) return <Login />;

  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col text-white">
      <Head>
        <title>Web3 Lottery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="md:flex md:flex-row flex-col items-start justify-center space-y-5 md:space-y-0 md:space-x-5 m-5">
        <div className="stats-container">
          <h1 className="text-5xl font-semibold text-center">The Next Draw</h1>
          <div className="flex justify-between p-2 space-x-2">
            <div className="stats">
              <h2 className="text-sm">Total Pool</h2>
              <p className="text-xl">
                {currentWinningReward &&
                  ethers.utils.formatEther(
                    currentWinningReward.toString()
                  )}{" "}
                {CURRENCY}
              </p>
            </div>
            <div className="stats">
              <h2 className="text-sm">Tickets remaining</h2>
              <p className="text-xl">{Number(remainingTickets)}</p>
            </div>
          </div>

          <div className="mt-5 mb-3">
            <CountdownTimer />
          </div>
        </div>

        <div className="stats-container space-y-2">
          <div className="stats-container">
            <div className="flex justify-between items-center pb-2">
              <h2>Price per ticket</h2>
              <p>
                {ticketPrice &&
                  ethers.utils.formatEther(ticketPrice.toString())}{" "}
                {CURRENCY}
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-[#091F1C] border border-[#004337] p-4">
              <p>TICKETS</p>
              <input
                type="number"
                className="w-full bg-transparent text-right outline-none"
                min={1}
                max={100}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2 mt-5">
              <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
                <p>Total cost of tickets</p>
                <p>
                  {ticketPrice &&
                    Number(ethers.utils.formatEther(ticketPrice.toString())) *
                      quantity}
                </p>
              </div>

              <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                <p>Service fees</p>
                <p>
                  {ticketCommission &&
                    ethers.utils.formatEther(ticketCommission.toString())}{" "}
                  {CURRENCY}
                </p>
              </div>

              <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                <p>+ Network fees</p>
                <p>TBC</p>
              </div>
            </div>

            <button
              disabled={
                expriration?.toString() < Date.now().toString() ||
                Number(remainingTickets) === 0
              }
              className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md shadow-xl disabled:from-gray-600 disabled:to-gray-500 disabled:cursor-not-allowed disabled:text-gray-100"
              onClick={handleBuyTicket}
            >
              Buy tickets
            </button>
          </div>
        </div>
      </div>

      <div>
        <div>Price per ticket box</div>
      </div>
    </div>
  );
};

export default Home;
