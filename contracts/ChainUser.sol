
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "./libs/Base.sol";
import "./interface/IChainUser.sol";
import "./utils/ContractProject.sol";

contract ChainUser is 
Base, 
ContractProject,
IChainUser {

    function initialize(address dns) 
    initializer 
    public 
    {
        __ChainUser_init(dns);

    }
    function __ChainUser_init(address dns)
    internal 
    initializer 
    {
        __Base_init("ChainUser", "ChainUser", "");
        __ContractProject_init(dns);
        __ChainUser_init_unchained();
    }

    function __ChainUser_init_unchained() 
    internal initializer 
    {
        _unitType("certificate");
    }

    function mint(address to, uint256 tokenId, bytes32 name_, string memory datas) public virtual override {
        _mint(to, tokenId, name_, datas);
    }

    //must be at end
    uint256[48] private __gap;
}

