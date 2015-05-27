/**
 * Name : MapChartModel.js 
 * Module : Norris::Lib::Model
 * Location : /norris/lib/model
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/12    Sartor Michele
 * -------------------------------------------------
 *  Revisone modulo
 * =================================================
 *  0.0.1     2015/04/05    Sartor Michele
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

/**
 * Description this class rappresent a MapChart Object
 * @class MapChartModel
 * @param {Number} id
 * @param {String} title
 * @param {Array} paths
 * @param {Array} points
 * @param {Array} center
 * @param {JSON} options
 * @return MapChart
 */
function MapChartModel(id, title, paths, points, center, options) {
  
  //Data model created by controller methods
  this._id = id;
  this._title = title;
  this._points = points;
  this._paths = paths;
  this._center = center;
  //Optional properties
  this._pathName = options.pathName;
  this._pathMode = options.pathMode;
  this._colors = options.colors; //Only paths have different colors
  this._zoom = options.zoom;
  this._legend = options.legend;
  this._mapLegendPosition = options.mapLegendPosition; // Top-right, top-left, bottom-right, bottom-left 
}

module.exports = MapChartModel;