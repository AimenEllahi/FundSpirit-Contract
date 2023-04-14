const { ethers, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("----------------------------------------------------");
  log("Deploying Organization Factory and waiting for confirmations...");
  log("----------------------------------------------------");

  //Deploys the Organization contract
  // const organization = await deploy("OrganizationFactory", {
  //   from: deployer,
  //   args: [],
  //   log: false,
  //   // we need to wait if on a live network so we can verify properly
  //   waitConfirmations: network.config.blockConfirmations || 1,
  // });

  // log("----------------------------------------------------");
  // log("Organization deployed to:", organization.address);
  // log("----------------------------------------------------");

  // const organizationInstance = await ethers.getContractAt(
  //   "OrganizationFactory",
  //   organization.address
  // );
};
