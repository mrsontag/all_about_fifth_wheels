const ResourceController = require("../controllers/resources.controller");

module.exports = app => {
  app.get("/api/resources/", ResourceController.findAllResources);
  app.get("/api/resources/:id", ResourceController.findOneSingleResource);
  app.put("/api/resources/update/:id", ResourceController.updateExistingResource);
  app.post("/api/resources/new", ResourceController.createNewResource);
  app.delete("/api/resources/delete/:id", ResourceController.deleteAnExistingResource);
};