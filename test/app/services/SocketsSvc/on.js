/**
 * name : on.js
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
var flag2 = false;
var flag3 = false;
var socket = {on: function(event, callback) {var interval = setInterval(function() {if(flag3===true) {callback(); clearInterval(interval);}}, 500);}, of: function(nsp) {}, ok: function() {flag3 = true;}};
var socket2 = {on: function(event, callback) {var interval = setInterval(function() {if(flag3===true) {callback(); clearInterval(interval);}}, 500);}, of: function(nsp) {}, ok: function() {flag3 = true;}};
var io = {connect: function(namespace, options) {flag = {}; flag.namespace = namespace; flag.forceNew = options.forceNew; return socket;}};
var functionMock = function() {flag2 = true;};

describe('TU69 - SocketsSvc()', function() {
  
  var SocketsSvc;
  
  var id = 2;
  var namespace = socket.of('/norris');
  
  beforeEach(angular.mock.module('Services'));
  
  beforeEach(inject(function (_SocketsSvc_) {
    SocketsSvc = _SocketsSvc_;
  }));
  
  beforeEach(function() {
    socket = socket2;
  });

  it("Should correctly execute when called", function(done) {
    SocketsSvc.open(id, namespace);
    SocketsSvc.on(id, "event name", functionMock);
    socket.ok();
    setTimeout(function() {
      expect(flag2).toBeDefined();
      expect(flag2).toBe(true);
      done();
      }, 5000);
  }, 10000);
});