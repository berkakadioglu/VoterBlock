var AllElections = artifacts.require('AllElections');

module.exports = function (deployer) {
  deployer.deploy(AllElections);
};