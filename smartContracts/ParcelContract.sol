pragma solidity ^0.4.26;
import './ServiceProvider.sol';

contract ParcelContract {

  // Basic Properties

  // The sender of the parcel
  string senderFirstName;
  string senderLastName;
  string senderStreet;
  string senderStreetNr;
  string senderPostcode;
  string senderTown;
  string senderCountry;
  int senderLongitude;
  int senderLatitude;

  // The recipient of the parcel
  string recipientFirstName;
  string recipientLastName;
  string recipientStreet;
  string recipientStreetNr;
  string recipientPostcode;
  string recipientTown;
  string recipientCountry;
  int recipientLongitude;
  int recipientLatitude;

  // Current owner of the parcel
  address ownerAddress;

  // Delivery Status
  bool delivered = false;

  // Properties of a parcel
  uint length;
  uint height;
  uint width;
  bool dangerous;
  bool fragile;
  bool tempSensitive;

  // Index for parcel delivery application
  uint parcelIndex;
  ServiceProvider ServiceProviderContract;
  ServiceProvider lastMileProvider;
  //address lastMileNode; //stattdessen ownerAddress
  bool lastMileStart  = false;

  // Constructor
  constructor(uint _parcelIndex, ServiceProvider _ServiceProviderContract) public {
    ServiceProviderContract = _ServiceProviderContract;
    ownerAddress = msg.sender;
    delivered = false;
    parcelIndex = _parcelIndex;
  }

  // Set current owner
  function setOwnerAddress(address _ownerAddress) public {
    require(tx.origin == ownerAddress);
    ownerAddress = _ownerAddress;
  }

  // Set delivery status
  function triggerDelivered() public {
    require(ownerAddress == tx.origin && lastMileStart ==true);
    delivered = true;
  }

  // Set the sender information
  function setSender(string _senderFirstName, string _senderLastName, string _senderStreet, string _senderStreetNr, string _senderPostcode, string _senderTown, string _senderCountry) public {
    require(tx.origin == ownerAddress && lastMileStart == false, "Package already forwarded or no permission to change properties");
    senderFirstName = _senderFirstName;
    senderLastName = _senderLastName;
    senderStreet = _senderStreet;
    senderStreetNr = _senderStreetNr;
    senderTown = _senderTown;
    senderPostcode = _senderPostcode;
    senderCountry = _senderCountry;
  }

  function beginLastMile(ServiceProvider servPro){
    require(lastMileStart == false , "Package already taken");
    require(ServiceProviderContract.whitelist(ownerAddress,  msg.sender, "Node not in Whitelist") ;
    lastMileProvider = servPro ;
    lastMileStart = true;
    ownerAddress = msg.sender;
  }

  // Get the sender information
  function getSender() public view returns (string _senderFirstName, string _senderLastName, string _senderStreet, string _senderStreetNr, string _senderPostcode, string _senderTown, string _senderCountry) {
      return (senderFirstName, senderLastName, senderStreet, senderStreetNr, senderPostcode, senderTown, senderCountry);
  }

  // Set the receiver
  function setReceiver(string _recipientFirstName, string _recipientLastName, string _recipientStreet, string _recipientStreetNr, string _recipientPostcode, string _recipientTown, string _recipientCountry) public {
    require(tx.origin == ownerAddress && lastMileStart == false, "Package already forwarded or no permission to change properties");
    recipientFirstName = _recipientFirstName;
    recipientLastName = _recipientLastName;
    recipientStreet = _recipientStreet;
    recipientStreetNr = _recipientStreetNr;
    recipientPostcode = _recipientPostcode;
    recipientTown = _recipientTown;
    recipientCountry = _recipientCountry;

  }

  function setCoordinates(int _senderLongitude, int _senderLatitude, int _recipientLongitude, int _recipientLatitude) {
    require(tx.origin == ownerAddress && lastMileStart == false, "Package already forwarded or no permission to change properties");
    senderLongitude = _senderLongitude;
    senderLatitude = _senderLatitude;
    recipientLongitude = _recipientLongitude;
    recipientLatitude = _recipientLatitude;
  }

  // Get the receiver information
  function getReceiver() public view returns (string _recipientFirstName,string _recipientLastName,string _recipientStreet,string _recipientStreetNr,string _recipientPostcode,string _recipientTown,string _recipientCountry) {
    return (recipientFirstName, recipientLastName, recipientStreet, recipientStreetNr, recipientPostcode, recipientTown, recipientCountry);
  }

  // Set parcel properties
  function setParcelProperties(uint _length, uint _height, uint _width, bool _dangerous, bool _fragile, bool _tempSensitive) public {
    require(tx.origin == ownerAddress && lastMileStart == false, "Package already forwarded or no permission to change properties");
    length = _length;
    height = _height;
    width = _width;
    dangerous = _dangerous;
    fragile = _fragile;
    tempSensitive = _tempSensitive;
  }

  // Get current owner
  function getOwnerAddress() public view returns (address) {
    return ownerAddress;
  }

  // Get delivery status
  function getStatus() public view returns (bool, bool) {
    return (delivered, lastMileStart);
  }

  // Get the parcel properties
  function getParcelProperties() public view returns (uint _length, uint _height, uint _width, bool _dangerous, bool _fragile, bool _tempSensitive) {
    return (length, height, width, dangerous, fragile, tempSensitive);
  }
}
