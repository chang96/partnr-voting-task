const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  let votingInstance;
  const admin = accounts[0];
  const voter1 = accounts[1];
  const voter2 = accounts[2];
  
  before(async () => {
    votingInstance = await Voting.deployed();
  });

  it("should allow the admin to register candidates", async () => {
    await votingInstance.registerCandidate("chang", { from: admin });
    await votingInstance.registerCandidate("chang2", { from: admin });

    const candidate1 = await votingInstance.candidates(1);
    const candidate2 = await votingInstance.candidates(2);

    assert.equal(candidate1.name, "chang");
    assert.equal(candidate2.name, "chang2");
  });

  it("should allow users to vote", async () => {
    await votingInstance.vote(1, { from: voter1 });
    await votingInstance.vote(2, { from: voter2 });

    const candidate1 = await votingInstance.candidates(1);
    const candidate2 = await votingInstance.candidates(2);

    assert.equal(candidate1.voteCount, 1);
    assert.equal(candidate2.voteCount, 1);
  });

  it("should close voting and announce the winner", async () => {
    await votingInstance.closeVoting({ from: admin });

    const winnerEvent = await votingInstance.getPastEvents("AnnounceWinners", { fromBlock: 0 });
    const winner = winnerEvent[0].returnValues.winnerName;

    assert.equal(winner, "chang");
  });
});
