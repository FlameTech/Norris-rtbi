/**
 * name : fillData.js
 * Location : /norris/test/app/services/TableSvc/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13       Andrea Faggin
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

describe('TU65 - TableSvc.fillData()', function() {
  
  var TableSvc;
  
  var headers = ["a","b","c"];
  var inData = [[11, 12, 13], [21, 22, 23]];
  var colors = [[[{red:0,green:0,blue:0},{red:0,green:0,blue:0}], [{red:0,green:0,blue:0},{red:0,green:0,blue:0}], [{red:0,green:0,blue:0},{red:0,green:0,blue:0}]],
                [[{red:0,green:0,blue:0},{red:0,green:0,blue:0}], [{red:0,green:0,blue:0},{red:0,green:0,blue:0}], [{red:0,green:0,blue:0},{red:0,green:0,blue:0}]]];
  var border = true;
  
  
  beforeEach(angular.mock.module('Services'));
  
  beforeEach(function () {
    var colorsMock = {
        rgbToHex: function (r,g,b) {
            return "#FFFFFF";
        }
    };
    angular.mock.module(function ($provide) { 
        $provide.value('ColorsSvc', colorsMock);
    });
  });
  
  beforeEach(inject(function (_TableSvc_) {
    TableSvc = _TableSvc_;  
  }));
  
  
  it('Should return table data', function () {
    var value = TableSvc.fillData(headers,inData,colors,border);
    expect(value).toBeDefined();
  });
  
  it('Data should be divided in rows and columns', function() {
    var value = TableSvc.fillData(headers,inData,colors,border);
    expect(value.cols instanceof Array).toBeTruthy();
    expect(value.rows instanceof Array).toBeTruthy();
  });
  
  it('Should correctly create first column', function () {
    var value = TableSvc.fillData(headers,inData,colors,border);
    expect(value.cols[0].id).toBe("a");
    expect(value.cols[0].label).toBe("a");
  });

  it('Should correctly set cell data', function () {
    var value = TableSvc.fillData(headers,inData,colors,border);
    expect(value.rows[0].c[0].v).toBe(11);
  });
  
  it('Should correctly set cell style', function () {
    var value = TableSvc.fillData(headers,inData,colors,border);
    expect(value.rows[0].c[0].p.style).toBe("color:#FFFFFF;background-color:#FFFFFF;border: 2px solid black;");
    border = false;
    var value = TableSvc.fillData(headers,inData,colors,border);
    expect(value.rows[0].c[0].p.style).toBe("color:#FFFFFF;background-color:#FFFFFF;");
  });
});