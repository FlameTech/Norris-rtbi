/**
 * name : getPageInfo.js
 * Location : /norris/test/presentationLayer/page
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/14    Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var proxyquire = require('proxyquire');
var should = require('should');

var stub = {
  '../businessLayer/PageController.js': {
    getPageInfo: function(id) { return "page n. " +id+ " info"},
    createPage: function() { return 2; }
  }
}

var Page = proxyquire('../../../../lib/presentationLayer/Page.js', stub);

describe('TU1 - page.getPageInfo()', function() {
  
  it('Should execute correctly when called', function() {
    var page = new Page();
    page.getPageInfo().should.be.exactly("page n. 2 info");
  });
});