/**
 * Name : TableCtrl.js 
 * Module : Norris::App::Controller
 * Location : /norris/app/script/controllers/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/04/10       Cardin Andrea 
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

angular.module("Controllers")
  .controller("TableCtrl", ["$scope", "SocketsSvc", "TableSvc", "$window", function($scope, SocketsSvc, TableSvc, $window) {
    //WebSocket opening
    SocketsSvc.open($scope.graph.id, $scope.$parent.nspSock);
    //WebSocket connection message
    SocketsSvc.on($scope.graph.id, 'connect', function() {
      SocketsSvc.emit($scope.graph.id, 'joinRoom', $scope.graph.id);
      console.log("Connected on socket " + $scope.graph.id);
    });
    //WebSocket reconnection message
    SocketsSvc.on($scope.graph.id, "reconnect", function() {
      $window.location.reload();
    });
    //WebSocket disconnect message
    SocketsSvc.on($scope.graph.id, "disconnect", function() {
      alert("Il grafico " + $scope.graph.id
          + " ha perso la connessione al server Norris.");
    });

    var graphG = {};
    graphG.type = "Table";

    //Populating
    graphG.data = TableSvc.fillData($scope.graph.headers,
        $scope.graph.data, $scope.graph.colors, $scope.graph.showBorder);

    //Setting options
    graphG.options = { page: "enable"
                     , allowHtml: true
                     , pageSize: $scope.graph.displayedLines
                     };

    graphG.formatters = { number : [] };
    
    for (var i = 0; i < $scope.graph.format.length; i++) {
      var formatPattern = "";
      //Sets the value symbol, if not null
      if ($scope.graph.format[i].valueType !== null) {
        if ($scope.graph.format[i].valueType === "euro") {
          formatPattern += "€";
        } else if ($scope.graph.format[i].valueType === "dollars") {
          formatPattern += "$";
        } else if ($scope.graph.format[i].valueType === "pounds") {
          formatPattern += "£";
        }
      }
      formatPattern += " #,##0.";
      //Sets the number of decimal digits
      for (var j = 0; j < $scope.graph.format[i].decimals; j++) {
        formatPattern += "0";
      }
      //Set the correct column formatter 
      graphG.formatters.number.push({
        columnNum : $scope.graph.format[i].column,
        pattern : formatPattern
      });
    }

    //Set table sorting
    if ($scope.graph.orderBy.column !== undefined) {
      graphG.options.sortColumn = $scope.graph.orderBy.column;
      if ($scope.graph.orderBy.order == "descending") {
        graphG.options.sortAscending = false;
      } else
        graphG.options.sortAscending = true; // Default ascending
    }

    $scope.Table = graphG;

    //Update
    SocketsSvc.on($scope.graph.id, "update", function(info) {
      var data = JSON.parse(info);
      if (data.type == "inPlace")
        TableSvc.inPlaceUpd(data, graphG.data);
      else
        TableSvc.streamUpd(data, graphG.data, $scope.graph.rowsLimit);
    });
  }]);
