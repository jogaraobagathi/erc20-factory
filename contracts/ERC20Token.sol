// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    mapping(address => bool) mintMap;

    constructor(
        string memory name,
        string memory symbol,
        address owner
    ) ERC20(name, symbol) {
        mintMap[owner] = true;
    }

    event BalanceUpdate(address user, uint256 curBalance);

    function decimals() public view virtual override returns (uint8) {
        return 2;
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function toggleMint(address account) public {
        mintMap[account] = !mintMap[account];
    }

    function canMint(address account) public view returns (bool) {
        return mintMap[account];
    }
}
