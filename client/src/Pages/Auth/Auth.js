import React, { useState } from "react";
import Logincard from "./LoginCard";
import SignUpCard from "./SignUpCard";

function Auth() {
  const [toggleCard, setToggleCard] = useState(true);
  const toggleCardFunc = () => {
    setToggleCard(!toggleCard);
  };
  return (
    <div>
      {!toggleCard ? (
        <Logincard toggleCardFunc={toggleCardFunc} />
      ) : (
        <SignUpCard toggleCardFunc={toggleCardFunc} />
      )}
    </div>
  );
}

export default Auth;
