// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Organization{
    address public owner;

    uint256 public minimumContribution;
    mapping(address => bool) public contributers;
    uint256 public contributersCount;
    uint256 public campaignsCount;
    address[] public campaigns;



    constructor() {
        owner = msg.sender;
   
    }

    function contribute() public payable {
        //require(msg.value > minimumContribution);
        contributers[msg.sender] = true;
        contributersCount++;
    }

    //creating modifiers
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyContributer() {
        require(contributers[msg.sender] == true);
        _;
    }

    //function to get balance in the contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //get minimum ammount
    function getMinimumContribution() public view returns (uint256) {
        return minimumContribution;
    }
    //function to withdraw money to specific address
    function withdrawMoney(address payable recipient, uint256 amount) public onlyOwner {
        require(amount <= getBalance());
        recipient.transfer(amount);
    }

    //function to withdraw money to specific address
    function withdrawAllMoney(address payable recipient) public onlyOwner {
        recipient.transfer(getBalance());
    }

    //function to get all contributers
    function getAllContributers() public view returns (address[] memory) {
        address[] memory contributersArray = new address[](contributersCount);
        uint256 counter = 0;
        for (uint256 i = 0; i < contributersCount; i++) {
            contributersArray[counter] = contributersArray[i];
            counter++;
        }
        return contributersArray;
    }

    //get campaign count
    function getCampaignsCount() public view returns (uint256) {
        return campaignsCount;
    }
    

    //increment total campaigns
    function incrementCampaignsCount() public {
        campaignsCount++;
    }

    //get all campaigns
    function getAllCampaigns() public view returns (address[] memory) {
        return campaigns;
    }

    //enroll in campaign
    function enrollInCampaign(address campaignAddress) public {
        //make sure campaign count is less than 3 before pushing
        require(campaignsCount < 3);
        campaigns.push(campaignAddress);
    }
}