// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract Election{
    string public electionName;
    string public electionDescription;

    struct Voter{
        bool isVoted;
        uint voterID;
    }

    struct Candidate{
        string name;
        uint voteCount;
        uint candidateID;
    }

    uint public firstCandidate = 0;

    constructor(string[] memory electionAttributes, string[] memory candidateAttributes){
            electionName = electionAttributes[0];
            electionDescription = electionAttributes[1];

            Candidates[firstCandidate] = Candidate(candidateAttributes[0], 0, firstCandidate);
            firstCandidate++;
            Candidates[firstCandidate] = Candidate(candidateAttributes[1], 0, firstCandidate);
            firstCandidate++;
    }

    function vote(uint candidateID) public{
        require(!Voters[msg.sender].isVoted, "Voter voted for this election!");
        Voters[msg.sender].isVoted = true;
        Candidates[candidateID].voteCount += 1;
    }

    mapping(uint => Candidate) public Candidates;
    mapping (address => Voter) public Voters;



}