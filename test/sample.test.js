const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const mocha = require("mocha");
const { JUnitXmlReporter } = require("mocha-junit-reporter");
const { ethers, network } = require("hardhat");
chai.use(chaiAsPromised);

// Create a new Mocha instance
const mochaInstance = new mocha({
  reporter: JUnitXmlReporter,
  reporterOptions: {
    mochaFile: "test-results.xml",
  },
});

describe("Blockchain Test-", ()=>{
describe("Campaign-", () => {
  let campaign;
  let organization;
  let owner;
  let addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();

    const Campaign = await ethers.getContractFactory("Campaign");
    campaign = await Campaign.deploy();

    await campaign.deployed();
    const Organization = await ethers.getContractFactory("Organization");
    organization = await Organization.deploy();
    await organization.deployed();
  });

  it("Should fund a campaign", async () => {
    const campaignInstance = await ethers.getContractAt(
      "Campaign",
      campaign.address
    );
    // Fund the campaign
    await campaign.fund({ value: ethers.utils.parseEther("1") });

    let balance = await campaignInstance.getBalance();
    balance = ethers.utils.formatEther(balance);
    expect(balance).to.equal("1.0");
  });

  it("Should be able to enroll in campaign", async () => {
    await organization.enrollInCampaign(campaign.address);
    const allCampaigns = await organization.getAllCampaigns();
    expect(allCampaigns).to.have.lengthOf(1);
    expect(allCampaigns[0]).to.equal(campaign.address);
  });
});

})

//Run the tests
mochaInstance.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});
