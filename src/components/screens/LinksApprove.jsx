import React, { useEffect } from "react";
import { useSetLinkRewardMutation } from "../../store/links/linksApiSlice";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";

const LinksApprove = () => {
  const { data } = useGetUserInfoQuery();

  const [setLinkReward] = useSetLinkRewardMutation();

  const queryParameters = new URLSearchParams(
    window.location.search.replace("amp;", "")
  );
  const reward = queryParameters.get("reward");
  const linkName = queryParameters.get("link_name");

  useEffect(() => {
    const rewardUpdate = async () => {
      const res = await fetch("https://geolocation-db.com/json/");
      const resData = await res.json();
      const userIp = resData.IPv4;
      try {
        const linkData = {
          userId: data?.id,
          reward: Number(reward),
          linkName,
          ip: userIp,
          lastClicked: new Date().toLocaleString("en-US"),
        };
        const response = await setLinkReward(linkData);
        console.log(response, data?.id, new Date().toLocaleString("en-US"));
        if (response.data) {
          window.location.href = "https://rocket-coin.online/links";
        }
      } catch (err) {
        console.error(err);
      }
    };
    rewardUpdate();
  }, [reward, setLinkReward, linkName, data?.id]);
  return (
    <main className="links-approve-container">
      <div className="links-approve-text">Задание выполнено успешно!</div>
    </main>
  );
};

export default LinksApprove;
