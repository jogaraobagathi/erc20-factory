// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    mapping(address => bool) mintMap;
    address public _owner;

    constructor(
        string memory name,
        string memory symbol,
        address owner
    ) ERC20(name, symbol) {
        _owner = owner;
        mintMap[owner] = true;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }

    event BalanceUpdate(address user, uint256 curBalance);

    function decimals() public view virtual override returns (uint8) {
        return 2;
    }

    function mint(uint256 amount) public {
        require(mintMap[msg.sender] == true);
        _mint(msg.sender, amount);
    }

    function toggleMint(address account) public {
        mintMap[account] = !mintMap[account];
    }

    function canMint(address account) public view returns (bool) {
        return mintMap[account];
    }
}
