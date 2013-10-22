"use strict";

angular
.module("APIWrappers", ["Globals"])
.factory("BlitzAPI", ["$http", "Settings", function ($http, Settings) {
    var Wrapper = {};
    Wrapper.Movies = function () {
        var movies = $http({
            method: "GET",
            url: Settings.BookingURL + "/movie",
            cache: true
        });
        return movies;
    };
    Wrapper.Schedules = function (showdate, cinema, movie) {
        var schedules = $http({
            method: "GET",
            url: Settings.BookingURL + "/schedule",
            params: { showdate: showdate, cinema: cinema, movie: movie },
            cache: true
        });
        return schedules;
    };
    Wrapper.Cinemas = function () {
        var cinemas = $http({
            method: "GET",
            url: Settings.BookingURL + "/cinema",
            cache: true
        });
        return cinemas;
    }
    Wrapper.AudiNo = function (cinema, movie, showdate, auditype, showtime, movieformat) {
        var audino = $http({
            method: "GET",
            url: Settings.BookingURL + "/audino",
            params: { cinema: cinema, movie: movie, showdate: showdate, auditype: auditype, showtime: showtime, movieformat: movieformat },
            cache: true
        });
        return audino;
    }
    Wrapper.SeatLayout = function (cinema, audi) {
        var layout = $http({
            method: "GET",
            url: Settings.BookingURL + "/seatlayout",
            params: { cinema: cinema, audi: audi },
            cache: true
        });
        return layout;
    }
    Wrapper.SeatTaken = function (cinema, movie, showdate, audi, showtime) {
        var taken = $http({
            method: "GET",
            url: Settings.BookingURL + "/seattaken",
            params: { cinema: cinema, movie: movie, showdate: showdate, audi: audi, showtime: showtime, version: moment() },
            cache: false
        });
        return taken;
    }
    Wrapper.SnackList = function (cinema) {
        var snack = $http({
            method: "GET",
            url: Settings.BookingURL + "/snacklist",
            params: { cinema: cinema },
            cache: true
        });
        return snack;
    }
    Wrapper.BookSeat = function (cinema, movie, showdate, audi, showtime, seats, partnercode) {
        var booking = $http({
            method: "POST",
            url: Settings.BookingURL + "/onlinebooking/bookseat",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: $.param({
                cinema: cinema,
                movie: movie,
                showdate: showdate,
                audi: audi,
                showtime: showtime,
                seats: seats,
                partnercode: partnercode
            }),
            cache: false
        });
        return booking;
    }
    Wrapper.CancelBooking = function (code) {
        var cancel = $http({
            method: "POST",
            url: Settings.BookingURL + "/onlinebooking/cancelbooking",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: $.param({ code: code }),
            cache: false
        });
        return cancel;
    }
    Wrapper.BookingOrderSnack = function (cinema, items, pickupdate, bookingcode, partnercode) {
        var params = {
            cinema: cinema,
            pickupdate: pickupdate,
            bookingcode: bookingcode,
            partnercode: partnercode
        };

        for (var n = 0; n < items.length; n++) {
            var key = "items[" + n + "].code";
            params[key] = items[n].code;
            key = "items[" + n + "].qty";
            params[key] = items[n].qty;
        }

        var booking = $http({
            method: "POST",
            url: Settings.BookingURL + "/onlinebooking/ordersnack",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: $.param(params),
            cache: false
        });
        return booking;
    }
    Wrapper.BookingPrice = function (bookingcode, paytype, cardno, partnercode, signature) {
        var info = $http({
            method: "GET",
            url: Settings.BookingURL + "/onlinebooking/bookingprice",
            params: { bookingcode: bookingcode, paytype: paytype, cardno: cardno, partnercode: partnercode, signature: signature },
            cache: false
        });
        return info;
    }
    Wrapper.ReservationList = function (bookingcode, partnercode, signature) {
        var result = $http({
            method: "GET",
            url: Settings.BookingURL + "/onlinebooking/transactioninfo",
            params: { bookingcode: bookingcode, partnercode: partnercode, signature: signature },
            cache: false
        });
        return result;
    }
    return Wrapper;
}]);
