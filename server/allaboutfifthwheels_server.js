const express = require("express");
const app = express();
const cors = require('cors');

// This will fire our mongoose.connect statement to initialize our database connection
require("./config/mongoose.config");

app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

const AllMyFiverRoutes = require("./routes/fiver.routes");
AllMyFiverRoutes(app);

const AllMyManufacturerRoutes = require("./routes/manufacturer.routes");
AllMyManufacturerRoutes(app);

const AllMyResourceRoutes = require("./routes/resources.routes");
AllMyResourceRoutes(app);

app.listen(8001, () => console.log("The server is all fired up on port 8001"));
