#define CFG_eu868 1
#include <TTN_esp32.h>

const char* devEui = "xxxxxxxxxxxxxxxx"; // TTN Device EUI
const char* appEui = "xxxxxxxxxxxxxxxx"; // TTN Application EUI
const char* appKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // TTN Application Key

TTN_esp32 ttn;

void message(const uint8_t* payload, size_t size, int rssi)
{
  String str_payload="";
  for (int i = 0; i < size; i++)
  {
    str_payload+=String((char)payload[i]);      
  }
    
  Serial.println("Recibido: "+str_payload);
}

void setup()
{
  Serial.begin(115200);
  Serial.println("Iniciando...");

  ttn.begin(/*nss*/ 5, /*rxtx*/ NULL, /*rst*/ 13, /*dio0*/ 12, /*dio1*/ 14, /*dio2*/ 27 ); 
  ttn.onMessage(message);    
  ttn.join(devEui, appEui, appKey);
    
  Serial.print("Conectando a LoRaWAN (TTN)");
  while (!ttn.isJoined())
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\nConectado!");
  ttn.showStatus();
}

void loop()
{
  String strdata="Hola mundo!";
  byte buf[64];
  strdata.getBytes(buf, 64);
  
  if (ttn.sendBytes(buf, strdata.length()))
  {
    Serial.println("Datos enviados");
  }
  else{
    Serial.println("Error enviado");
  }    
  delay(60000);
}
