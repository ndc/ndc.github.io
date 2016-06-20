"use strict";

angular.module("MyApp").controller("root.masterDetail_Controller", [
    "$state", "$q", "API", "BusyIndicatorHandler", "ErrorHandler", "FocusHelper",
    function ($state, $q, API, BusyIndicatorHandler, ErrorHandler, FocusHelper) {

        var vm = this;

        vm.ShowDate = !!$state.params.ShowDate ?
            moment($state.params.ShowDate).toDate() :
            moment({ hour: 0 }).toDate();
        vm.Channels = null;
        vm.Channel = null;
        vm.AllSchedules = null;
        vm.Schedules = null;

        vm.ChangeChannel = ChangeChannel;

        Initialize();

        function Initialize() {
            BusyIndicatorHandler.show();

            API.Channels({ FakeData: false }).then(function (response) {
                vm.Channels = response.data;

                var channelChunked = _(vm.Channels).
                    chunk(20).
                    map(function (batch) {
                        var request = {};
                        request.ShowDate = moment(vm.ShowDate).format("YYYY-MM-DD");
                        request.Channels = _.map(batch, function (channel) { return channel.Code; });
                        request.FakeData = false;

                        return API.Schedules(request);
                    }).
                    value();

                $q.all(channelChunked).then(function (responses) {
                    vm.AllSchedules = _(responses).
                        map(function (response) { return response.data.Schedules; }).
                        flatten().
                        value();

                    _.each(vm.Channels, function (channel) {
                        var sched = _.find(vm.AllSchedules, function (sched) { return sched.ChannelCode == channel.Code; });
                        if (!!sched) {
                            channel.Number = sched.ChannelNumber;
                        };
                    });
                });
            }).catch(ErrorHandler.HttpNotify()).finally(function () {
                BusyIndicatorHandler.hide();
            });
        };

        function ChangeChannel() {
            var currentTime = moment();

            vm.Schedules = _(vm.AllSchedules).
                filter(function (show) {
                    var metCondition = show.ChannelCode == vm.Channel.Code &&
                        moment(show.Until) > currentTime;
                    return metCondition;
                }).
                value();

            FocusHelper.scrollIntoId("topSchedule");
        };

    }
]);
