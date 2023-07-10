'use strict';

goog.provide('Blockly.Arduino.lorawan');

goog.require('Blockly');
goog.require('Blockly.Arduino');


Blockly.Arduino.lorawan_init_RFMx= function() {
	
	//pin configuration SX1276
	var pin_nss= this.getFieldValue('PIN_NSS');  	
	var pin_rst= this.getFieldValue('PIN_RST');  	
	var pin_dio0= this.getFieldValue('PIN_DIO0');  	
	var pin_dio1= this.getFieldValue('PIN_DIO1');  	
	var pin_dio2= this.getFieldValue('PIN_DIO2');  	

	//frequency zone, default europe 868
	var freq= this.getFieldValue('FREQ');
	var freq_zone="#define CFG_eu868 1";	
	if(freq=="915") freq_zone="#define CFG_us915 1";

	//code
	Blockly.Arduino.definitions_['define_lorawan'] = freq_zone+'\n#include <TTN_esp32.h>';
	Blockly.Arduino.definitions_['var_lorawan']='TTN_esp32 lorawan_tts;'
	Blockly.Arduino.definitions_['var_lorawan_lastsend']='bool lorawan_last_send_result=false;';
	Blockly.Arduino.definitions_['var_lorawan_datareceived']='String lorawan_data_received="";';
	
	//send function
	var fnc_code='';
	fnc_code+='void fnc_lorawan_send(String _data){\n';
	fnc_code+='\tbyte buf[128];\n';		
	fnc_code+='\t_data.getBytes(buf, 128);\n';
	fnc_code+='\tlorawan_last_send_result=lorawan_tts.sendBytes(buf, _data.length());\n';
	fnc_code+='}\n';
	Blockly.Arduino.definitions_fnc_['fnc_lorawan_send']=fnc_code;

	//on receive event
	if(!Blockly.Arduino.definitions_fnc_['fnc_lorawan_onreceive']){
		fnc_code=`
void fnc_lorawan_onmessage(const uint8_t* payload, size_t size, int rssi){
	lorawan_data_received="";
	for (int i = 0; i < size; i++){
		lorawan_data_received+=String((char)payload[i]);
	}
}`;
		Blockly.Arduino.definitions_fnc_['fnc_lorawan_onreceive']=fnc_code;	
	}
	
	//setup code
	var c='lorawan_tts.begin('+pin_nss+',NULL,'+pin_rst+','+pin_dio0+','+pin_dio1+','+pin_dio2+');\n'; 
    c+='lorawan_tts.onMessage(fnc_lorawan_onmessage);\n';

	return c;
};


Blockly.Arduino.lorawan_connect_otaa= function() {

	//TTS (TTN) keys
	var deveui= Blockly.Arduino.quote_(this.getFieldValue('DEVEUI'));		
	var appeui= Blockly.Arduino.quote_(this.getFieldValue('APPEUI'));
	var appkey= Blockly.Arduino.quote_(this.getFieldValue('APPKEY'));		
	
	Blockly.Arduino.definitions_['var_lorawan_deveui']='const char* lorawan_devEui = '+deveui+';';
	Blockly.Arduino.definitions_['var_lorawan_appeui']='const char* lorawan_appEui = '+appeui+';';
	Blockly.Arduino.definitions_['var_lorawan_appkey']='const char* lorawan_appKey = '+appkey+';';
	
	//setup code
	var c='lorawan_tts.join(lorawan_devEui, lorawan_appEui,lorawan_appKey);\n';
	c+='while (!lorawan_tts.isJoined());\n';

	return c;
};


Blockly.Arduino.lorawan_connect_abp= function() {

	//TTS (TTN) keys
	var deveui= Blockly.Arduino.quote_(this.getFieldValue('DEVADDR'));		
	var appeui= Blockly.Arduino.quote_(this.getFieldValue('NWKEY'));
	var appkey= Blockly.Arduino.quote_(this.getFieldValue('APPKEY'));		
	
	Blockly.Arduino.definitions_['var_lorawan_deveui']='const char* lorawan_devAddr = '+deveui+';';
	Blockly.Arduino.definitions_['var_lorawan_appeui']='const char* lorawan_nwKey = '+appeui+';';
	Blockly.Arduino.definitions_['var_lorawan_appkey']='const char* lorawan_appKey = '+appkey+';';
	
	//setup code
	var c='lorawan_tts.personalize(lorawan_devAddr, lorawan_nwKey,lorawan_appKey);\n';
	c+='while (!lorawan_tts.isJoined());\n';

	return c;
};

Blockly.Arduino.lorawan_on_receive= function() {
  
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
  
	var fnc_code=`
void fnc_lorawan_onmessage(const uint8_t* payload, size_t size, int rssi){\n';
	lorawan_data_received="";\n';
	for (int i = 0; i < size; i++){\n'
		lorawan_data_received+=String((char)payload[i]);\n';
	}
`;
	fnc_code+='\n'+branch+'\n';
	fnc_code+='}\n';
	
	Blockly.Arduino.definitions_fnc_['fnc_lorawan_onreceive']=fnc_code;	

	return '';
  };

Blockly.Arduino.lorawan_on_receive_data=function(){

	var code='(lorawan_data_received)';
	
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}
  

Blockly.Arduino.lorawan_send= function() {
	  
	var str = Blockly.Arduino.valueToCode(this, 'DATA',Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
	var code='fnc_lorawan_send('+str+');\n';	  

	return code;
};

Blockly.Arduino.lorawan_send_result=function(){

	var code='(lorawan_last_send_result)';
	
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}


Blockly.Arduino.lorawan_deveui_esp32 = function() {

	var  f=`
	String fnc_lorawan_deveui_esp32(){	
		uint8_t devEUI[8];
		const uint8_t espressifPrefix[] = {0x70, 0xB3, 0xD5};  
		uint64_t chipId = ESP.getEfuseMac();
		uint8_t* chipIdBytes = (uint8_t*) &chipId;
	  
		devEUI[0] = espressifPrefix[0];
		devEUI[1] = espressifPrefix[1];
		devEUI[2] = espressifPrefix[2];
		devEUI[3] = chipIdBytes[4];
		devEUI[4] = chipIdBytes[3];
		devEUI[5] = chipIdBytes[2];
		devEUI[6] = chipIdBytes[1];
		devEUI[7] = chipIdBytes[0];
	
		  String devEuiStr="";
		  char charVal[2];
		  for (int i = 0; i < 8; i++) {
			sprintf(charVal, "%02X", devEUI[i]);
			devEuiStr+=String(charVal);
		  }
		  return devEuiStr;
	}`;
	
		Blockly.Arduino.definitions_fnc_['fnc_lorawan_deveui_esp32']=f;
	
		var code='fnc_lorawan_deveui_esp32()';
	
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	};
	