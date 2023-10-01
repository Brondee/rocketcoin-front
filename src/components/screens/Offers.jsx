import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import { Link } from "react-router-dom";
import StarsContainer from "../ui/StarsContainer";
import { useGetRatingInfoQuery } from "../../store/rating/ratingApiSlice";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import { useSelector } from "react-redux";
import AdblockModal from "../shared/AdblockModal";
import RotationBanner from "../shared/RotationBanner";
import FixedBanner from "../shared/FixedBanner";

const Offers = () => {
  const response = useGetUserInfoQuery();
  const userData = response.data;
  const [offerocRating, setOfferocRating] = useState(0);
  const [isOfferocAvailable, setIsOfferocAvailable] = useState(true);
  const [wannadsRating, setWannadsRating] = useState(0);
  const [isWannadsAvailable, setIsWannadsAvailable] = useState(true);
  const [cpxRating, setCpxRating] = useState(0);
  const [isCpxAvailable, setIsCpxAvailable] = useState(true);
  const [offers4AllRating, setoffers4AllRating] = useState(0);
  const [isOffers4AllAvailable, setIsOffers4AllAvailable] = useState(true);
  const [bitcotasksRating, setBitcotasksRating] = useState(0);
  const [isBitcotasksAvailable, setIsBitcotasksAvailable] = useState(true);
  const [offers4cryptoRating, setOffers4cryptoRating] = useState(0);
  const [isOffers4cryptoAvailable, setIsOffers4cryptoAvailable] =
    useState(true);

  const { data } = useGetRatingInfoQuery();
  const { curLang } = useSelector((state) => state.general);

  useEffect(() => {
    for (let i = 0; i < data?.length; i++) {
      if (data[i].companyName === "offeroc") {
        setOfferocRating(data[i].curRating);
        if (data[i].userIds.indexOf(userData?.id) !== -1) {
          setIsOfferocAvailable(false);
        }
      } else if (data[i].companyName === "wannads") {
        setWannadsRating(data[i].curRating);
        if (data[i].userIds.indexOf(userData?.id) !== -1) {
          setIsWannadsAvailable(false);
        }
      } else if (data[i].companyName === "cpx") {
        setCpxRating(data[i].curRating);
        if (data[i].userIds.indexOf(userData?.id) !== -1) {
          setIsCpxAvailable(false);
        }
      } else if (data[i].companyName === "offers4all") {
        setoffers4AllRating(data[i].curRating);
        if (data[i].userIds.indexOf(userData?.id) !== -1) {
          setIsOffers4AllAvailable(false);
        }
      } else if (data[i].companyName === "bitcotasks") {
        setBitcotasksRating(data[i].curRating);
        if (data[i].userIds.indexOf(userData?.id) !== -1) {
          setIsBitcotasksAvailable(false);
        }
      } else if (data[i].companyName === "offers4crypto") {
        setOffers4cryptoRating(data[i].curRating);
        if (data[i].userIds.indexOf(userData?.id) !== -1) {
          setIsOffers4cryptoAvailable(false);
        }
      }
    }
  }, [data, userData?.id]);

  return (
    <main>
      <Layout
        title={`Rocketcoin - ${curLang === "en" ? "Offerwall" : "Офферы"}`}
      >
        <section className="content-lk">
          <SideBar />
          <div className="right-content-lk">
            <div className="page-title-ban-cont">
              <h1 className="title-page-lk">
                {curLang === "en" ? "Offerwall" : "Офферы"}
              </h1>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  datasid="382183"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                  dataframe="2259296"
                />
              </div>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  datasid="382184"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                  dataframe="2259297"
                />
              </div>
            </div>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <div className="task-offers">
                    <div className="title-task-and-star">
                      <h3>Wannads</h3>
                      <StarsContainer
                        rateName="wannads"
                        initialRating={wannadsRating}
                        isAvailable={isWannadsAvailable}
                        userId={userData?.id}
                      />
                    </div>
                    <Link to="/wannads" className="btn-task">
                      {curLang === "en" ? "Visit" : "Посетить сайт"}
                    </Link>
                  </div>
                  <div className="task-offers">
                    <div className="title-task-and-star">
                      <h3>Offeroc</h3>
                      <StarsContainer
                        rateName="offeroc"
                        initialRating={offerocRating}
                        isAvailable={isOfferocAvailable}
                        userId={userData?.id}
                      />
                    </div>
                    <Link to="/offeroc" className="btn-task">
                      {curLang === "en" ? "Visit" : "Посетить сайт"}
                    </Link>
                  </div>
                  <div className="task-offers">
                    <div className="title-task-and-star">
                      <h3>Cpx Research</h3>
                      <StarsContainer
                        rateName="cpx"
                        initialRating={cpxRating}
                        isAvailable={isCpxAvailable}
                        userId={userData?.id}
                      />
                    </div>
                    <Link to="/Cpx" className="btn-task">
                      {curLang === "en" ? "Visit" : "Посетить сайт"}
                    </Link>
                  </div>
                  <div className="task-offers">
                    <div className="title-task-and-star">
                      <h3>Offers4All</h3>
                      <StarsContainer
                        rateName="offers4all"
                        initialRating={offers4AllRating}
                        isAvailable={isOffers4AllAvailable}
                        userId={userData?.id}
                      />
                    </div>
                    <Link to="/offersall" className="btn-task">
                      {curLang === "en" ? "Visit" : "Посетить сайт"}
                    </Link>
                  </div>
                  <div className="task-offers">
                    <div className="title-task-and-star">
                      <h3>BitcoTasks</h3>
                      <StarsContainer
                        rateName="bitcotasks"
                        initialRating={bitcotasksRating}
                        isAvailable={isBitcotasksAvailable}
                        userId={userData?.id}
                      />
                    </div>
                    <Link to="/bitcotasks" className="btn-task">
                      {curLang === "en" ? "Visit" : "Посетить сайт"}
                    </Link>
                  </div>

                  <div className="task-offers">
                    <div className="title-task-and-star">
                      <h3>Offers4Crypto</h3>
                      <StarsContainer
                        rateName="offers4crypto"
                        initialRating={offers4cryptoRating}
                        isAvailable={isOffers4cryptoAvailable}
                        userId={userData?.id}
                      />
                    </div>
                    <Link to="/offerscrypto" className="btn-task">
                      {curLang === "en" ? "Visit" : "Посетить сайт"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AdblockModal />
        <FixedBanner page="offers" />
      </Layout>
    </main>
  );
};

export default Offers;
