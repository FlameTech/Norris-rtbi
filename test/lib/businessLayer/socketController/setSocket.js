/**
 * name : setSocket.js
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

var managerCheck = false;
var socketStub = undefined;

var stub = {
  '../utils/NorrisError.js': require('../dataConsistencyTest/NorrisErrorStub.js'),
  '../utils/SocketService.js': {
    setSocket: function(nsp) { socketStub = nsp; },
    connectionManager: function() { managerCheck = true; },
    isSocketNamespace: function(nsp) { return nsp === "socket namespace"; }
  }
};

var socketController = proxyquire('../../../../lib/businessLayer/SocketController.js', stub);

describe('TU1 - socketController.setSocket()', function() {
  
  it('Should fail when called with no parameter - error 8000', function() {
    var check = true;
    try{
      socketController.setSocket();
    } catch (e) {
      if(e === 8000)
	check = false;
    }
    check.should.be.exactly(false);
    managerCheck.should.be.exactly(false);
    should.not.exist(socketStub);
  });
  
  it('Should fail when called with invalid parameter - error 8001', function() {
    var check = true;
    try{
      socketController.setSocket("not a socket namespace");
    } catch (e) {
      if(e === 8001)
	check = false;
    }
    check.should.be.exactly(false);
    managerCheck.should.be.exactly(false);
    should.not.exist(socketStub);
  });
  
  it('Should execute correctly when called with a socket namespace parameter', function() {
    socketController.setSocket("socket namespace");
    managerCheck.should.be.exactly(true);
    socketStub.should.be.exactly("socket namespace");
  });
});