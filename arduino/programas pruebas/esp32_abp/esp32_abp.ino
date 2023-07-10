#define CFG_eu868 1
#include <TTN_esp32.h>

const char* devAddr = "xxxxxxxx"; // Change to TTN Device Address
const char* nwkSKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Change to TTN Network Session Key
const char* appSKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Change to TTN Application Session Key

TTN_esp32 ttn ;

void message(const uint8_t* payload, size_t size, int rssi)
{
  
  String str_payload="";
  for (int i = 0; i < size; i++)
  {
    str_payload+=String((char)payload[i]);      
  }
    
  Serial.println("RX>> "+str_payload);
}

void setup()
{
    Serial.begin(115200);
    Serial.println("Iniciando ejemplo ABP");

    ttn.begin(/*nss*/ 5, /*rxtx*/ NULL, /*rst*/ 13, /*dio0*/ 12, /*dio1*/ 14, /*dio2*/ 27 ); 
    ttn.onMessage(message);    

    ttn.personalize(devAddr, nwkSKey, appSKey); 
    
    Serial.print("Joining TTN ");
    while (!ttn.isJoined())
    {
        Serial.print(".");
        delay(500);
    }
    Serial.println("\njoined !");
    ttn.showStatus();
}

void loop()
{
  String strdata="ESP32 Juanjo ABP";
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
