import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

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
    goerli: {
      accounts: [`${process.env.PRIVATE_KEY}`],
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 5,
    },
    // Other network configurations...
  },
  // Other Hardhat configurations...
};