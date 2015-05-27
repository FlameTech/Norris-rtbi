/**
 * Name : MapSvc.js 
 * Module : Norris::App::Services
 * Location : /norris/app/script/services/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/04/11      Faggin Andrea
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

angular.module("Services")
  .factory('MapSvc', [ "ColorsSvc", function (ColorsSvc) {
    // Converts two coordinates to a GoogleLatLong
    /**
     * Description
     * Creates a Google LatLng object from an array of two points
     * @method cnvLatLong
     * @param {Array} x
     * @return Object
     */
    var cnvLatLong = function (x) {
      return new google.maps.LatLng(x[0],x[1]);
    };
    /**
     * Description
     * Sets the compatible method to calculate directions with Google Directions Service
     * @method setPathMode
     * @param {String} mode
     * @return Object
     */
    var setPathMode = function (mode) {
      if(mode == "driving"){
        return google.maps.DirectionsTravelMode.DRIVING;
      }
      else if(mode == "walking"){
        return google.maps.DirectionsTravelMode.WALKING;
      }
      else if(mode == "transit"){
        return google.maps.DirectionsTravelMode.TRANSIT;
      }
      else if(mode == "bicycling"){
        return google.maps.DirectionsTravelMode.BICYCLING;
      }
    }
    // Sets the colors of the chart, from RGB data to Hex
    /**
     * Description
     * Creates an array of Hex colors from an array of RGB value colors
     * @method setColors
     * @param {Array} colors
     * @return Array
     */
    var setColors = function (colors) {
      var util = [];
      for(var i=0;i<colors.length;i++){
        var rgb = colors[i];
        var color = ColorsSvc.rgbToHex(rgb.red, rgb.green, rgb.blue);
        util.push(color);
      }
      return util;
    }
    //Creates a GoogleMaps Polyline from given path
    /**
     * Description
     * Generates a Google Maps Polyline from an array of points
     * @method createPolyline
     * @param {Array} pathLine
     * @param {Array} color
     * @param {Object} map
     * @return Object
     */
    var createPolyline = function (pathLine, color, map) {
      return new google.maps.Polyline({ path: pathLine
                                      , strokeColor: color
                                      , strokeOpacity: 1.0
                                      , strokeWeight: 3
                                      , map: map
                                      , visible: true
                                      });
    };
    
    /**
     * Description
     * Generates a Google Maps Marker from a given latitude and longitude point
     * @method createMarker
     * @param {Array} point
     * @param {Object} map
     * @return Object
     */
    var createMarker = function (point, map) {
      var marker = new google.maps.Marker({ position: new google.maps.LatLng(point.latitude, point.longitude) 
                                          , map: map
                                          , title: point.id.toString()
                                          });
      return marker;
    }

    /**
     * Description
     * Calculates the path betweent two points with Google Directions Service, 
     * based on provided method, and then generates a Polyline representing it
     * @method buildPath
     * @param {Array} path
     * @param {Array} color
     * @param {Object} map
     * @param {Array} polylines
     * @param {Array} method
     * @return void
     */
    var buildPath = function(path, color, map, polylines, method) {
      var pathline = [];
      if(path.length==1){ // Recursion base, end of path
        return cnvLatLong(path[0]);
      }
      else {
        var service = new google.maps.DirectionsService();
        service.route({ origin: cnvLatLong(path.pop()) // Consumes a point from the path
                      , destination: buildPath(path) // Recursively calls itself for the next points
                      , travelMode: setPathMode(method)
                      }
          , function(result, status) { // Async Callback, gets the response from Google Maps Directions
            if(status == google.maps.DirectionsStatus.OK) {
              var path = result.routes[0].overview_path;
              var legs = result.routes[0].legs;
              for (var i=0;i<legs.length;i++) { // Parses the subroutes between two points
                var steps = legs[i].steps;
                for (var j=0;j<steps.length;j++) {
                  var nextSegment = steps[j].path;
                  for (var k=0;k<nextSegment.length;k++) { // Pushes the segment on the path
                    pathline.push(nextSegment[k]);
                  }
                }
              }
              // Generates the Polyline of the calculated path
              polylines.push(createPolyline(pathline,color,map));
            }
        });
      }
    };
    
    return { createPolyline : createPolyline 
           , buildPath : buildPath
           , setColors : setColors
           , 
          /**
            * Description
            * Embeds the legend HTML item into the map canvas
            * @method buildLegend
            * @param {Object} map
            * @param {String} position
            * @param {Number} id
            * @return void
            */
            buildLegend : function (map, position, id) {
                             var legend = document.getElementById('mapLegend' + id);
                             if (position == "top-right")
                               map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legend);
                             if (position == "top-left")
                               map.controls[google.maps.ControlPosition.TOP_LEFT].push(legend);
                             if (position == "bottom-right") 
                               map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(legend);
                             if (position == "bottom-left")
                               map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(legend);
                           }
           , createMarker: createMarker
           , 
          /**
            * Description
            * Updates the MapChart data with the movie method
            * @method updateMovie
            * @param {Array} markers
            * @param {Array} newData
            * @param {Object} map
            * @return void
            */
            updateMovie : function (markers, newData, map) {
                             for(var marker in markers) {
                               var toBeRemoved = true; // It's always pending removal, except when it has to be updated!
                               for(var i=0;i<newData.newPoints.length && toBeRemoved == true;i++) {
                                 // Then update it!
                                 if(markers[marker].title == newData.newPoints[i].id.toString() || markers[marker].title == newData.newPoints[i].id){
                                   markers[marker].setPosition(new google.maps.LatLng(newData.newPoints[i].latitude, newData.newPoints[i].longitude));
                                   newData.newPoints.splice(i,1);
                                   toBeRemoved = false;
                                 }
                               }
                               if(toBeRemoved) {
                                 // I guess its time has come
                                 markers[marker].setMap();
                                 delete markers[marker];
                               }
                             }
                             // A new life is born!
                             for(var obj in newData.newPoints) {
                               markers[newData.newPoints[obj].id] = createMarker(newData.newPoints[obj], map);
                             }
                           }
           }
  }]);