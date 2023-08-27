import React, { useState } from "react";
import { Link } from "react-router-dom";

const AccordionItem = ({ title, text }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-block" onClick={() => setIsActive(!isActive)}>
      <button className={`accordion ${isActive && "active"}`}>{title}</button>
      <div className={`panel ${isActive && "panel-active"}`}>
        {text === "link" ? (
          <Link to="/blog">Find answer in our Blog</Link>
        ) : (
          <p>{text}</p>
        )}
      </div>
    </div>
  );
};

export default AccordionItem;
