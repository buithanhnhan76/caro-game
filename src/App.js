import "./App.css";
import React, { useState, useEffect } from "react";
import CaroGame from "./components/caroGame";
import SignUp from "./components/signUp";

function App() {
  const [users, setUsers] = useState({ playeronename: "", playertwoname: "" });
  const [play, setPlay] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [times, setTimes] = useState(null);
  const [win, setWin] = useState(false);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (win) return;
      if (times > 0) setTimes(times - 1);
      else if (times === 0) {
        setTimeOut(true);
        return;
      }
    }, 1000);
    return () => clearInterval(myInterval);
  }, [times]);

  let renderTimes =
    ("0" + Math.floor(times / 60)).slice(-2) +
    ":" +
    ("0" + (times % 60)).slice(-2);
  return (
    <div>
      {users.playeronename === "" ||
      users.playertwoname === "" ||
      play === false ? (
        <SignUp
          users={users}
          setUsers={setUsers}
          setPlay={setPlay}
          setTimes={setTimes}
        ></SignUp>
      ) : (
        <React.Fragment>
          <div>{renderTimes}</div>{" "}
          <CaroGame
            users={users}
            timeOut={timeOut}
            times={times}
            setWin={setWin}
          ></CaroGame>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
