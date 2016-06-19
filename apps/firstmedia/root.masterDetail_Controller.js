"use strict";

angular.module("MyApp").controller("root.masterDetail_Controller", [
    "$state", "API", "BusyIndicatorHandler", "ErrorHandler", "FocusHelper",
    function ($state, API, BusyIndicatorHandler, ErrorHandler, FocusHelper) {

        var vm = this;

        vm.ShowDate = !!$state.params.ShowDate ?
            moment($state.params.ShowDate).toDate() :
            moment({ hour: 0 }).toDate();
        vm.Channels = null;
        vm.Channel = null;
        vm.Schedules = null;

        vm.ChangeChannel = ChangeChannel;

        Initialize();

        function Initialize() {
            BusyIndicatorHandler.show();

            API.Channels({ FakeData: false }).then(function (response) {
                vm.Channels = response.data;
            }).catch(ErrorHandler.HttpNotify()).finally(function () {
                BusyIndicatorHandler.hide();
            });
        };

        function ChangeChannel() {
            BusyIndicatorHandler.show();

            populateSchedules().finally(function () {
                BusyIndicatorHandler.hide();
            });
        };

        function populateSchedules() {
            var currentTime = moment();

            var request = {};
            request.ShowDate = moment(vm.ShowDate).format("YYYY-MM-DD");
            request.Channels = [vm.Channel.Code];
            request.FakeData = false;

            return API.Schedules(request).then(function (response) {
                vm.Schedules = _(response.data.Schedules).
                    filter(function (show) { return moment(show.Until) > currentTime; }).
                    value();
                if (vm.Schedules.length > 0) {
                    vm.Channel.Number = vm.Schedules[0].ChannelNumber;
                    FocusHelper.scrollIntoId("topSchedule");
                };
            });
        };

    }
]);
