"use strict";

angular.module("MyApp").controller("showDetail_Controller", [
    "Show", "$uibModalInstance",
    function (Show, $uibModalInstance) {

        var vm = this;

        vm.Show = Show;
        vm.Close = Close;

        Initialize();

        function Initialize() {
        };

        function Close() {
            $uibModalInstance.dismiss();
        };

    }
]);
