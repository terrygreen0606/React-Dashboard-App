import React from "react";

function LoadingDiv() {
  return (
    <div>
      <div className="sk-wave">
        <div className="sk-rect sk-rect1"></div>&nbsp;
        <div className="sk-rect sk-rect2"></div>&nbsp;
        <div className="sk-rect sk-rect3"></div>&nbsp;
        <div className="sk-rect sk-rect4"></div>&nbsp;
        <div className="sk-rect sk-rect5"></div>
      </div>
      <div className="text-center">
        <h4>Loading...</h4>
        </div>
    </div>
  );
}

export default LoadingDiv;
