/**
 * name : activeResources.js
 * Location : /norris/test/dataLayer/activeResources
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/15     Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var should = require('should');

var storeCheck = undefined;
var modelStub = undefined;

var ActiveResources = require('../../../../lib/dataLayer/ActiveResources.js');

describe('TU46 - ActiveResources()', function() {
  
  it('Should return the correct references when called', function() {
    var stub1 = {
      graphs: ActiveResources.graphs,
      pages: ActiveResources.pages
    }
    stub1.graphs.push("this is a graph");
    stub1.pages.push("this is a page");
    var stub2 = {
      graphs: ActiveResources.graphs,
      pages: ActiveResources.pages
    }
    stub1.graphs[0].should.be.exactly(stub2.graphs[0]);
    stub1.pages[0].should.be.exactly(stub2.pages[0]);   
  });
});