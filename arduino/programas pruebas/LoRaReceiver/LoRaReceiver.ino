#include <SPI.h>
#include <LoRa.h>


void setup() {
  Serial.begin(9600);
  while (!Serial);
  
  Serial.println("LoRa Receiver");

  LoRa.setPins(5,13,12);  //NSS, RST, D0
  
  if (!LoRa.begin(868E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}

void loop() {

  int packetSize = LoRa.parsePacket();

  if (packetSize) {

    // received a packet
    Serial.print("Received packet '");

    // read packet
    while (LoRa.available()) {
      char c=(char)LoRa.read();
      Serial.print(c);
    }
  }
}
