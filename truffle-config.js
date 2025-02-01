require("dotenv").config()
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, 
      network_id: "*",
    },
    sepolia: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, process.env.SEPOLIA_URL),
      network_id: 11155111,
      gas: 4000000,
      gasPrice: 10000000000,
      networkCheckTimeout: 10000,
      timeoutBlocks: 200,
      skipDryRun: true,
      numberOfAddresses: 1,
      pollingInterval: 10000,
    },
  },

  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
