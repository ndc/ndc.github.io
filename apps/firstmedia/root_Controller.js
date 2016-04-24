"use strict";

angular.module("MyApp").controller("root_Controller", [
    "$state", "UserData", "API", "ErrorHandler", "BusyIndicatorHandler",
    function ($state, UserData, API, ErrorHandler, BusyIndicatorHandler) {

        var vm = this;

        vm.UserData = UserData;
        vm.ShowDate = moment({ hour: 0 }).toDate();
        vm.Channels = [];
        vm.Schedules = [];

        vm.Refresh = Refresh;
        vm.SwitchView = SwitchView;

        Initialize();

        function Initialize() {
        };

        function Refresh() {
            UserData.SaveToStorage();

            var request = {};
            request.ShowDate = !!vm.ShowDate ? moment(vm.ShowDate).format("YYYY-MM-DD") : null;
            request.Channels = UserData.Favorites[UserData.SelectedFavorite].Channels;
            request.FakeData = false;

            BusyIndicatorHandler.show();

            return API.Schedules(request).then(function (response) {
                vm.Channels = response.data.Channels;
                vm.Schedules = response.data.Schedules;

                var currentTime = moment().subtract(1, "hours");

                _.each(vm.Schedules, function (s) {
                    s.isPast = moment(s.ShowTime).isBefore(currentTime);
                });

                if (UserData.FilterPast) {
                    vm.Schedules = _.filter(vm.Schedules, function (s) {
                        return !s.isPast;
                    });
                };

                SwitchView(UserData.SelectedView);
            }).catch(ErrorHandler.HttpNotify()).finally(function () {
                BusyIndicatorHandler.hide();
            });
        };

        function SwitchView(viewName) {
            switch (viewName) {
                case "ListByTime":
                    UserData.SelectedView = viewName;
                    UserData.SaveToStorage();
                    $state.go("root.listByTime");
                    break;
                case "ListByChannel":
                    UserData.SelectedView = viewName;
                    UserData.SaveToStorage();
                    $state.go("root.listByChannel");
                    break;
                default:
                    break;
            };
        };

    }
]);
