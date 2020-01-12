"use strict";

angular.module("MyApp").controller("root.masterDetail_Controller", [
    "$state", "$q", "API", "UserData", "BusyIndicatorHandler", "ErrorHandler", "FocusHelper",
    function ($state, $q, API, UserData, BusyIndicatorHandler, ErrorHandler, FocusHelper) {

        var vm = this;

        vm.UserData = UserData;

        vm.ShowDate = moment({ hour: 0 }).toDate();
        vm.Channels = null;
        vm.Channel = null;
        vm.AllSchedules = [];
        vm.Schedules = null;

        vm.ChangeChannel = ChangeChannel;
        vm.ChangeFilterPast = ChangeFilterPast;

        Initialize();

        function Initialize() {
            UserData.SelectedView = "masterdetail";
            UserData.SaveToStorage();

            BusyIndicatorHandler.show();

            API.Channels({ FakeData: false }).then(function (response) {
                vm.Channels = _.orderBy(response.data, ["Name", "Code"]);

                if (vm.Channels.length > 0) {
                    vm.Channel = vm.Channels[0];
                    ChangeChannel();
                }
            }).catch(ErrorHandler.HttpNotify()).finally(function () {
                BusyIndicatorHandler.hide();
            });
        };

        function ChangeChannel() {
            vm.Schedules = _(vm.AllSchedules)
                .filter(function (show) { return show.ChannelCode == vm.Channel.Code; })
                .value();

            if (vm.Schedules.length < 1) {
                getScheduleFromServer(vm.ShowDate, vm.Channel.Code).then(function (shows) {
                    vm.AllSchedules = vm.AllSchedules.concat(shows);
                    vm.Schedules = filterPastShows(_(vm.AllSchedules)
                        .filter(function (show) { return show.ChannelCode == vm.Channel.Code; })
                        .value(), UserData.FilterPast);
                    FocusHelper.scrollIntoId("topSchedule");
                });
            } else {
                vm.Schedules = filterPastShows(vm.Schedules, UserData.FilterPast);
                FocusHelper.scrollIntoId("topSchedule");
            }
        };

        function ChangeFilterPast() {
            UserData.SaveToStorage();
            ChangeChannel();
        };

        function getScheduleFromServer(showdate, channel) {
            var request = {};
            request.ShowDate = moment(showdate).format("YYYY-MM-DD");
            request.Channels = [channel];
            request.FakeData = false;

            BusyIndicatorHandler.show();

            return API.Schedules(request).then(function (response) {
                _.each(response.data.Shows, function (show) {
                    show.Channel = _.find(response.data.Channels, function (ch) {
                        return ch.Code == show.ChannelCode;
                    });
                });

                return response.data.Shows;
            }).catch(ErrorHandler.HttpNotify()).finally(function () {
                BusyIndicatorHandler.hide();
            });
        }

        function filterPastShows(shows, filterPast) {
            var currentTime = moment();

            var filtered = _(shows)
                .filter(function (show) {
                    var metCondition = filterPast && moment(show.Until) > currentTime
                        || !filterPast;
                    return metCondition;
                })
                .value();

            return filtered;
        }

    }
]);
