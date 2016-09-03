---
title: Angular.js Annotation Surprise
date: 2014-08-27 13:49:00
layout: blogdetail
published: true
redirect-from: "/article/angularjs-annotation-surprise/"
---

Pop quiz: what do you think the page below will look like when run?

```html
<!DOCTYPE html>
<html>
<head>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular.min.js"></script>
</head>
<body>
    <div ng-app="MyModule" ng-controller="MyCtrl">
        <p>Hello {% raw %}{{who}}{% endraw %}</p>
    </div>
    <script>
        "use strict";

        angular.module("MyModule", [])
        .controller("MyCtrl", ["$scope", "$q", function ($q, $scope) {
            $scope.who = "World";
        }]);
    </script>
</body>
</html>
```

Do you think the page will show "Hello World"?

It won't. It will just print "Hello".

Can you spot the problem?

It has something to do with the syntax that is used in angular.js to keep the script working after minification (called annotation). Without annotation angular.js injects objects into the controller based on the *name* of the parameters. With annotation angular.js *doesn't care* about parameter names, it will inject objects based on the list of strings, in the *exact order*.

So if we change the script to:

```javascript
.controller("MyCtrl", ["$scope", "$q", function ($q, $scope) {
    $q.who = "World";
}]);
```

It will print "Hello World" :)

Or we do it the right way, by always making sure the parameters are in the same order as the list of strings:

```javascript
.controller("MyCtrl", ["$scope", "$q", function ($scope, $q) {
    $scope.who = "World";
}]);
```
