/**
 * Name : FirstConnectSvc.js 
 * Module : Norris::App::Services
 * Location : /norris/app/script/services/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/04/08    Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

angular.module("Services")
  .factory("FirstConnectSvc", ["$resource", "$location",
   /**
    * Description
    * Fetches the current URL, and adds the path to the data location
    * @method createRows
    * @param {Object} $resource
    * @param {Object} $location
    * @return $resource
    */
    function($resource, $location) {
      // Gets the location
      var url = $location.absUrl();
      // Trims it and adds the raw path
      if(url.charAt(url.length-1) == "/")
        url = url +'raw';
      else
        url = url +'/raw';
      // Return the resource
      return $resource(url);
  }]);