import React, { useState } from "react";
import RotationBanner from "./RotationBanner";

const FixedBanner = ({ page }) => {
  const [isBannerActive, setIsBannerActive] = useState(true);

  let dataIframe = "2261607";
  if (page === "links") {
    dataIframe = "2261608";
  } else if (page === "tasks") {
    dataIframe = "2261610";
  } else if (page === "bonus") {
    dataIframe = "2261611";
  } else if (page === "faucet") {
    dataIframe = "2261612";
  } else if (page === "faucet_claim") {
    dataIframe = "2261613";
  } else if (page === "challenge") {
    dataIframe = "2261614";
  } else if (page === "ptc") {
    dataIframe = "2261615";
  } else if (page === "levels") {
    dataIframe = "2261616";
  }
  return (
    <div className={`banner-fixed ${isBannerActive && "active"}`}>
      <p className="cross-icon" onClick={() => setIsBannerActive(false)}>
        ✖
      </p>
      <RotationBanner
        width={300}
        dataframe={dataIframe}
        datasid="382398"
        datakey="74f5fd8cb2210ae903b1c609be6726ea"
      />
    </div>
  );
};

export default FixedBanner;
