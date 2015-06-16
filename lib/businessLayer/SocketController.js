/**
 * Name : SocketController.js 
 * Module : Norris::Lib::BusinessLayer
 * Location : /norris/lib/businessLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.3     2015/06/02   Meneguzzo Francesco
 * -------------------------------------------------
 *  Revisione modulo
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

var socketService = require('../utils/SocketService.js');
var NorrisError = require('../utils/NorrisError.js');

/**
 * Description: this function sets the socket namespace
 * @method setSocket
 * @param { Object } nsp
 * @return void
 */
exports.setSocket = function(nsp) {
  if(nsp !== undefined) {
	if(socketService.isSocketNamespace(nsp)) {
		socketService.setSocket(nsp);
		socketService.connectionManager();
	}
	else 
	  new NorrisError(8001);
  }
  else
	new NorrisError(8000);
};

/**
 * Description: this function sends an update into a specific socket
 * @method sendUpdate
 * @param { String } room
 * @param { Object } info
 * @return void
 */
exports.sendUpdate = function(room, info) {
  socketService.sendUpdate(room, info);
};

/**
 * Description: this function returns the socket namespace
 * @method socketNamespace
 * @return String 
 */
exports.socketNamespace = function() {
  return socketService.getSocketNamespace();
};
 