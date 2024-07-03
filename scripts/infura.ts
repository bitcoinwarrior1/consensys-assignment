import { ethers } from "hardhat";

import { NFTLoansPOC, NFTLoansPOC__factory } from "../typechain-types";

/*
 * @dev deploys the contract
 * @dev infura can be used as the node to broadcast this transaction
 * @returns the nftLoansContract
 * */
async function main() {
  const signers = await ethers.getSigners();
  await logUserBalance(signers[0].address);
  const nftLoansContract = await new NFTLoansPOC__factory()
    .connect(signers[0])
    .deploy();
  await nftLoansContract.waitForDeployment();

  return nftLoansContract;
}

/*
 * @dev read the signers balance from a node and log it
 * @dev infura can be used as the node to get this data
 * @dev this data can be used on the client's web app
 * */
async function logUserBalance(signerAddress: string) {
  const userBalance = await ethers.provider.getBalance(signerAddress);
  console.log(`User's native balance ${ethers.formatEther(userBalance)}\n`);
}

/*
 * @dev example of logging smart contract events
 * @dev infura can be used as the node to get this data
 * @dev these events can be used to populate data on the web application
 * @param nftLoansContract - the nftLoansPOC contract
 * @returns the nftLoansContract
 * */
async function logEvents(nftLoansContract: NFTLoansPOC) {
  const filter = nftLoansContract.filters.LendTokenAdded;
  let events = await nftLoansContract.queryFilter(filter);
  console.log(events);
}

/*
 * @dev create a fake loan via the NFTLoansPOC contract
 * @dev infura can be used as the node to broadcast this transaction
 * @dev these events can be used to populate data on the web application
 * @param nftLoansContract - the nftLoansPOC contract
 * @returns the nftLoansContract
 * */
async function createLoan(nftLoansContract: NFTLoansPOC) {
  await nftLoansContract.createLoan(
    ethers.ZeroAddress,
    ethers.MaxUint256,
    ethers.ZeroAddress,
    ethers.MaxUint256,
    ethers.ZeroAddress,
    ethers.ZeroAddress
  );

  return nftLoansContract;
}

main()
  .then((mockNFTLoans) => {
    return createLoan(mockNFTLoans);
  })
  .then((mockNFTLoans) => {
    return logEvents(mockNFTLoans);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
