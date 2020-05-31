const express = require("express");
const logger = require("./util/logger");
const bodyParser = require("body-parser");
const deploymentConfig = require('./deploymentConfig.json')
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const { auth } = require("express-openid-connect");
const session = require("express-session");

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  } else if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token");
  } else {
    res.status(500).send("Server problem Check back later");
  }
};
const config = {
  required: false,
  auth0Logout: true,
  ...deploymentConfig
};

// Initalize the express application
const app = express();
// Here we will add our middleware functions
// These bridge the gap between what happens on the frontend to the backend server
// Order matters, if something throws in a middleware above our error handler it won't be caught by the error handler
// Also if there is information which is needed for certain endpoints, like the JWT Auth with AUTH0 then it needs to be instantiated before the endpoint.
app.use(errorHandler);

app.use(auth(config));

// Helment checks for headers
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-wasserlauf.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://dev-wasserlauf",
  issuer: "https://dev-wasserlauf.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);
app.use(function (err, req, res, next) {});

app.get("/", (req, res) => {
  try {
  } catch (error) {
    res.send("Failed to Authenticate");
  }
});
app.post("/", async (req, res) => {
  const postBody = req.body;
  logger.info("Body", postBody);
  res.send({ message: "Body Recieved" });
});

// endpoint to delete an ad
app.delete("/:id", async (req, res) => {
  logger.info("Delete ID", id);
  res.send({ message: "Delete Recieved" });
});

// endpoint to update an ad
app.put("/:id", async (req, res) => {
  logger.info("Put ID", req.params.id);
  res.send({ message: "Put Recieved" });
});

app.listen(1336); // Not Leet yet
logger.info("Server ready on port: http://localhost:1336/");
