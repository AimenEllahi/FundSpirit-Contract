const { ethers, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("----------------------------------------------------");
  log("Deploying Campaign and waitinng for confirmations...");

  //Deploys the Campaign contract
  let campaigns = [];
  let campaign = await deploy(
    "Campaign",
    {
      from: deployer,
      args: [],
      log: false,
      // we need to wait if on a live network so we can verify properly
      waitConfirmations: network.config.blockConfirmations || 1,
    },
    "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"
  );
  log("----------------------------------------------------");
  log("Campaign deployed to:", campaign.address);
  log("----------------------------------------------------");

  if (chainId === "31337") {
    const campaignInstance = await ethers.getContractAt(
      "Campaign",
      campaign.address
    );

    //get funds of campaignInstance
    const funds = await campaignInstance.getBalance();
    log("----------------------------------------------------");
    log("Funds of Campaign:", funds);
    log("----------------------------------------------------");
  }
};
