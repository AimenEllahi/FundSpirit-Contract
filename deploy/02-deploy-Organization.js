const { ethers, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("----------------------------------------------------");
  log("Deploying Organization Factory and waiting for confirmations...");
  log("----------------------------------------------------");

  //Deploys the Organization contract
  const organization = await deploy("OrganizationFactory", {
    from: deployer,
    args: [],
    log: false,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log("----------------------------------------------------");
  log("Organization deployed to:", organization.address);
  log("----------------------------------------------------");

  const organizationInstance = await ethers.getContractAt(
    "OrganizationFactory",
    organization.address
  );

  //Verify the Organization contract works
  log("----------------------------------------------------");
  log("Verifying Organization contract...");
  await organizationInstance.deployed();
  log("----------------------------------------------------");

  //deploy another organization
  log("----------------------------------------------------");
  log("Deploying another Organization...");
  await organizationInstance.createOrganization(
    //pass argue to the function
    "Organization 2",
    "Some description",
    "Some Logo",
    "Some Website"
  );

  await organizationInstance.createOrganization(
    //pass argue to the function
    "Organization 3",
    "Some description",
    "Some Logo",
    "Some Website"
  );

  await organizationInstance.createOrganization(
    //pass argue to the function
    "Organization 4",
    "Some description",
    "Some Logo",
    "Some Website"
  );

  await organizationInstance.createOrganization(
    //pass argue to the function
    "Organization 5",
    "Some description",
    "Some Logo",
    "Some Website"
  );
  log("----------------------------------------------------");

  //get all organizations
  const organizations = await organizationInstance.getAllOrganizations();
  log("----------------------------------------------------");
  log("All Organizations:", organizations);
  log("----------------------------------------------------");

  //get data of firt organization
  // const actualOrganization = await ethers.getContractAt(
  //   "Organization",
  //   organizations[0]
  // );
  // const details = await actualOrganization.getDetails();

  // log("----------------------------------------------------");
  // log("Organization Details:", details);
  // log("----------------------------------------------------");
};
