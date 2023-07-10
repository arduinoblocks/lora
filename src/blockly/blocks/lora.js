'use strict';
goog.provide('Blockly.Blocks.lora');
goog.require('Blockly.Blocks');

Blockly.Blocks.lora.HUE = 175;

Blockly.Blocks['lora_init_RFMx'] = {
	helpUrl: '',
	
	init: function() {
	  this.setColour (Blockly.Blocks.lora.HUE);

	  this.appendDummyInput("")
		  	.appendField(new Blockly.FieldImage("lora.png",44, 28))
		  	.appendField('Init');
									
		this.appendDummyInput("")    
		  	.appendField('RFM9x module (SPI)')
		  	.appendField(new Blockly.FieldDropdown([["433 MHz","433"],	
													["868 MHz","868"],     
													["915 MHz","915"]
												]), "FREQ");
  
		this.appendDummyInput()
			.appendField('NSS')
			.appendField(new Blockly.FieldDropdown([["26 (D2)","26"], ["25 (D3)","25"], ["17 (D4)","17"], ["16 (D5)","16"], ["27 (D6)","27"], ["14 (D7)","14"], ["12 (D8)","12"], ["13 (D9)","13"],["5 (D10)","5"],["23 (D11)","23"],["19 (D12)","19"],["18 (D13)","18"],["2 (A0)","2"],["4 (A1)","4"],["35 (A2) Input","35"],["34 (A3) Input","34"]]),"PIN_NSS")
			.appendField('RST')
			.appendField(new Blockly.FieldDropdown([["26 (D2)","26"], ["25 (D3)","25"], ["17 (D4)","17"], ["16 (D5)","16"], ["27 (D6)","27"], ["14 (D7)","14"], ["12 (D8)","12"], ["13 (D9)","13"],["5 (D10)","5"],["23 (D11)","23"],["19 (D12)","19"],["18 (D13)","18"],["2 (A0)","2"],["4 (A1)","4"],["35 (A2) Input","35"],["34 (A3) Input","34"]]),"PIN_RST")
			.appendField('DIO-0')
			.appendField(new Blockly.FieldDropdown([["26 (D2)","26"], ["25 (D3)","25"], ["17 (D4)","17"], ["16 (D5)","16"], ["27 (D6)","27"], ["14 (D7)","14"], ["12 (D8)","12"], ["13 (D9)","13"],["5 (D10)","5"],["23 (D11)","23"],["19 (D12)","19"],["18 (D13)","18"],["2 (A0)","2"],["4 (A1)","4"],["35 (A2) Input","35"],["34 (A3) Input","34"]]),"PIN_DIO0");

	  this.setInputsInline(false);  
	  this.setPreviousStatement(true,null);
	  this.setNextStatement(true,null);
	},	
  };

  
Blockly.Blocks['lora_on_receive'] = {
	helpUrl: '',

	init: function() {
		this.setColour(Blockly.Blocks.lora.HUE);
	
	  	this.appendDummyInput("")
			.appendField(new Blockly.FieldImage("lora.png", 44, 28))
	 		.appendField('On data received');

		this.appendStatementInput('DO');      
  
	  	this.setInputsInline(false);
	  	this.setPreviousStatement(false);
	  	this.setNextStatement(false);
	}
  };


Blockly.Blocks['lora_on_receive_data'] = {	
	helpUrl: '',
	init: function() {
	  	this.setColour(Blockly.Blocks.lora.HUE);
	  	this.appendDummyInput()
	  		.appendField(new Blockly.FieldImage("lora.png", 44, 28))
			.appendField('Received - Data');
			
		this.setOutput(true, 'String');
	}
  };
  
 
Blockly.Blocks['lora_send'] = {
	helpUrl: '',
	init: function() {
		this.setColour (Blockly.Blocks.lora.HUE);
		this.appendDummyInput("")
			.appendField(new Blockly.FieldImage("lora.png", 44, 28))
			.appendField('Send'); 
 
		this.appendValueInput("DATA", 'String');
	
	  	this.setInputsInline(true);  
	  	this.setPreviousStatement(true,null);
	  	this.setNextStatement(true,null);
	}
  };

