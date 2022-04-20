// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ZuriElection is Pausable, Initializable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() public initializer {
        chairman == msg.sender;
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyChairman
    {}

    /// =============== VARIABLES ================================
    address public chairman;
    string public name;
    string public description;

    bytes32 public root =
        0x4c29915a50ec868ab99f5844b969c0ad438aec20e61efe2541dbcaf674cc6356;

    uint256 public candidatesCount = 0;

    mapping(address => bool) public teachers;

    mapping(address => bool) public voted;

    mapping(uint256 => Candidate) public candidates;

    uint256[] public winnerIds;

    uint256 public winnerVoteCount;

    bool public Active = false;
    bool public Ended = false;

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    ///================== PUBLIC FUNCTIONS =============================
    function vote(uint256 _candidateId, bytes32[] calldata hexProof)
        public
        electionIsStillOn
        electionIsActive
    {
        require(
            isValid(hexProof, keccak256(abi.encodePacked(msg.sender))),
            "Not a part of Allowlist"
        );
        _vote(_candidateId, msg.sender);
    }

    // Setting of variables and data, during the creation of election contract
    function _setUpElection(string[] memory _nda, string[] memory _candidates)
        internal
    {
        require(
            _candidates.length > 0,
            "There should be at least 1 candidate."
        );
        name = _nda[0];
        description = _nda[1];
        for (uint256 i = 0; i < _candidates.length; i++) {
            _addCandidate(_candidates[i]);
        }
    }

    // Private function that effects voting on state variables
    function _vote(uint256 _candidateId, address _voter)
        internal
        onlyValidCandidate(_candidateId)
    {
        require(!voted[_voter], "Voter has already Voted!");
        voted[_voter] = true;
        candidates[_candidateId].voteCount++;

        emit VoteForCandidate(_candidateId, candidates[_candidateId].voteCount);
    }

    //Private function to add a candidate
    function _addCandidate(string memory _name) internal {
        candidates[candidatesCount] = Candidate({
            id: candidatesCount,
            name: _name,
            voteCount: 0
        });
        emit CandidateCreated(candidatesCount, _name);
        candidatesCount++;
    }

    /// =============== INTERNAL FUNCTIONS ================================

    function _calcElectionWinner()
        internal
        returns (uint256, uint256[] memory)
    {
        for (uint256 i; i < candidatesCount; i++) {
            ///@notice If we have a larger value, update winnerVoteCount, and reset winnerId
            if (candidates[i].voteCount > winnerVoteCount) {
                winnerVoteCount = candidates[i].voteCount;
                delete winnerIds;
                winnerIds.push(candidates[i].id);
            }
            ///@notice If we encounter another candidate that has the maximum number of votes, we have a tie, and update winnerIds
            else if (candidates[i].voteCount == winnerVoteCount) {
                winnerIds.push(candidates[i].id);
            }
        }

        return (winnerVoteCount, winnerIds);
    }

    // Start the election and begin accepting votes
    function startElection() public onlyChairman {
        Active = true;
    }

    // Stop the election and stop receiving votes
    function endElection() public onlyChairman {
        Ended = true;
        _calcElectionWinner();
        emit ElectionEnded(winnerIds, winnerVoteCount);
    }

    function isValid(bytes32[] memory proof, bytes32 leaf)
        public
        view
        returns (bool)
    {
        return MerkleProof.verify(proof, root, leaf);
    }

    function addTeacher(address _newTeachers) public onlyTeachers(msg.sender) {
        teachers[_newTeachers] = true;
    }

    function removeTeacher(address _teacher) public onlyTeachers(msg.sender) {
        teachers[_teacher] = false;
    }

    /// ======================= MODIFIERS =================================

    modifier onlyChairman() {
        require(msg.sender == chairman, "only chairman can call this function");
        _;
    }

    modifier onlyTeachers(address _user) {
        bool Teachers = teachers[_user];
        require(Teachers, "Only Moderators Have Access!");
        _;
    }
    modifier electionIsStillOn() {
        require(!Ended, "Election has ended!");
        _;
    }

    modifier electionIsActive() {
        require(Active, "Election has not begun!");
        _;
    }
    modifier onlyValidCandidate(uint256 _candidateId) {
        require(
            _candidateId < candidatesCount && _candidateId >= 0,
            "Invalid candidate to Vote!"
        );
        _;
    }

    /*
     *********************   EVENTS & ERRORS  **************************
     */
    event ElectionEnded(uint256[] _winnerIds, uint256 _winnerVoteCount);
    event CandidateCreated(uint256 _candidateId, string _candidateName);
    event VoteForCandidate(uint256 _candidateId, uint256 _candidateVoteCount);

    error ElectionNotStarted();
    error ElectionHasEnded();
}
