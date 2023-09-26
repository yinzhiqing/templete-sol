const fs        = require('fs');
const path      = require("path");
const program   = require('commander');
const utils     = require("./utils/utils");
const logger    = require("./utils/logger");
const prj       = require("../prj.config.js");
const datas_cfg = require("./datas/datas.config.js");

const datas     = datas_cfg.datas;
const users     = datas.users;
const bak_path  = prj.caches_contracts;

const tokens  = require(prj.contract_conf);
const {ethers, upgrades}    = require("hardhat");

async function create_token_id(name) {
    return web3.utils.soliditySha3(utils.str_to_w3uint256(name));
}
async function has_role(cobj, address, role) {
    let brole = web3.eth.abi.encodeParameter("bytes32", web3.utils.soliditySha3(role));
    let has = await cobj.hasRole(brole, address);
    logger.info(address + " check role(" + role + ") state: " + has);

    return has;
}

async function mint(client, to, signer, token_id, name, datas) {
    logger.debug("mint from " + await signer.getAddress() + " to with token_id = " + token_id);
    return await client.connect(signer).mint(to, token_id, name, datas);
}

async function new_token_id() {
    var myDate = new Date();
    return web3.utils.soliditySha3(myDate.toLocaleTimeString());
}

async function run() {
    logger.debug("start working...", "mint user");

    let cobj = await utils.contract("ChainUser");
    logger.debug("nft address: " + cobj.address);

    const accounts = await web3.eth.getAccounts();
    let role   = "MINTER_ROLE";
    let signer = ethers.provider.getSigner(0); 
    let minter = await signer.getAddress(); 
    let to     = minter;

    logger.debug("minter = " + minter);

    let has_miter = await has_role(cobj, minter, role);
    if (has_miter != true) {
        logger.error(personal + " no minter role." );
        return;
    } 

    for (var name in users) {
        let token_id = create_token_id(name);
        let existed = await cobj.exists(token_id);
        if (existed) {
            logger.warning("token is existed. id : " + token_id);
            continue;
        } else {
            logger.info("new token(" + name +"). id : " + token_id);
            logger.debug(users[name]);
            let datas = utils.str_to_w3str(JSON.stringify(users[name]));
            let tx = await mint(cobj, minter, signer, token_id, utils.str_to_w3bytes32(name), datas);
            logger.table(users[name], "new token");
        }
    }
}

run()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1)
  });
