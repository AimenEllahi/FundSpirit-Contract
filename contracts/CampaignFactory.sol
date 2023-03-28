// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public campaigns;

    function createCampaign(
        
    ) public returns (address campaign) {
        address newCampaign = address(new Campaign());
        campaigns.push(newCampaign);
  

        return newCampaign;
    }

    //get all campaigns
    function getAllCampaigns() public view returns (address[] memory) {
        return campaigns;
    }

}
