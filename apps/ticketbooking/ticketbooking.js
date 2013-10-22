"use strict";

angular
.module("TicketBooking", ["Globals", "APIWrappers", "ui.bootstrap"]);

angular
.module("TicketBooking")
.value("localStorage", window.localStorage);

angular
.module("TicketBooking")
.filter("formatdate", [function () {
    var result = function (date, formatstring) {
        return moment(date).format(formatstring);
    }
    return result;
}]);

angular
.module("TicketBooking")
.directive("dateread", [function () {
    var result = {
        scope: {
            dateread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeevent) {
                scope.$apply(function () {
                    scope.dateread = changeevent.timeStamp;
                });
            });
        }
    }
    return result;
}]);

angular
.module("TicketBooking")
.factory("BookingState", [function () {
    var result = {
        cinemalist: null,
        citylist: null,
        movielist: null,
        showlist: null,
        selectedshowdate: null,
        selectedcity: null,
        selectedcinema: null,
        selectedmovie: null,
        selectedshow: null,
        selectedaudi: null,
        selectedseats: null
    };
    result.reset = function () {
        var me = this;
        me.cinemalist = null;
        me.citylist = null;
        me.movielist = null;
        me.showlist = null;
        me.selectedshowdate = null;
        me.selectedcity = null;
        me.selectedcinema = null;
        me.selectedmovie = null;
        me.selectedshow = null;
        me.selectedaudi = null;
        me.selectedseats = null;
    }
    result.isbooking = function () {
        var me = this;
        if (
            me.selectedshowdate == null &&
            me.selectedcinema == null &&
            me.selectedmovie == null &&
            me.selectedshow == null &&
            me.selectedaudi == null &&
            me.selectedseats == null
        ) {
            return false;
        } else {
            return true;
        }
    }
    result.bndate = function (datewithtime) {
        var startofday = moment(datewithtime).startOf("day");
        if (moment(datewithtime).diff(startofday, "seconds") < 21600) {
            var daybefore = startofday.add("days", -1);
            return daybefore;
        } else {
            return startofday;
        }
    }
    result.realdatetime = function (showdate, showtime) {
        if (showtime < "06:00") {
            return moment(showdate + " " + showtime).add("days", 1);
        } else {
            return moment(showdate + " " + showtime);
        }
    }

    return result;
}]);

angular
.module("TicketBooking")
.config(["$routeProvider", "Settings", function ($routeProvider, Settings) {
    $routeProvider
    .when(
        "/", { controller: "SelectShow", templateUrl: "selectshow.html" }
    )
    .when(
        "/seats", { controller: "SelectSeat", templateUrl: "selectseat.html" }
    )
    .otherwise(
        { redirectTo: "/" }
    );
}]);

angular
.module("TicketBooking")
.controller("SelectShow",
["$scope", "$location", "Settings", "BlitzAPI", "BookingState",
function ($scope, $location, Settings, BlitzAPI, BookingState) {
    $scope.State = BookingState;

    $scope.changecity = function (c) {
        if (BookingState.selectedcity != null
                && BookingState.selectedcity == c) {
            return;
        }

        BookingState.selectedcinema = null;
        BookingState.selectedmovie = null;
        BookingState.selectedshow = null;
        BookingState.selectedaudi = null;

        BookingState.selectedcity = c;

        $scope.availablecinemas = _.where(BookingState.cinemalist, {
            city: BookingState.selectedcity
        });

        $scope.filtermovies();
        $scope.filtershows();
    }

    $scope.changecinema = function (c) {
        if (BookingState.selectedcinema != null
                && BookingState.selectedcinema.code == c.code) {
            return;
        }

        BookingState.selectedmovie = null;
        BookingState.selectedshow = null;
        BookingState.selectedaudi = null;

        BookingState.selectedcinema = c;

        $scope.filtermovies();
        $scope.filtershows();
    }

    $scope.filtermovies = function () {
        $scope.availablemovies = _.chain(BookingState.showlist)
            .where({
                cinema: BookingState.selectedcinema ? BookingState.selectedcinema.code : null
            })
            .pluck("movie")
            .uniq()
            .map(function (m) {
                return _.findWhere(BookingState.movielist, { code: m });
            })
            .sortBy(function (m) { return m.title })
            .value();
    }

    $scope.changemovie = function (m) {
        if (BookingState.selectedmovie != null
                && BookingState.selectedmovie.code == m.code) {
            return;
        }

        BookingState.selectedshow = null;
        BookingState.selectedaudi = null;

        BookingState.selectedmovie = m;

        $scope.filtershows();
    }

    $scope.filtershows = function () {
        $scope.availableshows = _.chain(BookingState.showlist)
            .where({
                cinema: BookingState.selectedcinema ? BookingState.selectedcinema.code : null,
                movie: BookingState.selectedmovie ? BookingState.selectedmovie.code : null
            })
            .filter(function (s) {
                return (moment(s.realdatetime) >= moment())
            })
            .value();
    }

    $scope.changeshow = function (s) {
        if (BookingState.selectedshow != null
                && BookingState.selectedshow.timeformataudiprice == s.timeformataudiprice) {
            return;
        }

        BookingState.selectedaudi = null;

        BookingState.selectedshow = s;

        BlitzAPI.AudiNo(s.cinema, s.movie, s.showdate, s.auditype, s.showtime, s.movieformat)
        .success(function (data, status, headers, config) {
            BookingState.selectedaudi = data;
        })
        .error(function (data) {
            toastr.error(data);
        });
    }

    //[
    //  {
    //      "cinema": "0400",
    //      "showdate": "2013-09-13",
    //      "movie": "MOV1845",
    //      "price": 30000,
    //      "showtime": "10:30",
    //      "auditype": "N",
    //      "movieformat": "C",
    //      "midnight": 0,
    //      "capacity": 197
    //  }
    //]
    $scope.ShowDateChanged = function () {
        BookingState.selectedcinema = null;
        BookingState.selectedmovie = null;
        BookingState.selectedshow = null;

        var selecteddate = moment(BookingState.selectedshowdate).format("YYYY-MM-DD");

        var auditypes = {
            "N": "Regular",
            "Y": "Satin",
            "V": "Velvet",
            "O": "Velvet Suite",
            "D": "Dining"
        }

        BlitzAPI.Schedules(selecteddate)
        .success(function (data, status, headers, config) {
            _.each(data, function (d) {
                d.realdatetime = BookingState.realdatetime(d.showdate, d.showtime);
                d.timeformataudiprice = d.showtime + " "
                    + d.movieformat + " "
                    + auditypes[d.auditype] + " "
                    + numeral(d.price).format("0,0");
            });

            BookingState.showlist = data;

            $scope.filtermovies();
            $scope.filtershows();
        })
        .error(function (data) {
            toastr.error(data);
        });
    }

    if (BookingState.selectedshowdate == null) {
        BookingState.selectedshowdate = moment(BookingState.bndate(moment())).format("YYYY-MM-DD");
    }

    $scope.ShowDateChanged();

    $scope.gotoselectseat = function () {
        $location.path("/seats");
    }

    //[
    //  {
    //      "code": "0100",
    //      "name": "Paris van Java",
    //      "shortname": "PVJ",
    //      "address": "Sukajadi #137 - 139",
    //      "city": "Bandung",
    //      "telephone": "+622282063630",
    //      "auditypes": [
    //        "N"
    //      ],
    //      "image": "https://www.blitzmegaplex.com/uploads/cinemas/PVJ.JPG"
    //  }
    //]
    BlitzAPI.Cinemas()
    .success(function (data, status, headers, config) {
        BookingState.cinemalist = data;
        var cities = _.chain(data).countBy(function (c) { return c.city }).pairs();

        BookingState.citylist = cities.map(function (c) { return c[0] }).sort().value();

        if (BookingState.selectedcinema) {
            BookingState.selectedcity = BookingState.selectedcinema.city;
        } else {
            var topcity = cities.sortBy(function (c) { return -c[1] })
                .first().value()[0];
            $scope.changecity(topcity);
        }
    })
    .error(function (data) {
        toastr.error(data);
    });

    //[
    //  {
    //      "code": "MOV1825",
    //      "title": "A Werewolf Boy",
    //      "genre": "ROMANCE",
    //      "rating": "R",
    //      "cast": "Song Joong-Ki, Park Bo-Yeong, Jang Young-Nam, Yoo Yeon-Seok, Kim Hyang-Ki",
    //      "director": "Jo Sung-Hee",
    //      "language": "KOREAN",
    //      "subtitle": "BAHASA INDONESIA",
    //      "thumbnail": "https://www.blitzmegaplex.com/uploads/movie/pictures/MOV1825.JPG",
    //      "synopsis": "https://www.blitzmegaplex.com/uploads/movie/synopsis/MOV1825.TXT"
    //  }
    //]
    BlitzAPI.Movies()
    .success(function (data, status, headers, config) {
        BookingState.movielist = data;
    })
    .error(function (data) {
        toastr.error(data);
    });

}]);

angular
.module("TicketBooking")
.controller("SelectSeat",
["$scope", "$location", "Settings", "BlitzAPI", "BookingState",
function ($scope, $location, Settings, BlitzAPI, BookingState) {

    if (BookingState.selectedaudi == null) {
        BookingState.reset();
        $location.path("/");
    }

    //{
    //    "cinema": "0200",
    //    "audi": "2A",
    //    "width": 18,
    //    "height": 5,
    //    "auditype": "Y",
    //    "seats": [
    //        { "code": "A1", "cx": 0, "cy": 0 }, 
    //        { "code": "C16", "cx": 17, "cy": 4 }
    //    ]
    //}
    BlitzAPI.SeatLayout(BookingState.selectedcinema.code, BookingState.selectedaudi)
    .success(function (data, status, headers, config) {
        $scope.SeatLayout = data;
    })
    .error(function (data) {
        toastr.error(data);
    });

}]);
