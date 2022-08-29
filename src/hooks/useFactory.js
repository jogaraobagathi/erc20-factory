import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import factoryjson from "../artifacts/contracts/Factory.sol/Factory.json";
const factoryAddress = "0xE199C270bb0EC78a4c108f58b71649Bb16e2264B";
export function useFactory(address = factoryAddress) {
  const [contract, setContract] = useState(null);
  useEffect(() => {
    const fun = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const _contract = new ethers.Contract(address, factoryjson.abi, signer);
      setContract(_contract);
    };
    fun();
  }, []);

  return contract;
}
