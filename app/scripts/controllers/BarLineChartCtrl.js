/**
 * Name : BarLineChartCtrl.js 
 * Module : Norris::App::Controller
 * Location : /norris/app/script/controllers/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/04/10    Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

angular.module("Controllers")
  .controller("BarLineChartCtrl", [ "$scope", "SocketsSvc", "BarLineSvc", "$window", function ($scope, SocketsSvc, BarLineSvc, $window) {
    // WebSocket opening
    SocketsSvc.open($scope.graph.id, $scope.$parent.nspSock);
    // WebSocket connection message
    SocketsSvc.on($scope.graph.id, 'connect', function() {
      SocketsSvc.emit($scope.graph.id, 'joinRoom', $scope.graph.id);
      console.log("Connected on socket " + $scope.graph.id);
    });
    // WebSocket reconnection message
    SocketsSvc.on($scope.graph.id, "reconnect", function() {
      $window.location.reload();
    });
    // WebSocket disconnect message
    SocketsSvc.on($scope.graph.id, "disconnect", function() {
      alert("Il grafico " + $scope.graph.id + " ha perso la connessione al server Norris." );
    }); 
    
    var graphG = {};
    
    // Populating
    graphG.data = BarLineSvc.fillLineData($scope.graph.series, $scope.graph.labels, $scope.graph.data);
    
    // Setting options
    graphG.options = BarLineSvc.setOpts($scope.graph.title, $scope.graph.xAxisName, $scope.graph.yAxisName, $scope.graph.showGrid, $scope.graph.showLegend, $scope.graph.legendPosition, graphG.data[0].length-1); 

    // Setting colors
    graphG.options.colors = BarLineSvc.setColors($scope.graph.colors);
    
    var formatPattern = "";
    // Sets the value symbol, if not null
    if($scope.graph.valueType !== null) {
      if($scope.graph.valueType === "euro") {
        formatPattern += "€";
      }
      else if($scope.graph.valueType === "dollars") {
        formatPattern += "$";
      }
      else if($scope.graph.valueType === "pounds") {
        formatPattern += "£";
      }
    }
    formatPattern += " #,##0.";
    // Sets the number of decimal digits
    for(var i = 0; i<$scope.graph.decimals;i++) {
      formatPattern +="0";
    }
    graphG.formatters = {
      number : []
    }; 
    // Associating formatters with their Serie
    for(var i = 1; i<$scope.graph.series.length +1; i++) {
      graphG.formatters.number.push({ columnNum: i
                                    , pattern: formatPattern
                                    });
    }
    
    // Inputing data to the model
    if ($scope.graph.type == "LineChart"){
      graphG.type = "LineChart";
      $scope.LineChart = graphG;
    }
    else if ($scope.graph.orientation == "horizontal"){
      graphG.type = "BarChart";
      $scope.BarChart = graphG;
    }
    else{
      graphG.type = "ColumnChart";
      $scope.BarChart = graphG;
    }
    
    // Update logic
    SocketsSvc.on($scope.graph.id, "update", function(info) {
      var data = JSON.parse(info);
      if(data.type == "inPlace")
        graphG.data[data.label+1][data.set+1] = data.data;
      else if(data.type == "stream") {
        var newRow = data.data;
        // Pushes new data in row
        newRow.unshift(data.label);
        // Checks if data is over limit
        if(graphG.data.length>$scope.graph.labelsLimit){
          graphG.data.splice(1,1);
        }
        graphG.data.push(newRow);
      }
    });
  }]);