// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public campaigns;

    function createCampaign(uint256 minimumContribution
    , string memory name, string memory description, string memory tagLine, string[] memory tags
    ) public {
        address newCampaign = address(new Campaign(minimumContribution, msg.sender, name, description, tagLine, tags));
        campaigns.push(newCampaign);
    }

    //get all campaigns
    function getAllCampaigns() public view returns (address[] memory) {
        return campaigns;
    }

}
