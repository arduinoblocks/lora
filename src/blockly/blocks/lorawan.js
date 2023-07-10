'use strict';
goog.provide('Blockly.Blocks.lorawan');
goog.require('Blockly.Blocks');

Blockly.Blocks.lorawan.HUE = 275; 

Blockly.Blocks['lorawan_init_RFMx'] = {
	helpUrl: '',
	
	init: function() {
	  	this.setColour (Blockly.Blocks.lorawan.HUE);

	  	this.appendDummyInput("")
			.appendField(new Blockly.FieldImage("lorawan.png", 83, 28))
		  	.appendField('Init');

		this.appendDummyInput("")    
		  	.appendField('RFM9x module (SPI)')
		  	.appendField(new Blockly.FieldDropdown([["433 MHz","433"],	
													["868 MHz","868"],     
													["915 MHz","915"]
												]), "FREQ");
  										
		this.appendDummyInput("")
			.appendField("NSS")
			.appendField(new Blockly.FieldDropdown([["26 (D2)","26"], ["25 (D3)","25"], ["17 (D4)","17"], ["16 (D5)","16"], ["27 (D6)","27"], ["14 (D7)","14"], ["12 (D8)","12"], ["13 (D9)","13"],["5 (D10)","5"],["23 (D11)","23"],["19 (D12)","19"],["18 (D13)","18"],["2 (A0)","2"],["4 (A1)","4"],["35 (A2) Input","35"],["34 (A3) Input","34"]]),"PIN_NSS")
			.appendField("RST")
			.appendField(new Blockly.FieldDropdown([["26 (D2)","26"], ["25 (D3)","25"], ["17 (D4)","17"], ["16 (D5)","16"], ["27 (D6)","27"], ["14 (D7)","14"], ["12 (D8)","12"], ["13 (D9)","13"],["5 (D10)","5"],["23 (D11)","23"],["19 (D12)","19"],["18 (D13)","18"],["2 (A0)","2"],["4 (A1)","4"],["35 (A2) Input","35"],["34 (A3) Input","34"]]),"PIN_RST");

		this.appendDummyInput("")
			.appendField("DIO-0")
			.appendField(new Blockly.FieldDropdown([["26 (D2)","26"], ["25 (D3)","25"], ["17 (D4)","17"], ["16 (D5)","16"], ["27 (D6)","27"], ["14 (D7)","14"], ["12 (D8)","12"], ["13 (D9)","13"],["5 (D10)","5"],["23 (D11)","23"],["19 (D12)","19"],["18 (D13)","18"],["2 (A0)","2"],["4 (A1)","4"],["35 (A2) Input","35"],["34 (A3) Input","34"]]),"PIN_DIO0")
			.appendField("DIO-1")
			.appendField(new Blockly.FieldDropdown([["26 (D2)","26"], ["25 (D3)","25"], ["17 (D4)","17"], ["16 (D5)","16"], ["27 (D6)","27"], ["14 (D7)","14"], ["12 (D8)","12"], ["13 (D9)","13"],["5 (D10)","5"],["23 (D11)","23"],["19 (D12)","19"],["18 (D13)","18"],["2 (A0)","2"],["4 (A1)","4"],["35 (A2) Input","35"],["34 (A3) Input","34"]]),"PIN_DIO1")
			.appendField("DIO-2")
			.appendField(new Blockly.FieldDropdown([["26 (D2)","26"], ["25 (D3)","25"], ["17 (D4)","17"], ["16 (D5)","16"], ["27 (D6)","27"], ["14 (D7)","14"], ["12 (D8)","12"], ["13 (D9)","13"],["5 (D10)","5"],["23 (D11)","23"],["19 (D12)","19"],["18 (D13)","18"],["2 (A0)","2"],["4 (A1)","4"],["35 (A2) Input","35"],["34 (A3) Input","34"]]),"PIN_DIO2");

		this.setInputsInline(false);  
	  	this.setPreviousStatement(true,null);
	  	this.setNextStatement(true,null);
	},	
  };

  
Blockly.Blocks['lorawan_connect_otaa'] = {
	helpUrl: '',
	
	init: function() {
	  	this.setColour (Blockly.Blocks.lorawan.HUE);

	  	this.appendDummyInput("")
			.appendField(new Blockly.FieldImage("lorawan.png", 83, 28))
		  	.appendField("Connect (OTAA)");
		
	   	this.appendDummyInput()
		  	.appendField("Device EUI")
		  	.appendField(new Blockly.FieldTextInput(''),'DEVEUI');

		this.appendDummyInput()
		  	.appendField("Application EUI")
		  	.appendField(new Blockly.FieldTextInput(''),'APPEUI');

		this.appendDummyInput()
		  	.appendField("Application Key")
		  	.appendField(new Blockly.FieldTextInput(''),'APPKEY');

		this.setInputsInline(false);  
	  	this.setPreviousStatement(true,null);
	  	this.setNextStatement(true,null);
	},	
  };


  Blockly.Blocks['lorawan_connect_abp'] = {
	helpUrl: '',
	
	init: function() {
	  this.setColour (Blockly.Blocks.lorawan.HUE);

	  this.appendDummyInput("")
		  .appendField(new Blockly.FieldImage("lorawan.png", 83, 28))
		  .appendField("Connect (ABP)");
		
	   	this.appendDummyInput()
		  .appendField("Device Address")
		  .appendField(new Blockly.FieldTextInput(''),'DEVADDR');

		this.appendDummyInput()
		  .appendField("Network Key")
		  .appendField(new Blockly.FieldTextInput(''),'NWKEY');

		this.appendDummyInput()
		  .appendField("Application Key")
		  .appendField(new Blockly.FieldTextInput(''),'APPKEY');

	  this.setInputsInline(false);  
	  this.setPreviousStatement(true,null);
	  this.setNextStatement(true,null);
	},	
  };
  
Blockly.Blocks['lorawan_on_receive'] = {
	helpUrl: '',

	init: function() {
	  this.setColour(Blockly.Blocks.lorawan.HUE);
	
	  this.appendDummyInput("")
	  .appendField(new Blockly.FieldImage("lorawan.png", 83, 28))
	  .appendField('On data received');

	  this.appendStatementInput('DO');      
  
	  this.setInputsInline(false);
	  this.setPreviousStatement(false);
	  this.setNextStatement(false);
	}
  };

 
Blockly.Blocks['lorawan_on_receive_data'] = {	
	helpUrl: '',

	init: function() {
	  this.setColour(Blockly.Blocks.lorawan.HUE);
	  this.appendDummyInput()
	  .appendField(new Blockly.FieldImage("lorawan.png", 83, 28))
			.appendField('Received - Data');
			
	  this.setOutput(true, 'String');
	}
  };
  
 
Blockly.Blocks['lorawan_send'] = {
	helpUrl: '',

	init: function() {
	  this.setColour (Blockly.Blocks.lorawan.HUE);
	  this.appendDummyInput("")
		  .appendField(new Blockly.FieldImage("lorawan.png", 83, 28))
		  .appendField('Send'); 
 
	  this.appendValueInput("DATA", 'String');
	
	  this.setInputsInline(true);  
	  this.setPreviousStatement(true,null);
	  this.setNextStatement(true,null);
	}
  };

  Blockly.Blocks['lorawan_send_result'] = {	
	helpUrl: '',

	init: function() {
	  this.setColour(Blockly.Blocks.lorawan.HUE);
	  this.appendDummyInput()
	  .appendField(new Blockly.FieldImage("lorawan.png", 83, 28))
	  .appendField('Data sent successfully?');
			
	  this.setOutput(true, 'Boolean');
	}
  };


  Blockly.Blocks['lorawan_deveui_esp32'] = {
    helpUrl: '',
    init: function() {
    this.setColour (Blockly.Blocks.lorawan.HUE);
    this.appendDummyInput()
      .appendField("ESP32 Generated DevEUI (ChipId)");

    this.setInputsInline(true);
    this.setOutput(true, 'String');
    }
  };