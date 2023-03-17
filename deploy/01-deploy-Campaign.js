const { ethers, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("----------------------------------------------------");
  log("Deploying Campaign and waiting for confirmations...");
  console.log(deployer);
  //Deploys the Campaign contract
  const campaign = await deploy("CampaignFactory", {
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
    "CampaignFactory",
    campaign.address
  );

  //Verify the Campaign contract works
  log("----------------------------------------------------");
  log("Verifying Campaign contract...");
  await campaignInstance.deployed();
  log("----------------------------------------------------");

  //get all campaigns
  const campaigns = await campaignInstance.getAllCampaigns();
  log("----------------------------------------------------");
  log("All Campaigns:", campaigns);
  log("----------------------------------------------------");

  //deploy another campaign
  log("----------------------------------------------------");
  log("Deploying another Campaign...");
  const campaign2 = await campaignInstance.createCampaign(
    //pass argue to the function
    ethers.utils.parseEther("10")
  );
  log("----------------------------------------------------");

  //get all campaigns
  const campaigns2 = await campaignInstance.getAllCampaigns();
  log("----------------------------------------------------");
  log("All Campaigns2:", campaigns2);
  log("----------------------------------------------------");

  //use first address of campaigns to get minimum ammount

  const actualCampagn = await ethers.getContractAt("Campaign", campaigns2[0]);

  //get minimum ammount
  const minimumAmount = await actualCampagn.getMinimumContribution();
  //const minimumAmountInWei = ethers.utils.parseUnits(minimumAmount._hex, 18);

  log("----------------------------------------------------");
  console.log(
    "Minimum contribution amount:",
    ethers.utils.formatEther(minimumAmount)
  );
  log("----------------------------------------------------");
};