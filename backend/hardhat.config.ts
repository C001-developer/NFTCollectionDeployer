import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.1",
};

export default config;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.1",
      },
    ],
  },
  networks: {
    localnet: {
      chainId: 31337,
      url: "http://127.0.0.1:8545",
    },
    // Other network configurations...
  },
  // Other Hardhat configurations...
};