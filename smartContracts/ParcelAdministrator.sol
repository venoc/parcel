pragma solidity ^0.4.26;
import './ParcelContract.sol';
import './ServiceProvider.sol';

contract ParcelAdministrator {
  address owner;
  ServiceProvider ServiceProviderContract;
  uint public arrayIndex = 0;
  ParcelContract[] public parcelStorage;

  constructor(){
    owner = msg.sender;
    ServiceProviderContract = new ServiceProvider(owner);
  }

  // Function for adding a new parcel
  function addParcel() public returns (uint) {
    ParcelContract newParcel = new ParcelContract(arrayIndex, ServiceProviderContract);
    arrayIndex++;
    parcelStorage.push(newParcel);
    return arrayIndex;
  }

  function setSender(uint _index, string memory _senderFirstName, string _senderLastName, string _senderStreet, string _senderStreetNr, string _senderPostcode, string _senderTown, string _senderCountry) public  {
    ParcelContract parcelTemp = parcelStorage[_index];
    parcelTemp.setSender(_senderFirstName, _senderLastName, _senderStreet, _senderStreetNr, _senderPostcode, _senderTown, _senderCountry);
  }

  function setReceiver(uint _index, string _recipientFirstName, string _recipientLastName, string _recipientStreet, string _recipientStreetNr, string _recipientPostcode, string _recipientTown, string _recipientCountry) public {
    ParcelContract parcelTemp = parcelStorage[_index];
    parcelTemp.setReceiver(_recipientFirstName, _recipientLastName, _recipientStreet, _recipientStreetNr, _recipientPostcode, _recipientTown, _recipientCountry);
  }

  function setCoordinates(uint _index, int _senderLongitude, int _senderLatitude, int _recipientLongitude, int _recipientLatitude) {
    ParcelContract parcelTemp = parcelStorage[_index];
    parcelTemp.setCoordinates(_senderLongitude, _senderLatitude, _recipientLongitude, _recipientLatitude);
  }

  function removeParcel(uint index) public {
    require(parcelStorage[i].delivered == true);
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
