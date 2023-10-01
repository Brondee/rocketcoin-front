import React, { useEffect, useRef } from "react";

const Popunder = () => {
  const banner = useRef();

  useEffect(() => {
    if (!banner.current.firstChild) {
      const script = document.createElement("script");

      script.innerHTML = `(function(zuv){
      var d = document,
          s = d.createElement('script'),
          l = d.scripts[d.scripts.length - 1];
      s.settings = zuv || {};
      s.src = "//cold-priest.com/cMDD9G6Jb.2-5Ol/S/WCQO9bN_Dagh2sMMTUAk5KM/yY0n0eOcDYYJxvM/DJkf0q";
      l.parentNode.insertBefore(s, l);
      })({})`;

      if (banner.current) {
        banner.current.append(script);
      }
    }
  }, []);

  return <div ref={banner}></div>;
};

export default Popunder;
