import type { NextPage } from "next";
import Head from "next/head";
import { useAddress } from "@thirdweb-dev/react";

import Header from "../components/Header";
import Login from "../components/Login";

const Home: NextPage = () => {
  const address = useAddress();
  console.log({ address });

  if (!address) return <Login />;

  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>Lottery App</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Header />

      <h1>Awesome Lottery Web3 DAPP</h1>
    </div>
  );
};

export default Home;
