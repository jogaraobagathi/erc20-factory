import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

function DisplayUser() {
  const { currentUser, setCurrentUser } = useUser();

  useEffect(() => {
    // console.log(window.ethereum);
    const getAccount = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentUser(accounts[0]);
      }
    };
    getAccount();
  }, []);
  return <div>{currentUser}</div>;
}

export default DisplayUser;
