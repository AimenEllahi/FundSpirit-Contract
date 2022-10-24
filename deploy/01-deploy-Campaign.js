const { ethers, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("----------------------------------------------------");
  log("Deploying Campaign and waiting for confirmations...");
  console.log(deployer);
  //Deploys the Campaign contract
  const campaign = await deploy("Campaign", {
    from: deployer,
    args: [],
    log: false,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log("----------------------------------------------------");
  log("Campaign deployed to:", campaign.address);
  log("----------------------------------------------------");

  const campaignInstance = await ethers.getContractAt(
    "Campaign",
    campaign.address
  );
  console.log(campaignInstance);
  const value = await campaignInstance.getBalance();
  console.log("Balance is", ethers.utils.formatEther(value));

  const add = await campaignInstance.contribute({
    value: ethers.utils.parseEther("1.0"),
  });
  add.wait(1);

  const value2 = await campaignInstance.getBalance();
  console.log("Updated Balance is", ethers.utils.formatEther(value2));
};
