
#include "WiFi.h"
#include <Adafruit_NeoPixel.h>
#include <WebServer.h>
#include <ESP32Servo.h>
#define SERVO  4


const char* ssid     = "Trust Square Guests";
const char* password = "yourprivatekey";


WebServer server(80);
boolean motorStart = false;


void setup()
{
  Serial.begin(115200);
  Serial.println("Starting ESP32.");


  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected");

  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  server.on("/", handleRoot);
  server.on("/toggleMotor", toggleMotor);
  server.begin();

}

void loop()
{
  server.handleClient();
  if (!myservo.attached()) {
    myservo.setPeriodHertz(50); // standard 50 hz servo
    myservo.attach(33, 1000, 2000); // Attach the servo after it has been detatched
  }
  if(motorStart){
  myservo.write(0);
  }
  else{
    myservo.write(179);
  }
}

void toggleMotor() {
  Serial.println("Motor toggled");
  motorStart = !motorStart;
  if (motorStart)
    server.send(200, "text/plane", "ON");
  else
    server.send(200, "text/plane", "OFF");
}
