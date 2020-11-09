const Resource = require("../models/resources.model");

module.exports.findAllResources = (req, res) => {
  Resource.find()
    .then(allDaResources => res.json( allDaResources ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleResource = (req, res) => {
	Resource.findOne({ _id: req.params.id })
		.then(oneSingleResource => res.json(oneSingleResource ))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewResource = (req, res) => {
  Resource.create(req.body)
    .then(newlyCreatedResource => res.json( newlyCreatedResource ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingResource = (req, res) => {
  Resource.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedResource => res.json( updatedResource ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingResource = (req, res) => {
  Resource.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
