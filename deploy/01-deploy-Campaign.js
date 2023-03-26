const { ethers, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("----------------------------------------------------");
  log("Deploying Campaign and waiting for confirmations...");

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
  log("Deploying Campaigns...");
  await campaignInstance.createCampaign(
    //pass argue to the function
    ethers.utils.parseEther("10"),
    "Hunger Relief Campaign",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate",
    "To raise funds to support food banks and other organizations that provide meals to those in need.",
    ["campaign 1 tag1", "campaign 1 tag2", "campaign 1 tag3"]
  );
  await campaignInstance.createCampaign(
    //pass argue to the function
    ethers.utils.parseEther("10"),
    "Disaster Relief Campaign",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate",
    "To raise funds and provide support to those affected by natural disasters, such as hurricanes, earthquakes, and wildfires.",
    ["campaign 2 tag1", "campaign 2 tag2", "campaign 2 tag3"]
  );
  await campaignInstance.createCampaign(
    //pass argue to the function
    ethers.utils.parseEther("10"),
    "Homelessness awareness",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate",
    "To raise awareness about the issue of homelessness and raise funds to support organizations that provide shelter and support services to those experiencing homelessness.",
    ["campaign 2 tag1", "campaign 2 tag2", "campaign 2 tag3"]
  );
  await campaignInstance.createCampaign(
    //pass argue to the function
    ethers.utils.parseEther("10"),
    "Education and training",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate",
    "to provide the needy with the skills and resources they need to succeed in life.",
    ["campaign 2 tag1", "campaign 2 tag2", "campaign 2 tag3"]
  );

  await campaignInstance.createCampaign(
    //pass argue to the function
    ethers.utils.parseEther("10"),
    "Health care campaign",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate",
    "To provide medical care and support to needy.",
    ["campaign 2 tag1", "campaign 2 tag2", "campaign 2 tag3"]
  );
  await campaignInstance.createCampaign(
    //pass argue to the function
    ethers.utils.parseEther("10"),
    "Orphan Shelter Campaign",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate",
    "Building and operating orphanages to provide a home and care for orphans.",
    ["campaign 2 tag1", "campaign 2 tag2", "campaign 2 tag3"]
  );

  log("----------------------------------------------------");

  //get all campaigns
  const campaigns2 = await campaignInstance.getAllCampaigns();
  log("----------------------------------------------------");
  log("All Campaigns2:", campaigns2);
  log("----------------------------------------------------");

  // //use first address of campaigns to get minimum ammount

  const actualCampagn = await ethers.getContractAt("Campaign", campaigns2[0]);

  //contribute to campaign
  await actualCampagn.fund({
    value: ethers.utils.parseEther("15"),
  });
};
