import hre from "hardhat";

async function main() {

  const { ethers } = await hre.network.connect();

  const LoR = await ethers.getContractFactory("LoR");

  const lor = await LoR.deploy();

  await lor.waitForDeployment();

  console.log(
    "Contract deployed to:",
    await lor.getAddress()
  );

}

main()
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
