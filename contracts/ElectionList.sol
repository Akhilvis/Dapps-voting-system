pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;


contract ElectionList {
    uint public electionCount = 0;
    uint public candidatesCount = 0;
    string[] candis;

    struct ElectionDetail {
        uint id;
        string election_title;
        bool completed;
    }

    struct CandidatesDetail {
        uint election_id;
        string name;
        uint num_of_votes;
    }

    event electionSetup(
        uint id,
        string election_title,
        bool completed
    );

    event addCandidate(
        uint id,
        string cand_name,
        uint num_votes
    );


    mapping(uint => ElectionDetail) public elections;
    mapping(uint => CandidatesDetail) public candidates;


    constructor() public{

     candis = ["archana", "amala"];
     createElectionTitle("SCMS COLLEGE ELECTION");   

    }

    function createElectionTitle(string memory _title) public{
        electionCount++;
        elections[electionCount] = ElectionDetail(electionCount, _title, false);
        emit electionSetup(electionCount, _title, true);
     }

    function addCandidates(uint _electionid, string memory _cand_name) public{
            candidatesCount++;
            candidates[candidatesCount] = CandidatesDetail(_electionid,_cand_name,0);
            emit addCandidate(candidatesCount, _cand_name, 0);
     }

}