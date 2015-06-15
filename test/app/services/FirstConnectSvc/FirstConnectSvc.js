/**
 * name : FirstConnectSvc.js
 * Location : /norris/test/app/services/FirstConnectSvc/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13       Andrea Faggin
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

describe('TU76 - FirstConnectSvc()', function() {
  
  var FirstConnectSvc, $httpBackend;
  
  beforeEach(angular.mock.module('Services'));
  
  beforeEach(inject(function (_FirstConnectSvc_, _$httpBackend_ ) {
    FirstConnectSvc = _FirstConnectSvc_;  
    $httpBackend = _$httpBackend_;
    var data = { namespace: 'test', data: {} };
    $httpBackend.when('GET', 'http://server/raw').respond(data);
  }));

  it("Should make a call at /raw", function () {
    $httpBackend.expect('GET','http://server/raw');
    var call = FirstConnectSvc.get();
    $httpBackend.flush();
    expect(call).toBeDefined();
  });
  
  it("Should return an Object", function () {
    $httpBackend.expect('GET','http://server/raw');
    var call = FirstConnectSvc.get();
    $httpBackend.flush();
    expect(call).toEqual(jasmine.any(Object));
  });
  
  it("Should return namespace and data of the page", function () {
    $httpBackend.expect('GET','http://server/raw');
    var call = FirstConnectSvc.get();
    $httpBackend.flush();
    expect(call.namespace).toEqual('test');
    expect(call.data).toEqual(jasmine.any(Object));
  });

});
