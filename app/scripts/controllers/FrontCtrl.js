/**
 * Name : FirstConnectCtrl.js 
 * Module : Norris::App::Controller
 * Location : /norris/app/script/controllers/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/04/10      Andrea Faggin
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

angular.module("Controllers")
  .controller("FrontCtrl", [ "$scope", "FrontSvc", "FirstConnectSvc", function ($scope, FrontSvc, FirstConnectSvc){
      //Sends a GET the request to the back-end
      FirstConnectSvc.get(
        function success(data) { // Callback function when data is ready
          var _data = data;
          $scope.nspSock = _data.namespace;
          $scope.title = _data.data.title;
          //If page has no preset width, make it full width
          if(_data.data.pageWidth == 0)
            $scope.pageWidth = "100%";
          else
            $scope.pageWidth = _data.data.pageWidth;
          //Creates rows and columns structure of the page
          $scope.rows = FrontSvc.createRows(_data.data.data, _data.data.columns);
          var colClass = Math.floor(12/_data.data.columns);
          var colMdClass = "col-md-" + colClass;
          $scope.styleClass = colMdClass + " graphView";
        },
        //In case of callback error, report it
        function error(err){
          console.log(err);
        }
      );
    }
  ]);
