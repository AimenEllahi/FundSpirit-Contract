// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "./Organization.sol";

//creates organization campaigns

contract OrganizationFactory{
    address[] public organizations;

    function createOrganization() public {
        address newOrganization = address(new Organization());
        organizations.push(newOrganization);
    }

    //get all organizations
    function getAllOrganizations() public view returns (address[] memory) {
        return organizations;
    }
}