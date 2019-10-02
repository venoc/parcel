pragma solidity ^0.4.26;

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

    Provider temp;
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
