/**
 * name : createPageOptions.js
 * Location : /norris/test/businessLayer/pageController
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

var storeCheck = undefined;
var modelStub = undefined;

var stub = {
  '../dataLayer/PageModel.js': function(id, title, pageWidth, columns) {
    modelStub = {};
    modelStub.id = id;
    modelStub.title = title;
    modelStub.pageWidth = pageWidth;
    modelStub.columns = columns;
  },
  '../utils/ProgressiveID.js': function() { return 2; },
  '../utils/NorrisError.js': require('../dataConsistencyTest/NorrisErrorStub.js'),
  './ActiveResourcesController.js': { storePage: function(id, page) { storeCheck = {};
  storeCheck.id = id;
  storeCheck.page = page;
  }}
};

var pageController = proxyquire('../../../../lib/businessLayer/PageController.js', stub);

describe('TU45 - pageController.createPageOptions()', function() {
  
  it('Should execute correctly when called with no parameters', function() {
    pageController.createPage("page title");
    should.exist(modelStub);
    modelStub.pageWidth.should.be.exactly(0);
    modelStub.columns.should.be.exactly(2);
  });
  
  it('Should execute correctly when called with pageWidth only', function() {
    pageController.createPage("page title", {pageWidth: 3000});
    should.exist(modelStub);
    modelStub.pageWidth.should.be.exactly(3000);
    modelStub.columns.should.be.exactly(2);
  });
  
  it('Should execute correctly when called with columns only', function() {
    pageController.createPage("page title", {columns: 5});
    should.exist(modelStub);
    modelStub.pageWidth.should.be.exactly(0);
    modelStub.columns.should.be.exactly(5);
  });
});