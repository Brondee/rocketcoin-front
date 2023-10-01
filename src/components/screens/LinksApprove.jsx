import React, { useEffect } from "react";
import { useSetLinkRewardMutation } from "../../store/links/linksApiSlice";
import {
  useGetUserInfoQuery,
  useLevelUpUserMutation,
} from "../../store/user/userApiSlice";

const LinksApprove = () => {
  const { data } = useGetUserInfoQuery();

  const [setLinkReward] = useSetLinkRewardMutation();
  const [levelUpUser] = useLevelUpUserMutation();

  const queryParameters = new URLSearchParams(
    window.location.search.replace("amp;", "")
  );
  const reward = queryParameters.get("reward");
  const linkName = queryParameters.get("link_name");

  useEffect(() => {
    const rewardUpdate = async () => {
      // const res = await fetch("https://geolocation-db.com/json/");
      // const resData = await res.json();
      // const userIp = resData.IPv4;
      console.log(data?.registrationIp);
      try {
        const linkData = {
          userId: data.id,
          reward: Number(reward),
          linkName,
          ip: data.registrationIp,
          lastClicked: new Date().toLocaleString("en-US"),
        };
        const response = await setLinkReward(linkData);
        const expResp = await levelUpUser({ exp: 20 });
        console.log(response, data?.id);
        if (response.data && expResp.data) {
          window.location.href = "https://rocket-coin.online/links";
        }
      } catch (err) {
        console.log(err);
      }
    };
    rewardUpdate();
  }, [reward, setLinkReward, linkName, data, levelUpUser]);
  return (
    <main className="links-approve-container">
      <div className="links-approve-text">Задание выполнено успешно!</div>
    </main>
  );
};

export default LinksApprove;
