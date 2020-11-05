const Manufacturer = require("../models/manufacturer.model");

module.exports.findAllManufacturers = (req, res) => {
  Manufacturer.find()
    .then(allDaManufacturers => res.json( allDaManufacturers ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleManufacturer = (req, res) => {
	Manufacturer.findOne({ _id: req.params.id })
		.then(oneSingleManufacturer => res.json(oneSingleManufacturer ))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewManufacturer = (req, res) => {
  Manufacturer.create(req.body)
    .then(newlyCreatedManufacturer => res.json( newlyCreatedManufacturer ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingManufacturer = (req, res) => {
  Manufacturer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedManufacturer => res.json( updatedManufacturer ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingManufacturer = (req, res) => {
  Manufacturer.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
