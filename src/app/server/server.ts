/**
 * Module dependencies.
 */
import express from "express";
import { ExpressConfig } from "./config/express-config";
import { MongoConfig } from "./config/mongo-config";
import { RouteConfig } from "./config/route-config";

import compression from "compression";  // compresses requests
import * as bodyParser from "body-parser";
import logger from "morgan";
// import * as errorHandler from "errorhandler";
import lusca from "lusca";
import * as dotenv from "dotenv";
import flash from "express-flash";
// import * as path from "path";
const expressValidator = require("express-validator");
import passport from "passport";
import { Test } from "./controller/test";
// import * as passportConfig from "./config/passport-config";


class Server extends RouteConfig {


  private readonly expressConfig: ExpressConfig;
  private readonly session: any;
  // private readonly route: RouteConfig;

  //#region Constructor
  constructor(expressConfig: ExpressConfig) {
    super(expressConfig.getExpress());
    this.loadEnvironmentConfig();
    this.expressConfig = expressConfig;
    this.session = this.expressConfig.getSession()

    let connectUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI;
    // this.mongoDB = new MongoConfig(connectUri, () => {
    // }, this.session);

    this.setExpressConfig();
  }
  //#endregion

  //#region Private Methods
  /**
     * Load environment variables from .env file, where API keys and passwords are configured.
  **/
  private loadEnvironmentConfig() {
    dotenv.config({ path: ".env.example" });
  }

  private setExpressConfig() {
    this.expressConfig.add(compression());
    this.expressConfig.add(logger("dev"));
    this.expressConfig.add(bodyParser.json());
    this.expressConfig.add(bodyParser.urlencoded({ extended: true }));
    this.expressConfig.add(expressValidator());
    this.expressConfig.add(this.session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
    }));
    this.expressConfig.add(passport.initialize());
    this.expressConfig.add(passport.session());
    this.expressConfig.add(flash());
    this.expressConfig.add(lusca.xframe("SAMEORIGIN"));
    this.expressConfig.add(lusca.xssProtection(true));
    this.expressConfig.addRequestResponseHandler((req, res, next) => {
      res.locals.user = req.user;
      next();
    });
  }
  //#endregion

  //#region Public Method
  public start() {
    if (this.expressConfig) {
      this.expressConfig.listen(() => {
        console.log(("  App is running at http://localhost:%s in %s mode"), process.env.EXPRESS_PORT, process.env.BUILD_ENV);
        console.log("  Press CTRL-C to stop\n");
      });
    }
  }

  //#endregion  

}


/**
 * Controllers (route handlers).
 */



// import { login } from "./login/LoginController";


const server = new Server((new ExpressConfig(process.env.EXPRESS_PORT || 3000)));
server.httpGet("/api/test", Test.getName);
// server.httpPost("/api/login", login.postLogin);
server.start();
/**
 * Error Handler. Provides full stack - remove for production
 */