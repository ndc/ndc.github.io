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
                userdata.UseAPIVersion = !!stor.UseAPIVersion ? stor.UseAPIVersion : 2;
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
                    Channels: [
                        { Code: "LYS000000371", Number: 371, Name: "ANTV", LogoURL: "http://202.73.98.253/pics/EPG/antv.png" },
                        { Code: "LYS000000301", Number: 301, Name: "Berita Satu HD", LogoURL: "http://202.73.98.253/pics/EPG/beritasatu.png" },
                        { Code: "LYS000001267", Number: 372, Name: "Indosiar", LogoURL: "http://202.73.98.253/pics/EPG/indosiar.png" },
                        { Code: "LYS00000410", Number: 410, Name: "KOMPAS TV", LogoURL: "http://202.73.98.253/pics/EPG/kompas.png" },
                        { Code: "LYS000000395", Number: 395, Name: "SCTV", LogoURL: "http://202.73.98.253/pics/EPG/sctv.png" },
                        { Code: "LYS000000399", Number: 399, Name: "TVRI Nasional", LogoURL: "http://202.73.98.253/pics/EPG/tvri.png" }
                    ]
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
            userdata.UseAPIVersion = 2;
        };
    }
]);
