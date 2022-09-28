import React, { useEffect, useRef, useState } from "react";
import { useAccountsData } from "../hooks/useAccountsData";
import { useTokens } from "../hooks/useTokens";
import { useUser } from "../hooks/useUser";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DisplayDetails({ currentToken }) {
  const [currentUserWithCaps, setCurrentUserWithCaps] = useState("");
  const [canMint, setCanMint] = useState(false);
  const { currentUser } = useUser();
  const { accounts } = useAccountsData();
  const { userData, tokenContracts, initialiseUserData } = useTokens();
  useEffect(() => {
    accounts.forEach((account) => {
      if (account.toString().toLowerCase() === currentUser) {
        setCurrentUserWithCaps(account);
      }
    });
  }, [currentUser]);

  useEffect(() => {
    const res = userData?.[currentToken]?.[currentUserWithCaps]?.mint;
    if (typeof res === "undefined") return;
    setCanMint(res);
  }, [userData, currentUserWithCaps]);

  const handleToggle = async (account) => {
    const contract = tokenContracts[currentToken];
    const tx = await contract.toggleMint(account);
    const rcpt = tx.wait();
    initialiseUserData();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>user</TableCell>
            <TableCell align="right">balance</TableCell>
            <TableCell align="right">can he mint ?</TableCell>
            <TableCell align="right">Toggle Mint</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow
              key={account}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {account !== currentUserWithCaps && account}
                {account === currentUserWithCaps && <b>{account}</b>}
              </TableCell>
              <TableCell align="right">
                {typeof userData?.[currentToken]?.[account]?.balance ===
                "undefined"
                  ? "loading..."
                  : userData[currentToken][account].balance}
              </TableCell>
              <TableCell align="right">
                {typeof userData?.[currentToken]?.[account]?.mint ===
                "undefined"
                  ? "loading..."
                  : userData[currentToken][account].mint
                  ? "YES"
                  : "NO"}
              </TableCell>
              <TableCell align="right">
                <button
                  disabled={
                    userData?.[currentToken]?.[currentUserWithCaps]?.mint ===
                      "undefined" ||
                    currentUserWithCaps === account ||
                    !userData?.[currentToken]?.[currentUserWithCaps]?.mint
                  }
                  onClick={() => handleToggle(account)}
                >
                  toggle
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DisplayDetails;
