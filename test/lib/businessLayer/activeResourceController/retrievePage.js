/**
 * name : retrievePage.js
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

var pagesStub = ["not undefined"];

var stub = {
  '../dataLayer/ActiveResources.js' : {
    pages : pagesStub 
  },
  '../utils/NorrisError.js' : require('../dataConsistencyTest/NorrisErrorStub.js')
};

var activeResourcesController = proxyquire('../../../../lib/businessLayer/ActiveResourcesController.js', stub);

describe('TU42 - activeResourcesController.retrievePage()', function() {
  
  it('Should fail when called with a wrong ID', function() {
    var check = true;
    var page = "undefined";
    try{
      graph = activeResourcesController.retrievePage(1);
    } catch (e) {
      if(e === 7001)
	check = false;
    }
    check.should.be.exactly(false);
    page.should.be.exactly("undefined");
  });
  
  it('Should execute correctly when called with a correct ID', function() {
    var check = true;
    var page = "undefined";
    try{
      page = activeResourcesController.retrievePage(0);
    } catch (e) {
      if(e === 7001)
	check = false;
    }
    check.should.be.exactly(true);
    page.should.be.exactly("not undefined");
  });
});
