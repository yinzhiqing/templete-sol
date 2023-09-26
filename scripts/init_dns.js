// scripts/deploy_upgrade.js
const fs        = require('fs');
const path      = require("path");
const program   = require('commander');
const utils     = require("./utils/utils");
const logger    = require("./utils/logger");
const prj       = require("../prj.config.js");

const bak_path  = prj.caches_contracts;
const tokens  = require(prj.contract_conf);
const {ethers, upgrades}    = require("hardhat");

async function get_contract(name, address) {
    return await utils.get_contract(name, address);
}

async function has_role(client, address) {
    let role= await client.MANAGER_ROLE();
    let has = await client.hasRole(role, address);
    logger.debug(address + " check role(" + role + ") state: " + has);

    return has;
}

async function set(client, signer, name, address){
    let has = await has_role(client, await signer.getAddress());
    if (has != true) {
        logger.error(signer_address + " no manager role." );
        return;
    } 

    logger.info("set dns(name, address): (" + name + " ," + address + ")");
    tx = await client.connect(signer).set(name, address);
    logger.debug(tx);
}

async function run() {
    logger.debug("start working...", "init dns");

    let cobj = await utils.contract("ChainDns");

    const accounts = await web3.eth.getAccounts();
    let role = 0x00; //"DEFAULT_ADMIN_ROLE";
    let signer = ethers.provider.getSigner(0); 

    extends_token = [];
    extends_token.push({"name": "", "address":""});
    for(let token_name in tokens) {
        token = tokens[token_name];
        await set(cobj, signer, token.name, token.address);
    }
}


run()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1)
  });

