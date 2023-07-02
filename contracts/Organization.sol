// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;


import "hardhat/console.sol";

contract Organization{
    address public owner;

    uint256 public minimumContribution;
    uint256 public campaignsCount;
    address[] public campaigns;
    uint256 private totalDonations;

  

    constructor() {
        owner = msg.sender;
        totalDonations = 0;
   
    }

    function contribute() public payable {
        //require(msg.value > minimumContribution);
    
     totalDonations += msg.value;
        
    }

    //creating modifiers
    modifier onlyOwner() {
        require(msg.sender == owner);
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