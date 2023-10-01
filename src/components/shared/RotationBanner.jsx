import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Banner2 from "./Banner2";

const RotationBanner = ({ width, datasid, datakey, dataframe }) => {
  const [curBanner, setCurBanner] = useState(0);

  useEffect(() => {
    const getRand = (max) => {
      const num = Math.floor(Math.random() * max);
      setCurBanner(num);
    };
    getRand(3);
  }, []);

  return (
    <>
      {curBanner === 0 ? (
        <iframe
          title="home banner"
          data-aa={dataframe}
          src={`//ad.a-ads.com/${dataframe}?size=${
            width === 468 ? "468x60" : width === 300 ? "300x250" : ""
          }`}
        ></iframe>
      ) : curBanner === 1 ? (
        <Banner2 data={datasid} />
      ) : (
        <Banner width={width} datakey={datakey} />
      )}
    </>
  );
};

export default RotationBanner;
