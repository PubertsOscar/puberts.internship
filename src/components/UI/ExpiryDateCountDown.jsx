import React, { useState, useEffect } from "react";

function ExpiryDateCountDown({ item }) {
  const [ExpiryDateCountDown, setExpiryDateCountDown] = useState("");
  let requestID;

  useEffect(() => {
    requestID = requestAnimationFrame(countDown);
    return () => cancelAnimationFrame(countDown);
  }, []);

  const countDown = () => {
    let timeLeft = item.expiryDate - Date.now();
    if (timeLeft < 0) {
      return setExpiryDateCountDown("EXPIRED");
    }
    let secsLeft = Math.floor(timeLeft / 1000);
    let minutesLeft = Math.floor(secsLeft / 60);
    let hoursLeft = Math.floor(minutesLeft / 60);

    setExpiryDateCountDown(
      `${hoursLeft}h ${minutesLeft % 60}m ${secsLeft % 60}s`
    );
    requestID = requestAnimationFrame(countDown);
  };
  return <div className="de_countdown">{ExpiryDateCountDown}</div>;
}

export default ExpiryDateCountDown;
