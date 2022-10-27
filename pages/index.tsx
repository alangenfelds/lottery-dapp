import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import Marquee from "react-fast-marquee";

import Header from "../components/Header";
import Login from "../components/Login";
import Loader from "../components/Loader";
import { CURRENCY } from "../constants";
import CountdownTimer from "../components/CountdownTimer";
import Footer from "../components/Footer";
import AdminControls from "../components/AdminControls";

const Home: NextPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [userTickets, setUserTickets] = useState(0);

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

  const { data: tickets } = useContractRead(contract, "getTickets");

  const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets");

  const { data: winnings } = useContractRead(
    contract,
    "getWinningsForAddress",
    address
  );

  const { mutateAsync: withdrawWinnings } = useContractWrite(
    contract,
    "WithdrawWinnings"
  );

  const { data: lastWinner } = useContractRead(contract, "lastWinner");

  const { data: lastWinnerAmount } = useContractRead(
    contract,
    "lastWinnerAmount"
  );

  const { data: lotteryOperator } = useContractRead(
    contract,
    "lotteryOperator"
  );

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;

    const numberOfUserTickets = totalTickets.reduce(
      (total, currTicketAddress) =>
        currTicketAddress === address ? total + 1 : total,
      0
    );
    setUserTickets(numberOfUserTickets);
  }, [tickets, address]);

  const handleBuyTicket = async () => {
    if (!ticketPrice) return;

    const notification = toast.loading("Buying your tickets...");

    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (
              Number(ethers.utils.formatEther(ticketPrice)) * quantity
            ).toString()
          ),
        },
      ]);
      console.info("contract call successs", data);

      toast.success("Tickets purchased successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Ooops. Something went wrong!", {
        id: notification,
      });
    }
  };

  const handleWithdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing your winnings...");

    try {
      const data = await withdrawWinnings([{}]);
      console.info("withdrawWinnings contract call successs", data);

      toast.success("Congratulations. You got your winnings!", {
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

      <Marquee gradient={false} speed={100} className="bg-[#0A1F1C] p-5 mb-5">
        <div className="flex space-x-2 mx-10">
          <h4 className="font-bold">Last winner: {lastWinner}</h4>
          <h4 className="font-bold">
            Winnings:{" "}
            {lastWinnerAmount &&
              ethers.utils.formatEther(lastWinnerAmount).toString()}
          </h4>
        </div>
      </Marquee>

      {lotteryOperator === address && (
        <div className="flex justify-center">
          <AdminControls />
        </div>
      )}

      <div className="flex-1">
        {winnings > 0 && (
          <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
            <button
              onClick={handleWithdrawWinnings}
              className="p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full"
            >
              <p className="font-bold">Winner Winner!</p>
              <p className="font-semibold">
                Total winnings: {ethers.utils.formatEther(winnings)}
              </p>
              <br />
              <p>Click here to withdraw</p>
            </button>
          </div>
        )}

        <div className="md:flex md:flex-row flex-col items-start justify-center space-y-5 md:space-y-0 md:space-x-5 m-5">
          <div className="stats-container">
            <h1 className="text-5xl font-semibold text-center">
              The Next Draw
            </h1>
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
                      ethers.utils.formatEther(
                        ticketCommission.toString()
                      )}{" "}
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
                className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md shadow-xl disabled:from-gray-600 disabled:to-gray-500 disabled:cursor-not-allowed disabled:text-gray-100 font-semibold"
                onClick={handleBuyTicket}
              >
                Buy {quantity} tickets for{" "}
                {ticketPrice &&
                  Number(ethers.utils.formatEther(ticketPrice)) * quantity}{" "}
                {CURRENCY}
              </button>
            </div>

            {userTickets > 0 && (
              <div className="stats">
                <p className="text-lg mb-2">
                  You have {userTickets} in this draw
                </p>
                <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
                  {Array(userTickets)
                    .fill("")
                    .map((_, idx) => (
                      <p
                        key={idx}
                        className="text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic"
                      >
                        {idx + 1}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
