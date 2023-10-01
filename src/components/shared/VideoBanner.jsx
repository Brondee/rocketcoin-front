import React, { useEffect, useRef } from "react";

const VideoBanner = () => {
  const banner = useRef();

  useEffect(() => {
    if (!banner.current.firstChild) {
      const script = document.createElement("script");

      script.innerHTML = `(function(__htavim){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = __htavim || {};
s.src = "//cold-priest.com/dzmgFZz.d_GqlctVP_3kp/vybbmQVxJSZkDz0A0jOtD/YBxkMmDvgyxxLPTbQa4cNujgEfw/OWDlIR";
l.parentNode.insertBefore(s, l);
})()`;

      if (banner.current) {
        banner.current.append(script);
      }
    }
  }, []);

  return <div ref={banner} className="video-banner"></div>;
};

export default VideoBanner;
