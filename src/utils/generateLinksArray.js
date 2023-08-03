const generateLinksArray = (data) => {
  let linksArray = [];

  const linkdamCount =
    data?.find((item) => item.linkName === "linkdam")?.linkClickCount || 0;
  if (3 - linkdamCount <= 0) {
    const item = {
      disabled: true,
      link: "https://linkdam.me/lAnOHM",
      reward: 250,
      claimed: 0,
      claimOut: 3,
      linkName: "linkdam",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://linkdam.me/lAnOHM",
      reward: 250,
      claimed: 3 - linkdamCount,
      claimOut: 3,
      linkName: "linkdam",
    };
    linksArray.unshift(item);
  }

  const shortanoCount =
    data?.find((item) => item.linkName === "shortano")?.linkClickCount || 0;
  if (2 - shortanoCount <= 0) {
    const item = {
      disabled: true,
      link: "http://shortano.link/H1XrQhAm",
      reward: 250,
      claimed: 0,
      claimOut: 2,
      linkName: "shortano",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "http://shortano.link/H1XrQhAm",
      reward: 250,
      claimed: 2 - shortanoCount,
      claimOut: 2,
      linkName: "shortano",
    };
    linksArray.unshift(item);
  }

  const coinslCount =
    data?.find((item) => item.linkName === "coinsl")?.linkClickCount || 0;
  if (2 - coinslCount <= 0) {
    const item = {
      disabled: true,
      link: "https://busthings.site/sl/0_qHXV9606/rTSURKE26A8xgd",
      reward: 350,
      claimed: 0,
      claimOut: 2,
      linkName: "coinsl",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://busthings.site/sl/0_qHXV9606/rTSURKE26A8xgd",
      reward: 350,
      claimed: 2 - coinslCount,
      claimOut: 2,
      linkName: "coinsl",
    };
    linksArray.unshift(item);
  }

  const shortinoCount =
    data?.find((item) => item.linkName === "shortino")?.linkClickCount || 0;
  if (2 - shortinoCount <= 0) {
    const item = {
      disabled: true,
      link: "http://shortino.link/4bFXn",
      reward: 200,
      claimed: 0,
      claimOut: 2,
      linkName: "shortino",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "http://shortino.link/4bFXn",
      reward: 200,
      claimed: 2 - shortinoCount,
      claimOut: 2,
      linkName: "shortino",
    };
    linksArray.unshift(item);
  }

  const usalinkCount =
    data?.find((item) => item.linkName === "usalink")?.linkClickCount || 0;
  if (2 - usalinkCount <= 0) {
    const item = {
      disabled: true,
      link: "https://link.usalink.io/CGwHd",
      reward: 220,
      claimed: 0,
      claimOut: 2,
      linkName: "usalink",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://link.usalink.io/CGwHd",
      reward: 220,
      claimed: 2 - usalinkCount,
      claimOut: 2,
      linkName: "usalink",
    };
    linksArray.unshift(item);
  }

  const linkrexCount =
    data?.find((item) => item.linkName === "linkrex")?.linkClickCount || 0;
  if (linkrexCount >= 1) {
    const item = {
      disabled: true,
      link: "https://linx.cc/64JZrpV",
      reward: 170,
      claimed: 0,
      claimOut: 1,
      linkName: "linkrex",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://linx.cc/64JZrpV",
      reward: 170,
      claimed: 1,
      claimOut: 1,
      linkName: "linkrex",
    };
    linksArray.unshift(item);
  }

  const bitadsCount =
    data?.find((item) => item.linkName === "bitads")?.linkClickCount || 0;
  if (bitadsCount >= 1) {
    const item = {
      disabled: true,
      link: "https://bitads.pro/xv379h",
      reward: 150,
      claimed: 0,
      claimOut: 1,
      linkName: "bitads",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://bitads.pro/xv379h",
      reward: 150,
      claimed: 1,
      claimOut: 1,
      linkName: "bitads",
    };
    linksArray.unshift(item);
  }

  const shrinkearnCount =
    data?.find((item) => item.linkName === "shrinkearn")?.linkClickCount || 0;
  if (shrinkearnCount >= 1) {
    const item = {
      disabled: true,
      link: "https://tii.la/I80aet8LVrb",
      reward: 135,
      claimed: 0,
      claimOut: 1,
      linkName: "shrinkearn",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://tii.la/I80aet8LVrb",
      reward: 135,
      claimed: 1,
      claimOut: 1,
      linkName: "shrinkearn",
    };
    linksArray.unshift(item);
  }

  const shrinkmeCount =
    data?.find((item) => item.linkName === "shrinkme")?.linkClickCount || 0;
  if (shrinkmeCount >= 1) {
    const item = {
      disabled: true,
      link: "https://shrinke.me/HrSa",
      reward: 130,
      claimed: 0,
      claimOut: 1,
      linkName: "shrinkme.io",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://shrinke.me/HrSa",
      reward: 130,
      claimed: 1,
      claimOut: 1,
      linkName: "shrinkme.io",
    };
    linksArray.unshift(item);
  }

  const try2linkCount =
    data?.find((item) => item.linkName === "try2link")?.linkClickCount || 0;
  if (try2linkCount >= 1) {
    const item = {
      disabled: true,
      link: "https://try2link.com/tTKEiqa",
      reward: 200,
      claimed: 0,
      claimOut: 1,
      linkName: "try2link",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://try2link.com/tTKEiqa",
      reward: 200,
      claimed: 1,
      claimOut: 1,
      linkName: "try2link",
    };
    linksArray.unshift(item);
  }

  const clkshCount =
    data?.find((item) => item.linkName === "clksh")?.linkClickCount || 0;
  if (clkshCount >= 1) {
    const item = {
      disabled: true,
      link: "https://oko.sh/vja8S",
      reward: 125,
      claimed: 0,
      claimOut: 1,
      linkName: "clk.sh",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://oko.sh/vja8S",
      reward: 125,
      claimed: 1,
      claimOut: 1,
      linkName: "clk.sh",
    };
    linksArray.unshift(item);
  }

  const uptolinkCount =
    data?.find((item) => item.linkName === "uptolink")?.linkClickCount || 0;
  if (1 - uptolinkCount <= 0) {
    const item = {
      disabled: true,
      link: "https://uptolink.pro/qLj3eY",
      reward: 550,
      claimed: 0,
      claimOut: 1,
      linkName: "uptolink.pro",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://uptolink.pro/qLj3eY",
      reward: 550,
      claimed: 1,
      claimOut: 1,
      linkName: "uptolink.pro",
    };
    linksArray.unshift(item);
  }

  const shrtflyCount =
    data?.find((item) => item.linkName === "shrtfly")?.linkClickCount || 0;
  if (2 - shrtflyCount <= 0) {
    const item = {
      disabled: true,
      link: "https://stfly.xyz/5T6R9",
      reward: 350,
      claimed: 0,
      claimOut: 2,
      linkName: "shrtfly",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "https://stfly.xyz/5T6R9",
      reward: 350,
      claimed: 2 - shrtflyCount,
      claimOut: 2,
      linkName: "shrtfly",
    };
    linksArray.unshift(item);
  }

  const earnowCount =
    data?.find((item) => item.linkName === "earnow")?.linkClickCount || 0;
  console.log(earnowCount);
  if (2 - earnowCount <= 0) {
    const item = {
      disabled: true,
      link: "http://earnow.online/BgwxGO4V",
      reward: 500,
      claimed: 0,
      claimOut: 2,
      linkName: "earnow.online",
    };
    linksArray.push(item);
  } else {
    const item = {
      disabled: false,
      link: "http://earnow.online/BgwxGO4V",
      reward: 500,
      claimed: 2 - earnowCount,
      claimOut: 2,
      linkName: "earnow.online",
    };
    linksArray.unshift(item);
  }

  return {
    firstArray: linksArray.slice(0, 2),
    secondArray: linksArray.slice(2, 8),
    thirdArray: linksArray.slice(8, 14),
  };
};
export default generateLinksArray;
