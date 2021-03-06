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

async function get_contract(name, address) {
    return await utils.get_contract(name, address);
}

async function show_accounts() {
    const accounts = await ethers.provider.listAccounts();
    console.log(accounts);
}

async function balance_of(client, owner) {
    logger.debug("get balance_of " + owner);
    let count = await client.balanceOfOwnerMint(owner);
    logger.debug("balances: " + count);
    return count;
}


async function run() {
    logger.debug("start working...", "role opt");
    //await show_accounts();
    let cobj = await get_contract(nft721.name, nft721.address);
    logger.debug("nft address: " + nft721.address);
    
    const accounts = await web3.eth.getAccounts();
    let account = accounts[2];
    

    let name = await cobj.name();
    logger.debug("name: " + name);

    let amounts = await balance_of(cobj, account);
    logger.info(account + " has balance " + amounts);
    logger.debug("amounts: " + amounts);
    for (let i = 0; i < amounts; i++) {
        let tokenId = await cobj.tokenOfOwnerMintByIndex(account, i);
        logger.info("token id(" + (i + 1) + "): " + tokenId);
    } 
}

run()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
