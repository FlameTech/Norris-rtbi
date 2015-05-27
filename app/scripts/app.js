/**
 * Name : app.js 
 * Module : Norris::App::Services
 * Location : /norris/app/script/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/04/08    Faggin Andrea
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

angular.module("Services", [ "ngResource" ] );

angular.module("Controllers", [ "Services", "googlechart", "ngMap" ] );

angular.module('NorrisApp', [ "Controllers", "Services" ]);