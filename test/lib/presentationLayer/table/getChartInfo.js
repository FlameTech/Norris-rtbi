/**
 * name : getChartInfo.js
 * Module : Norris::Lib::PresentationLayer
 * Location : /norris/lib/test/table
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/05    Sartor Michele
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var proxyquire = require('proxyquire');
var should = require('should');

var stub = {
  '../businessLayer/TableController.js': { getChartInfo: function(id){  
    return "table n. " +id+ " info";
    },
    createTable: function(){
      return 1;
    }
  }
};

var table = proxyquire('../../../../lib/presentationLayer/Table.js', stub);

describe('TU1 - table.getChartInfo()', function() {
  
 it('Should execute correctly when called', function() {
    var graph = new table();1
    graph.getChartInfo().should.be.exactly("table n. 1 info");
  }); 
});