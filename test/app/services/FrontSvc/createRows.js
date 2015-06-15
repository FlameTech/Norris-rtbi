/**
 * name : createRows.js
 * Location : /norris/test/app/services/FrontSvc/
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

describe('TU70 - FrontSvc.createRows()', function() {
  
  var FrontSvc; 
  
  var data;
  var columns;
   
  beforeEach(function(){
    data = ["0","1","2","3","4","5","6","7","8","9","10","11"];
    columns = 6;
  });
  
  beforeEach(angular.mock.module('Services'));
  
  beforeEach(inject(function (_FrontSvc_) {
    FrontSvc = _FrontSvc_;  
  }));
  
  it('Split the raw data and return it', function () {
    var value = FrontSvc.createRows(data, columns);
    expect(value).toBeDefined();
  }); 
  
  it('Split the raw data in rows of max "columns" length', function() {
    var value = FrontSvc.createRows(data, columns);
    expect(value[0].length).not.toBeGreaterThan(columns);
    expect(value[1].length).not.toBeGreaterThan(columns);
  });
  
  it('Every row, except the latest should be "columns" long', function() {
    var value = FrontSvc.createRows(data, columns);
    expect(value[0].length).toBe(columns);
    expect(value[1].length).not.toBeGreaterThan(columns);
  });
    
});
