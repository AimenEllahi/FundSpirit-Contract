// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "./Organization.sol";

//creates organization campaigns

contract OrganizationFactory{
    address[] public organizations;

    function createOrganization(string memory name, string memory description, string memory website, string memory logo) public {
        address newOrganization = address(new Organization(name, description, website, logo, msg.sender));
        organizations.push(newOrganization);
    }

    //get all organizations
    function getAllOrganizations() public view returns (address[] memory) {
        return organizations;
    }
}