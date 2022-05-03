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

    mapping(uint => ElectionDetail) public elections;
    mapping(uint => CandidatesDetail) public candidates;


    constructor() public{

     candis = ["amal","arun","akhil"];
     createElection("CUSAT COLLEGE ELECTION", candis);   

    }

    function createElection(string memory _title, string[] memory _cands) public{
        electionCount++;
        elections[electionCount] = ElectionDetail(electionCount, _title, false);
        for (uint i=0; i<_cands.length; i++) {
            candidatesCount++;
            candidates[candidatesCount] = CandidatesDetail(electionCount,_cands[i],0);
        }

        // emit TaskCreated(taskCount, _content, false);
     }

    // function toggleCompleted(uint _id) public {
    //     Task memory _task = tasks[_id];
    //     _task.completed = !_task.completed;
    //     tasks[_id] = _task;
    //     emit TaskCompleted(_id, _task.completed);
    // }


}