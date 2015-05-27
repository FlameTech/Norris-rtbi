/**
 * Name : SocketSvc.js 
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
  .factory('SocketsSvc', ["$rootScope", function ($scope) {
    var sockets = [];
    return { 
          /**
            * Description
            * Opens a new socket instance for the graph "id"
            * @method open
            * @param {Number} id
            * @param {String} namespace
            * @return void
            */
            open: function (id, namespace){
               // Opens new connection
               sockets[id] = io.connect(namespace, {forceNew : true});
             }
           , 
          /**
            * Description
            * Activates an observer for an event, and calls function callback when it happens
            * @method on
            * @param {Number} id
            * @param {String} eventName
            * @param {function} callback
            * @return void
            */
            on: function (id, eventName, callback) {
               // Calls the socket function to listen, applies the callback to the scope when it happens
               sockets[id].on(eventName, function () {
                 var args = arguments;
                 $scope.$apply(function () {
                   callback.apply(sockets[id], args);
                 });
               });
             }
           , 
          /**
            * Description
            * Emits an event and data associated with it
            * @method emit
            * @param {Number} id
            * @param {String} eventName
            * @param {Array} data
            * @param {function} callback
            * @return void
            */
            emit: function (id, eventName, data, callback) {
              // Calls the socket function to emit the event and its data
               sockets[id].emit(eventName, data, function () {
                 var args = arguments;
                 $scope.$apply(function () {
                   if (callback) {
                     callback.apply(sockets[id], args);
                   }
                 });
               })
             }
           };
  }]);