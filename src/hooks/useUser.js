import { useState } from "react";
export function useUser() {
  const [currentUser, setCurrentUser] = useState(null);
  window.ethereum.on("accountsChanged", function (accounts) {
    setCurrentUser(accounts[0]);
  });

  return { currentUser, setCurrentUser };
}
