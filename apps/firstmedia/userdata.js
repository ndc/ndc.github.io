"use strict";

angular.module("MyApp").factory("UserData", [
    "MyLocalStore",
    function (MyLocalStore) {
        var userdata = {};

        userdata.LoadFromStorage = LoadFromStorage;
        userdata.SaveToStorage = SaveToStorage;
        userdata.Reset = Reset;

        var storeKeySettings = "firstmediaSchedule.settings";

        return userdata;

        function LoadFromStorage() {
            try {
                var stor = MyLocalStore.Get(storeKeySettings);
                userdata.Favorites = stor.Favorites;
                userdata.FilterPast = stor.FilterPast;
                userdata.SelectedFavorite = stor.SelectedFavorite;
                userdata.SelectedView = stor.SelectedView;
            } catch (exc) {
                Reset();
                SaveToStorage();
            };
        };

        function SaveToStorage() {
            MyLocalStore.Set(storeKeySettings, userdata);
        };

        function Reset() {
            userdata.Favorites = [
                {
                    Code: "favorite1",
                    Channels: []
                },
                {
                    Code: "favorite2",
                    Channels: ["disney-hd", "warner-tv-hd", "universal-hd"]
                }
            ];
            userdata.FilterPast = true;
            userdata.SelectedFavorite = 0;
            userdata.SelectedView = "ListByTime";
        };
    }
]);
