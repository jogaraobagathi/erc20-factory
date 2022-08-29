import { Context } from "../contexts/Context";
import { useContext } from "react";
export const useAccountsData = () => {
  const { accounts, userData } = useContext(Context);
  return { accounts, userData };
};
