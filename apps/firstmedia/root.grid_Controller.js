"use strict";

angular.module("MyApp").controller("root.grid_Controller", [
    "$state", "UserData", "Schedule", "$uibModal", "ErrorHandler", "BusyIndicatorHandler",
    function ($state, UserData, Schedule, $uibModal, ErrorHandler, BusyIndicatorHandler) {

        var vm = this;

        vm.ShowDate = moment({ hour: 0 }).toDate();

        vm.UserData = UserData;
        vm.Schedules = null;
        vm.Channels = null;
        vm.Milestones = null;
        vm.ShowTimeRows = null;
        vm.ChannelRows = null;

        vm.ChangeFilterPast = ChangeFilterPast;
        vm.ShowDetail = ShowDetail;

        vm.ChangeFavorite = ChangeFavorite;
        vm.Reset = Reset;
        vm.Refresh = Refresh;

        Initialize();

        function Initialize() {
            var viewName = "";
            switch ($state.current.name) {
                case "root.grid":
                    viewName = "grid";
                    break;
                case "root.newspaper":
                    viewName = "newspaper";
                    break;
                default:
                    break;
            }
            UserData.SelectedView = viewName;
            UserData.SaveToStorage();
            Refresh();
        };

        function ChangeFilterPast() {
            UserData.SaveToStorage();
            populateSchedules();
        };

        function Refresh() {
            var ShowDate = !!vm.ShowDate ? moment(vm.ShowDate).format("YYYY-MM-DD") : null;
            var Channels = UserData.Favorites[UserData.SelectedFavorite].Channels;
            var FakeData = false;

            BusyIndicatorHandler.show();

            return Schedule.Refresh(ShowDate, Channels, FakeData).then(function (response) {
                populateSchedules();
            }).catch(ErrorHandler.HttpNotify()).finally(function () {
                BusyIndicatorHandler.hide();
            });
        };

        function populateSchedules() {
            var currentTime = moment();

            vm.Schedules = _(Schedule.Schedules).
                filter(function (show) {
                    return UserData.FilterPast ?
                        moment(show.Until) > currentTime :
                        true;
                }).
                value();

            vm.Milestones = _(vm.Schedules).
                map(function (schedule) { return schedule.ShowTime; }).
                union(_.map(vm.Schedules, function (s) { return s.Until; })).
                sortBy(function (showtime) { return showtime; }).
                value();

            vm.Channels = _(vm.Schedules).
                map(function (s) { return s.Channel; }).
                uniq().
                sortBy(function (c) { return c.Name; }).
                value();

            vm.ShowTimeRows = [];
            for (var timeIdx = 0; timeIdx < vm.Milestones.length; timeIdx++) {
                var row = [];
                vm.ShowTimeRows.push(row);
                for (var channelIdx = 0; channelIdx < vm.Channels.length; channelIdx++) {
                    var col = {};
                    row.push(col);
                    var thetime = vm.Milestones[timeIdx];
                    var channel = vm.Channels[channelIdx];
                    var currentShow = _.find(vm.Schedules, function (show) {
                        return show.ChannelCode == channel.Code &&
                            show.ShowTime <= thetime &&
                            show.Until > thetime;
                    });
                    if (!!currentShow && currentShow.ShowTime == thetime) {
                        col.Show = currentShow;

                        var start = vm.Milestones.indexOf(col.Show.ShowTime);
                        var end = vm.Milestones.indexOf(col.Show.Until);
                        col.Show.Span = end - start;
                    };
                    col.Generate = !currentShow || !!col.Show;
                };
            };

            vm.ChannelRows = _.unzip(vm.ShowTimeRows);

            _.each(Schedule.Schedules, function (schedule) {
                schedule.isPast = moment(schedule.Until) < currentTime;
            });
        };

        function ShowDetail(show) {
            var modalOptions = {
                templateUrl: "showDetail_Template.html",
                controller: "showDetail_Controller as vm",
                resolve: {
                    Show: [
                        function () {
                            return show;
                        }
                    ]
                }
            };

            var modalPromise = $uibModal.open(modalOptions).
                result.
                then(function (response) {
                });

            return modalPromise;
        };

        function ChangeFavorite() {
            UserData.SaveToStorage();
            Refresh();
        };

        function Reset() {
            UserData.Reset();
            UserData.SaveToStorage();
        };

    }
]);
