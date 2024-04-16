import { useEffect } from "react";

export default function Timer({ dispatch, timerSecond }) {
  const mins = Math.floor(timerSecond / 60);
  const second = Math.floor(timerSecond % 60);
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins} : {second < 10 && "0"}
      {second}
    </div>
  );
}
