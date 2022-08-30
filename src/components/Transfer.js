import React from "react";
import { useTokens } from "../hooks/useTokens";
import { useUser } from "../hooks/useUser";

function Transfer({ currentToken }) {
  const { currentUser } = useUser();
  const { tokenContracts } = useTokens();
  const handleSend = async (e) => {
    e.preventDefault();
    const receiver = e.target.receiver.value;
    const amount = e.target.amount.value;
    const currentContract = tokenContracts[currentToken];
    await currentContract.transfer(receiver, amount * 100);
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
        <br />
        <div>
          Amount: <input id="amount" type="number" />
        </div>
        <button type="submit" placeholder="amount">
          send
        </button>
      </form>
    </div>
  );
}

export default Transfer;
