// scripts/index.js
const prompt    = require('prompt');
const utils     = require("./utils");
const logger    = require("./logger");
const prj       = require("../prj.config.js");
const contract_conf = prj.contract_conf;
const {nft721} = require(contract_conf);

async function get_contract(name, address) {
    return await utils.get_contract(name, address);
}

async function show_msg(msg, title = "") {
    logger.show_msg(msg, title, {"format": false, "type": "table"});
}

async function chain_env() {
    let sdatas = {
        network:    await ethers.provider.getNetwork(),
    }
    show_msg(sdatas, "chain");
}

async function account_info() {
    const accounts = await ethers.provider.listAccounts();

    let sdatas = {};
    for(let i = 0; i < accounts.length; i++) {
        sdatas[accounts[i]] = (await ethers.provider.getBalance(accounts[i])).toString();
    }
    show_msg(sdatas, "accounts");
}

async function nft721_env() {
    if (nft721.use == true) {
        logger.info("not show nft721 info");
    }
    let cobj = await get_contract(nft721.name, nft721.address);
    let sdatas = {
        name: nft721.name,
        contractname: await cobj.name(),
        contractsymbol: await cobj.symbol(),
        contractAddress: nft721.address,
    }
    show_msg(sdatas, "nft721");
}

async function run_fix() {

    await nft721_env();
}

async function run() {
    logger.debug("start working...", "chain contract");
    await chain_env();
    await account_info();
    await nft721_env();
}

run()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
