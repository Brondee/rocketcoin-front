import React, { useState } from "react";
import StarVector from "../../assets/img/star.svg";
import { useEditRatingMutation } from "../../store/rating/ratingApiSlice";

const StarsContainer = ({ rateName, initialRating, isAvailable, userId }) => {
  const [is1CurActive, setIs1CurActive] = useState(false);
  const [is2Inactive, setIs2Inactive] = useState(false);
  const [is2CurActive, setIs2CurActive] = useState(false);
  const [is3Inactive, setIs3Inactive] = useState(false);
  const [is3CurActive, setIs3CurActive] = useState(false);
  const [is4Inactive, setIs4Inactive] = useState(false);
  const [is4CurActive, setIs4CurActive] = useState(false);
  const [is5Inactive, setIs5Inactive] = useState(false);
  const [is5CurActive, setIs5CurActive] = useState(false);

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [editRating] = useEditRatingMutation();

  const setStars = (curStar) => {
    if (curStar === 1) {
      setIs1CurActive(true);
      setIs2Inactive(true);
      setIs3Inactive(true);
      setIs4Inactive(true);
      setIs5Inactive(true);
    } else if (curStar === 2) {
      setIs1CurActive(true);
      setIs2CurActive(true);
      setIs3Inactive(true);
      setIs4Inactive(true);
      setIs5Inactive(true);
    } else if (curStar === 3) {
      setIs1CurActive(true);
      setIs2CurActive(true);
      setIs3CurActive(true);
      setIs4Inactive(true);
      setIs5Inactive(true);
    } else if (curStar === 4) {
      setIs1CurActive(true);
      setIs2CurActive(true);
      setIs3CurActive(true);
      setIs4CurActive(true);
      setIs5Inactive(true);
    } else if (curStar === 5) {
      setIs1CurActive(true);
      setIs2CurActive(true);
      setIs3CurActive(true);
      setIs4CurActive(true);
      setIs5CurActive(true);
    }
  };

  const returnStars = () => {
    setIs2Inactive(false);
    setIs3Inactive(false);
    setIs4Inactive(false);
    setIs5Inactive(false);
    setIs1CurActive(false);
    setIs2CurActive(false);
    setIs3CurActive(false);
    setIs4CurActive(false);
    setIs5CurActive(false);
  };

  const editRatingFunc = async (curRating) => {
    console.log(userId);
    try {
      const data = {
        companyName: rateName,
        rating: curRating,
        userId,
      };
      const response = await editRating(data);
      if (response.error || !response) {
        console.log(response.error);
        setIsError(true);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 4000);
        console.log(response);
      }
    } catch (err) {
      setIsError(true);
      console.log(err);
    }
  };

  return (
    <div className={`stars-cont ${!isAvailable && "stars-disabled"}`}>
      {isSuccess ? (
        <p className="text-success">Спасибо за отзыв</p>
      ) : isError ? (
        <p className="label-error">Ошибка</p>
      ) : (
        <>
          <img
            src={StarVector}
            alt=""
            onMouseEnter={() => setStars(1)}
            onMouseLeave={returnStars}
            className={`${is1CurActive && "star-active"} ${
              initialRating < 1 && "star-not-rated"
            }`}
            onClick={() => editRatingFunc(1)}
          />
          <img
            src={StarVector}
            alt=""
            className={`${is2Inactive && "star-inactive"} ${
              is2CurActive && "star-active"
            } ${initialRating < 2 && "star-not-rated"}`}
            onMouseEnter={() => setStars(2)}
            onMouseLeave={returnStars}
            onClick={() => editRatingFunc(2)}
          />
          <img
            src={StarVector}
            alt=""
            className={`${is3Inactive && "star-inactive"} ${
              is3CurActive && "star-active"
            } ${initialRating < 3 && "star-not-rated"}`}
            onMouseEnter={() => setStars(3)}
            onMouseLeave={returnStars}
            onClick={() => editRatingFunc(3)}
          />
          <img
            src={StarVector}
            alt=""
            className={`${is4Inactive && "star-inactive"} ${
              is4CurActive && "star-active"
            } ${initialRating < 4 && "star-not-rated"}`}
            onMouseEnter={() => setStars(4)}
            onMouseLeave={returnStars}
            onClick={() => editRatingFunc(4)}
          />
          <img
            src={StarVector}
            alt=""
            className={`${is5Inactive && "star-inactive"} ${
              is5CurActive && "star-active"
            } ${initialRating < 5 && "star-not-rated"}`}
            onMouseEnter={() => setStars(5)}
            onMouseLeave={returnStars}
            onClick={() => editRatingFunc(5)}
          />
        </>
      )}
    </div>
  );
};

export default StarsContainer;
