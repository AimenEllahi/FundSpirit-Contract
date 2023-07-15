// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "./Organization.sol";

import "hardhat/console.sol";

error Campaign__NotEnoughEthEntered();
error Campaign__AlreadyEnrolled();
error Campaign__MaximumCampaignsReached();
error Campaign__NoOrganizationEnrolled();

contract Campaign {
    address public owner;
    uint256 public minimumContribution;
    mapping(address => bool) public contributers;
   uint256 constant public minimumDisburseAllowed = .001 ether; // hardcoded minimum disburse amount
    uint256 public contributersCount;
    //mapping to store organizations
    address[] public organizations;

 
//constructor with name as parameter

    constructor(
       
    ) {
        owner = msg.sender;
        organizations = new address[](0);
    
    }

    function fund() public payable {
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
    function withdrawMoney(address payable recipient) public {
        recipient.transfer(address(this).balance);
    }

    //function to enroll organization to this campaign
    function enrollOrganization(address organization) public onlyOwner {
        //check if organzation is already enrolled in this campaign
        for (uint256 i = 0; i < organizations.length; i++) {
            if (organizations[i] == organization) {
                revert Campaign__AlreadyEnrolled();
            }
        }

       
        organizations.push(organization);
    }

    //disburse all funds to all organizations equally
    function disburseFunds() public {
        

        //No organizations enrolled
        if(organizations.length <= 0){
            revert Campaign__NoOrganizationEnrolled();
        }

        //equal share of funds
        uint256 minimumDisburseAmount = getBalance() / organizations.length;
        
      
        //disburse funds
        for (uint256 i = 0; i < organizations.length; i++) {
            //console.log("Funds In Campaign", getBalance());
            //console.log("Balance before sending to " , organizations[i] ,Organization(organizations[i]).getBalance());
            Organization(organizations[i]).contribute{value: minimumDisburseAmount}();
            //console.log("Balance after sendingto ", organizations[i] , Organization(organizations[i]).getBalance());
        }
    }

    //get enrolled Organizations
    function getOrganizations() public view returns (address[] memory) {
        return organizations;
    }

 
}
