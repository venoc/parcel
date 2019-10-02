pragma solidity ^0.4.26;

interface Parcel {
  // Adding a new parcel
  function addParcel(uint _id, string _date, int _senderLongitude, int _senderLatitude, int _recipientLongitude, int _recipientLatitude) external returns (address);
  
  // Remove a parcel after is has been deliverd
  function removeParcel(uint index) external;
  
  // Hand over a parcel to the final deliverer
  function beginLastMile(Deliverer servPro) external;
  
  // Mark a parcel as deliverd
  function triggerDelivered(uint _index) external;
  
  // Get delivery status (parcel delivered and/or handed over to final deliverer)
  function getStatus() external view returns (bool, bool);

  // Saving information about the sender
  function setSender(uint _index, string _senderFirstName, string _senderLastName, string _senderStreet, string _senderStreetNr, string _senderPostcode, string _senderTown, string _senderCountry) external;
  
  // Get the sender information (first name, last name, street, street number, postcode, town, country)
  function getSender() external view returns (string _senderFirstName, string _senderLastName, string _senderStreet, string _senderStreetNr, string _senderPostcode, string _senderTown, string _senderCountry);

  // Saving information about the receiver
  function setReceiver(uint _index, string _recipientFirstName, string _recipientLastName, string _recipientStreet, string _recipientStreetNr, string _recipientPostcode, string _recipientTown, string _recipientCountry) external;
  
  // Get the receiver information (first name, last name, street, street number, postcode, town, country)
  function getReceiver() external view returns (string _recipientFirstName,string _recipientLastName,string _recipientStreet,string _recipientStreetNr,string _recipientPostcode,string _recipientTown,string _recipientCountry);

  // Saving coordindates of the origin and destination of a parcel
  function setCoordinates(uint _index, int _senderLongitude, int _senderLatitude, int _recipientLongitude, int _recipientLatitude) external;

  // Update the current owner of a parcel
  function setOwnerAddress(uint _index, address _ownerAddress) external;
  
  // Get current owner
  function getOwnerAddress() external view returns (address);

  // Saving properties about a parcel
  function setParcelProperties(uint _index, uint _length, uint _height, uint _width, bool _dangerous, bool _fragile, bool _tempSensitive) external;

  // Get the parcel properties (ID, length, heigth, width, properties of goods (dangerous, fragile, temperature sensitive))
  function getParcelProperties() external view returns (uint _length, uint _height, uint _width, bool _dangerous, bool _fragile, bool _tempSensitive);
  
  // Getting information about a parcel (ID, owner, arrival date and status)
  function getParcelStorage(uint i) external view returns(uint, address, string, bool);
}


interface Deliverer {

  // Add a new deliverer
  function addProvider(string _name, bool _dangerous, bool _fragile, bool _tempSensitive, uint _maxLength, uint _maxWidth, uint _maxHeight, uint[] _whitelist) external;

  // Add a new deliverer who you are willing to hand over a parcel
  function addToWhitelist(uint _providerID, uint _whitelistID) external;

}

