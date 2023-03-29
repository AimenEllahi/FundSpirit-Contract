const { ethers, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("----------------------------------------------------");
  log("Deploying Campaign and waitin  g for confirmations...");

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

  //deploy at a specific address
  await deploy(
    "Campaign",
    {
      from: deployer,
      args: [],
      log: false,
      // we need to wait if on a live network so we can verify properly
      waitConfirmations: network.config.blockConfirmations || 1,
    },
    {
      address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    }
  ).then((campaign) => {
    log(campaign.address);
  });

  //get contract instance
  const Campaign = await ethers.getContractAt(
    "Campaign",
    "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"
  );
  log(Campaign);

  campaign = await deploy(
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
  // await deploy(
  //   "Campaign",
  //   {
  //     from: deployer,
  //     args: [],
  //     log: false,
  //     // we need to wait if on a live network so we can verify properly
  //     waitConfirmations: network.config.blockConfirmations || 1,
  //   },
  //   {
  //     address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
  //   }
  // ).then((campaign) => {
  //   campaigns.push(campaign.address);
  // });
  // await deploy("Campaign", {
  //   from: deployer,
  //   args: [],
  //   log: false,
  //   // we need to wait if on a live network so we can verify properly
  //   waitConfirmations: network.config.blockConfirmations || 1,
  // }).then(
  //   (campaign) => {
  //     campaigns.push(campaign.address);
  //   },
  //   {
  //     address: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
  //   }
  // );
  // await deploy(
  //   "Campaign",
  //   {
  //     from: deployer,
  //     args: [],
  //     log: false,
  //     // we need to wait if on a live network so we can verify properly
  //     waitConfirmations: network.config.blockConfirmations || 1,
  //   },
  //   {
  //     address: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
  //   }
  // ).then((campaign) => {
  //   campaigns.push(campaign.address);
  // });

  // log("----------------------------------------------------");
  // log("Campaigns deployed to:", campaigns);
  // log("----------------------------------------------------");

  // const campaignInstance = await ethers.getContractAt(
  //   "CampaignFactory",
  //   campaign.address
  // );

  // //Verify the Campaign contract works
  // log("----------------------------------------------------");
  // log("Verifying Campaign contract...");
  // await campaignInstance.deployed();
  // log("----------------------------------------------------");

  // //get all campaigns
  // const campaigns = await campaignInstance.getAllCampaigns();
  // log("----------------------------------------------------");
  // log("All Campaigns:", campaigns);
  // log("----------------------------------------------------");

  //deploy another campaign
  // log("----------------------------------------------------");
  // log("Deploying Campaigns...");

  // await campaignInstance.createCampaign();

  // await campaignInstance.createCampaign();

  // await campaignInstance.createCampaign();

  // await campaignInstance.createCampaign();

  // await campaignInstance.createCampaign();

  // await campaignInstance.createCampaign();

  // log("----------------------------------------------------");

  //get all campaigns
  // const campaigns2 = await campaignInstance.getAllCampaigns();
  // log("----------------------------------------------------");
  // log("All Campaigns2:", campaigns2);
  // log("----------------------------------------------------");

  // // //use first address of campaigns to get minimum ammount

  // const actualCampagn = await ethers.getContractAt("Campaign", campaigns2[0]);

  // //contribute to campaign
  // await actualCampagn.fund({
  //   value: ethers.utils.parseEther("15"),
  // });
};
