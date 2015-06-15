/**
 * name : inPlaceUpd.js
 * Location : /norris/test/app/services/TableSvc/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13       Merlo Gianluca
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

describe('TU66 - TableSvc.inPlaceUpd()', function() {
  
  var TableSvc; 
  var inData = { type: "inPlace"
               , row: 0
               , column: 0
               , data: 111
               , colorFont: {"red": 255, "green": 255, "blue": 255}
               , colorCell: {"red": 255, "green": 255, "blue": 255}
               , border: true
               };
  var outData;
  
  beforeEach(function(){
    outData = { cols: [ {"id": "a", "label": "a", "type": "number", "p": {}}, {"id": "b", "label": "b", "type": "number", "p": {}}, {"id": "c", "label": "c", "type": "number", "p": {}} ]
              , rows: [ { "c": [ {"v": 11, "p": {"style": "color:#000000;background-color:#000000;"}}, {"v": 12, "p": {"style": "color:#000000;background-color:#000000;"}}, {"v": 13, "p": {"style": "color:#000000;background-color:#000000;"}} ] } ]
              };
  });
  
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
  
  //test
  it('Should correctly set the new value in the correct cell', function() {
    TableSvc.inPlaceUpd(inData, outData);
    expect(outData.rows[0].c[0].v).toBe(111);
  });
  
  it('Should correctly set cell style', function() {
    TableSvc.inPlaceUpd(inData, outData);
    expect(outData.rows[0].c[0].p.style).toBe("color:#FFFFFF;background-color:#FFFFFF;border: 2px solid black;");
    inData.border = false;
    TableSvc.inPlaceUpd(inData, outData);
    expect(outData.rows[0].c[0].p.style).toBe("color:#FFFFFF;background-color:#FFFFFF;");

  });
});