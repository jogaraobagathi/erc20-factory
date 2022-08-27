// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./ERC20Token.sol";

contract Factory {
    event ERC20TokenCreated(address tokenAddress);
    struct Token {
        address _address;
        string name;
        string symbol;
    }
    uint256 tokenCount = 0;
    Token[] tokens;

    function deployNewERC20Token(string memory name, string memory symbol)
        public
        returns (address)
    {
        ERC20Token t = new ERC20Token(name, symbol, msg.sender);
        emit ERC20TokenCreated(address(t));
        tokens.push(Token(address(t), name, symbol));
        tokenCount += 1;
        return address(t);
    }

    function getTokens() public view returns (Token[] memory) {
        return tokens;
    }

    function lastToken() public view returns (Token memory) {
        return tokens[tokenCount - 1];
    }
}
