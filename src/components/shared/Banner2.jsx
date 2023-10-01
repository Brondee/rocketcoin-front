import React, { useEffect, useRef } from "react";

const Banner2 = ({ data }) => {
  const banner = useRef();

  useEffect(() => {
    if (!banner.current.firstChild) {
      const script = document.createElement("script");
      const ins = document.createElement("ins");
      ins.setAttribute("class", "surfe-be");
      ins.setAttribute("data-sid", data);
      const script2 = document.createElement("script");

      script.src = `//static.surfe.pro/js/net.js`;
      script2.innerHTML = `(adsurfebe = window.adsurfebe || []).push({});`;

      if (banner.current) {
        banner.current.append(script);
        banner.current.append(ins);
        banner.current.append(script2);
      }
    }
  }, [data]);

  return <div ref={banner}></div>;
};

export default Banner2;
