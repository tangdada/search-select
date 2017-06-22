'use strict'
var app = angular.module('plunker', ['search-select']);

app.controller('MainCtrl', function($scope, $timeout) {

  $scope.testStr = 'success';

  $scope.selectOption = {id: 1, name: 'xxx'};
  $scope.options = [
    {id: 1, name: 'xxx'},
    {id: 2, name: '000'}
  ];

  $scope.showBottom = '编辑列表1';

});
