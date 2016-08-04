"use strict";

angular.module("MyApp").controller("FavoriteEdit_Controller", [
    "API", "BusyIndicatorHandler", "ErrorHandler", "UserData", "$stateParams", "$state", "NotificationHandler",
    function (API, BusyIndicatorHandler, ErrorHandler, UserData, $stateParams, $state, NotificationHandler) {

        var vm = this;

        var isNew = UserData.Favorites[$stateParams.favoriteid] === undefined;

        if (isNew) {
            vm.Favorite = {
                Code: null,
                Channels: []
            };
        } else {
            vm.Favorite = UserData.Favorites[$stateParams.favoriteid];
        };

        vm.Channels = [];

        vm.Update = Update;
        vm.Delete = Delete;
        vm.SelectAll = SelectAll;
        vm.DeselectAll = DeselectAll;
        vm.GetSelected = GetSelected;

        Initialize();

        function Initialize() {
            var request = {};
            request.FakeData = false;

            BusyIndicatorHandler.show();

            API.Channels(request).then(function (response) {
                vm.Channels = _(response.data).
                    orderBy(["Name", "Code"]).
                    map(function (c) {
                        var selected = _.includes(
                            _.map(vm.Favorite.Channels, function (ch) { return ch.Code; }),
                            c.Code);
                        return [c, selected];
                    }).
                    value();
            }).catch(ErrorHandler.HttpNotify()).finally(function () {
                BusyIndicatorHandler.hide();
            });
        };

        function Update() {
            if (!vm.Favorite.Code) {
                vm.Favorite.Code = moment().format("x");
            };

            vm.Favorite.Channels = GetSelected();

            if (isNew) {
                UserData.Favorites.push(vm.Favorite);
            };

            UserData.SelectedFavorite = UserData.Favorites.indexOf(vm.Favorite);

            UserData.SaveToStorage();

            $state.go("root");
        };

        function Delete() {
            if (isNew) {
                $state.go("root");
                return;
            };

            if (UserData.Favorites.length < 2) {
                NotificationHandler.notify("warning",
                    "Cannot delete the last item.");
                return;
            };

            var idx = UserData.Favorites.indexOf(vm.Favorite);
            UserData.Favorites.splice(idx, 1);

            if (UserData.SelectedFavorite > UserData.Favorites.length) {
                UserData.SelectedFavorite = 0;
            };

            UserData.SaveToStorage();

            $state.go("root");
        };

        function SelectAll() {
            _.each(vm.Channels, function (c) {
                c[1] = true;
            });
        };

        function DeselectAll() {
            _.each(vm.Channels, function (c) {
                c[1] = false;
            });
        };

        function GetSelected() {
            var slct = _(vm.Channels).
                filter(function (c) { return c[1] == true; }).
                map(function (ar) { return ar[0]; }).
                value();
            return slct;
        };

    }
]);
