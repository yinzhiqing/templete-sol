// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

interface IBase {
    event UpdateDatas(address indexed from, address indexed to, uint256 indexed tokenId, bytes32 tokenName, string data);

    function update(uint256 tokenId, string memory datas) external;
    function pause() external;
    function unpause() external;

    function unitType() external view returns(string memory);
    function nameOf(uint256 tokenId) external view returns(bytes32);
    function datasOf(uint256 tokenId) external view returns(string memory);
    function exists(uint256 tokenId) external view returns(bool);
    function isOwner(uint256 tokenId, address owner) external view returns(bool);

}
