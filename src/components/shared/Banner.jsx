import React, { useEffect, useRef } from "react";

const Banner = ({ width, datakey }) => {
  const banner = useRef();

  useEffect(() => {
    if (datakey) {
      const atOptions = {
        key: datakey,
        format: "iframe",
        height: width === 468 ? 60 : 250,
        width,
        params: {},
      };
      if (!banner.current.firstChild) {
        const conf = document.createElement("script");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `//www.profitablecreativeformat.com/${datakey}/invoke.js`;
        script.className = `banner-script`;
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

        if (banner.current) {
          banner.current.append(conf);
          banner.current.append(script);
        }
      }
    }
  }, [width, datakey]);

  return (
    <>
      <div ref={banner} className="banner-parent"></div>
    </>
  );
};

export default Banner;
