import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatVerify from "@nomicfoundation/hardhat-verify";
import "dotenv/config";


export default defineConfig({

  plugins: [
    hardhatVerify,
     hardhatEthers

  ],

  solidity: "0.8.28",

  networks:{
    sepolia:{
      type: "http",
      url: process.env.SEPOLIA_RPC_URL,
      accounts:[
        process.env.PRIVATE_KEY!
      ]
    }
  },

  etherscan:{
    apiKey:{
      sepolia: process.env.ETHERSCAN_API_KEY!
    }
  }

});
