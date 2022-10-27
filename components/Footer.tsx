import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-auto border-t border-emerald-500/20 flex items-center justify-between p-5">
      <img
        src="/PinClipart.com_poker-clip-art_5799809.png"
        alt="lottery ball picture"
        className="h-10 w-10 filter hue-rotate-90 opacity-20 rounded-full"
      />

      <p className="text-xs text-emerald-800 pl-5">
        DISCLAIMER: This project is made for educational purposes only. It is
        not intended to lure you to gambling. I am not liable for any losses
        that incurred or problems that arise at online casinos or elsewhere. If
        you are gambling online, you are doing so completely and totally at your
        own risk
      </p>
    </footer>
  );
};

export default Footer;
