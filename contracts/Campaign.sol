// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "./Organization.sol";


error Campaign__NotEnoughEthEntered();
error Campaign__AlreadyEnrolled();
error Campaign__MaximumCampaignsReached();

contract Campaign {
    address public owner;
    uint256 public minimumContribution;
    mapping(address => bool) public contributers;
    //minimum disburse amount
   uint256 constant public minimumDisburseAllowed = 1 ether; // hardcoded minimum disburse amount
    uint256 public contributersCount;
    //variable to store objects of all organizations that are part of this campaign
    address[] public organizations;

    constructor(uint256 minimum, address creator) {
        owner = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
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

        //check if organization is enrolled in 3 campaigns
         if (Organization(organization).getCampaignsCount() >= 3) {
            revert Campaign__MaximumCampaignsReached();
         }
        organizations.push(organization);
    }

    //disburse all funds to all organizations equally
    function disburseFunds() public onlyOwner {
        //check if enough funds are available
        if (getBalance() < minimumDisburseAllowed) {
            revert Campaign__NotEnoughEthEntered();
        }

        //equal share of funds
        uint256 minimumDisburseAmount = getBalance() / organizations.length;
        
        
        //disburse funds
        for (uint256 i = 0; i < organizations.length; i++) {
            Organization(organizations[i]).contribute{value: minimumDisburseAmount}();
        }
    }
}
