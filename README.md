xfile-sol

# 背景


# 功能
  pdc合约实现个人链上申请数据，平台回复数据功能。接口参见[合约接口](https://gitlab.tech.vnet.tv/pdc/xfile-sol/-/blob/pdcnft/contracts/interface/IPDCERC721IpfsManager.sol)或[abi文件](https://gitlab.tech.vnet.tv/pdc/xfile-sol/-/blob/pdcnft/artifacts/contracts/PDCERC721IpfsManager.sol/PDCERC721IpfsManager.json)


# 安装

## 依赖
  npm 7.21.x
  node ^12.22.4

```
  $> git clone -b pdcnft http://gitlab.tech.vnet.tv/pdc/vid-sol.git
  $> cd vid-sol
  $> npm install
```

## install web3j

```
  $> curl -L get.web3j.io | sh && source ~/.web3j/source.sh
```


## install solc solc-select 

### install solc
```
  $> sudo add-apt-repository ppa:ethereum/ethereum
  $> sudo apt-get update
  $> sudo apt-get install solc
```

### install solc-select
```
  #python -m pip install solc-select
  $> python -m pip install --upgrade pip

  # 当前solc版本
  $> solc --version
  solc, the solidity compiler commandline interface
  Version: 0.8.6+commit.11564f7e.Linux.g++
  # 安装并切换其他版本
  $> solc-select install 0.5.0
  $> solc-select use 0.5.0
  # 查看版本
  $> solc --version
  solc, the solidity compiler commandline interface
  Version: 0.5.0+commit.1d4f565a.Linux.g++
```

# 使用说明

## 配置运行环境

### 配置运行链(hardhat.config.js)

## 运行环境连接链配置
  defaultNetwork： "localhost",
   
```
  //修改 defaultNetwork 可用应用不同的链 

  //mnemonic, key_infura, key_infura_mainnet 在secrets.json中配置;
  defaultNetwork: "internal", // localhost external internal mainnet
  networks: {
      hardhat: {
          mining: {
              auto: true,
              //interval: [1000, 3000]
          }
      },
      localhost: {
      },

      external: {
          url: `https://kovan.infura.io/v3/${key_infura}`,
          accounts :{mnemonic : mnemonic}
      },
      internal: {
          url: `https://kovan.infura.io/v3/${key_infura}`,
          accounts :{mnemonic : mnemonic}
      },
      mainnet: {
          url: `https://mainnet.infura.io/v3/${key_infura_mainnet}`,
          accounts :{mnemonic : mnemonic}
      }
  },

```   

### secrets.json 格式

```
{
  "mnemonic": 助记词（生成账户用）,
  "key_infura": INFURA_KEY,
  "key_infura_mainnet": INFURA_KEY
}
```

## 运行本地节点

```

  $> make run_local_node

```

## 部署合约

```

  $> make open target=deploy
  $> make deploy

```
  
## 更新合约

```

  $> make open target=upgrade
  $> make upgrade

```

## 查看合约配置文件

```
  $> make show_contracts_conf

```

## 查看合约信息（从链上获取）

```

  $> make show_contracts

```

## 查看帮助文件

```

  $> make help

```

##
# 版本
