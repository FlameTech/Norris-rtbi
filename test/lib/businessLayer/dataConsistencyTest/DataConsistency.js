/**
 * name : DataConsistency.js
 * Module : Norris::Lib::BusinessLayer
 * Location : /norris/lib/test/dataConsistencyTest
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
     '../utils/NorrisError.js': require('./NorrisErrorStub.js')
     
};
  
var dataConsistency = proxyquire('../../../../lib/businessLayer/DataConsistency.js', stub);
var barOptions = { "series": []
                  , "orientation": ["vertical", "horizontal"]
                  , "grid": [true, false]
                  , "legend": [true, false]
                  , "legendPosition": ["right", "left", "top", "bottom"]
                  , "color" : []
                  , "valueType": ["euro", "dollars", "pounds"]
                  , "decimals": 2
                  };  

var lineOptions = { "series": []
                   , "grid": [true, false]
                   , "legend": [true, false]
                   , "legendPosition": ["right", "left", "top", "bottom"]
                   , "colors": []
                   , "valueType": ["euro","dollars","pounds"]
                   , "decimals": 2
                   , "labelsLimit": 300
                   };
                  
var mapOptions = { "zoom": 0
                  , "legend": [true, false]
                  , "mapLegendPosition": ["top-right", "top-left", "bottom-right", "bottom-left"]
                  , "colors": []
                  , "pathName": []
                  , "pathMode": ["driving", "walking", "bicycling", "transit"]
                  };
var tableOptions = { "insertPosition": ["top", "bottom"]
                    , "orderBy": { "column": 0
                                 , "order": ["ascending", "descending"]
                                 }
                    , "displayedLines": 20
                    , "border": [true, false]
                    , "colorColumn" : []
                    , "colorRow" : []
                    , "colorCell" : []
                    , "colorColumnFont" : []
                    , "colorRowFont" : []
                    , "colorFont" : []
                    , "format": []
                    , "rowsLimit": 300
                    };
describe('TU48 - DataConsistency.checkOrientation()', function() {

  it('Should execute correctly when called with orientation: vertical', function() {
    var check = true;
    try{
      dataConsistency.jsonConsistencyCheck({orientation: "vertical"}, barOptions);  //Label does match
    }catch(err){
      if(err === 1002)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with orientation: horizontal', function() {
    var check = true;
    try{
      dataConsistency.jsonConsistencyCheck({orientation: "horizontal"}, barOptions);  //Label does match
    }catch(err){
      if(err === 1002)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should fail when called with an invalid orientation value', function() {
    var check = true;
    try{
      dataConsistency.jsonConsistencyCheck({orientation: "invalidLabel"}, barOptions);  //Label doesn't match
    }catch(err){
      if(err === 1002)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with an invalid orientation value', function() {
    var check = true;
    try{
      dataConsistency.jsonConsistencyCheck({orientation: 5}, barOptions);  //Label doesn't match
    }catch(err){
      if(err === 1002)
        check = false;
    }
    check.should.be.exactly(false);
  });
});

describe('TU49 - DataConsistency.checkLegendPosition()', function(){
  // bar chart
  it('Should fail when called with a number on a bar chart', function(){
    var check = true;
    try{
      dataConsistency.jsonConsistencyCheck({legendPosition: 1}, barOptions); //should not accept numbers
    }
    catch(err){
      if(err === 1004)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with a wrong string on a bar chart', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({legendPosition: "invalidLabel"}, barOptions); 
    }
    catch(err){
      if(err === 1004)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with a "right" value on a bar chart', function(){
    var check = true;
    try{
      //should accept right
      dataConsistency.jsonConsistencyCheck({legendPosition: "right"}, barOptions); 
    }
    catch(err){
      if(err === 1004)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with a "left" value on a bar chart', function(){
    var check = true;
    try{
      //should accept left
      dataConsistency.jsonConsistencyCheck({legendPosition: "left"}, barOptions); 

    }
    catch(err){
      if(err === 1004)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with a "bottom" value on a bar chart', function(){
    var check = true;
    try{
      //should accept bottom
      dataConsistency.jsonConsistencyCheck({legendPosition: "bottom"}, barOptions); 

    }
    catch(err){
      if(err === 1004)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with a "top" value on a bar chart', function(){
    var check = true;
    try{
      //should accept top
      dataConsistency.jsonConsistencyCheck({legendPosition: "top"}, barOptions); 

    }
    catch(err){
      if(err === 1004)
        check = false;
    }
    check.should.be.exactly(true);
    });
    //line chart
    it('Should fail when called with a number on a line chart', function(){
      var check = true;
      try{
        dataConsistency.jsonConsistencyCheck({legendPosition: 1}, lineOptions); //should not accept numbers
      }
      catch(err){
        if(err === 1004)
          check = false;
      }
      check.should.be.exactly(false);
    });
    it('Should fail when called with a wrong string on a line chart', function(){
      var check = true;
      try{
        //should not accept wrong string values
        dataConsistency.jsonConsistencyCheck({legendPosition: "invalidLabel"}, lineOptions); 
      }
      catch(err){
        if(err === 1004)
          check = false;
      }
      check.should.be.exactly(false);
    });
    it('Should execute correctly when called with a "right" value on a line chart', function(){
      var check = true;
      try{
        //should accept right
        dataConsistency.jsonConsistencyCheck({legendPosition: "right"}, lineOptions); 
      }
      catch(err){
        if(err === 1004)
          check = false;
      }
      check.should.be.exactly(true);
    });
    it('Should execute correctly when called with a "left" value on a line chart', function(){
      var check = true;
      try{
        //should accept left
        dataConsistency.jsonConsistencyCheck({legendPosition: "left"}, lineOptions); 

      }
      catch(err){
        if(err === 1004)
          check = false;
      }
      check.should.be.exactly(true);
    });
    it('Should execute correctly when called with a "bottom" value on a line chart', function(){
      var check = true;
      try{
        //should accept bottom
        dataConsistency.jsonConsistencyCheck({legendPosition: "bottom"}, lineOptions); 

      }
      catch(err){
        if(err === 1004)
          check = false;
      }
      check.should.be.exactly(true);
    });
    it('Should execute correctly when called with a "top" value on a line chart', function(){
      var check = true;
      try{
        //should accept top
        dataConsistency.jsonConsistencyCheck({legendPosition: "top"}, lineOptions); 

      }
      catch(err){
        if(err === 1004)
          check = false;
      }
      check.should.be.exactly(true);
    });
});

describe('TU50 - DataConsistency.checkMapLegendPosition()', function(){
  //bar chart
  it('Should fail when called with a number on a map chart', function(){
    var check = true;
    try{
      dataConsistency.jsonConsistencyCheck({mapLegendPosition: 1}, mapOptions); //should not accept numbers
    }
    catch(err){
      if(err === 1005)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with a wrong string on a map chart', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({mapLegendPosition: "invalidLabel"}, mapOptions); 
    }
    catch(err){
      if(err === 1005)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with a "top-right" value on a map chart', function(){
    var check = true;
    try{
      //should accept top-right
      dataConsistency.jsonConsistencyCheck({mapLegendPosition: "top-right"}, mapOptions); 
    }
    catch(err){
      if(err === 1005)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with a "top-left" value on a map chart', function(){
    var check = true;
    try{
      //should accept top-left
      dataConsistency.jsonConsistencyCheck({mapLegendPosition: "top-left"}, mapOptions); 

    }
    catch(err){
      if(err === 1005)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with a "bottom-right" value on a map chart', function(){
    var check = true;
    try{
      //should accept bottom-right
      dataConsistency.jsonConsistencyCheck({mapLegendPosition: "bottom-right"}, mapOptions); 

    }
    catch(err){
      if(err === 1005)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with a "bottom-left" value on a map chart', function(){
    var check = true;
    try{
      //should accept bottom-left
      dataConsistency.jsonConsistencyCheck({mapLegendPosition: "bottom-left"}, mapOptions); 

    }
    catch(err){
      if(err === 1005)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU51 - DataConsistency.checkMapZoom()', function(){
  
  it('Should fail when called with a number out of range 1-19', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({zoom: 20}, mapOptions);
    }catch(err){
      if(err === 1006)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with a number in range', function(){
    var check = true;
    try{
      //should accept right
      dataConsistency.jsonConsistencyCheck({zoom: 2}, mapOptions); 
    }
    catch(err){
      if(err === 1006)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU52 - DataConsistency.pathMode()', function(){
  
  it('Should fail when called with a not valid string', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({pathMode: "invalidStrign"}, mapOptions); 
    }catch(err){
      if(err === 1040)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with "walking"', function(){
    var check = true;
    try{
      //should accept walking
      dataConsistency.jsonConsistencyCheck({pathMode: "walking"}, mapOptions); 
    }
    catch(err){
      if(err === 1040)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with "bicycling"', function(){
    var check = true;
    try{
      //should accept bicycling
      dataConsistency.jsonConsistencyCheck({pathMode: "bicycling"}, mapOptions); 
    }
    catch(err){
      if(err === 1040)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with "driving"', function(){
    var check = true;
    try{
      //should accept driving
      dataConsistency.jsonConsistencyCheck({pathMode: "driving"}, mapOptions); 
    }
    catch(err){
      if(err === 1040)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with "transit"', function(){
    var check = true;
    try{
      //should accept transit
      dataConsistency.jsonConsistencyCheck({pathMode: "transit"}, mapOptions); 
    }
    catch(err){
      if(err === 1040)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU53 - DataConsistency.checkOrderBy()', function(){
  it('Should fail when called with column undefined', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({orderBy: {"order": "ascending"}}, tableOptions); 
    }catch(err){
      if(err === 1008)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called on column with a string', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({orderBy: {"column": "invalid"}}, tableOptions); 
    }catch(err){
      if(err === 1008)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called on column with a number', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({orderBy: {"column": 1}}, tableOptions); 
    }catch(err){
      if(err === 1008)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with order "ascending"', function(){
    var check = true;
    try{
      //should accept walking
      dataConsistency.jsonConsistencyCheck({orderBy: {"column": 1, "order": "ascending"}}, tableOptions); 
    }
    catch(err){
      if(err === 1010)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with order "descending"', function(){
    var check = true;
    try{
      //should accept bicycling
      dataConsistency.jsonConsistencyCheck({orderBy: {"column": 1, "order": "descending"}}, tableOptions); 
    }
    catch(err){
      if(err === 1010)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should fail when called with order not equals to "ascending" or "descending"', function(){
    var check = true;
    try{
      //should accept driving
      dataConsistency.jsonConsistencyCheck({orderBy: {"column": 1, "order": "invalid"}}, tableOptions); 
    }
    catch(err){
      if(err === 1010)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with order not a string', function(){
    var check = true;
    try{
      //should accept driving
      dataConsistency.jsonConsistencyCheck({orderBy: {"column": 1, "order": 1}}, tableOptions); 
    }
    catch(err){
      if(err === 1010)
        check = false;
    }
    check.should.be.exactly(false);
    });
});

describe('TU54 - DataConsistency.checkInsertPosition()', function(){
  it('Should fail when called on column with insertPosition not equals to "top" or "bottom"', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({insertPosition: "invalid"}, tableOptions); 
    }catch(err){
      if(err === 1011)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with insertPosition "top"', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({insertPosition: "top"}, tableOptions); 
    }catch(err){
      if(err === 1011)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with insertPosition "bottom"', function(){
    var check = true;
    try{
      //should accept walking
      dataConsistency.jsonConsistencyCheck({insertPosition: "bottom"}, tableOptions); 
    }
    catch(err){
      if(err === 1011)
        check = false;
    }
    check.should.be.exactly(true);
  });
  
  it('Should fail when called with insertPosition number', function(){
    var check = true;
    try{
      //should accept driving
      dataConsistency.jsonConsistencyCheck({insertPosition: 1}, tableOptions); 
    }
    catch(err){
      if(err === 1011)
        check = false;
    }
    check.should.be.exactly(false);
  });
});

describe('TU55 - DataConsistency.checkDisplayedLines()', function(){
  
  it('Should fail when called with a value lower than one', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({displayedLines: 0}, tableOptions); 
    }catch(err){
      if(err === 1012)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with a value lower than one', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({displayedLines: 1}, tableOptions); 
    }catch(err){
      if(err === 1011)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU56 - DataConsistency.checkColors()', function(){
  
  it('Should fail when called with an input type different from array', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colors: "invalid"}, lineOptions); 
    }catch(err){
      if(err === 1013)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with an input array which dont contain hex color', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colors: ["invalidStrign"]}, lineOptions); 
    }catch(err){
      if(err === 1031)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with an input type array containing hex color', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colors: ["#FFFFFF"]}, lineOptions); 
    }catch(err){
      if(err === 1011)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU57 - DataConsistency.checkHex()', function(){
  
  it('Should fail when called with an input which is not hex color', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colors: ["invalidStrign"]}, lineOptions); 
    }catch(err){
      if(err === 1031)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with an input which is hex color', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colors: ["#FFFFFF"]}, lineOptions); 
    }catch(err){
      if(err === 1031)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU58 - DataConsistency.checkColorArray()', function(){
  
  it('Should fail when called with an input type dfferent from array', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colorColumn: "invalid"}, tableOptions); 
    }catch(err){
      if(err === 1016)
        check = false;
    }
    check.should.be.exactly(false);
  });
   it('Should fail when called with an input type dfferent from array', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colorRow: "invalid"}, tableOptions); 
    }catch(err){
      if(err === 1017)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with an input type dfferent from array', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colorColumnFont: "invalid"}, tableOptions); 
    }catch(err){
      if(err === 1029)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with an input type dfferent from array', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colorRowFont: "invalid"}, tableOptions); 
    }catch(err){
      if(err === 1030)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with an input array which dont contain hex color', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colorColumn: ["invalidStrign"]}, tableOptions); 
    }catch(err){
      if(err === 1016)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with an input type array containing hex color', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colorColumn: ["#FFFFFF"]}, tableOptions); 
    }catch(err){
      if(err === 1011)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU59 - DataConsistency.checkColorMatrix()', function(){
  
  it('Should fail when called with an input type different from array', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colorFont: "invalidStrign"}, tableOptions); 
    }catch(err){
      if(err === 1019)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with an input type different from array', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({colorCell: "invalidStrign"}, tableOptions); 
    }catch(err){
      if(err === 1018)
        check = false;
    }
    check.should.be.exactly(false);
  });
});

describe('TU60 - DataConsistency.checkSeries()', function(){
  
  it('Should fail when called with an input type different from array', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({series: "invalidStrign"}, barOptions); 
    }catch(err){
      if(err === 1015)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with an input type array', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({series: []}, barOptions); 
    }catch(err){
      if(err === 1015)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU61 - DataConsistency.checkValueType()', function(){
  
  it('Should fail when called with an input type different from acepted value', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({valueType: "invalidString"}, barOptions); 
    }catch(err){
      if(err === 1032)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with "euros"', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({valueType: "euro"}, barOptions); 
    }catch(err){
      if(err === 1032)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with "dollars"', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({valueType: "dollars"}, barOptions); 
    }catch(err){
      if(err === 1032)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with "pounds"', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({valueType: "pounds"}, barOptions); 
    }catch(err){
      if(err === 1032)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU62 - DataConsistency.checkDecimals()', function(){
  
  it('Should fail when called with an input type different from number', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({decimals: "invalidStrign"}, barOptions); 
    }catch(err){
      if(err === 1033)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with an input number out of range', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({decimals: 7}, barOptions); 
    }catch(err){
      if(err === 1033)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with an input number bigger than 0', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({decimals: 1}, barOptions); 
    }catch(err){
      if(err === 1033)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should execute correctly when called with an input number smaller than 6', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({decimals: 5}, barOptions); 
    }catch(err){
      if(err === 1033)
        check = false;
    }
    check.should.be.exactly(true);
  });
});


describe('TU63 - DataConsistency.checkTableFormat()', function(){
  
  it('Should fail when called with an input type different from array', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({format: "invalidStrign"}, tableOptions); 
    }catch(err){
      if(err === 1035)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with an input column different from number or undefined', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({format: [{}]}, tableOptions); 
    }catch(err){
      if(err === 1034)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with a correct input', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({format: [{column: 0, valueType: "euro", decimals: 2}]}, tableOptions); 
    }catch(err){
      if(err === 1035)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU64 - DataConsistency.checkBounds()', function(){
  
  it('Should fail when called with an input labelLimit different from number', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({labelsLimit: "invalidStrign"}, lineOptions); 
    }catch(err){
      if(err === 1036)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should fail when called with an input rowsLimit different from numbero or undefined', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({rowsLimit: "invalidStrign"}, tableOptions); 
    }catch(err){
      if(err === 1037)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with a correct input', function(){
    var check = true;
    try{
      //should not accept wrong string values
      dataConsistency.jsonConsistencyCheck({labelsLimit: 10}, tableOptions); 
    }catch(err){
      if(err === 1036)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU84 - DataConsistency.labelConsistency()', function(){
  
  it('Should fail when called with an array that contains repeated values', function(){
    var check = true;
    try{
      var labels = ["Gen","Feb","Mar","Jun","Jun"];
      dataConsistency.labelConsistency(labels); 
    }catch(err){
      if(err === 1014)
        check = false;
    }
    check.should.be.exactly(false);
  });
  it('Should execute correctly when called with an array that do not contains repeated values', function(){
    var check = true;
    try{
      var labels = ["Gen","Feb","Mar","Jun","Jul"];
      dataConsistency.labelConsistency(labels); 
    }catch(err){
      if(err === 1014)
        check = false;
    }
    check.should.be.exactly(true);
  });
});

describe('TU85 - DataConsistency.seriesConsistency()', function(){
  
  it('Should fail when called with an array of wrong length', function(){
    var labels = ["Gen","Feb","Mar","Jun","Jul"];
    var series = [[4,6,5,2,1],[7,6,2,10],[2,4,5,6,7]];
    dataConsistency.seriesConsistency(labels,series).should.be.exactly(false);
  });
  it('Should execute correctly when called with an array having correct length', function(){
    var labels = ["Gen","Feb","Mar","Jun","Jul"];
    var series = [[4,6,5,2,1],[7,6,2,10,11],[2,4,5,6,7]];
    dataConsistency.seriesConsistency(labels,series).should.be.exactly(true);
  });
});

describe('TU86 - DataConsistency.inPlaceTableOptionsConsistency()', function(){
  var optTempl = { "colorFont": ""
                 , "colorCell": ""
                 };
  
  it('Should fail when called with a wrong option structure', function(){
    var opt = { "Font": "#112233"
              , "colorCell": "#AABBCC"
              };
    dataConsistency.inPlaceTableOptionsConsistency(opt,optTempl).should.be.exactly(false);
  });
  it('Should fail when called with a wrong option type', function(){
    var opt = { "colorFont": 112233
              , "colorCell": "#AABBCC"
              };
    dataConsistency.inPlaceTableOptionsConsistency(opt,optTempl).should.be.exactly(false);
  });
  it('Should execute correctly when called with a correct option structure', function(){
    var opt = { "colorFont": "#112233"
              , "colorCell": "#AABBCC"
              };
    dataConsistency.inPlaceTableOptionsConsistency(opt,optTempl).should.be.exactly(true);
  });
});

describe('TU87 - DataConsistency.streamTableOptionsConsistency()', function(){
  var optTempl = { "colorRow": ""
                 , "colorRowFont": ""
                 , "colorFont": []
                 , "colorCell": []
                 };
  it('Should fail when called with a wrong option structure', function(){
    var opt = { "colorRow": "#112233"
              , "RowFont": "#AABBCC"
              , "colorFont": [[0,"#887766"]]
              , "colorCell": [[0,"#8811CC"]]
              };
    dataConsistency.streamTableOptionsConsistency(opt,optTempl).should.be.exactly(false);
  });
  it('Should fail when called with a wrong option type', function(){
    var opt = { "colorRow": 112233
              , "colorRowFont": "#AABBCC"
              };
    dataConsistency.streamTableOptionsConsistency(opt,optTempl).should.be.exactly(false);
  });
  it('Should fail when called with a wrong color string', function(){
    var opt = { "colorRow": "233"
              , "colorRowFont": "#AABBCC"
              };
    dataConsistency.streamTableOptionsConsistency(opt,optTempl).should.be.exactly(false);
  });
  it('Should fail when called with a wrong option color type', function(){
    var opt = { "colorFont": [[0,"#887766"]]
              , "colorCell": [[0,0]]
              };
    dataConsistency.streamTableOptionsConsistency(opt,optTempl).should.be.exactly(false);
  });
  it('Should fail when called with a wrong option color string ', function(){
    var opt = { "colorFont": [[0,"#887766"]]
              , "colorCell": [[0,"121"]]
              };
    dataConsistency.streamTableOptionsConsistency(opt,optTempl).should.be.exactly(false);
  });
  it('Should execute correctly when called with a correct option structure', function(){
    var opt = { "colorRow": "#112233"
              , "colorRowFont": "#AABBCC"
              , "colorFont": [[0,"#887766"]]
              , "colorCell": [[0,"#8811CC"]]
              };
    dataConsistency.streamTableOptionsConsistency(opt,optTempl).should.be.exactly(true);
  });
});

describe('TU90 - DataConsistency.checkPropertyShowing()', function() {

  it('Should execute correctly when called with grid: true', function() {
    var check = true;
    try{
      dataConsistency.jsonConsistencyCheck({grid: true}, barOptions);  //Label does match
    }catch(err){
      if(err === 1003)
        check = false;
    }
    check.should.be.exactly(true);
  });
  it('Should fail when called with an invalid grid value', function() {
    var check = true;
    try{
      dataConsistency.jsonConsistencyCheck({grid: 5}, barOptions);  //Label doesn't match
    }catch(err){
      if(err === 1003)
        check = false;
    }
    check.should.be.exactly(false);
  });
});