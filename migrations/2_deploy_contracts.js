module.exports = function(deployer) {
  deployer.deploy(CarManufacturer);
  deployer.deploy(CarType);
  deployer.deploy(Licenceplate);
  deployer.deploy(SoftwareUpdate);
};
