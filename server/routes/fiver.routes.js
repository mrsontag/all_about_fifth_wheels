const FiverController = require("../controllers/user.controller");

module.exports = app => {
  app.get("/api/fivers/", FiverController.findAllFivers);
  app.get("/api/fivers/:id", FiverController.findOneSingleFiver);
  app.put("/api/fivers/update/:id", FiverController.updateExistingFiver);
  app.post("/api/fivers/new", FiverController.createNewFiver);
  app.delete("/api/fivers/delete/:id", FiverController.deleteAnExistingFiver);
};