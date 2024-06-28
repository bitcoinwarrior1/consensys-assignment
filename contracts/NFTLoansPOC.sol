// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

contract NFTLoansPOC {
    event LendTokenAdded(address indexed token);
    event NFTAdded(address indexed token, uint indexed id);
    event LendTokenRemoved(address indexed token);
    event NFTRemoved(address indexed token, uint indexed id);
    event LoanCreated(
        address lendToken,
        uint amount,
        address nftToken,
        uint indexed id,
        address indexed lender,
        address indexed borrower
    );

    mapping(address => bool) private lendTokens;
    mapping(address => mapping(uint => bool)) private nfts;

    constructor() {
        addLendToken(address(0));
        addLendToken(address(1));
        addNFT(address(0), 1);
        addNFT(address(1), 2);
    }

    /*
     * @dev adds a new lend token
     * @dev the lend token should be ERC20 compatible
     * @dev only the admin can call this function
     * @dev emits the LendTokenAdded event
     * @param token, the address of the new token to support
     */
    function addLendToken(address token) public {
        lendTokens[token] = true;
        emit LendTokenAdded(token);
    }

    /*
     * @dev adds a new supported NFT
     * @dev only the admin can call this function
     * @dev emits the NFTAdded event
     * @param token, the address of the NFT token
     * @param id, the NFT id
     */
    function addNFT(address token, uint id) public {
        nfts[token][id] = true;
        emit NFTAdded(token, id);
    }

    /*
     * @dev removes a lend token
     * @dev only the admin can call this function
     * @dev emits the LendTokenRemoved event
     * @param token, the address of the token to remove
     */
    function removeLendToken(address token) external {
        lendTokens[token] = false;
        emit LendTokenRemoved(token);
    }

    /*
     * @dev removes a supported NFT
     * @dev only the admin can call this function
     * @dev emits the NFTRemoved event
     * @param token - the address of the NFT token
     * @param id - the NFT id
     */
    function removeNFT(address token, uint id) external {
        nfts[token][id] = false;
        emit NFTRemoved(token, id);
    }

    /*
     * @dev gets the value of a particular NFT
     * @param token, the address of the NFT token
     * @param id - the NFT id
     * @returns the NFT value
     */
    function getNFTValue(address token, uint id) public pure returns(uint) {
        return 1 ether;
    }

    /*
     * @dev gets the collateralization ratio
     * @returns the collateralization ratio, 1e18 == 100%
     */
    function getCollateralisationRatio() public pure returns(uint) {
        return 0.5 ether;
    }

    /*
     * @dev creates a new loan
     * @dev requires that the NFT and lend token are supported
     * @dev requires that the collateralisation ratio is met
     * @dev requires that the admin call this function
     * @dev emits the LoanCreated event
     * @param lendToken - the ERC20 token used to lend
     * @param amount - the amount of lendToken to be borrowed
     * @param nftToken - the NFT token address
     * @param id - the NFT to be used as collateral
     * @param lender - the lender providing the lendToken
     * @param borrower - the borrower of the token
     * @returns the collateralization ratio, 1e18 == 100%
     */
    function createLoan(
        address lendToken,
        uint amount,
        address nftToken,
        uint id,
        address lender,
        address borrower
    ) external {
        emit LoanCreated(lendToken, amount, nftToken, id, lender, borrower);
    }
}
