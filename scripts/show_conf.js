// scripts/deploy_upgradeable_xxx.js
const prj    = require("../prj.config.js");
const logger    = require("./logger");

const {ethers, upgrades} = require("hardhat");
const {nft721} = require(prj.contract_conf);

async function run() {
    let prj_conf = {
        config:     prj.contract_conf,
        network:    prj.configs.defaultNetwork
    }

    let contracts_conf = {
        nft721: nft721
    }

    logger.show_msg(prj_conf,    "prj");

    logger.show_msg(contracts_conf, "contracts");
}

run()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
