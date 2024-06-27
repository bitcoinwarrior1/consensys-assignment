import { ethers } from "hardhat";

async function main() {
  const mockNFTLoans = await ethers.deployContract("MockNFTLoans", []);
  await mockNFTLoans.waitForDeployment();
  return mockNFTLoans;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then((mockNFTLoans) => {

}).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
