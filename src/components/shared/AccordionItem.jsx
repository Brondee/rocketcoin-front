import React, { useState } from "react";

const AccordionItem = ({ title, text }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-block" onClick={() => setIsActive(!isActive)}>
      <button className={`accordion ${isActive && "active"}`}>{title}</button>
      <div className={`panel ${isActive && "panel-active"}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
