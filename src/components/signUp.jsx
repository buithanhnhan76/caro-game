import React from "react";
import { toast } from "react-toastify";

const SignUp = (props) => {
  const handleChangeUsers = (e) => {
    let users = { ...props.users };
    users[e.target.name] = e.target.value;
    props.setUsers(users);
  };

  const handleSetPlay = () => {
    if (props.users.playeronename !== "" && props.users.playertwoname !== "") {
      props.setPlay(true);
      props.setTimes(1200);
    } else {
      toast.error("Please fill on the infomation");
    }
  };
  return (
    <section>
      <main>
        <div className="m-3">
          <input
            type="text"
            placeholder="Player 1 name"
            className="outline-none block border p-2 rounded-[3px]"
            name="playeronename"
            autoFocus
            onChange={(e) => handleChangeUsers(e)}
          ></input>
          <input
            type="text"
            placeholder="Player 2 name"
            className="outline-none block border p-2 mt-[5px] rounded-[3px] "
            name="playertwoname"
            onChange={(e) => handleChangeUsers(e)}
          ></input>
          <div className="max-w-[70px] w-full group ">
            <button
              className="border p-3 bg-green-600 w-full text-white mt-[5px]  rounded-[3px] text-left group-hover:border"
              onClick={handleSetPlay}
            >
              Play{" "}
              <span className="hidden group-hover:inline-block">{`>`}</span>
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default SignUp;
