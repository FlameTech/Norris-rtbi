/**
 * Name : PageRouter.js 
 * Module : Norris::Lib::PresentationLayer
 * Location : /norris/Lib/presentationLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/12   Meneguzzo Francesco
 * -------------------------------------------------
 *  Revisione modulo
 * =================================================
 *  0.0.1     2015/05/05   Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';
var express = require('express');
var path = require('path');
var ejs = require('ejs');

var Page = require('./Page.js');

/**
 * Description this function exports a PageRouter Class
 * @method exports
 * @param {Object} page
 * @return app
 */
module.exports = function(page) {
  
  var app = express();
  //Creates the subrouting for a page when mounted
  var router = express.Router();
  
  app.use('/app', express.static(path.resolve(__dirname+('../../../app'))));
  
  router.get("/", function(req, res, next) {
    var data = {};
    data.url = req.originalUrl+('/app');
    var indexHTML = path.resolve(__dirname+'../../../app/index.html');
    ejs.renderFile(indexHTML, data, function(err, html) {
      res.send(html);
    });
    console.log("Trying to send");
  });
  
  router.get("/raw", function(req, res, next) {
    var namespaceName = require('../businessLayer/SocketController').socketNamespace();
    var pageData = page.getPageInfo();
    res.send(JSON.stringify({ 'namespace': namespaceName
                            , 'data': pageData
                            }));
  });
  //Use and return the subrouting 
  app.use(router);
  return app;
};