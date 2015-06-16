/**
 * name : tableModel.js
 * Location : /norris/test/dataLayer/tableModel
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

var TableModel = require('../../../../lib/dataLayer/TableModel.js');

describe('TU83 - TableModel()', function() {
  
  it('Should execute correctly when called', function() {
    var options = { insertPosition: "insert position"
                  , orderBy: "order by"
                  , displayedLines: "displayed lines"
                  , border: "border"
                  , colorColumn: "column color"
		  , colorRow: "row color"
		  , colorCell: "cell color"
		  , colorColumnFont: "column font color"
		  , colorRowFont: "row font color"
		  , colorFont: "cell font color"
		  , format: "cells format"
		  , rowsLimit: "rows limit"
                  };
    var tableModel = new TableModel(5, "table title", "headers", "data", options);
    should.exist(tableModel);
    tableModel._id.should.be.exactly(5);
    tableModel._title.should.be.exactly("table title");
    tableModel._headers.should.be.exactly("headers");
    tableModel._data.should.be.exactly("data");
    tableModel._insertPosition.should.be.exactly("insert position");
    tableModel._orderBy.should.be.exactly("order by");
    tableModel._displayedLines.should.be.exactly("displayed lines");
    tableModel._showBorder.should.be.exactly("border");
    tableModel._colorColumn.should.be.exactly("column color");
    tableModel._colorRow.should.be.exactly("row color");
    tableModel._colorCell.should.be.exactly("cell color");
    tableModel._colorColumnFont.should.be.exactly("column font color");
    tableModel._colorRowFont.should.be.exactly("row font color");
    tableModel._colorFont.should.be.exactly("cell font color");
    tableModel._format.should.be.exactly("cells format");
    tableModel._rowsLimit.should.be.exactly("rows limit");
  });
});