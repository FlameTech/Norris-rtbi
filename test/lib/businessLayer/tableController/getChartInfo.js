/**
 * name : getChartInfo.js
 * Module : Norris::Lib::BusinessLayer
 * Location : /norris/lib/test/tableController
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
  './ActiveResourcesController.js': { retrieveGraph: function(graphID) { 
    graph = {};
    //Data model created by controller methods
    graph._id = graphID;
    graph._title = "test";
    graph._headers = ["Column1"];
    graph._data = [];
    //Optional properties
    graph._orderBy = {};
    graph._displayedLines = 20;
    graph._showBorder = true;
    graph._colorColumn = {};
    graph._colorRow= {};
    graph._colorCell = {"red": 255, "green": 255, "blue": 255};
    graph._colorColumnFont = {};
    graph._colorRowFont = {};
    graph._colorFont = {"red": 0, "green": 0, "blue": 0};
    graph._format = true;
    graph._rowsLimit = 300;
    
    return graph;
    }
  }
};

var tableController = proxyquire('../../../../lib/businessLayer/TableController.js', stub);

describe('TU1 - tableController.getChartInfo()', function() {
  
  it('Should execute correctly when return the correct chart', function() {
    var check = true;
    try{
     tableController.getChartInfo(2); 
    } catch(err) {
      if(err === 7000)
        check = false;
    }
    check.should.be.exactly(true);
  });
});