"use strict";

angular
.module("TicketBooking", ["ngRoute", "ngAnimate", "Globals", "APIWrappers", "ui.bootstrap"]);

angular
.module("TicketBooking")
.value("localStorage", window.localStorage);

angular
.module("TicketBooking")
.filter("formatdate", [function () {
    var result = function (date, formatstring) {
        if (date === null) {
            return "";
        }
        if (formatstring === null) {
            formatstring = "DD-MMM-YYYY";
        }
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
.directive("notification", [
    "$timeout",
    function ($timeout) {
        var drctve = {
            restrict: "A",
            template: '<alert ng-repeat="alert in messages"' +
                ' type="alert.type" ' +
                ' close="closeAlert(alert)"' +
                ' class="myanim"' +
                '>' +
                '{{alert.msg}}' +
                '</alert>',
            link: function (scope, element, attributes) {
                scope.messages = [];
                scope.$on("notifyError", function (s, arg) {
                    var msg = {
                        type: "danger",
                        msg: arg
                    };
                    scope.messages.push(msg);
                    $timeout(function () {
                        scope.closeAlert(msg);
                    }, 10000);
                });
                scope.closeAlert = function (alert) {
                    var idx = scope.messages.indexOf(alert);
                    if (idx != -1) {
                        scope.messages.splice(idx, 1);
                    };
                };
            }
        };
        return drctve;
    }
]);

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
            me.selectedshowdate === null &&
            me.selectedcinema === null &&
            me.selectedmovie === null &&
            me.selectedshow === null &&
            me.selectedaudi === null &&
            me.selectedseats === null
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

    $scope.filtercities = function () {
        var cities = _.chain(BookingState.cinemalist).countBy(function (c) { return c.city }).pairs();
        BookingState.citylist = cities.map(function (c) { return c[0] }).sort().value();
    }

    $scope.changecity = function (c) {
        if (BookingState.selectedcity !== null
                && BookingState.selectedcity === c) {
            return;
        }

        BookingState.selectedcinema = null;
        BookingState.selectedmovie = null;
        BookingState.selectedshow = null;
        BookingState.selectedaudi = null;

        BookingState.selectedcity = c;

        $scope.filtercinemas();
        $scope.filtermovies();
        $scope.filtershows();
    }

    $scope.filtercinemas = function () {
        $scope.availablecinemas = _.where(BookingState.cinemalist, {
            city: BookingState.selectedcity
        });
        if (BookingState.selectedcinema === null && $scope.availablecinemas.length == 1) {
            $scope.changecinema($scope.availablecinemas[0]);
        }
    }

    $scope.changecinema = function (c) {
        if (BookingState.selectedcinema !== null
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
        if (BookingState.selectedmovie !== null
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
        if (BookingState.selectedshow !== null
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
            $scope.$broadcast("notifyError", data);
        });
    }

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
        BlitzAPI.Schedules(selecteddate)
        .success(function (data, status, headers, config) {
            _.each(data, function (d) {
                d.realdatetime = BookingState.realdatetime(d.showdate, d.showtime);
                d.auditypedesc = auditypes[d.auditype];
                d.timeformataudiprice = d.showtime + " "
                    + d.movieformat + " "
                    + d.auditypedesc + " "
                    + numeral(d.price).format("0,0");
            });

            BookingState.showlist = data;

            $scope.filtermovies();
            $scope.filtershows();
        })
        .error(function (data) {
            $scope.$broadcast("notifyError", data);
        });
    }

    $scope.gotoselectseat = function () {
        $location.path("/seats");
    }

    $scope.getcinemas = function () {
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

            $scope.filtercities();

            if (BookingState.selectedcity === null) {
                var cities = _.chain(BookingState.cinemalist).countBy(function (c) { return c.city }).pairs();
                var topcity = cities.sortBy(function (c) { return -c[1] })
                    .first().value()[0];
                $scope.changecity(topcity);
            }
        })
        .error(function (data) {
            $scope.$broadcast("notifyError", data);
        });
    }

    $scope.getmovies = function () {
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
            $scope.$broadcast("notifyError", data);
        });
    }

    $scope.resetselection = function () {
        BookingState.reset();
        $scope.getcinemas();
        $scope.getmovies();
    }

    if (BookingState.cinemalist === null) {
        $scope.getcinemas();
    }

    if (BookingState.movielist === null) {
        $scope.getmovies();
    }

    if (BookingState.selectedcity !== null) {
        $scope.filtercinemas();
    }

    if (BookingState.selectedcinema !== null) {
        $scope.filtermovies();
    }

    if (BookingState.selectedmovie !== null) {
        $scope.filtershows();
    }

    if (BookingState.selectedshowdate === null) {
        BookingState.selectedshowdate = moment(BookingState.bndate(moment())).format("YYYY-MM-DD");
        $scope.ShowDateChanged();
    }

}]);

angular
.module("TicketBooking")
.controller("SelectSeat",
["$scope", "$location", "$q", "Settings", "BlitzAPI", "BookingState",
function ($scope, $location, $q, Settings, BlitzAPI, BookingState) {

    if (BookingState.selectedaudi === null) {
        BookingState.reset();
        $location.path("/");
    }

    $scope.State = BookingState;

    $q.all([
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
        BlitzAPI.SeatLayout(
            BookingState.selectedshow.cinema,
            BookingState.selectedaudi
        )
    ])
    .then(function (responses) {
        $scope.SeatLayout = responses[0].data;
        $scope.SeatLayout.width *= 100;
        $scope.SeatLayout.height *= 100;
        _.each($scope.SeatLayout.seats, function (seat, i, l) {
            seat.selected = false;
            seat.cx *= 100;
            seat.cy *= 100;
        });
        $scope.marktakenseats();
    });

    $scope.marktakenseats = function () {
        //["D17", "D18"]
        BlitzAPI.SeatTaken(
            BookingState.selectedshow.cinema,
            BookingState.selectedshow.movie,
            BookingState.selectedshow.showdate,
            BookingState.selectedaudi,
            BookingState.selectedshow.showtime
        )
        .success(function (data, status, headers, config) {
            _.each($scope.SeatLayout.seats, function (seat, i, l) {
                if (_(data).contains(seat.code)) {
                    seat.taken = true;
                } else {
                    seat.taken = false;
                };
            });
        })
        .error(function (data) {
            $scope.$broadcast("notifyError", data);
        });
    };

    $scope.clickseat = function (seat) {
        if (seat.taken) {
            return;
        }
        if (seat.selected === null) {
            seat.selected = true;
        } else {
            seat.selected = !seat.selected;
        }
    };

    $scope.gotoselectshow = function () {
        $location.path("/");
    };

    $scope.resetselection = function () {
        _.each($scope.SeatLayout.seats, function (seat, i, l) {
            seat.selected = false;
        });
    };

    $scope.reserveseats = function () {
        var selectedseats = _.where($scope.SeatLayout.seats, { selected: true });
        if (selectedseats.length < 1) {
            $scope.$broadcast("notifyError", "Please select some seats first.");
            return;
        }
        var gap = $scope.checkgap();
        if (gap) {
            var msg = "Seat " + gap + ": please do not leave one seat gap.";
            $scope.$broadcast("notifyError", msg);
            return;
        };
    };

    $scope.checkgap = function () {
        var selectedseats = _.where($scope.SeatLayout.seats, { selected: true });
        var seatsbyrow = _.chain(selectedseats).groupBy("cy").pairs().value();
        for (var i = 0; i < seatsbyrow.length; i++) {
            var grp = seatsbyrow[i];
            var row = parseInt(grp[0]);
            var seats = grp[1];
            for (var j = 0; j < seats.length; j++) {
                var seat = seats[j];

                var lft = _.findWhere($scope.SeatLayout.seats, { cy: row, cx: seat.cx - 100 });
                while (lft !== undefined && lft.selected) {
                    lft = _.findWhere($scope.SeatLayout.seats, { cy: row, cx: lft.cx - 100 });
                };
                var farlft = lft === undefined ?
                    undefined :
                    _.findWhere($scope.SeatLayout.seats, { cy: row, cx: lft.cx - 100 });

                var rgt = _.findWhere($scope.SeatLayout.seats, { cy: row, cx: seat.cx + 100 });
                while (rgt !== undefined && rgt.selected) {
                    rgt = _.findWhere($scope.SeatLayout.seats, { cy: row, cx: rgt.cx + 100 });
                };
                var farrgt = rgt === undefined ?
                    undefined :
                    _.findWhere($scope.SeatLayout.seats, { cy: row, cx: rgt.cx + 100 });

                if (
                        lft !== undefined && !lft.taken && !lft.selected &&
                        rgt !== undefined && !rgt.taken && !rgt.selected
                ) {
                    if (
                            farlft === undefined ||
                            farlft !== undefined && farlft.taken
                    ) {
                        return lft.code;
                    } else if (
                            farrgt === undefined ||
                            farrgt !== undefined && farrgt.taken
                    ) {
                        return rgt.code;
                    };
                };
            };
        };
        return null;
    };

}]);
