// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import './Election.sol';
contract AllElections{
    uint public firstElection = 0;
    mapping (uint => address) public allElections;

    function createNewElection(string[] memory electionAttributes, string[] memory candidates) public{
        Election newElection = new Election(electionAttributes, candidates);
        allElections[firstElection] = address(newElection);
        firstElection++;
    }
}