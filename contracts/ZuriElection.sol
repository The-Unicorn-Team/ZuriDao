// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


/// @notice imported contracts from openzepplin to pause, verify proof and upgrade contract
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// @author Wande for Team Unicorn
/// @title ZuriElection
/// @notice You can use this contract for election amongst known stakeholders
/// @dev All function calls are currently implemented without side effects
contract ZuriElection is Pausable, Initializable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    ///@notice this function replaces the constructor due to the contract being upgradeable
    ///@dev function runs once on deployment
    function initialize() public initializer {
        chairman == msg.sender;
        __UUPSUpgradeable_init();
    }
    ///@notice function to call to upgrade contract
    ///@param address of new version of contract
    ///@dev only chairman can call this function
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyChairman
    {}

    /// =============== VARIABLES ================================

    ///@notice address of chairman
    address public chairman;

    ///@notice name of the candidates standing election
    string public name;

    ///@notice description of position vying for
    string public description;

    ///@dev root of the MerkleTree
    bytes32 public root =
        0x4c29915a50ec868ab99f5844b969c0ad438aec20e61efe2541dbcaf674cc6356;

    ///@notice count of candidates
    ///@dev count to keep track of number of candidates
    uint256 public candidatesCount = 0;

    ///@dev mapping of address for teachers
    ///@notice list of teachers
    mapping(address => bool) public teachers;

    ///@notice list of stakeholders that have voted
    ///@dev mapping of address to bool to keep track of votes
    mapping(address => bool) public voted;

    ///@notice list of candidates
    ///@dev mapping to unsigned integers to struct of candidates
    mapping(uint256 => Candidate) public candidates;

    ///@notice variable to track winning candidate
    ///@dev an array that returns id of winning candidate(s)
    uint256[] public winnerIds;

    ///@notice count of vote of winning id
    ///@dev variable to track to vote count of items in winnerids array
    uint256 public winnerVoteCount;

    ///@notice boolean to track status of election
    bool public Active = false;
    ///@notice boolean to track status of election
    bool public Ended = false;

    ///@dev struct of candidates with variables to track name , id and voteCount
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    ///================== PUBLIC FUNCTIONS =============================

    ///@notice function that allows stakeholders vote in an election
    ///@param _candidateId the ID of the candidate and hexProof of the voting address
    ///@dev function verifies proof
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

    /// @notice function to start an election
    ///@param _nda which is an array candidate information
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

  

    /// =============== INTERNAL FUNCTIONS ================================
  ///@notice internal function that allows users vote
    ///@param _candidateId and voter's address
    
    function _vote(uint256 _candidateId, address _voter)
        internal
        onlyValidCandidate(_candidateId)
    {
        require(!voted[_voter], "Voter has already Voted!");
        voted[_voter] = true;
        candidates[_candidateId].voteCount++;

        emit VoteForCandidate(_candidateId, candidates[_candidateId].voteCount);
    }

    ///@notice internal function to add candidate to election 
    ///@param _name of candidate
    ///@dev function creates a struct of candidates 
    function _addCandidate(string memory _name) internal {
        candidates[candidatesCount] = Candidate({
            id: candidatesCount,
            name: _name,
            voteCount: 0
        });
        emit CandidateCreated(candidatesCount, _name);
        candidatesCount++;
    }

    ///@notice internal function that calculates the election winner
    ///@return vote count and winning ID
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

    /// @notice function to start election
    ///@dev function changes the boolean value of the ACTIVE variable
    function startElection() public onlyChairman {
        Active = true;
    }

    /// @notice function to end election
    ///@dev function changes the boolean value of the ENDED variable
    function endElection() public onlyChairman {
        Ended = true;
        _calcElectionWinner();
        emit ElectionEnded(winnerIds, winnerVoteCount);
    }

    ///@notice function to verify stakeholders
    ///@return it returns a boolean value
    ///@dev function verifies the MerkleProof of the user and asserts that they are stakeholders
    ///@param proof and leaf
    function isValid(bytes32[] memory proof, bytes32 leaf)
        public
        view
        returns (bool)
    {
        return MerkleProof.verify(proof, root, leaf);
    }

    ///@notice function to add teachers to mapping
    ///@param address of teacher
    function addTeacher(address _newTeachers) public onlyTeachers(msg.sender) {
        teachers[_newTeachers] = true;
    }

    ///@notice function to add teachers to mapping
    ///@param address of teacher
    function removeTeacher(address _teacher) public onlyTeachers(msg.sender) {
        teachers[_teacher] = false;
    }

    /// ======================= MODIFIERS =================================
    ///@notice modifier to specify only the chairman can call the function
    modifier onlyChairman() {
        require(msg.sender == chairman, "only chairman can call this function");
        _;
    }
    
    ///@notice modifier to specify only teachers can call the function
    modifier onlyTeachers(address _user) {
        bool Teachers = teachers[_user];
        require(Teachers, "Only Teachers can call this function");
        _;
    }
    ///@notice modifier to specify that election has not ended
    modifier electionIsStillOn() {
        require(!Ended, "Sorry, the Election has ended!");
        _;
    }
    ///@notice modifier to check that election is active
    modifier electionIsActive() {
        require(Active, "Election has not begun!");
        _;
    }
    ///@notice modifier to ensure only specified candidate ID are voted for
    ///@param _candidateId of candidates
    modifier onlyValidCandidate(uint256 _candidateId) {
        require(
            _candidateId < candidatesCount && _candidateId >= 0,
            "Invalid candidate to Vote!"
        );
        _;
    }

    ///======================= EVENTS & ERRORS ==============================
     ///@notice event to emit when election has ended
    event ElectionEnded(uint256[] _winnerIds, uint256 _winnerVoteCount);
    ///@notice event to emit when candidate has been created
    event CandidateCreated(uint256 _candidateId, string _candidateName);
    ///@notice event to emit when a candidate us voted for
    event VoteForCandidate(uint256 _candidateId, uint256 _candidateVoteCount);


    ///@notice error message to be caught when conditions aren't fufi/led
    error ElectionNotStarted();
    error ElectionHasEnded();
}
