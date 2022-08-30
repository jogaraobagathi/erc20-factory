import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import factoryjson from "../artifacts/contracts/Factory.sol/Factory.json";
const factoryAddress = "0xDBcBaFdE245c796e17C385424537ccbDB25ffb2D";
export function useFactory(address = factoryAddress) {
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  useEffect(() => {
    const fun = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const _signer = provider.getSigner();
      setSigner(_signer);
      const _contract = new ethers.Contract(address, factoryjson.abi, _signer);
      setContract(_contract);
    };
    fun();
  }, []);

  return { contract, signer };
}
