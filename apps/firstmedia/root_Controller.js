"use strict";

angular.module("MyApp").controller("root_Controller", [
    "$state", "UserData", "Schedule",
    "ErrorHandler", "BusyIndicatorHandler",
    function (
        $state, UserData, Schedule,
        ErrorHandler, BusyIndicatorHandler
    ) {

        var vm = this;

        vm.UserData = UserData;
        vm.ShowDate = moment({ hour: 0 }).toDate();

        vm.ChangeFavorite = ChangeFavorite;
        vm.Refresh = Refresh;
        vm.SwitchView = SwitchView;
        vm.Reset = Reset;

        Initialize();

        function Initialize() {
        };

        function ChangeFavorite() {
            UserData.SaveToStorage();
        };

        function Refresh() {
            var ShowDate = !!vm.ShowDate ? moment(vm.ShowDate).format("YYYY-MM-DD") : null;
            var Channels = UserData.Favorites[UserData.SelectedFavorite].Channels;
            var FakeData = false;

            BusyIndicatorHandler.show();

            return Schedule.Refresh(ShowDate, Channels, FakeData).then(function (response) {
                switchToView(UserData.SelectedView);
            }).catch(ErrorHandler.HttpNotify()).finally(function () {
                BusyIndicatorHandler.hide();
            });
        };

        function SwitchView(viewName) {
            switch (viewName) {
                case "gantt":
                case "ganttVertical":
                case "listByTime":
                case "listByChannel":
                    UserData.SelectedView = viewName;
                    UserData.SaveToStorage();
                    switchToView(viewName);
                    break;
                default:
                    break;
            };
        };

        function switchToView(viewName) {
            var stateName = "root." + viewName;
            $state.go(stateName, null, { reload: true });
        };

        function Reset() {
            UserData.Reset();
            UserData.SaveToStorage();
        };

    }
]);
