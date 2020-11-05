const ManufacturerController = require("../controllers/manufacturer.controller");

module.exports = app => {
  app.get("/api/manufacturers/", ManufacturerController.findAllManufacturers);
  app.get("/api/manufacturers/:id", ManufacturerController.findOneSingleManufacturer);
  app.put("/api/manufacturers/update/:id", ManufacturerController.updateExistingManufacturer);
  app.post("/api/manufacturers/new", ManufacturerController.createNewManufacturer);
  app.delete("/api/manufacturers/delete/:id", ManufacturerController.deleteAnExistingManufacturer);
};