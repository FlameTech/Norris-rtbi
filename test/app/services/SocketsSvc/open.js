/**
 * name : open.js
 * Location : /norris/test/app/services/SocketsSvc/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13       Merlo Gianluca
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var flag = undefined;
var socket = {of: function(nsp) {}};
var io = {connect: function(namespace, options) {flag = {}; flag.namespace = namespace; flag.forceNew = options.forceNew; return socket;}};

describe('TU68 - SocketSvc()', function() {
  
  var SocketsSvc;
  
  var id = 2;
  var namespace = socket.of('/norris');
  
  beforeEach(angular.mock.module('Services'));
  
  beforeEach(inject(function (_SocketsSvc_) {
    SocketsSvc = _SocketsSvc_;
  }));

  it("Should correctly execute when called", function() {
    SocketsSvc.open(id, namespace);
    expect(flag).toBeDefined();
    expect(flag.namespace).toBe(namespace);
    expect(flag.forceNew).toBe(true);
  });
});