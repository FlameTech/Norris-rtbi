/**
 * name : updateMovie.js
 * Location : /norris/test/presentationLayer/mapChart
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
  '../businessLayer/MapChartController.js': {
    updateMovie: function(id, newPoints) {
      updateCheck = {};
      updateCheck.id = id;
      updateCheck.newPoints = newPoints;
    },
    createMapChart: function() { return 2; }
  }
}

var mapChart = proxyquire('../../../../lib/presentationLayer/MapChart.js', stub);

describe('TU11 - mapChart.updateMovie()', function() {
  
  it('Should execute correctly when called with any parameter', function() {
    var graph = new mapChart();
    graph.updateMovie("new points");
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(2);
    updateCheck.newPoints.should.be.exactly("new points");
  });
});