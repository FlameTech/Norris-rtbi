/**
 * name : storePage.js
 * Location : /norris/test/businessLayer/activeResourcesController
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

var pagesStub = [];

var stub = {
  '../dataLayer/ActiveResources.js' : {
    pages : pagesStub 
  },
  '../utils/NorrisError.js' : require('../dataConsistencyTest/NorrisErrorStub.js')
};

var activeResourcesController = proxyquire('../../../../lib/businessLayer/ActiveResourcesController.js', stub);

describe('TU41 - activeResourcesController.storePage()', function() {
  
  it('Should execute correctly when called', function() {
    should.not.exist(pagesStub[2]);
    activeResourcesController.storePage(2, "this is a page");
    should.exist(pagesStub[2]);
    pagesStub[2].should.be.exactly("this is a page");
  });
});