/**
 * name : pageModel.js
 * Location : /norris/test/dataLayer/pageModel
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

var should = require('should');

var PageModel = require('../../../../lib/dataLayer/PageModel.js');

describe('TU79 - PageModel()', function() {
  
  it('Should execute correctly when called', function() {
    var pageModel = new PageModel(5, "page title", "page width", "columns");
    should.exist(pageModel);
    pageModel._id.should.be.exactly(5);
    pageModel._title.should.be.exactly("page title");
    pageModel._data.should.be.empty;
    pageModel._pageWidth.should.be.exactly("page width");
    pageModel._columns.should.be.exactly("columns");
  });
});