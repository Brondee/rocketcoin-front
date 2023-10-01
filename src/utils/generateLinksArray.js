const generateLinksArray = (data) => {
  let linksArray = [];

  const linkslyCount =
    data?.find((item) => item.linkName === "linksly")?.linkClickCount || 0;
  if (linkslyCount >= 1) {
    const item = {
      disabled: true,
      link: "https://linksly.co/XzU1P8",
      reward: 100,
      claimed: 0,
      claimOut: 1,
      linkName: "linksly",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://linksly.co/XzU1P8",
      reward: 100,
      claimed: 1,
      claimOut: 1,
      linkName: "linksly",
    };
    linksArray.unshift(item);
  }

  const weflyCount =
    data?.find((item) => item.linkName === "wefly")?.linkClickCount || 0;
  if (10 - weflyCount <= 0) {
    const item = {
      disabled: true,
      link: "https://wefly.me/mHDD",
      reward: 90,
      claimed: 0,
      claimOut: 10,
      linkName: "wefly",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://wefly.me/mHDD",
      reward: 90,
      claimed: 10 - weflyCount,
      claimOut: 10,
      linkName: "wefly",
    };
    linksArray.unshift(item);
  }

  const urlsflyCount =
    data?.find((item) => item.linkName === "urlsfly")?.linkClickCount || 0;
  if (10 - urlsflyCount <= 0) {
    const item = {
      disabled: true,
      link: "https://urlsfly.me/SRJ04cO",
      reward: 90,
      claimed: 0,
      claimOut: 10,
      linkName: "urlsfly",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://urlsfly.me/SRJ04cO",
      reward: 90,
      claimed: 10 - urlsflyCount,
      claimOut: 10,
      linkName: "urlsfly",
    };
    linksArray.unshift(item);
  }

  const clkasiaCount =
    data?.find((item) => item.linkName === "clicksfly")?.linkClickCount || 0;
  if (clkasiaCount >= 1) {
    const item = {
      disabled: true,
      link: "https://clk.asia/N29yuG",
      reward: 90,
      claimed: 0,
      claimOut: 1,
      linkName: "clkasia",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://clk.asia/N29yuG",
      reward: 90,
      claimed: 1,
      claimOut: 1,
      linkName: "clkasia",
    };
    linksArray.unshift(item);
  }

  const rsshortCount =
    data?.find((item) => item.linkName === "rsshort")?.linkClickCount || 0;
  if (20 - rsshortCount <= 0) {
    const item = {
      disabled: true,
      link: "https://rsshort.com/wGcs",
      reward: 90,
      claimed: 0,
      claimOut: 20,
      linkName: "rsshort",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://rsshort.com/wGcs",
      reward: 90,
      claimed: 20 - rsshortCount,
      claimOut: 20,
      linkName: "rsshort",
    };
    linksArray.unshift(item);
  }

  const try2linkCount =
    data?.find((item) => item.linkName === "try2link")?.linkClickCount || 0;
  if (try2linkCount >= 1) {
    const item = {
      disabled: true,
      link: "https://try2link.com/nzlcJ",
      reward: 90,
      claimed: 0,
      claimOut: 1,
      linkName: "try2link",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://try2link.com/nzlcJ",
      reward: 90,
      claimed: 1,
      claimOut: 1,
      linkName: "try2link",
    };
    linksArray.unshift(item);
  }

  const fclcCount =
    data?.find((item) => item.linkName === "fclc")?.linkClickCount || 0;
  if (fclcCount >= 1) {
    const item = {
      disabled: true,
      link: "https://fc.lc/P6Mv",
      reward: 85,
      claimed: 0,
      claimOut: 1,
      linkName: "fc.lc",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://fc.lc/P6Mv",
      reward: 85,
      claimed: 1,
      claimOut: 1,
      linkName: "fc.lc",
    };
    linksArray.unshift(item);
  }

  const urlcornerCount =
    data?.find((item) => item.linkName === "corner")?.linkClickCount || 0;
  if (4 - urlcornerCount <= 0) {
    const item = {
      disabled: true,
      link: "https://urlcorner.com/7zJIOg",
      reward: 83,
      claimed: 0,
      claimOut: 4,
      linkName: "urlcorner",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://urlcorner.com/7zJIOg",
      reward: 83,
      claimed: 4 - urlcornerCount,
      claimOut: 4,
      linkName: "urlcorner",
    };
    linksArray.unshift(item);
  }

  const shortyearnCount =
    data?.find((item) => item.linkName === "shortyearn")?.linkClickCount || 0;
  if (4 - shortyearnCount <= 0) {
    const item = {
      disabled: true,
      link: "https://shortyearn.com/cetCyIM",
      reward: 83,
      claimed: 0,
      claimOut: 4,
      linkName: "shortyearn",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://shortyearn.com/cetCyIM",
      reward: 83,
      claimed: 4 - shortyearnCount,
      claimOut: 4,
      linkName: "shortyearn",
    };
    linksArray.unshift(item);
  }

  const cutpCount =
    data?.find((item) => item.linkName === "cutpin")?.linkClickCount || 0;
  if (cutpCount >= 1) {
    const item = {
      disabled: true,
      link: "https://cutp.in/AcAE",
      reward: 73,
      claimed: 0,
      claimOut: 1,
      linkName: "cutp.in",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://cutp.in/AcAE",
      reward: 73,
      claimed: 1,
      claimOut: 1,
      linkName: "cutp.in",
    };
    linksArray.unshift(item);
  }

  const exalinkCount =
    data?.find((item) => item.linkName === "exalink")?.linkClickCount || 0;
  if (exalinkCount >= 1) {
    const item = {
      disabled: true,
      link: "https://exalink.fun/p6it",
      reward: 83,
      claimed: 0,
      claimOut: 1,
      linkName: "exalink",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://exalink.fun/p6it",
      reward: 83,
      claimed: 1,
      claimOut: 1,
      linkName: "exalink",
    };
    linksArray.unshift(item);
  }

  const shrikeCount =
    data?.find((item) => item.linkName === "shrinkmeio")?.linkClickCount || 0;
  if (shrikeCount >= 1) {
    const item = {
      disabled: true,
      link: "https://shrinke.me/qsaDe4",
      reward: 83,
      claimed: 0,
      claimOut: 1,
      linkName: "shrike",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://shrinke.me/qsaDe4",
      reward: 83,
      claimed: 1,
      claimOut: 1,
      linkName: "shrike",
    };
    linksArray.unshift(item);
  }

  const tiilaCount =
    data?.find((item) => item.linkName === "tiila")?.linkClickCount || 0;
  if (tiilaCount >= 1) {
    const item = {
      disabled: true,
      link: "https://tii.la/dWELGI",
      reward: 67,
      claimed: 0,
      claimOut: 1,
      linkName: "tii.la",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://tii.la/dWELGI",
      reward: 67,
      claimed: 1,
      claimOut: 1,
      linkName: "tii.la",
    };
    linksArray.unshift(item);
  }

  const okoshCount =
    data?.find((item) => item.linkName === "ClkSh")?.linkClickCount || 0;
  if (okoshCount >= 1) {
    const item = {
      disabled: true,
      link: "https://oko.sh/LMbvz",
      reward: 90,
      claimed: 0,
      claimOut: 1,
      linkName: "oko.sh",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://oko.sh/LMbvz",
      reward: 90,
      claimed: 1,
      claimOut: 1,
      linkName: "oko.sh",
    };
    linksArray.unshift(item);
  }

  const shortdashfreeCount =
    data?.find((item) => item.linkName === "dashfree")?.linkClickCount || 0;
  if (3 - shortdashfreeCount <= 0) {
    const item = {
      disabled: true,
      link: "https://short.dash-free.com/vXd6zP4r",
      reward: 83,
      claimed: 0,
      claimOut: 3,
      linkName: "short.dash-free",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://short.dash-free.com/vXd6zP4r",
      reward: 83,
      claimed: 3 - shortdashfreeCount,
      claimOut: 3,
      linkName: "short.dash-free",
    };
    linksArray.unshift(item);
  }

  const linkadlinkCount =
    data?.find((item) => item.linkName === "adlink")?.linkClickCount || 0;
  if (2 - linkadlinkCount <= 0) {
    const item = {
      disabled: true,
      link: "https://link.adlink.click/ATgh",
      reward: 67,
      claimed: 0,
      claimOut: 2,
      linkName: "link.adlink",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://link.adlink.click/ATgh",
      reward: 67,
      claimed: 2 - linkadlinkCount,
      claimOut: 2,
      linkName: "link.adlink",
    };
    linksArray.unshift(item);
  }

  const stflyCount =
    data?.find((item) => item.linkName === "shrtfly")?.linkClickCount || 0;
  if (stflyCount >= 1) {
    const item = {
      disabled: true,
      link: "https://stfly.xyz/5Yjqr",
      reward: 62,
      claimed: 0,
      claimOut: 1,
      linkName: "stfly",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://stfly.xyz/5Yjqr",
      reward: 62,
      claimed: 1,
      claimOut: 1,
      linkName: "stfly",
    };
    linksArray.unshift(item);
  }

  const cutyioCount =
    data?.find((item) => item.linkName === "cuty")?.linkClickCount || 0;
  if (cutyioCount >= 1) {
    const item = {
      disabled: true,
      link: "https://cuty.io/SioYbN",
      reward: 50,
      claimed: 0,
      claimOut: 1,
      linkName: "cuty.io",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://cuty.io/SioYbN",
      reward: 50,
      claimed: 1,
      claimOut: 1,
      linkName: "cuty.io",
    };
    linksArray.unshift(item);
  }

  const bitspaceCount =
    data?.find((item) => item.linkName === "1bit")?.linkClickCount || 0;
  if (4 - bitspaceCount <= 0) {
    const item = {
      disabled: true,
      link: "https://1bit.space/JD0FHH3",
      reward: 50,
      claimed: 0,
      claimOut: 4,
      linkName: "1bit.space",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://1bit.space/JD0FHH3",
      reward: 50,
      claimed: 4 - bitspaceCount,
      claimOut: 4,
      linkName: "1bit.space",
    };
    linksArray.unshift(item);
  }

  const mgnetCount =
    data?.find((item) => item.linkName === "mgnet")?.linkClickCount || 0;
  if (4 - mgnetCount <= 0) {
    const item = {
      disabled: true,
      link: "https://mgnet.xyz/FNVF0_b",
      reward: 50,
      claimed: 0,
      claimOut: 4,
      linkName: "mgnet.xyz",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://mgnet.xyz/FNVF0_b",
      reward: 50,
      claimed: 4 - mgnetCount,
      claimOut: 4,
      linkName: "mgnet.xyz",
    };
    linksArray.unshift(item);
  }

  const ouoCount =
    data?.find((item) => item.linkName === "ouo")?.linkClickCount || 0;
  if (2 - ouoCount <= 0) {
    const item = {
      disabled: true,
      link: "https://ouo.io/FLdq68",
      reward: 33,
      claimed: 0,
      claimOut: 2,
      linkName: "ouo.io",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://ouo.io/FLdq68",
      reward: 33,
      claimed: 2 - ouoCount,
      claimOut: 2,
      linkName: "ouo.io",
    };
    linksArray.unshift(item);
  }

  const flyearnCount =
    data?.find((item) => item.linkName === "flyearn")?.linkClickCount || 0;
  if (flyearnCount >= 1) {
    const item = {
      disabled: true,
      link: "http://flyearn.site/trs3H",
      reward: 50,
      claimed: 0,
      claimOut: 1,
      linkName: "flyearn",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "http://flyearn.site/trs3H",
      reward: 50,
      claimed: 1,
      claimOut: 1,
      linkName: "flyearn",
    };
    linksArray.unshift(item);
  }

  const soxCount =
    data?.find((item) => item.linkName === "shortox")?.linkClickCount || 0;
  if (soxCount >= 1) {
    const item = {
      disabled: true,
      link: "https://sox.link/vtRf",
      reward: 50,
      claimed: 0,
      claimOut: 1,
      linkName: "sox.link",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://sox.link/vtRf",
      reward: 50,
      claimed: 1,
      claimOut: 1,
      linkName: "sox.link",
    };
    linksArray.unshift(item);
  }

  const goadcortoCount =
    data?.find((item) => item.linkName === "adcorto")?.linkClickCount || 0;
  if (goadcortoCount >= 1) {
    const item = {
      disabled: true,
      link: "https://go.adcorto.com/wJSztUlNlI",
      reward: 33,
      claimed: 0,
      claimOut: 1,
      linkName: "go.adcorto",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://go.adcorto.com/wJSztUlNlI",
      reward: 33,
      claimed: 1,
      claimOut: 1,
      linkName: "go.adcorto",
    };
    linksArray.unshift(item);
  }

  const linkdamCount =
    data?.find((item) => item.linkName === "linkdam")?.linkClickCount || 0;
  if (3 - linkdamCount <= 0) {
    const item = {
      disabled: true,
      link: "https://linkdam.me/3ZViUa",
      reward: 90,
      claimed: 0,
      claimOut: 3,
      linkName: "linkdam.me",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://linkdam.me/3ZViUa",
      reward: 90,
      claimed: 3 - linkdamCount,
      claimOut: 3,
      linkName: "linkdam.me",
    };
    linksArray.unshift(item);
  }

  const botflyCount =
    data?.find((item) => item.linkName === "botfly")?.linkClickCount || 0;
  if (3 - botflyCount <= 0) {
    const item = {
      disabled: true,
      link: "http://botfly.me/oHjG48Fo",
      reward: 90,
      claimed: 0,
      claimOut: 3,
      linkName: "botfly.me",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "http://botfly.me/oHjG48Fo",
      reward: 90,
      claimed: 3 - botflyCount,
      claimOut: 3,
      linkName: "botfly.me",
    };
    linksArray.unshift(item);
  }

  const forexlyCount =
    data?.find((item) => item.linkName === "forexly")?.linkClickCount || 0;
  if (3 - forexlyCount <= 0) {
    const item = {
      disabled: true,
      link: "https://forexly.cc/a5WIY",
      reward: 90,
      claimed: 0,
      claimOut: 3,
      linkName: "forexly.cc",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://forexly.cc/a5WIY",
      reward: 90,
      claimed: 3 - forexlyCount,
      claimOut: 3,
      linkName: "forexly.cc",
    };
    linksArray.unshift(item);
  }

  const goldlyCount =
    data?.find((item) => item.linkName === "goldly")?.linkClickCount || 0;
  if (3 - goldlyCount <= 0) {
    const item = {
      disabled: true,
      link: "https://goldly.cc/T9AzTJYK",
      reward: 90,
      claimed: 0,
      claimOut: 3,
      linkName: "goldly.cc",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://goldly.cc/T9AzTJYK",
      reward: 90,
      claimed: 3 - goldlyCount,
      claimOut: 3,
      linkName: "goldly.cc",
    };
    linksArray.unshift(item);
  }

  const insuranclyCount =
    data?.find((item) => item.linkName === "insurancly")?.linkClickCount || 0;
  if (3 - insuranclyCount <= 0) {
    const item = {
      disabled: true,
      link: "https://insurancly.cc/RjvuO",
      reward: 90,
      claimed: 0,
      claimOut: 3,
      linkName: "insurancly.cc",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://insurancly.cc/RjvuO",
      reward: 90,
      claimed: 3 - insuranclyCount,
      claimOut: 3,
      linkName: "insurancly.cc",
    };
    linksArray.unshift(item);
  }

  const ctrCount =
    data?.find((item) => item.linkName === "ctrhs")?.linkClickCount || 0;
  if (2 - ctrCount <= 0) {
    const item = {
      disabled: true,
      link: "https://ctr.sh/VEPq",
      reward: 80,
      claimed: 0,
      claimOut: 2,
      linkName: "ctr.sh",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://ctr.sh/VEPq",
      reward: 80,
      claimed: 2 - ctrCount,
      claimOut: 2,
      linkName: "ctr.sh",
    };
    linksArray.unshift(item);
  }

  const easycutCount =
    data?.find((item) => item.linkName === "easycutio")?.linkClickCount || 0;
  if (easycutCount >= 1) {
    const item = {
      disabled: true,
      link: "https://easycut.io/rxrKNDVL",
      reward: 100,
      claimed: 0,
      claimOut: 1,
      linkName: "easycut.io",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://easycut.io/rxrKNDVL",
      reward: 100,
      claimed: 1,
      claimOut: 1,
      linkName: "easycut.io",
    };
    linksArray.unshift(item);
  }

  const earnifyCount =
    data?.find((item) => item.linkName === "earnify")?.linkClickCount || 0;
  if (earnifyCount >= 1) {
    const item = {
      disabled: true,
      link: "https://earnify.pro/KLfOlB",
      reward: 100,
      claimed: 0,
      claimOut: 1,
      linkName: "earnify.pro",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://earnify.pro/KLfOlB",
      reward: 100,
      claimed: 1,
      claimOut: 1,
      linkName: "earnify.pro",
    };
    linksArray.unshift(item);
  }

  const droplinkCount =
    data?.find((item) => item.linkName === "droplink")?.linkClickCount || 0;
  if (droplinkCount >= 1) {
    const item = {
      disabled: true,
      link: "https://droplink.co/tl4k4E9e",
      reward: 55,
      claimed: 0,
      claimOut: 1,
      linkName: "droplink.pro",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://droplink.co/tl4k4E9e",
      reward: 55,
      claimed: 1,
      claimOut: 1,
      linkName: "droplink.pro",
    };
    linksArray.unshift(item);
  }

  const doshrinkCount =
    data?.find((item) => item.linkName === "doShrink")?.linkClickCount || 0;
  if (doshrinkCount >= 1) {
    const item = {
      disabled: true,
      link: "https://doshrink.com/lXkmo",
      reward: 67,
      claimed: 0,
      claimOut: 1,
      linkName: "doshrink",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://doshrink.com/lXkmo",
      reward: 67,
      claimed: 1,
      claimOut: 1,
      linkName: "doshrink",
    };
    linksArray.unshift(item);
  }

  const arabplusCount =
    data?.find((item) => item.linkName === "arabplus")?.linkClickCount || 0;
  if (arabplusCount >= 1) {
    const item = {
      disabled: true,
      link: "https://arabplus2.co/8Eh7iOf8",
      reward: 160,
      claimed: 0,
      claimOut: 1,
      linkName: "arabplus",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://arabplus2.co/8Eh7iOf8",
      reward: 160,
      claimed: 1,
      claimOut: 1,
      linkName: "arabplus",
    };
    linksArray.unshift(item);
  }

  const clkstCount =
    data?.find((item) => item.linkName === "clk.st")?.linkClickCount || 0;
  if (clkstCount >= 1) {
    const item = {
      disabled: true,
      link: "http://clk.st/dwbj",
      reward: 130,
      claimed: 0,
      claimOut: 1,
      linkName: "clk.st",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "http://clk.st/dwbj",
      reward: 130,
      claimed: 1,
      claimOut: 1,
      linkName: "clk.st",
    };
    linksArray.unshift(item);
  }

  const shortsflyCount =
    data?.find((item) => item.linkName === "shortsfly")?.linkClickCount || 0;
  if (10 - shortsflyCount <= 0) {
    const item = {
      disabled: true,
      link: "https://shortsfly.me/Qu53eY",
      reward: 90,
      claimed: 0,
      claimOut: 10,
      linkName: "shortsfly.me",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://shortsfly.me/Qu53eY",
      reward: 90,
      claimed: 10 - shortsflyCount,
      claimOut: 10,
      linkName: "shortsfly.me",
    };
    linksArray.unshift(item);
  }

  const linksflyCount =
    data?.find((item) => item.linkName === "linksfly")?.linkClickCount || 0;
  if (10 - linksflyCount <= 0) {
    const item = {
      disabled: true,
      link: "https://linksfly.me/G3yE",
      reward: 90,
      claimed: 0,
      claimOut: 10,
      linkName: "linksfly.me",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://linksfly.me/G3yE",
      reward: 90,
      claimed: 10 - linksflyCount,
      claimOut: 10,
      linkName: "linksfly.me",
    };
    linksArray.unshift(item);
  }

  return {
    firstArray: linksArray.slice(0, 2),
    secondArray: linksArray.slice(2, 8),
    thirdArray: linksArray.slice(8, 100),
  };
};
export default generateLinksArray;
