import React from "react";

const SignUp = (props) => {
  const handleChangeUsers = (e) => {
    let users = { ...props.users };
    users[e.target.name] = e.target.value;
    props.setUsers(users);
  };
  return (
    <section>
      <main>
        <div className="m-3">
          <input
            type="text"
            placeholder="Player 1 name"
            className="outline-none block"
            name="playeronename"
            autoFocus
            onChange={(e) => handleChangeUsers(e)}
          ></input>
          <input
            type="text"
            placeholder="Player 2 name"
            className="outline-none"
            name="playertwoname"
            onChange={(e) => handleChangeUsers(e)}
          ></input>
          <button
            className="block border p-1 bg-green-600 text-white"
            onClick={() => props.setPlay(!props.play)}
          >
            Play
          </button>
        </div>
      </main>
    </section>
  );
};

export default SignUp;
