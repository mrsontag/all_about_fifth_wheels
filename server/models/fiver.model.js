const mongoose = require("mongoose");

const FiverSchema = new mongoose.Schema({
	manufacturer: String,
	brand: String,
	model: String,
	pagelink: String,
	floorplanimg: String,
	threedtourlink: String,
	specs: {
		length: Number,
		width: Number,
		height: Number,
		tanks: {
			fresh: Number,
			grey: Number,
			black: Number,
			propane: Number
		},
		weights: {
			dry: Number,
			gvwr: Number,
			hitch: Number
		},
		fiftyamp: Boolean,
		leveling: {
			type: {type: String},
			points: Number
		}
	},
	floorplan: {
		slideouts: Number,
		kitchenloc: String,
		counters_around: {
			stove: Boolean,
			kitchensink: Boolean,
			masterbathsink: Boolean,
		},
		hasisland: Boolean,
		opposingcouches: Boolean,
		sleeps: Number
	},
	
	features: {
		ac_count: Number,
		living_fireplace: Boolean,
		br_fireplace: Boolean,
		mainwindowsonleft: Boolean,
		windshield: Boolean,
		combowdprep: Boolean,
		sepwdprep: Boolean,
		outdoorsink: Boolean,
		outdoorfridge: Boolean,
		outdoorcooktop: Boolean,
		outdoortv: Boolean
	},
	bathroom: {
		count: Number,
		toilets: Number,
		showers: Number,
		mainshowersize: String,
		maindoublesink: Boolean,
	},
	pricing: {
		msrp: Number,
		low: Number,
		high: Number
	}
},{timestamps: true});

const Fiver = mongoose.model("Fiver", FiverSchema);

module.exports = Fiver;