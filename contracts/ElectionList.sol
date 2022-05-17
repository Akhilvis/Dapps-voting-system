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
        uint id;
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
    event VoteCompleted(
        uint id,
        uint vote_count
    );


    mapping(uint => ElectionDetail) public elections;
    mapping(uint => CandidatesDetail) public candidates;


    constructor() public{

    //  candis = ["archana", "amala"];
    //  createElectionTitle("SCMS COLLEGE ELECTION");
    //  createElectionTitle("SCMS COLLEGE ELECTION");   
   
    }

    function createElectionTitle(string memory _title) public{
        electionCount++;
        elections[electionCount] = ElectionDetail(electionCount, _title, false);
        emit electionSetup(electionCount, _title, true);
     }

    function addCandidates(uint _electionid, string memory _cand_name) public{
            candidatesCount++;
            candidates[candidatesCount] = CandidatesDetail(candidatesCount, _electionid,_cand_name,0);
            emit addCandidate(candidatesCount, _cand_name, 0);
     }

     function voteCandidate(uint _candidateid) public{
        CandidatesDetail memory _candidate = candidates[_candidateid];
        uint _vote_count = _candidate.num_of_votes;
        _vote_count++;
        _candidate.num_of_votes = _vote_count;
        candidates[_candidateid] = _candidate;
        emit VoteCompleted(_candidateid, _vote_count);
     }

}