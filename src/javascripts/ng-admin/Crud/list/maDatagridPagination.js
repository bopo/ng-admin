/*global define*/

define(function (require) {
    'use strict';

    var angular = require('angular'),
        paginationView = require('text!./DatagridPagination.html'),
        DatagridPaginationController = require('./DatagridPaginationController');

    function DatagridPaginationDirective($window, $document) {
        return {
            restrict: 'E',
            scope: {
                perPage: '=',
                nextPage: '=',
                totalItems: '@',
                infinite: '='
            },
            template: paginationView,
            controllerAs: 'paginationCtrl',
            controller: DatagridPaginationController,
            link: function (scope, element, attrs, controller) {
                var offset = attrs.offset || 100,
                    body = $document[0].body;

                scope.hasPagination = !element.parent()[0].hasAttribute('with-pagination') ? true : scope.$eval(element.parent()[0].getAttribute('with-pagination'));
                if (scope.hasPagination) {
                    controller.computePagination();
                }

                if (scope.infinite) {
                    var handler = function () {
                        if (body.offsetHeight - $window.innerHeight - $window.scrollY < offset) {
                            scope.$apply(controller.nextPage.bind(controller));
                        }
                    };
                    var windowElement = angular.element($window);
                    windowElement.bind('scroll', handler);
                    element.on('$destroy', function() {
                        windowElement.unbind('scroll', handler);
                    });
                }
            }
        };
    }

    DatagridPaginationDirective.$inject = ['$window', '$document'];

    return DatagridPaginationDirective;
});
