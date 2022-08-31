import React from "react";
import { useTokens } from "../hooks/useTokens";
import { useUser } from "../hooks/useUser";

function Transfer({ currentToken }) {
  const { currentUser } = useUser();
  const { tokenContracts, initialiseUserData } = useTokens();
  const handleSend = async (e) => {
    e.preventDefault();
    const receiver = e.target.receiver.value;
    const amount = e.target.amount.value;
    const currentContract = tokenContracts[currentToken];
    const tx = await currentContract.transfer(receiver, amount * 100);
    const rcpt = await tx.wait();
    console.log("rcpt is ", rcpt);
    initialiseUserData();
    // setTimeout(() => {
    //   updateUserData(currentToken, currentUser);
    //   updateUserData(currentToken, receiver);
    // }, 10000);
  };
  return (
    <div>
      <h1>Transfer</h1>
      <form onSubmit={handleSend}>
        <div>
          Receiver:
          <input
            id="receiver"
            style={{ width: 350 }}
            placeholder="receiver address"
          />
        </div>
        <div>
          Amount: <input id="amount" type="number" />
        </div>
        <button type="submit" placeholder="amount">
          send
        </button>
        <br />
      </form>
    </div>
  );
}

export default Transfer;
