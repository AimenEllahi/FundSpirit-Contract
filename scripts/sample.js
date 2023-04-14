const { ethers, network } = require("hardhat");

const main = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("----------------------------------------------------");
  log("Scripts do run");
};

main();
