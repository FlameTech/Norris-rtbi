/**
 * name : updateInPlace.js
 * Location : /norris/test/presentationLayer/table
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

var updateCheck = undefined;

var stub = {
  '../businessLayer/TableController.js': {
    updateInPlace: function(id, row, column, newValue, options) {
      updateCheck = {};
      updateCheck.id = id;
      updateCheck.row = row;
      updateCheck.column = column;
      updateCheck.newValue = newValue;
      updateCheck.options = options;
    },
    createTable: function() { return 2; }
  }
}

var table = proxyquire('../../../../lib/presentationLayer/Table.js', stub);

describe('TU11 - table.updateInPlace()', function() {
  
  it('Should execute correctly when called with any parameter', function() {
    var graph = new table();
    graph.updateInPlace("row", "column", "newValue", "options");
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(2);
    updateCheck.row.should.be.exactly("row");
    updateCheck.column.should.be.exactly("column");
    updateCheck.newValue.should.be.exactly("newValue");
    updateCheck.options.should.be.exactly("options");
  });
});