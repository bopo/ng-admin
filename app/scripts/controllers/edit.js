define([
    'app',
    'humane'
], function(app, humane) {
    'use strict';

    app.controller('EditCtrl', function ($scope, $location, crudManager, data) {
        $scope.fields = data.fields;
        $scope.entityLabel = data.entityLabel;

        $scope.edit = function(form, $event) {
            $event.preventDefault();

            var object = {};

            angular.forEach(data.fields, function(field, name){
                object[name] = field.value;
            });

            object.id = data.entityId;

            if (crudManager.updateOne(data.entityName, object)) {
                humane.log('The object has been updated.');
            }
        };

        $scope.create = function() {
            $location.path('/create/' + data.entityName);
        };

        $scope.delete = function() {
            $location.path('/delete/' + data.entityName + '/' + data.entityId);
        };

        $scope.return = function() {
            $location.path('/list/' + data.entityName);
        };
    });
});
