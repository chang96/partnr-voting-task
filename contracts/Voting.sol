// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    bool public isVotingOpen;
    
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidateCount;
    
    mapping(address => bool) public voters;

    event Voted(address indexed voter, uint indexed candidateId);
    event AnnounceWinners(string winnerName, uint voteCount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "admin only can register candidates.");
        _;
    }

    modifier hasNotVoted() {
        require(!voters[msg.sender], "you have already voted.");
        _;
    }

    modifier votingIsOpen() {
        require(isVotingOpen, "voting has ended.");
        _;
    }

    constructor() {
        admin = msg.sender;
        isVotingOpen = true;
    }

    function registerCandidate(string memory _name) public onlyAdmin {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }

    function vote(uint _candidateId) public hasNotVoted votingIsOpen {
        require(_candidateId > 0 && _candidateId <= candidateCount, "invalid candidate.");
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        emit Voted(msg.sender, _candidateId);
    }

    function closeVoting() public onlyAdmin {
        isVotingOpen = false;
        uint winningVoteCount = 0;
        string memory winnerName;
        
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winnerName = candidates[i].name;
            }
        }

        emit AnnounceWinners(winnerName, winningVoteCount);
    }
}
