#include <SPI.h>
#include <LoRa.h>

int counter = 0;

void setup() {
   Serial.begin(9600);
  while (!Serial);

  Serial.println("LoRa Sender");
  
  LoRa.setPins(5,13,12);  //NSS, RST, D0

  if (!LoRa.begin(868E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  } 
}

void loop() {
  Serial.print("Sending packet: ");
  Serial.println(counter);

  // send packet
  LoRa.beginPacket();
  LoRa.print("Hello: ");
  LoRa.print(counter);
  LoRa.endPacket();

  counter++;

  delay(5000); 
}
