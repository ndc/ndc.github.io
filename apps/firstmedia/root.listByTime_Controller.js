"use strict";

angular.module("MyApp").controller("root.listByTime_Controller", [
    "$state", "UserData", "Schedule",
    function ($state, UserData, Schedule) {

        var vm = this;

        vm.UserData = UserData;
        vm.Schedule = Schedule;
        vm.Channels = null;
        vm.Schedules = null;

        vm.ChangeFilterPast = ChangeFilterPast;

        Initialize();

        function Initialize() {
            populateSchedules();
        };

        function ChangeFilterPast() {
            UserData.SaveToStorage();
            populateSchedules();
        };

        function populateSchedules() {
            vm.Schedules = UserData.FilterPast ? Schedule.FilterPastShows() : Schedule.Schedules;
            vm.Channels = _(vm.Schedules).
                map(function (s) { return s.Channel; }).
                uniq().
                value();
            var currentTime = moment();
            _.each(vm.Schedules, function (schedule) {
                schedule.isPast = moment(schedule.Until) < currentTime;
            });
        };

    }
]);
