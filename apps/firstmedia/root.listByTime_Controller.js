"use strict";

angular.module("MyApp").controller("root.listByTime_Controller", [
    "$state", "UserData", "Schedule",
    function ($state, UserData, Schedule) {

        var vm = this;

        vm.UserData = UserData;
        vm.Schedule = Schedule;
        vm.Channels = Schedule.Channels;
        vm.Schedules = [];

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
            var currentTime = moment();
            _.each(vm.Schedules, function (schedule) {
                schedule.isPast = moment(schedule.Until) < currentTime;
            });
        };

    }
]);
