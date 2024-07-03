import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTLoansPOC, NFTLoansPOC__factory } from "../typechain-types";

describe("Zedrun betting contract functionality", function () {
  let nftLoansContract: NFTLoansPOC;
  let adminAddress: string;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    adminAddress = signers[0].address;
    nftLoansContract = await new NFTLoansPOC__factory()
      .connect(signers[0])
      .deploy();
    await nftLoansContract.waitForDeployment();
  });

  it("should be able to add a lend token", async () => {
    const filter = nftLoansContract.filters.LendTokenAdded;
    let events = await nftLoansContract.queryFilter(filter);
    expect(events.length).to.equal(
      2,
      "LendTokenAdded should have been emitted twice in deployment"
    );
    await nftLoansContract.addLendToken(adminAddress);
    events = await nftLoansContract.queryFilter(filter);
    expect(events.length).to.equal(
      3,
      "LendTokenAdded should have been emitted an additional time"
    );
    expect(events[2].args[0]).to.equal(
      adminAddress,
      "Should have added the admin address"
    );
  });

  it("should be able to add an NFT", async () => {
    const filter = nftLoansContract.filters.NFTAdded;
    let events = await nftLoansContract.queryFilter(filter);
    expect(events.length).to.equal(
      2,
      "NFTAdded should have been emitted twice in deployment"
    );
    await nftLoansContract.addNFT(adminAddress, 101);
    events = await nftLoansContract.queryFilter(filter);
    expect(events.length).to.equal(
      3,
      "NFTAdded should have been emitted an additional time"
    );
    expect(events[2].args[0]).to.equal(
      adminAddress,
      "Should have added the admin address"
    );
    expect(events[2].args[1]).to.equal(
      101,
      "Should have set the NFT id to 101"
    );
  });

  it("should be able to remove a lend token", async () => {
    const filter = nftLoansContract.filters.LendTokenRemoved;
    let events = await nftLoansContract.queryFilter(filter);
    expect(events.length).to.equal(
      0,
      "LendTokenRemoved should not have been emitted yet"
    );
    await nftLoansContract.removeLendToken(ethers.ZeroAddress);
    events = await nftLoansContract.queryFilter(filter);
    expect(events.length).to.equal(
      1,
      "LendTokenRemoved should have been emitted once"
    );
    expect(events[0].args[0]).to.equal(
      ethers.ZeroAddress,
      "Should have removed the zero address"
    );
  });

  it("should be able to remove an NFT", async () => {
    const filter = nftLoansContract.filters.NFTRemoved;
    let events = await nftLoansContract.queryFilter(filter);
    await nftLoansContract.addNFT(adminAddress, 101);
    expect(events.length).to.equal(
      0,
      "NFTRemoved should not have been emitted yet"
    );
    await nftLoansContract.removeNFT(adminAddress, 101);
    events = await nftLoansContract.queryFilter(filter);
    expect(events.length).to.equal(
      1,
      "NFTRemoved should have been emitted once"
    );
    expect(events[0].args[0]).to.equal(
      adminAddress,
      "Should have removed the admin address"
    );
    expect(events[0].args[1]).to.equal(
      101,
      "Should have removed an NFT with the id 101"
    );
  });

  it("should be able to create a loan", async () => {
    const filter = nftLoansContract.filters.LoanCreated;
    let events = await nftLoansContract.queryFilter(filter);
    expect(events.length).to.equal(0, "LoanCreated should not have been emitted yet");
    await nftLoansContract.createLoan(
      adminAddress,
      101,
      adminAddress,
      101,
      adminAddress,
      adminAddress
    );
    events = await nftLoansContract.queryFilter(filter);
    expect(events.length).to.equal(1, "LoanCreated should have been emitted once");
  });
});
