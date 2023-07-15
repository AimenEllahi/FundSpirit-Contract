
## Usage

### Pre Requisites

Before running any command, make sure to install dependencies:

```sh
npm install
#or
yarn install 
```

### Compile

Compile the smart contracts with Hardhat:

```sh
npx hardhat compile
#or
yarn compile
```

### Test

Run the tests:

```sh
npx hardhat test
#or
yarn test
```

#### Test gas costs

To get a report of gas costs, set env `REPORT_GAS` to true

To take a snapshot of the contract's gas costs

```sh
npx hardhat test:gas
#or
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