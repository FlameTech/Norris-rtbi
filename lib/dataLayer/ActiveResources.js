 /**
 * Name : ActiveResources.js 
 * Module : Norris::Lib::DataLayer
 * Location : /norris/lib/dataLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/14    Meneguzzo Francesco
 * -------------------------------------------------
 *  Revisone modulo
 * =================================================
 *  0.0.1     2015/05/07    Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var ActiveResources = (function() {
  //Stores two associative arrays of references to active objects
  var graphs = [];
  var pages = [];
  //Returns a reference to the two data arrays
  return { graphs: graphs
         , pages: pages
         };   
})();

module.exports = ActiveResources;