const Fiver = require("../models/fiver.model");

module.exports.findAllFivers = (req, res) => {
  Fiver.find()
    .then(allDaFivers => res.json( allDaFivers ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleFiver = (req, res) => {
	Fiver.findOne({ _id: req.params.id })
		.then(oneSingleFiver => res.json(oneSingleFiver ))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewFiver = (req, res) => {
  Fiver.create(req.body)
    .then(newlyCreatedFiver => res.json( newlyCreatedFiver ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingFiver = (req, res) => {
  Fiver.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedFiver => res.json( updatedFiver ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingFiver = (req, res) => {
  Fiver.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
