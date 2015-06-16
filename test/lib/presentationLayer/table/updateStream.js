/**
 * name : updateStream.js
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
    updateInPlace: function(id, data, options) {
      updateCheck = {};
      updateCheck.id = id;
      updateCheck.data = data;
      updateCheck.options = options;
    },
    createTable: function() { return 2; }
  }
}

var table = proxyquire('../../../../lib/presentationLayer/Table.js', stub);

describe('TU11 - table.updateStream()', function() {
  
  it('Should execute correctly when called with any parameter', function() {
    var graph = new table();
    graph.updateInPlace("data", "options");
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(2);
    updateCheck.data.should.be.exactly("data");
    updateCheck.options.should.be.exactly("options");
  });
});