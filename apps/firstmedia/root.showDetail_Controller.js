"use strict";

angular.module("MyApp").controller("root.showDetail_Controller", [
    "$state", "Schedule", "$stateParams",
    function ($state, Schedule, $stateParams) {

        var vm = this;

        vm.Show = null;

        Initialize();

        function Initialize() {
            vm.Show = _.find(Schedule.Schedules, function (schedule) {
                return schedule.ID == $stateParams.showid;
            });

            if (vm.Show == undefined) {
                return;
            };

            var channel = _.find(Schedule.Channels, function (c) {
                return c.Code == vm.Show.ChannelCode;
            });

            vm.Show.IconURL = channel.IconURL;
        };

    }
]);
