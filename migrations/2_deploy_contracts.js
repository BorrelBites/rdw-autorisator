module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.autolink();
  // deployer.deploy(MetaCoin);
  deployer.deploy(CarManufacturer);
  deployer.deploy(CarType);
  deployer.deploy(Licenceplate);
  deployer.deploy(SoftwareUpdate);
};
