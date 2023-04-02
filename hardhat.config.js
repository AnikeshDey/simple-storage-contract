require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    rinkeby:{
      url:'',
      accounts:[""],
      chainId:4
    }
  },
  solidity: "0.8.17",
  etherscan:{
    apiKey:''
  }
};
