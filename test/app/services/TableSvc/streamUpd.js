/**
 * name : streamUpd.js
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

describe('TU67 - TableSvc.streamUpd()', function() {
  
  var TableSvc; 
  
  var inData1 = { type: "stream"
               , insertPosition: "top"
               , data: [101, 102, 103]
               , colors: [[{"red": 255, "green": 255, "blue": 255}, {"red": 255, "green": 255, "blue": 255}], [{"red": 255, "green": 255, "blue": 255}, {"red": 255, "green": 255, "blue": 255}], [{"red": 255, "green": 255, "blue": 255}, {"red": 255, "green": 255, "blue": 255}]]
               , border: true
               };
  var inData2 = { type: "stream"
                , insertPosition: "bottom"
                , data: [101, 102, 103]
                , colors: [[{"red": 255, "green": 255, "blue": 255}, {"red": 255, "green": 255, "blue": 255}], [{"red": 255, "green": 255, "blue": 255}, {"red": 255, "green": 255, "blue": 255}], [{"red": 255, "green": 255, "blue": 255}, {"red": 255, "green": 255, "blue": 255}]]
                , border: false
                };
  var outData;
  var limit1 = 10;
  var limit2 = 1;
  
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
  it('Should correctly add the new row', function() {
    TableSvc.streamUpd(inData1, outData, limit1);
    expect(outData.rows.length).toBe(2);
  });
  
  it('Should correctly set the new values in the correct position, top, border true', function() {
    TableSvc.streamUpd(inData1, outData, limit1);
    expect(outData.rows[0].c[0].v).toBe(101);
    expect(outData.rows[0].c[1].v).toBe(102);
    expect(outData.rows[0].c[2].v).toBe(103);
    expect(outData.rows[0].c[1].p.style).toBe("color:#FFFFFF;background-color:#FFFFFF;border: 2px solid black;");
  });
  
  it('Should correctly set the new values in the correct position, bottom, border false', function() {
    TableSvc.streamUpd(inData2, outData, limit1);
    expect(outData.rows[1].c[0].v).toBe(101);
    expect(outData.rows[1].c[1].v).toBe(102);
    expect(outData.rows[1].c[2].v).toBe(103);
    expect(outData.rows[0].c[1].p.style).toBe("color:#000000;background-color:#000000;");
  });
  
  it('Should correctly pop a row when the limit is reached, top position, border true', function() {
    TableSvc.streamUpd(inData1, outData, limit2);
    expect(outData.rows.length).toBe(1);
    expect(outData.rows[0].c[0].v).toBe(101);
  });
  
  it('Should correctly pop a row when the limit is reached, bottom position, border false', function() {
    TableSvc.streamUpd(inData2, outData, limit2);
    expect(outData.rows.length).toBe(1);
    expect(outData.rows[0].c[0].v).toBe(101);
  });
});