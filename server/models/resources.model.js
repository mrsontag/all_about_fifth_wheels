const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
	title: String,
	description: String,
	fifthwheel: String,
	logoimg: String,
	links: {
		website: String,
		youtube: String,
		facebook: String,
		amazon: String,
		instagram: String,
		twitter: String,
	},
	lastchecked: Date
},{timestamps: true});

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;