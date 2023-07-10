'use strict';

goog.provide('Blockly.Arduino.lora');

goog.require('Blockly');
goog.require('Blockly.Arduino');

Blockly.Arduino.lora_init_RFMx= function() {

	var pin_nss= this.getFieldValue('PIN_NSS');  	
	var pin_rst= this.getFieldValue('PIN_RST');  	
	var pin_dio0= this.getFieldValue('PIN_DIO0');  	
	
	//frequency zone, default europe 868
	var freq= this.getFieldValue('FREQ');
	
	//code
	Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
	Blockly.Arduino.definitions_['define_lora'] = '#include <LoRa.h>';
	Blockly.Arduino.definitions_['var_lora_datareceived']='String lora_data_received="";';
	
	//send function
	var fnc_code='';
	fnc_code+='void fnc_lora_send(String _data){\n';
	fnc_code+='\tLoRa.beginPacket();\n';
	fnc_code+='\tLoRa.print(_data);\n';
    fnc_code+='\tLoRa.endPacket();\n';          
	fnc_code+='}\n';
	Blockly.Arduino.definitions_fnc_['fnc_lora_send']=fnc_code;

	//empty onreceive
	if(!Blockly.Arduino.definitions_fnc_['fnc_lora_onreceive']){
		var fnc_code=`
void fnc_lora_onreceive(int packetSize){
	if (packetSize == 0) return;
	lora_data_received="";
		
	while (LoRa.available()) {
		lora_data_received += (char)LoRa.read();
	}
}`;
		Blockly.Arduino.definitions_fnc_['fnc_lora_onreceive']=fnc_code;	
	}

	//loop code
	Blockly.Arduino.loops_['loop_lora']='\tfnc_lora_onreceive(LoRa.parsePacket());';  

	//setup code
	var c='LoRa.setPins('+pin_nss+','+pin_rst+','+pin_dio0+');\n'; 
    c+='LoRa.begin('+freq+'E6);\n';

	//code
	return c;
};

Blockly.Arduino.lora_on_receive= function() {
  
	var branch = Blockly.Arduino.statementToCode(this, 'DO');

	//onreceive event (overwrite empty)
	var fnc_code=`
void fnc_lora_onreceive(int _packetSize){
	if (_packetSize == 0) return;
	lora_data_received="";

	while (LoRa.available()) {
		lora_data_received += (char)LoRa.read();
	}

	//event code:
`;

	fnc_code+='\n'+branch+'\n';
	fnc_code+='}\n';
	
	Blockly.Arduino.definitions_fnc_['fnc_lora_onreceive']=fnc_code;	

	return '';
};


Blockly.Arduino.lora_on_receive_data=function(){

	var code='(lora_data_received)';
	
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}
  
Blockly.Arduino.lora_send= function() {
	  
	var str = Blockly.Arduino.valueToCode(this, 'DATA',Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
	var code='fnc_lora_send('+str+');\n';	  

	return code;
};

