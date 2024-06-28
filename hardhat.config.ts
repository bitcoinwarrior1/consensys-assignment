import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
  },
  networks: {
    // TODO populate your infura node URL in .env
    goerli: {
      url: process.env.GOERLI_URL || "",
    },
    mainnet: {
      url: process.env.MAINNET_URL || "",
    },
    arbitrumOne: {
      url: process.env.ARBITRUM_URL || "",
    },
  },
};

export default config;
