"use strict";

angular.module('MyApp', []);

angular.module("MyApp").controller("MyCtrl", [
    "$q", "$timeout", "$scope",
    function ($q, $timeout, $scope) {

        var vm = this;
        vm.data = [];
        vm.run = run;

        function run() {
            var channelChunked = [
                ["cinemax-hd", "disney-hd"],
                ["fox-action-movies-hd", "fox-movies-premium-hd"],
                ["hbo-hd", "hbo-hits-hd"]
            ];

            var asTimeouts = _.map(channelChunked, function (batch) {
                return $timeout(function () { return batch; }, 3000);
            });

            var chain = $q.when();

            _.each(asTimeouts, function (serverCall) {
                chain.then(function () {
                    return serverCall.then(function (response) {
                        vm.data = vm.data.concat(response);
                    });
                });
            });

            return chain;
        }

    }
]);
