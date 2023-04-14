const { ethers, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("----------------------------------------------------");
  log("Deploying Campaign and waitin  g for confirmations...");

  let campaign = await deploy("Campaign", {
    from: deployer,
    args: [],
    log: false,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  const campaignInstance = await ethers.getContractAt(
    "Campaign",
    campaign.address
  );
  let oganization = await deploy("Organization", {
    from: deployer,
    args: [],
    log: false,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  const organizationInstance = await ethers.getContractAt(
    "Organization",
    oganization.address
  );

  //fund campaign
  await campaignInstance.fund({
    value: ethers.utils.parseEther("1"),
  });

  await campaignInstance.enrollOrganization(organizationInstance.address);

  //get balance of organization
  let balance = await organizationInstance.getBalance();
  console.log("balance is", balance);

  await campaignInstance.disburseFunds();

  balance = await organizationInstance.getBalance();
  //fund campaign
  await campaignInstance.fund({
    value: ethers.utils.parseEther("1"),
  });

  //get balance of organization
  balance = await organizationInstance.getBalance();
  console.log("balance is", balance);

  await campaignInstance.disburseFunds();
  await campaignInstance.fund({
    value: ethers.utils.parseEther("3"),
  });

  //get balance of organization
  balance = await organizationInstance.getBalance();
  console.log("balance is", balance);

  await campaignInstance.disburseFunds();

  balance = await organizationInstance.getBalance();

  console.log("balance after disbursement", balance);
};
