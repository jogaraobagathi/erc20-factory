import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import factoryjson from "../artifacts/contracts/Factory.sol/Factory.json";
const factoryAddress = "0x5Bd070C711fD3774271c6F82dc3CECcd9bAB8056";
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
