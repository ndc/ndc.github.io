"use strict";

angular.module("MyApp").controller("root.gantt_Controller", [
    "$state", "UserData", "Schedule",
    function ($state, UserData, Schedule) {

        var vm = this;

        vm.UserData = UserData;
        vm.Schedule = Schedule;
        vm.ChannelShows = [];
        vm.Milestones = [];

        vm.ChangeFilterPast = ChangeFilterPast;
        vm.GetShow = GetShow;

        Initialize();

        function Initialize() {
            populateSchedules();
        };

        function ChangeFilterPast() {
            UserData.SaveToStorage();
            populateSchedules();
        };

        function populateSchedules() {
            var schedules = UserData.FilterPast ? Schedule.FilterPastShows() : Schedule.Schedules;

            var currentTime = moment();
            _.each(schedules, function (schedule) {
                schedule.isPast = moment(schedule.Until) < currentTime;
            });

            vm.Milestones = _(schedules).
                map(function (schedule) {
                    return schedule.ShowTime;
                }).
                uniq().
                value();

            vm.ChannelShows = _.map(Schedule.Channels, function (channel) {
                var cs = {};
                cs.Channel = channel;
                cs.Shows = _(schedules).
                    filter(function (sched) {
                        return sched.ChannelCode == channel.Code;
                    }).
                    sortBy(function (sched) {
                        return sched.ShowTime;
                    }).
                    map(function (sched) {
                        var start = vm.Milestones.indexOf(sched.ShowTime);
                        start = start < 0 ? 0 : start;
                        var end = vm.Milestones.indexOf(sched.Until);
                        end = end < 0 ? vm.Milestones.length : end;

                        sched.ColSpan = end - start;
                        sched.StartFrom = moment(sched.ShowTime).format("HH:mm");
                        return sched;
                    }).
                    value();

                var earliestShowTime = _(cs.Shows).map(function (show) {
                    return show.ShowTime;
                }).min();
                cs.LeftPad = vm.Milestones.indexOf(earliestShowTime);

                return cs;
            });
        };

        function GetShow(showtime, channelCode) {
            var cs = _.find(vm.ChannelShows, function (channelShow) {
                return channelShow.Channel.Code == channelCode;
            });

            if (!cs) {
                return cs;
            };

            var show = _.find(cs.Shows, function (s) {
                return s.ShowTime == showtime;
            });

            return show;
        };

    }
]);
