/**
 * name : pageRouter.js
 * Location : /norris/test/presentationLayer/pageRouter
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

var XMLHttpRequest = require("xhr2").XMLHttpRequest;
var express = require('express');

var pageStub = { getPageInfo: function() { return "page info"; }};

var stub = {
  './Page.js': pageStub,
  '../businessLayer/SocketController': { socketNamespace: function() { return "namespace"; } }
};

var pageRouter = proxyquire('../../../../lib/presentationLayer/PageRouter.js', stub);

describe('TU2 - PageRouter()', function() {
  
  it('Should create the correct routing when called', function(done) {

    var app = pageRouter(pageStub);
    var http = require('http').createServer(app);
    http.listen(6000);
    
    var xhr = new XMLHttpRequest();
    xhr.open( "GET", "http://localhost:6000", true );
    xhr.send( null );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        xhr.status.should.be.exactly(200);
      }
    };
    
    var xhr2 = new XMLHttpRequest();
    xhr2.open( "GET", "http://localhost:6000/raw", true );
    xhr2.send( null );
    xhr2.onreadystatechange = function () {
      if (xhr2.readyState === 4) {
        xhr2.status.should.be.exactly(200);
        done();
      }
    };
  });
  
});

describe('TU4 - PageRouter()', function() {
  
  it('Should return the graphs in the page data', function(done) {

    var app = pageRouter(pageStub);
    var http = require('http').createServer(app);
    http.listen(7000);
    
    var xhr = new XMLHttpRequest();
    xhr.open( "GET", "http://localhost:7000/raw", true );
    xhr.send( null );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
      	JSON.parse(xhr.response).data.should.be.exactly("page info");
      	done();
      }
    };
  });
});

describe('TU44 - PageRouter()', function() {
  
  it('Should create the object correctly', function() {

    var app = pageRouter(pageStub);
    
    should.exist(app);
    should.exist(app.request);
    should.exist(app.response);
  });
});