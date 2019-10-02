var express = require('express');
var bodyParser     =        require("body-parser");
var pos = [[47.368845, 8.545332],[47.369799, 8.546812],[47.370758, 8.544456],[47.368725, 8.537552],[47.368246, 8.538646],[47.368711, 8.530471],[47.363421, 8.532920],[47.368183, 8.545004],[47.369504, 8.544235],[47.371055, 8.548475],[47.370114, 8.543291],[47.370916, 8.545347],[47.370649, 8.541074],[47.370582, 8.546104],[47.367099, 8.545577],[47.366863, 8.541761],[47.362970, 8.526311],[47.377653, 8.558449],[47.367666, 8.537784],[47.372686, 8.531183

],[47.364382, 8.554406],[47.362699, 8.547918],[47.364016, 8.551324],[47.360976, 8.553378],[47.372365, 8.554735],[47.368417, 8.544101],[47.384602, 8.531985],[47.360209, 8.550359],[47.364339, 8.554420],[47.367305, 8.553015]];
var app = express();
var coor = []
//app.use(bodyParser.urlencoded({ extended: false }));
var parcels = [];
var interval;
var count = 0;
var engaged  = false;
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/api/getParcel', function (req, res) {
  if(parcels.length != 0){
    res.send({'res': parcels.shift()});
  }
  else{
    res.send({'res': null});
  }
});
app.get('/api/newTruck', function (req, res) {
	if(!engaged) {
  console.log("New Truck");
engaged = true;
  interval = setInterval(()=>{newParcel()}, 2000);
  res.send({'res': 'Okay'});}
	else{
console.log(count);
res.send({'res': 'Okay'});
}
});

console.log("Server running")
app.listen(8080, function () {
  console.log('Backend listening on port 8080!');
});

function newParcel(){
  if(count==10){
    count = 0;
    clearInterval(interval);
	engaged = false;
  }else{
count +=1;}
  let item = pos[Math.floor(Math.random()*pos.length)];
  let date = new Date('June 23, 2019 03:24:00');
  let random_boolean = Math.random() >= 0.2;
  let id_parcel =  Math.round(Math.random() * 4000);
  let size_parcel =  Math.round(Math.random() * 800);
  parcels.push({
    id: id_parcel,
    destination: {x: item[0], y: item[1]},
    currentPosition:  {x: item[0], y: item[1]},
    size: size_parcel,
    arrivalTime: date,
    efficent: random_boolean,
  })

  //console.log(parcels[parcels.length -1]);
}
