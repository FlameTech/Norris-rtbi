/**
 * Name : BarLineSvc.js 
 * Module : Norris::App::Services
 * Location : /norris/app/script/services/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/04/11       Faggin Andrea
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

angular.module("Services")
  .factory('BarLineSvc', ["ColorsSvc", function (ColorsSvc) {
    return { 
          /**
            * Description
            * Fills the model data from an array of raw data
            * @method fillLineData
            * @param {Array} series
            * @param {Array} labels
            * @param {Array} inData
            * @param {Array} outData
            * @return Array
            */
            fillLineData : function (series,labels,inData,outData) {
                              var util = [];
                              var outData = [];
                              //Push series identifier
                              util.push("Series");
                              //Push series values
                              for(var i=0;i<series.length;i++){
                                util.push(series[i]);
                              }
                              outData.push(util);
                              //Then push labels
                              for(var i=1; i<=labels.length;i++){
                                util = [];
                                util.push(labels[i-1]);
                                //For each serie push data
                                for(var j=1;j<=series.length;j++){
                                  util.push(inData[j-1][i-1]); 
                                }
                                outData.push(util);
                              }
                              return outData;
             }
             , 
            /**
              * Description
              * Sets the data colors from an Array of data
              * @method setColors
              * @param {Array} colors
              * @return Array
              */
              setColors : function (colors) {
                             var util = [];
                             for(var i=0;i<colors.length;i++){
                               var rgb = colors[i];
                               var color = ColorsSvc.rgbToHex(rgb.red, rgb.green, rgb.blue);
                               util.push(color);
                             }
                             return util;
             }
             , 
            /**
              * Description
              * Sets the Bar/LineChart options Object from raw data
              * @method setOpts
              * @param {String} title
              * @param {String} xAxisName
              * @param {String} yAxisName
              * @param {Boolean} showGrid
              * @param {Boolean} showLegend
              * @param {String} legendPosition
              * @param {Number} seriesCount
              * @return Object
              */
              setOpts: function (title, xAxisName, yAxisName, showGrid, showLegend, legendPosition, seriesCount) {
                            var options = { displayExactValues: true
                                          , curveType: 'function'
                                          , animation: { duration: 500
                                                       , easing: 'out'
                                                       }
                                          , title: title
                                          , hAxis: { title: xAxisName }
                                          , vAxis: { title: yAxisName }
                                          };
                            if(showGrid == true) {
                              options.hAxis.gridlines = { color: '#CCC' };
                              options.vAxis.gridlines = { color: '#CCC' };
                            } else {
                              options.hAxis.gridlines = { color: 'transparent' };
                              options.vAxis.gridlines = { color: 'transparent' };
                            }
                            if (showLegend == true) {
                              options.legend = { position: legendPosition }; 
                              if (legendPosition == "left") {
                                options.series = [];
                                for (var i=0;i<seriesCount;i++){
                                  options.series.push({targetAxisIndex: "1"});
                                }
                              }
                            }
                            return options;
             }
             
           }
  }]);