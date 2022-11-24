import React, { useState } from "react";
// import styled from "styled-components";

function App() {
  const [username, setUsername] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setUsername(value);
    // setUsername(event.currentTarget.value) 와 같은 의미
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", username);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={username}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
