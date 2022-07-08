xfile-sol

# 背景


# 功能



# 安装

## 依赖
  npm 7.21.x
  node ^12.22.4

```
  $> git clone https://github.com/yinzhiqing/templete-sol.git
  $> cd templete-sol
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

## 生成json配置文件(./jsons/contracts/contract_templete.json)

```

  $> ./generate_conf.sh

```

##

## 代码结构

```

.
├── contracts                  //合约实现文件所在目录
│   └── interfaces             //接口文件所在目录
├── javas                      //合约的java接口文件根目录
├── datas                      //合约发布、更新历史记录
├── jsons                      //自定义配置文件所在目录
│   └── contracts              //合约管理目录
├── output                     //solc输出目录
└── scripts                    //功能脚本在此添加
    └── switchs                //开关相关脚本(勿动)
            └── contracts

```

#版本
