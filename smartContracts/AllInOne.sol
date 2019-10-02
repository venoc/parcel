pragma solidity ^0.4.26;

contract ParcelAdministrator {
  address owner;
  ServiceProvider public ServiceProviderContract;
  uint public arrayIndex = 0;
  ParcelContract[] public parcelStorage;

  constructor(){
    owner = msg.sender;
    ServiceProviderContract = new ServiceProvider();
  }

  // Function for adding a new parcel
  function addParcel(uint _id, string _date, string _senderLongitude,  string _senderLatitude,  string _recipientLongitude,  string _recipientLatitude) public returns (address) {
    ParcelContract newParcel = new ParcelContract(arrayIndex, ServiceProviderContract);
    newParcel.setCoordinates(_senderLongitude,  _senderLatitude, _recipientLongitude, _recipientLatitude);
    newParcel.setCoreData(_id,_date);
    arrayIndex++;
    parcelStorage.push(newParcel);
    return address(newParcel);
  }
  function getParcelStorage(uint i) view  returns(uint, address, string, bool){
      ParcelContract p = parcelStorage[i];
      
      return (p.id() , address(p), p.arrivalDate(), p.lastMileStart());
  }
  function getParcelLocation(uint i) view  returns(uint, address, string, string, bool){
      ParcelContract p = parcelStorage[i];
      
      return (p.id() , address(p), p.recipientLongitude(), p.recipientLatitude(), p.lastMileStart());
  }
  function changeLastMileStart(address addr) returns (bool)   {
      ParcelContract p = ParcelContract(addr);
      p.beginLastMile(); 
      return true;
  }

  function setSender(uint _index, string memory _senderFirstName, string _senderLastName, string _senderStreet, string _senderStreetNr, string _senderPostcode, string _senderTown, string _senderCountry) public  {
    ParcelContract parcelTemp = parcelStorage[_index];
    parcelTemp.setSender(_senderFirstName, _senderLastName, _senderStreet, _senderStreetNr, _senderPostcode, _senderTown, _senderCountry);
  }

  function setReceiver(uint _index, string _recipientFirstName, string _recipientLastName, string _recipientStreet, string _recipientStreetNr, string _recipientPostcode, string _recipientTown, string _recipientCountry) public {
    ParcelContract parcelTemp = parcelStorage[_index];
    parcelTemp.setReceiver(_recipientFirstName, _recipientLastName, _recipientStreet, _recipientStreetNr, _recipientPostcode, _recipientTown, _recipientCountry);
  }

  function setCoordinates(uint _index,  string _senderLongitude,  string _senderLatitude,  string _recipientLongitude, string _recipientLatitude) {
    ParcelContract parcelTemp = parcelStorage[_index];
    parcelTemp.setCoordinates(_senderLongitude, _senderLatitude, _recipientLongitude, _recipientLatitude);
  }

  function removeParcel(uint index) public {
    //require(parcelStorage[index].delivered == true);
    if (index >= parcelStorage.length) return;
    for (uint i = index; i < parcelStorage.length-1; i++){
        parcelStorage[i] = parcelStorage[i+1];
    }
    delete parcelStorage[parcelStorage.length-1];
    parcelStorage.length--;
    arrayIndex--;
  }

  function setOwnerAddress(uint _index, address _ownerAddress) public {
    ParcelContract parcelTemp = parcelStorage[_index];
    parcelTemp.setOwnerAddress(_ownerAddress);
  }

  function triggerDelivered(uint _index) public {
    ParcelContract parcelTemp = parcelStorage[_index];
    parcelTemp.triggerDelivered();
  }

  function setParcelProperties(uint _index, uint _length, uint _height, uint _width, bool _dangerous, bool _fragile, bool _tempSensitive) public {
    ParcelContract parcelTemp = parcelStorage[_index];
    parcelTemp.setParcelProperties(_length, _height, _width, _dangerous, _fragile, _tempSensitive);
  }
}


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
   string senderLongitude;
  string senderLatitude;

  // The recipient of the parcel
  string recipientFirstName;
  string recipientLastName;
  string recipientStreet;
  string recipientStreetNr;
  string recipientPostcode;
  string recipientTown;
  string recipientCountry;
   string public recipientLongitude;
   string public recipientLatitude;

  // Current owner of the parcel
  address ownerAddress;

  // Delivery Status
  bool delivered = false;

  // Properties of a parcel
  string public arrivalDate = "June 23, 2019 03:24:00"; 
  uint public id; 
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
  bool public lastMileStart  = false;

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

  function beginLastMile(/*ServiceProvider servPro*/) public {
    require(lastMileStart == false , "Package already taken");
   // lastMileProvider = servPro ;
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

  function setCoordinates( string _senderLongitude,  string _senderLatitude,  string _recipientLongitude,  string _recipientLatitude) {
    //require(tx.origin == ownerAddress && lastMileStart == false, "Package already forwarded or no permission to change properties");
    senderLongitude = _senderLongitude;
    senderLatitude = _senderLatitude;
    recipientLongitude = _recipientLongitude;
    recipientLatitude = _recipientLatitude;
  }

  // Get the receiver information
  function getReceiver() public view returns (string _recipientFirstName,string _recipientLastName,string _recipientStreet,string _recipientStreetNr,string _recipientPostcode,string _recipientTown,string _recipientCountry) {
    return (recipientFirstName, recipientLastName, recipientStreet, recipientStreetNr, recipientPostcode, recipientTown, recipientCountry);
  }
  
  function setCoreData(uint _id, string _arrivalDate){
      id = _id; 
     arrivalDate = _arrivalDate; 
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


contract ServiceProvider {

  address owner;

  enum TransportMethod {
    truck, transporter, car, bike, scooter, foot
  }

  struct Provider {
    string name;
    bool dangerous;
    bool fragile;
    bool tempSensitive;
    uint maxLength;
    uint maxWidth;
    uint maxHeight;
    uint[] whitelist;
  }

  mapping(uint => Provider) public providers;
  uint providerID = 0;

  constructor(){
    owner = msg.sender;
  }

  function addProvider(string _name, bool _dangerous, bool _fragile, bool _tempSensitive, uint _maxLength, uint _maxWidth, uint _maxHeight, uint[] _whitelist) public {

    require(msg.sender == owner);

    Provider storage temp;
    temp.name = _name;
    temp.dangerous = _dangerous;
    temp.fragile = _fragile;
    temp.tempSensitive = _tempSensitive;
    temp.maxLength = _maxLength;
    temp.maxWidth = _maxWidth;
    temp.maxHeight = _maxHeight;

    providers[providerID] = Provider (
        _name,
        _dangerous,
        _fragile,
        _tempSensitive,
        _maxLength,
        _maxWidth,
        _maxHeight,
        _whitelist
    );

    providerID++;

  }

  function addToWhitelist(uint _providerID, uint _whitelistID) {
    require(msg.sender == owner);
    providers[_providerID].whitelist.push(_whitelistID);
  }

}

