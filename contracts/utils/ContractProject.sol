// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "../interface/IChainDns.sol";
import "../interface/IBase.sol";
import "../interface/IChainUser.sol";

abstract contract ContractProject is Initializable {

    string public constant DNS_NAME_USER   = "ChainUser";

    address private __dnsAddress;
    IChainDns private _dnsIf;

    function __ContractProject_init(address dns) internal initializer {
        __ContractProject_init_unchained(dns);
    }

    function __ContractProject_init_unchained(address dns) internal initializer {
        _dnsAddress(dns);
    }

    function _dnsAddress(address addr) internal virtual {
        __dnsAddress = addr;
        _dnsIf = IChainDns(addr);
    }

    function _addressOf(string memory name_) internal view virtual returns(address) {
        require(_dnsIf.exists(name_), "Base: the name of dns is invalid");
        return _dnsIf.addressOf(name_);
    }

    function _stdIf(string memory name_) internal view virtual returns(IERC721Upgradeable) {
        return IERC721Upgradeable(_addressOf(name_));
    }

    function _baseIf(string memory name_) internal view virtual returns(IBase) {
        return IBase(_addressOf(name_));
    }
    function _userIf() internal view virtual returns(IChainUser) {
        return IChainUser(_addressOf(DNS_NAME_USER));
    }
    // append other contract 
}
