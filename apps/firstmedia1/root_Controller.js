"use strict";

angular.module("MyApp").controller("root_Controller", [
    "$state", "UserData",
    function (
        $state, UserData,
    ) {

        var vm = this;

        vm.UserData = UserData;

        Initialize();

        function Initialize() {
        };

    }
]);
