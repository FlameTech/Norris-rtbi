/**
 * name : isSocketNamespace.js
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

var socketService = require('../../../../lib/utils/SocketService.js');

describe('TU78 - socketService.isSocketNamespace()', function() {
  
  it('Should return false when called with an invalid object', function() {
    
    var check = socketService.isSocketNamespace(new Object());
    check.should.be.exactly(false);
  });
  
  it('Should return true when called with a valid object', function() {
    
    var check = socketService.isSocketNamespace(socket.listen(2000).of("/namespace"));
    check.should.be.exactly(true);
  });
});