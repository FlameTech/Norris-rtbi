/**
 * name : connectionManager.js
 * Location : /norris/test/utils/socketService
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13     Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var should = require('should');

var socket = require('socket.io');
var socketClient = require('socket.io-client');

var socketService = require('../../../../lib/utils/SocketService.js');

describe('TU40 - socketService.connectionManager()', function() {
  
  it('Should execute correctly when called', function() {
    var socketStub = socket.listen(5000);
    
    socketService.setSocket(socketStub);
    socketService.connectionManager();
    
    should.not.exist(socketStub.nsps['/'].adapter.rooms[2]);
    //No socket connected, room empty
    
    var socketClientStub = socketClient.connect('http://localhost:5000');
    socketClientStub.on('connect', function() {
      socketClientStub.emit('joinRoom', 2); 
    });
    
    setTimeout(function() { //Waits for the connection
      should.exist(socketStub.nsps['/'].adapter.rooms[2]);
    }, 1000);
  });
});