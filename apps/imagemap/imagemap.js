"use strict";

angular
.module("Globals", [])
.constant("Settings", {
    //
});

angular
.module("ImageMap", ["Globals"])
.config(["$routeProvider", "Settings", function ($routeProvider, Settings) {
    $routeProvider
    .when(
        "/", { controller: "MainCtrl", templateUrl: "imagemap.html" }
    )
    .otherwise(
        { redirectTo: "/" }
    );
}]);

angular
.module("ImageMap")
.controller("MainCtrl", ["$scope", function ($scope) {
    $scope.data = {
        imagepath: "",
        areas: []
    }
    $scope.image = {
        imagepath: "",
        width: 0,
        height: 0
    }
    $scope.loadimage = function () {
        var img = new Image();
        img.onload = function () {
            $scope.$apply(function () {
                $scope.image.width = img.width;
                $scope.image.height = img.height;
                $scope.data.imagepath = $scope.image.imagepath;
            });
        }
        img.src = $scope.image.imagepath;
    }
    $scope.currentarea = null;
    $scope.newarea = function () {
        $scope.currentarea = {
            shape: "poly",
            alt: "",
            href: "",
            coords: []
        };
        $scope.data.areas.push($scope.currentarea);
    }
    $scope.loadarea = function (a) {
        $scope.currentarea = a;
    }
    $scope.delarea = function (a) {
        if ($scope.currentarea === a) {
            $scope.currentarea = null;
        }
        $scope.data.areas.splice($scope.data.areas.indexOf(a), 1);
    }
    $scope.areaiscurrent = function (a) {
        return (a === $scope.currentarea);
    }
    var getcoordinate = function (event) {
        if ("offsetX" in event) {
            return { x: event.offsetX, y: event.offsetY };
        } else if ("layerX" in event) {
            return { x: event.layerX, y: event.layerY };
        }
    }
    $scope.clickimage = function (event) {
        if ($scope.currentarea != null) {
            var c = getcoordinate(event);
            $scope.currentarea.coords.push(c);
        }
    }
    $scope.delcoordinate = function (c) {
        $scope.currentarea.coords.splice($scope.currentarea.coords.indexOf(c), 1);
    }
    $scope.xytos = function (ca) {
        return _.chain(ca)
            .map(function (c) { return [c.x, c.y] })
            .reduce(function (t, i) { return t.concat(i) }, [])
            .join(",")
            .value();
    };
    $scope.getresultstring = function () {
        var result = ''
            + '<img src="' + $scope.data.imagepath + '" usemap="#themap" />'
            + '\n'
            + '<map name="themap">';

        for (var i = 0; i < $scope.data.areas.length; i++) {
            result += '\n'
                + '<area '
                + 'shape="' + $scope.data.areas[i].shape + '" '
                + 'alt="' + $scope.data.areas[i].alt + '" '
                + 'href="' + $scope.data.areas[i].href + '" '
                + 'coords="' + $scope.xytos($scope.data.areas[i].coords) + '" '
                + '/>';
        }

        result += '\n'
            + '</map>';

        return result;
    }
}]);

angular
.module("ImageMap")
.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

angular
.module("ImageMap")
.directive("mapresult", [function () {
    return {
        scope: {
            mapdata: "="
        },
        template: ''
            + '<img ng-src="{{mapdata.imagepath}}" usemap="#themap" />'
            + '<map name="themap">'
            + '<area '
            + 'ng-repeat="x in mapdata.areas" '
            + 'shape="{{x.shape}}" '
            + 'alt="{{x.alt}}" '
            + 'href="{{x.href}}" '
            + 'coords="{{xytos(x.coords)}}" '
            + '/>'
            + '</map>'
            + '',
        link: function (scope, element, attributes) {
            scope.xytos = function (ca) {
                return _.chain(ca)
                    .map(function (c) { return [c.x, c.y] })
                    .reduce(function (t, i) { return t.concat(i) }, [])
                    .join(",")
                    .value();
            };
        }
    }
}]);
