"use strict";

angular.module("MyApp").controller("root.masterDetail_Controller", [
    "$state", "$q", "API", "UserData", "BusyIndicatorHandler", "ErrorHandler", "FocusHelper",
    function ($state, $q, API, UserData, BusyIndicatorHandler, ErrorHandler, FocusHelper) {

        var vm = this;

        vm.ShowDate = moment({ hour: 0 }).toDate();
        vm.Channels = null;
        vm.Channel = null;
        vm.AllSchedules = null;
        vm.Schedules = null;

        vm.ChangeChannel = ChangeChannel;
        vm.Refresh = Refresh;

        Initialize();

        function Initialize() {
            UserData.SelectedView = "masterdetail";
            UserData.SaveToStorage();
            Refresh();
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

        function Refresh() {
            BusyIndicatorHandler.show();

            API.Channels({ FakeData: false }).then(function (response) {
                vm.Channels = _.orderBy(response.data, ["Name", "Code"]);

                var channelChunked = _(vm.Channels).
                    map(function (ch) {
                        switch (UserData.UseAPIVersion) {
                            case 3:
                                return ch.Number;
                            default:
                                return ch.Code;
                        }
                    }).
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
        }

    }
]);
