/**
 * name : getSocketNamespace.js
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

var proxyquire = require('proxyquire');
var should = require('should');

var socketService = require('../../../../lib/utils/SocketService.js');

describe('TU1 - socketService.getSocketNamespace()', function() {
  
  it('Should execute correctly when called', function() {
    var name = "socket namespace";
    var socket = {name: name};
    socketService.setSocket(socket);
    socketService.getSocketNamespace().should.be.exactly("socket namespace");
  });
});