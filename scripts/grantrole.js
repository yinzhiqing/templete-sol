// scripts/deploy_upgrade.js
const fs        = require('fs');
const path      = require("path");
const program   = require('commander');
const utils     = require("./utils");
const logger    = require("./logger");
const prj       = require("../prj.config.js");

const bak_path  = prj.caches_contracts;
const {nft721}  = require(prj.contract_conf);
const {ethers, upgrades}    = require("hardhat");

const redis = require("redis");

async function get_contract(name, address) {
    return await utils.get_contract(name, address);
}

async function show_accounts() {
    const accounts = await ethers.provider.listAccounts();
    console.log(accounts);
}

async function grant_role(address, role) {
    logger.debug("start working...", "grant_role");
    let cobj = await get_contract(nft721.name, nft721.address);
    let has = await has_role(address, role);
    if (has != true) {
        logger.info("grant role :" +  role + " for " + address);
        let brole = web3.eth.abi.encodeParameter("bytes32", web3.utils.soliditySha3(role));
        await cobj.grantRole(brole, address);
        await has_role(address, role);
    } else {
        logger.info(address + " had role: " +  role);

    }
}

async function has_role(address, role) {
    //    let brole = web3.eth.abi.encodeParameter("bytes32", role);
    let brole = web3.eth.abi.encodeParameter("bytes32", web3.utils.soliditySha3(role));
    let cobj = await get_contract(nft721.name, nft721.address);
    let has = await cobj.hasRole(brole, address);
    logger.info(address + " check role(" + role + ") state: " + has);

    return has;
}

async function grant_minter(address) {
    logger.debug("start grant minter...", "role opt");
    let role = "MINTER_ROLE";

    let has = await has_role(address, role);
    if (has) {
        logger.debug("had minter role");
    } else {
        await grant_role(address, role);
    }
}

async function run() {
    logger.debug("start working...", "role opt");
    //await show_accounts();
    
    const accounts = await web3.eth.getAccounts();

    let personal_index = 1;
    let personal = accounts[personal_index];
    let platform = accounts[2];

    let addresses = [
        personal,
        platform,
        "0x873Eec86C3bcA94D9d978DD5de11CBb50BFd7B12",
        "0x64f9c444f7624c28cf058f711bf1284e8a7412fd",
        "0x4837e39138ef40704d2a97b015828d006e018fd6",
        "0x7cE63cC45E2B5aFD901d4F028714167Be7DA6333",
        "0xd4F7562838Eb64EDaED6BC5e3a3E50db83dfa1C8",
        "0x873eec86c3bca94d9d978dd5de11cbb50bfd7b12",
    ]

    for (let i = 0; i < addresses.length; i++) {
        await grant_minter(addresses[i]);
    }

}

run()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
