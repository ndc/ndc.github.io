"use strict";

angular.module("LocalStorage", []);

angular.module("LocalStorage").factory("MyLocalStore", [
    function () {
        var svc = {};

        svc.Get = Get;
        svc.Set = Set;
        svc.Remove = Remove;
        svc.Clear = Clear;
        svc.Keys = Keys;

        return svc;

        function Get(keyword) {
            var content = angular.fromJson(localStorage.getItem(keyword));
            return content;
        };

        function Set(keyword, value) {
            var content = angular.toJson(value);
            localStorage.setItem(keyword, content);
        };

        function Remove(keyword) {
            localStorage.removeItem(keyword);
        };

        function Clear() {
            localStorage.clear();
        };

        function Keys() {
            var keys = [];
            for (var i = 0; i < localStorage.length; i++) {
                var content = localStorage.key(i);
                keys.push(content);
            };
            return keys;
        };
    }
]);
