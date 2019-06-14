var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {

	it("it initialises with two candidates", function() {
		return Election.deployed().then(function(instance) {
			return instance.candidateCount();
		}).then(function(count) { 
			assert.equal(count, 2);
		});
	});

	it("it initialises with two candidates", function() {
		return Election.deployed().then(function(instance) {
			return instance.candidates(0);
		}).then(function(candidate) { 
			assert.equal(candidate[0], 0, "Correct id");
			assert.equal(candidate[1], "Erika Mustermann", "Correct name");
			assert.equal(candidate[2], 0, "Correct vote count : 0");
		});
	});

});