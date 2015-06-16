/**
 * name : socketNamespace.js
 * Location : /norris/test/businessLayer/socketController
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

var proxyquire = require('proxyquire');
var should = require('should');

var stub = {
  '../utils/SocketService.js': {
    getSocketNamespace: function() { return "this is the socket name"; }
  }
}

var socketController = proxyquire('../../../../lib/businessLayer/SocketController.js', stub);

describe('TU1 - socketController.socketNamespace()', function() {
  
  it('Should execute correctly', function() {
    socketController.socketNamespace().should.be.exactly("this is the socket name");
  });
});