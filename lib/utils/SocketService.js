/**
 * Name : SocketService.js 
 * Module : Norris::Lib::Utils
 * Location : /norris/lib/utils
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.3     2015/06/02   Meneguzzo Francesco
 * -------------------------------------------------
 *  Revisione modulo
 * =================================================
 *  0.0.2     2015/04/12       Meneguzzo Francesco
 * -------------------------------------------------
 *  Revisione Modulo
 * =================================================
 *  0.0.1     2015/04/05       Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica Modulo
 * =================================================
 */

'use strict';

var Socket = require('socket.io');

// will store the socket instance for push updates
var _socket = {};

/**
 * Description: function to set a socket instance to _socket
 * @method setSocket
 * @param {Object} socket
 * @return void
 */
exports.setSocket = function(socket) {
  _socket = socket;
};

/**
 * Description: this function opens a connection management between Server and Client
 * @method connectionManager
 * @return void
 */
exports.connectionManager = function() {
  _socket.on('connection', function(socket) {
    console.log("A socket has connected to the namespace.");
    // this method connect a graph to a room
    socket.on('joinRoom', function(graphID) {
      console.log("Socket assigned to room "+graphID);
      socket.join(graphID);
    });
  });
};
  
/**
 * Description: this function sends a json object from the server to the client
 * @method sendUpdate
 * @param {String} room
 * @param {Object} info
 * @return void 
 */
exports.sendUpdate = function(room, info) {
  _socket.to(room).emit('update', JSON.stringify(info));
};

/**
 * Description: this function returns the socket name
 * @method getSocketNamespace
 * @return String
 */
exports.getSocketNamespace = function() {
  return _socket.name;
};

/**
 * Description: this function checks if the parameter is an instance of a socket namespace
 * @method isSocketNamespace
 * @param {Object} nsp
 * @return Boolean
 */
exports.isSocketNamespace = function(nsp) {
  if(nsp.server !== undefined)
    return nsp.server instanceof Socket;
  else
    return false;
};