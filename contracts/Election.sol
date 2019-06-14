pragma solidity ^ 0.5 .0;

contract Election {

	struct Candidate {
		uint id;
		string name;
		uint voteCount;
	}

	// use mapping to get candidates details
	mapping (uint => Candidate) public candidates;

	// use public variable to have the number of candidates
	uint public candidateCount;

	//constructor
	constructor() public {
		addCandidate("Erika Mustermann");
		addCandidate("Max Mustermann");
	}

	// function to add candidates to the election
	function addCandidate(string memory _name) private {
		candidates[candidateCount] = Candidate(candidateCount, _name, 0);
		candidateCount++;
	}


}