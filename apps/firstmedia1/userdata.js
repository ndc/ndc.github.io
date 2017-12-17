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
                        { Code: "berita-satu-hd", Number: 1, Name: "BERITA SATU HD", LogoURL: "http://www.firstmedia.com/files/packages/BeritasatuCh1.png" },
                        { Code: "kompas-tv", Number: 15, Name: "KOMPAS TV", LogoURL: "http://www.firstmedia.com/files/packages/kompas-new.png" }
                    ]
                },
                {
                    Code: "favorite2",
                    Channels: [
                        { Code: "disney-hd", Name: "DISNEY HD", Number: 373, LogoURL: "http://www.firstmedia.com/files/packages/Disney+logo+baru.jpg" },
                        { Code: "fox-hd", Name: "FOX HD", Number: 328, LogoURL: "http://www.firstmedia.com/files/packages/FOX Channel Logo_Mono Orange.png" }
                    ]
                }
            ];
            userdata.FilterPast = true;
            userdata.SelectedFavorite = 0;
            userdata.SelectedView = "masterdetail";
            userdata.UseAPIVersion = 3;
        };
    }
]);
