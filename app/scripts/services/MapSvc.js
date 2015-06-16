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
    //Converts two coordinates to a GoogleLatLong
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
    //Sets the colors of the chart, from RGB data to Hex
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
                                          , icon: { path: "M20.027,34.746c-0.771-3.781-2.128-6.93-3.774-9.846c-1.22-2.164-2.634-4.162-3.943-6.261c-0.437-0.7-0.813-1.44-1.232-2.167c-0.839-1.454-1.52-3.14-1.477-5.325c0.043-2.136,0.661-3.85,1.551-5.251c1.465-2.304,3.919-4.194,7.213-4.69c2.691-0.406,5.217,0.28,7.006,1.327c1.465,0.855,2.596,1.998,3.457,3.345c0.9,1.406,1.518,3.066,1.57,5.232c0.024,1.109-0.156,2.137-0.412,2.99c-0.258,0.862-0.674,1.584-1.047,2.354c-0.724,1.504-1.629,2.882-2.541,4.261C23.688,24.82,21.143,29.008,20.027,34.746z"
                                                  , fillColor: '#3FA8DF'
                                                  , fillOpacity: 1.0
                                                  , anchor: new google.maps.Point(20, 40)
                                                  , strokeWeight: 2
                                                  , strokeColor: '#010101'
                                                  , scale: 1.0
                                                  }
                                          });
      return marker;
    }

    /**
     * Description
     * Calculates the path between two points with Google Directions Service, 
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
      var service = new google.maps.DirectionsService();
      for(var i=0; i<path.length-1; i++) {
        service.route({ origin: cnvLatLong(path[i]) //Sets the starting point
                      , destination: cnvLatLong(path[i+1]) //And the next point in the path
                      , travelMode: setPathMode(method)
                      }
          , function(result, status) { //Async Callback, gets the response from Google Maps Directions
            if(status == google.maps.DirectionsStatus.OK) {
              var path = result.routes[0].overview_path;
              var legs = result.routes[0].legs;
              for (var i=0;i<legs.length;i++) { //Parses the subroutes between two points
                var steps = legs[i].steps;
                for (var j=0;j<steps.length;j++) {
                  var nextSegment = steps[j].path;
                  for (var k=0;k<nextSegment.length;k++) { //Pushes the segment on the path
                    pathline.push(nextSegment[k]);
                  }
                }
              }
              //Generates the Polyline of the calculated path
              polylines.push(createPolyline(pathline,color,map));
              pathline = [];
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
                               var toBeRemoved = true; //It's always pending removal, except when it has to be updated!
                               for(var i=0;i<newData.newPoints.length && toBeRemoved == true;i++) {
                                 //Then update it!
                                 if(markers[marker].title == newData.newPoints[i].id.toString() || markers[marker].title == newData.newPoints[i].id){
                                   markers[marker].setPosition(new google.maps.LatLng(newData.newPoints[i].latitude, newData.newPoints[i].longitude));
                                   newData.newPoints.splice(i,1);
                                   toBeRemoved = false;
                                 }
                               }
                               if(toBeRemoved) {
                                 //I guess its time has come
                                 markers[marker].setMap();
                                 delete markers[marker];
                               }
                             }
                             //A new life is born!
                             for(var obj in newData.newPoints) {
                               markers[newData.newPoints[obj].id] = createMarker(newData.newPoints[obj], map);
                             }
                           }
           }
  }]);