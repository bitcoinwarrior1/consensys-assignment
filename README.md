# NFT lending and borrowing POC
This POC uses infura to deploy, transact, and read state from the blockchain. Please see `scripts/infura.ts` for more info.

## High Level Overview
The client is looking to build a lending & borrowing platform that enables users to collateralize their `NFTs` to borrow money. 

## Requirements
The client is in the early stages of development and needs to build the following. 

#### NFTLoans.sol
A smart contract that:
- Enables borrowers to lock up a supported `NFT` as collateral
- Enables lenders to provide capital as `ERC20` tokens 
- Enables an interest rate to be set between a lender and a borrower
- Enables an admin to select eligible `NFTs` for collateral
- Interacts with an external oracle to determine the market value of the `NFT` being used as collateral
- Enables an admin to set an acceptable collateralization ratio for loans 
- Enables an admin to approve certain `ERC20` tokens and `NFTs` for loans

#### A web app
The client needs a web app that:
- Interacts with web3 enabled wallets such as `MetaMask` or `WalletConnect`
- Interacts with the blockchain via the web3 provider, this includes reading balances, interacting with the loan contract and other third party contracts 
- Enables users to create transactions via a web3 wallet

Consensys does not provide services to build the smart contract or web app, instead we provide tools to make your dApp function.

## Services that Consensys can provide 

#### Infura 
No matter what EVM network the client decides to build on, they will require a node to interact with the blockchain. Infura is the most widely used and trusted node provider in the space.

Infura can solve the following:
- Retrieval of `ERC20` and `ERC721` balances 
- Broadcasting of transactions from the user 
- Node queries e.g. smart contract calls & native balance enquires
- Retrieval of smart contract events such as `LoanCreated`

See `scripts/infura` for more info. 

#### MetaMask
MetaMask is the most popular and trusted browser wallet in the space. Most crypto user have had or still have exposure to MetaMask and use it as their primary wallet. 

MetaMask enables:
- Your users to interact with their crypto assets, including `NFTs` and `ERC20` tokens
- Your website to interact with the wallet via the web3 provider 
- Token auto-detection, automatically find users `NFTs` and `ERC20` tokens

##### Screenshot of an example of ERC20 balances in MM
![Screenshot of ERC20 token balances in MM](./images/ERC20.png)

##### Screenshot of an example of NFT balances in MM
![Screenshot of NFTs in MM](./images/NFTs.png)

#### Snaps
MetaMask snaps allow you to customise the UX within MetaMask.

Snaps can do the following for the client:
- Enable custom notifications that are relevant to the user e.g. loan created, tokens received, `NFT` locked up, etc.
- Notify a user when their loan is coming to maturity

#### Fuzzing
Consensys has a fuzzing tool that helps you find vulnerabilities in your smart contracts. You can read more about it [here](https://consensys.io/diligence/fuzzing/).

## Network selection
The client has not specified which EVM chain they wish to use. When considering the right chain, it is important to consider the following.

#### Liquidity
Which chain has the most liquidity for the `NFTs` and `ERC20` tokens you plan to support? The chain with the highest liquidity is the best choice, as there will be more funds available.

High liquidity chains:
- Ethereum mainnet
- Arbitrum

Low liquidity chains:
- xDAI
- Polygon

Infura supports all major EVM chains.

#### Fees
How sensitive is your userbase to fees? High value loans and `NFTs` will be fee insensitive, while lower value loans and `NFTs` will be more sensitive to fees. The mainnet network typically has the highest fees, and the most transaction volume.

High fee chains:
- Ethereum mainnet

Low fee chains:
- Arbitrum
- Polygon
- Linea

Consensys is the creator of Linea, a high throughput zkEVM chain that uses rollups. The client may or may not use this chain, depending on which one has the most liquidity for the intended userbase.  

#### Decentralisation
How important is decentralisation for your product? Often times, EVM chains that offer low fees have done so at the expense of decentralisation.

#### Confirmation times
Do you expect that your dApp will handle a high or low volume of transactions? The higher the volume, the more sensitive to confirmation times.