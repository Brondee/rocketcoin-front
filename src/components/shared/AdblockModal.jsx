import React from "react";
import { useSelector } from "react-redux";
import { useDetectAdBlock } from "adblock-detect-react";

const AdblockModal = () => {
  const adBlockDetected = useDetectAdBlock();

  const { curLang } = useSelector((state) => state.general);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={`adblock-modal ${adBlockDetected && "active"}`}>
      <div className="adblock-modal-inner">
        <h2>{curLang === "en" ? "AdBlock Detected!" : "AdBlock Обнаружен!"}</h2>
        <p>
          {curLang === "en"
            ? "Please disable adblock to continue to Rocketcoin. It kills our profit!"
            : "Пожалуйста, отключите Adblock, чтобы продолжить"}{" "}
        </p>
        <button className="adblock-reload" onClick={reloadPage}>
          {curLang === "en" ? "Reload page" : "Перезагрузить страницу"}
        </button>
      </div>
    </div>
  );
};

export default AdblockModal;
