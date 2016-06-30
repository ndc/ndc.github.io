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

                var channelChunked = _.chunk(vm.Channels, 20);

                var chain = _.reduce(channelChunked, function (mainChain, channelBatch) {
                    var request = {};
                    request.ShowDate = moment(vm.ShowDate).format("YYYY-MM-DD");
                    request.Channels = _.map(channelBatch, function (channel) {
                        return channel.Code;
                    });
                    request.FakeData = false;

                    return mainChain.then(function (schedules) {
                        return API.Schedules(request).then(function (response) {
                            return schedules.concat(response.data);
                        });
                    });
                }, $q.when([])).then(function (schedules) {
                    vm.AllSchedules = schedules;

                    _.each(vm.Channels, function (channel) {
                        var sched = _.find(vm.AllSchedules, function (sched) {
                            return sched.ChannelCode == channel.Code;
                        });
                        if (!!sched) {
                            channel.Number = sched.ChannelNumber;
                        };
                    });
                });

                return chain;
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
