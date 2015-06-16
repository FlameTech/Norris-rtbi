/**
 * name : createPage.js
 * Location : /norris/test/businessLayer/pageController
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/14      Cardin Andrea
 * -------------------------------------------------
 *  estensione modulo
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

describe('TU3 - pageController.createPage()', function() {
  
  it('Should fail when called with no parameters - error 2000', function() {
    var check = true;
    try{
      pageController.createPage();
    } catch(e) {
      if(e === 2000)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent options - error 2004', function() {
    var check = true;
    try{
      pageController.createPage("page title", {inconsistent: "option"});
    } catch(e) {
      if(e === 2004)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid pageWidth option type - error 2002', function() {
    var check = true;
    try{
      pageController.createPage("page title", {pageWidth: "not a number"});
    } catch(e) {
      if(e === 2002)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid pageWidth option (<800) - error 2002', function() {
    var check = true;
    try{
      pageController.createPage("page title", {pageWidth: 700});
    } catch(e) {
      if(e === 2002)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid columns option type - error 2003', function() {
    var check = true;
    try{
      pageController.createPage("page title", {columns: "not a number"});
    } catch(e) {
      if(e === 2003)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid columns option (<1) - error 2003', function() {
    var check = true;
    try{
      pageController.createPage("page title", {columns: 0});
    } catch(e) {
      if(e === 2003)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid columns option (>12) - error 2003', function() {
    var check = true;
    try{
      pageController.createPage("page title", {columns: 13});
    } catch(e) {
      if(e === 2003)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should execute correctly when called without options', function() {
    pageController.createPage("valid title");
    should.exist(storeCheck);
    should.exist(storeCheck.page);
    storeCheck.id.should.be.exactly(2);
    should.exist(modelStub);
    modelStub.id.should.be.exactly(2);
    modelStub.title.should.be.exactly("valid title");
    modelStub.pageWidth.should.be.exactly(0);
    modelStub.columns.should.be.exactly(2);
  });
  
});

describe('TU7 - pageController.createPage()', function() {
  
  it('Should execute correctly when called with valid pageWidth option', function() {
    pageController.createPage("another valid title", {pageWidth: 1920});
    should.exist(storeCheck);
    should.exist(storeCheck.page);
    storeCheck.id.should.be.exactly(2);
    should.exist(modelStub);
    modelStub.id.should.be.exactly(2);
    modelStub.title.should.be.exactly("another valid title");
    modelStub.pageWidth.should.be.exactly(1920);
    modelStub.columns.should.be.exactly(2);
  });
  
});

describe('TU10 - pageController.createPage()', function() {
  
  it('Should execute correctly when called with valid columns option', function() {
    pageController.createPage("another valid title", {columns: 12});
    should.exist(storeCheck);
    should.exist(storeCheck.page);
    storeCheck.id.should.be.exactly(2);
    should.exist(modelStub);
    modelStub.id.should.be.exactly(2);
    modelStub.title.should.be.exactly("another valid title");
    modelStub.pageWidth.should.be.exactly(0);
    modelStub.columns.should.be.exactly(12);
  });
  
});

describe('TU20 - PageController.createPage()', function() {
  
  it('Should execute correctly when a correct value for columns is given (between 1 and 12)', function() 
  {
    var errCheck = false;
    try {
      pageController.createPage("title", {columns: 4});
    } catch(err) {
      errCheck = true;
    }
    errCheck.should.be.false;
    should.exist(storeCheck);
    should.exist(storeCheck.page);
    storeCheck.id.should.be.exactly(2);
    should.exist(modelStub);
    modelStub.id.should.be.exactly(2);
    modelStub.title.should.be.exactly("title");
    modelStub.columns.should.be.exactly(4);
  }),
  
  it('Should set the default columns value (2) when no columns option is given', function() 
  {
    var errCheck = false;
    try {
      pageController.createPage("title");
    } catch(err) {
      errCheck = true;
    }
    errCheck.should.be.false;
    should.exist(storeCheck);
    should.exist(storeCheck);
    should.exist(storeCheck.page);
    storeCheck.id.should.be.exactly(2);
    should.exist(modelStub);
    modelStub.id.should.be.exactly(2);
    modelStub.title.should.be.exactly("title");
    modelStub.columns.should.be.exactly(2);
  }),
  
  it('Should throw error \'2003\' when the columns option given is not a number', function() 
  {
    var errCheck = false;
    var errNum = undefined;
    try {
      pageController.createPage("title", {columns: "this is not a number"});
    } catch(err) {
      errCheck = true;
      errNum = err;
    }
    errCheck.should.be.true;
    should.exist(errNum);
    errNum.should.be.exactly(2003);
  }),
  
  it('Should throw error \'2003\' when the columns option given is <1', function() 
  {
    var errCheck = false;
    var errNum = undefined;
    try {
      pageController.createPage("title", {columns: 0});
    } catch(err) {
      errCheck = true;
      errNum = err;
    }
    errCheck.should.be.true;
    should.exist(errNum);
    errNum.should.be.exactly(2003);
  }),
  
  it('Should throw error \'2003\' when the columns option given is >12', function() 
  {
    var errCheck = false;
    var errNum = undefined;
    try {
      pageController.createPage("title", {columns: 15});
    } catch(err) {
      errCheck = true;
      errNum = err;
    }
    errCheck.should.be.true;
    should.exist(errNum);
    errNum.should.be.exactly(2003);
  });
});