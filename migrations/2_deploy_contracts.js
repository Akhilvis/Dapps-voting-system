var ElectionList = artifacts.require("./ElectionList.sol");

module.exports = function(deployer) {
  deployer.deploy(ElectionList);
};
