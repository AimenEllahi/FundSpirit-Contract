// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

error Campaign__NotEnoughEthEntered();

contract Campaign {
    address public owner;
    uint256 public minimumContribution;
    mapping(address => bool) public contributers;
    uint256 public contributersCount;

    constructor() {
        owner = msg.sender;
        //minimumContribution = minimum;
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

    //function to withdraw money to specific address
    function withdrawMoney(address payable recipient) public {
        recipient.transfer(address(this).balance);
    }
}
