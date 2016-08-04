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
                vm.Channels = _.orderBy(response.data, ["Name", "Code"]);

                var channelChunked = _(vm.Channels).
                    map(function (ch) { return ch.Code; }).
                    chunk(20).
                    value();

                var chain = _.reduce(
                    channelChunked,
                    function (mainChain, channelBatch) {
                        var request = {};
                        request.ShowDate = moment(vm.ShowDate).format("YYYY-MM-DD");
                        request.Channels = channelBatch;
                        request.FakeData = false;

                        return mainChain.then(function (schedules) {
                            return API.Schedules(request).then(function (response) {
                                _.each(response.data.Shows, function (show) {
                                    show.Channel = _.find(response.data.Channels, function (ch) {
                                        return ch.Code == show.ChannelCode;
                                    });
                                });

                                return schedules.concat(response.data.Shows);
                            });
                        });
                    },
                    $q.when([])).
                    then(function (schedules) {
                        vm.AllSchedules = schedules;
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
