"use strict";

angular.module("MyApp").factory("UserData", [
    "MyLocalStore",
    function (MyLocalStore) {
        var storeKeySettings = "firstmediaSchedule.settings";

        var userdata = {};

        userdata.LoadFromStorage = LoadFromStorage;
        userdata.SaveToStorage = SaveToStorage;
        userdata.Reset = Reset;

        LoadFromStorage();

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
                    Channels: [
                        { Code: "LYS000000108", Name: "Disney Ch", Number: 108, LogoURL: "http://202.73.98.253/pics/EPG/disney.png" },
                        { Code: "LYS000000259", Name: "Warner TV", Number: 259, LogoURL: "http://202.73.98.253/pics/EPG/warnertv.png" }
                    ]
                }
            ];
            userdata.FilterPast = true;
            userdata.SelectedFavorite = 0;
            userdata.SelectedView = "newspaper";
        };
    }
]);
