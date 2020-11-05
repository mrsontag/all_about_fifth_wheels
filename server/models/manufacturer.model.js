const mongoose = require("mongoose");

const ManufacturerSchema = new mongoose.Schema({
	manufacturer: String,
	brands: [ 
		{ 
			name: String,
			category: String,
			profile: String,
			towclass: String,
		} 
	],
	
},{timestamps: true});

const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);

module.exports = Manufacturer;