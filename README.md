# Solidity Template

This is a basic hardhat template to get you started writing and compiling contract.
The template is configured with some sensible defaults but tries to stay minimal.
It comes with most sensible plugins already installed via the suggested `hardhat-toolbox`.

- [Hardhat](https://github.com/nomiclabs/hardhat): compile and run the smart contracts on a local development network
- [TypeChain](https://github.com/ethereum-ts/TypeChain): generate TypeScript types for smart contracts
- [Ethers](https://github.com/ethers-io/ethers.js/): renowned Ethereum library and wallet implementation

Use the template by clicking the "Use this template" button at the top of the page.

## Usage

### Pre Requisites

Before running any command, make sure to install dependencies:

```sh
npm install
//or
yarn install 
```

### Compile

Compile the smart contracts with Hardhat:

```sh
npx hardhat compile
//or
yarn compile
```

### Test

Run the tests:

```sh
npx hardhat test
//or
yarn test
```

#### Test gas costs

To get a report of gas costs, set env `REPORT_GAS` to true

To take a snapshot of the contract's gas costs

```sh
npx hardhat test:gas
//or
yarn test:gas
```

### Deploy contract to network (requires Mnemonic and Infura API key)

```
npx hardhat run
```

### Validate a contract with etherscan (requires API key)

```
npx hardhat verify 
```

## License

MIT