/**
 * Name : SocketController.js 
 * Module : Norris::Lib::BusinessLayer
 * Location : /norris/lib/businessLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/13   Meneguzzo Francesco
 * -------------------------------------------------
 *  Revisione modulo
 * =================================================
 *  0.0.1     2015/05/06   Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var socketService = require('../utils/SocketService.js')

/**
 * Description: this function set the socket namespace
 * @method setSocket
 * @param { Object } nsp
 * @return void
 */
exports.setSocket = function(nsp) {
  socketService.setSocket(nsp);
  socketService.connectionManager();
};

/**
 * Description: this function send an update into a specific socket
 * @method sendUpdate
 * @param { String } room
 * @param { Object } info
 * @return void
 */
exports.sendUpdate = function(room, info) {
  socketService.sendUpdate(room, info);
};

/**
 * Description: this function return the socket namespace
 * @method socketNamespace
 * @return String 
 */
exports.socketNamespace = function() {
  return socketService.getSocketNamespace();
};
 