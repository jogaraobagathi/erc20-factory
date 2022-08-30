import { useState, useEffect } from "react";
export function useUser() {
  const [currentUser, setCurrentUser] = useState(null);

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

  window.ethereum.on("accountsChanged", function (accounts) {
    setCurrentUser(accounts[0]);
  });

  return { currentUser, setCurrentUser };
}
