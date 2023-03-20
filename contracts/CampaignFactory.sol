// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public campaigns;

    function createCampaign(uint256 minimumContribution) public {
        address newCampaign = address(new Campaign(minimumContribution, msg.sender));
        campaigns.push(newCampaign);
    }

    //get all campaigns
    function getAllCampaigns() public view returns (address[] memory) {
        return campaigns;
    }

}
