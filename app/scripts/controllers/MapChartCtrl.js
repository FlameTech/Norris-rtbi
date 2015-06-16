/**
 * Name : MapChartCtrl.js 
 * Module : Norris::App::Controller
 * Location : /norris/app/script/controllers/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/04/10      Sartor Michele
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

angular.module("Controllers")
  .controller("MapChartCtrl", [ "$scope", "SocketsSvc", "MapSvc", "$window", function ($scope, SocketsSvc, MapSvc, $window) {
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
      alert("Il grafico " + $scope.graph.id + " ha perso la connessione al server Norris." );
    });
    
    //Set initial chart data
    $scope.title = $scope.graph.title;
    $scope.center = [$scope.graph.center.lat,$scope.graph.center.long];
    $scope.zoom = $scope.graph.zoom;
    $scope.markers = [];
    $scope.polylines = [];
    $scope.colors = MapSvc.setColors($scope.graph.colors);
    $scope.legendItems = [];
    
    //Synchronously build legend array
    for (var i=0;i<$scope.graph.paths.length;i++){
      $scope.legendItems.push({ color: $scope.colors[i]
                       , name: $scope.graph.pathNames[i]
                       });
    }
    
    //When map canvas is ready, apply properties on it
    $scope.$on('mapInitialized', function(evt, map) {
      
      //Draw markers
      if($scope.graph.points != undefined){
        for(var i=0;i<$scope.graph.points.length;i++){
          $scope.markers[$scope.graph.points[i].id] = MapSvc.createMarker($scope.graph.points[i], map);
        }
      }
      
      //Draw paths
      for(var i=0;i<$scope.graph.paths.length;i++){
        MapSvc.buildPath($scope.graph.paths[i], $scope.colors[i], map, $scope.polylines, $scope.graph.pathMode);
      }
      
      //Create legend
      if($scope.graph.showLegend==true && $scope.graph.paths.length > 0){
        MapSvc.buildLegend(map, $scope.graph.mapLegendPosition, $scope.graph.id);
      }
      
      //Update
      SocketsSvc.on($scope.graph.id, "update", function(info) {
        var data = JSON.parse(info);
        if(data.type == "inPlace"){
          $scope.markers[data.id].setPosition(new google.maps.LatLng(data.latitude, data.longitude));
        }
       if(data.type == "movie"){
         MapSvc.updateMovie($scope.markers,data,map);
        }
      });
    });
  }]);