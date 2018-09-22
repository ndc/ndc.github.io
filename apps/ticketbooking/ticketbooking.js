"use strict";

angular
.module("TicketBooking", ["ngRoute", "ngAnimate", "ngSanitize", "Globals", "APIWrappers", "ui.bootstrap"]);

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
["$scope", "$location", "$q", "$modal", "Settings", "BlitzAPI", "BookingState",
function ($scope, $location, $q, $modal, Settings, BlitzAPI, BookingState) {

    $scope.State = BookingState;

    $scope.isprocessing = false;

    $scope.getCinemas = function () {
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
        return BlitzAPI.Cinemas()
            .then(
                function (response) {
                    BookingState.cinemalist = response.data;

                    // populate city list

                    var cities = _.chain(BookingState.cinemalist).countBy(function (c) { return c.city }).pairs();
                    BookingState.citylist = cities.map(function (c) { return c[0] }).sort().value();
                },
                function (response) {
                    $scope.$broadcast("notifyError", response.data);
                }
            );
    };

    $scope.getMovies = function () {
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
        return BlitzAPI.Movies()
            .then(
                function (response) {
                    BookingState.movielist = response.data;
                },
                function (response) {
                    $scope.$broadcast("notifyError", response.data);
                }
            );
    };

    $scope.getSchedules = function (selecteddate) {
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
        return BlitzAPI.Schedules(selecteddate)
            .then(
                function (response) {
                    var auditypes = {
                        "N": "Regular",
                        "Y": "Satin",
                        "V": "Velvet",
                        "O": "Velvet Suite",
                        "D": "Dining"
                    };

                    _.each(response.data, function (d) {
                        d.realdatetime = BookingState.realdatetime(d.showdate, d.showtime);
                        d.auditypedesc = auditypes[d.auditype];
                        d.timeformataudiprice = d.showtime + " "
                            + d.movieformat + " "
                            + d.auditypedesc + " "
                            + numeral(d.price).format("0,0");
                    });

                    BookingState.showlist = response.data;
                },
                function (response) {
                    $scope.$broadcast("notifyError", response.data);
                }
            );
    };

    $scope.filterCinemas = function () {
        $scope.availablecinemas = _.where(BookingState.cinemalist, {
            city: BookingState.selectedcity
        });
    };

    $scope.filterMovies = function () {
        $scope.availablemovies = _.chain(BookingState.showlist)
            .where({
                cinema: BookingState.selectedcinema ? BookingState.selectedcinema.code : null
            })
            .countBy(function (s) { return s.movie; })
            .pairs()
            .map(function (s) {
                return [
                    _.findWhere(BookingState.movielist, { code: s[0] }),
                    s[1]
                ];
            })
            .sortBy(function (a) { return a[0].title; })
            .sortBy(function (a) { return -a[1]; })
            .map(function (a) { return a[0]; })
            .value();
    };

    $scope.filterShows = function () {
        $scope.availableshows = _.chain(BookingState.showlist)
            .where({
                cinema: BookingState.selectedcinema ? BookingState.selectedcinema.code : null,
                movie: BookingState.selectedmovie ? BookingState.selectedmovie.code : null
            })
            .filter(function (s) {
                return (moment(s.realdatetime) >= moment());
            })
            .value();
    };

    $scope.getTopCity = function () {
        var cities = _.chain(BookingState.cinemalist).countBy(function (c) { return c.city }).pairs();
        var topcity = cities.sortBy(function (c) { return -c[1] }).first().value()[0];
        return topcity;
    };

    // these are event handlers

    $scope.changeCity = function (c) {
        if (BookingState.selectedcity !== null
                && BookingState.selectedcity === c) {
            return;
        };

        BookingState.selectedcinema = null;
        BookingState.selectedmovie = null;
        BookingState.selectedshow = null;
        BookingState.selectedaudi = null;

        BookingState.selectedcity = c;

        $scope.filterCinemas();

        if ($scope.availablecinemas.length == 1) {
            $scope.changeCinema($scope.availablecinemas[0]);
        } else {
            $scope.filterMovies();
            $scope.filterShows();
        };
    };

    $scope.changeCinema = function (c) {
        if (BookingState.selectedcinema !== null
                && BookingState.selectedcinema.code == c.code) {
            return;
        };

        BookingState.selectedmovie = null;
        BookingState.selectedshow = null;
        BookingState.selectedaudi = null;

        BookingState.selectedcinema = c;

        $scope.filterMovies();
        $scope.filterShows();
    };

    $scope.changeMovie = function (m) {
        if (BookingState.selectedmovie !== null
                && BookingState.selectedmovie.code == m.code) {
            return;
        };

        BookingState.selectedshow = null;
        BookingState.selectedaudi = null;

        BookingState.selectedmovie = m;

        $scope.filterShows();
    };

    $scope.changeShow = function (s) {
        if (BookingState.selectedshow !== null
                && BookingState.selectedshow.timeformataudiprice == s.timeformataudiprice) {
            return;
        };

        BookingState.selectedaudi = null;

        BookingState.selectedshow = s;

        $scope.isprocessing = true;

        BlitzAPI.AudiNo(s.cinema, s.movie, s.showdate, s.auditype, s.showtime, s.movieformat)
        .then(
            function (response) {
                BookingState.selectedaudi = response.data;
            },
            function (response) {
                $scope.$broadcast("notifyError", response.data);
            }
        )
        .then(function () {
            $scope.isprocessing = false;
        });
    };

    $scope.changeShowDate = function () {
        BookingState.selectedmovie = null;
        BookingState.selectedshow = null;
        BookingState.selectedaudi = null;

        var selecteddate = moment(BookingState.selectedshowdate).format("YYYY-MM-DD");

        $scope.isprocessing = true;

        $scope.getSchedules(selecteddate)
            .then(function () {
                $scope.filterMovies();
                $scope.filterShows();
            })
            .then(function () {
                $scope.isprocessing = false;
            });
    };

    $scope.goToSelectSeat = function () {
        $location.path("/seats");
    };

    $scope.resetSelection = function () {
        BookingState.reset();

        $scope.isprocessing = true;

        $q.all([
            $scope.getCinemas(),
            $scope.getMovies()
        ])
        .then(function () {
            $scope.changeCity($scope.getTopCity());
        })
        .then(function () {
            $scope.isprocessing = false;
        });
    };

    $scope.openMovieDetail = function (movie) {
        $modal.open({
            templateUrl: "MyModalContent.html",
            controller: ["$scope", "$modalInstance", "items", "BlitzAPI", function ($scope, $modalInstance, items, BlitzAPI) {
                $scope.movie = items;
                $scope.close = function () {
                    $modalInstance.close();
                };
                BlitzAPI.MovieSynopsis($scope.movie.code)
                .then(
                    function (response) {
                        $scope.synopsis = response.data.replace(/\n/g, "<br />");
                    },
                    function (response) {
                        $scope.$broadcast("notifyError", response.data);
                    }
                );
            }],
            resolve: {
                items: function () {
                    return movie;
                }
            }
        });
    };

    // this block is to rearrange lists when coming from seat selection

    if (BookingState.selectedcity !== null) {
        $scope.filterCinemas();
    };

    if (BookingState.selectedcinema !== null) {
        $scope.filterMovies();
    };

    if (BookingState.selectedmovie !== null) {
        $scope.filterShows();
    };

    // this block is to populate lists for the first time

    if (
            BookingState.cinemalist === null ||
            BookingState.movielist === null ||
            BookingState.selectedshowdate === null
    ) {
        BookingState.selectedshowdate = moment(BookingState.bndate(moment())).format("YYYY-MM-DD");

        $scope.isprocessing = true;

        $q.all([
            $scope.getCinemas(),
            $scope.getMovies(),
            $scope.getSchedules(BookingState.selectedshowdate)
        ])
        .then(function () {
            $scope.filterMovies();
            $scope.filterShows();
        })
        .then(function () {
            $scope.isprocessing = false;
        });
    };

}]);

angular
.module("TicketBooking")
.controller("SelectSeat",
["$scope", "$location", "$q", "Settings", "BlitzAPI", "BookingState",
function ($scope, $location, $q, Settings, BlitzAPI, BookingState) {

    if (BookingState.selectedaudi === null) {
        BookingState.reset();
        $location.path("/");
        return;
    };

    $scope.State = BookingState;

    $scope.isprocessing = true;

    $scope.getTakenSeats = function () {
        //["D17", "D18"]
        return BlitzAPI.SeatTaken(
            BookingState.selectedshow.cinema,
            BookingState.selectedshow.movie,
            BookingState.selectedshow.showdate,
            BookingState.selectedaudi,
            BookingState.selectedshow.showtime
        );
    };

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
        ),
        $scope.getTakenSeats()
    ])
    .then(
        function (responses) {
            $scope.SeatLayout = responses[0].data;
            $scope.SeatLayout.width *= 100;
            $scope.SeatLayout.height *= 100;
            _.each($scope.SeatLayout.seats, function (seat, i, l) {
                seat.selected = false;
                seat.cx *= 100;
                seat.cy *= 100;
            });
            $scope.marktakenseats(responses[1].data);
        },
        function (responses) {
            _.each(responses, function (response) {
                $scope.$broadcast("notifyError", response.data)
            })
        }
    )
    .then(function () {
        $scope.isprocessing = false;
    });

    $scope.marktakenseats = function (takenseats) {
        _.each($scope.SeatLayout.seats, function (seat, i, l) {
            if (_.contains(takenseats, seat.code)) {
                seat.taken = true;
                seat.selected = false;
            } else {
                seat.taken = false;
            };
        });
    };

    $scope.clickseat = function (seat) {
        if (seat.taken) {
            return;
        };
        seat.selected = !seat.selected;
    };

    $scope.gotoselectshow = function () {
        $location.path("/");
    };

    $scope.resetselection = function () {
        _.each($scope.SeatLayout.seats, function (seat, i, l) {
            seat.selected = false;
        });
    };

    $scope.refreshlayout = function () {
        $scope.isprocessing = true;

        $scope.getTakenSeats()
        .then(
            function (response) {
                $scope.marktakenseats(response.data);
            },
            function (response) {
                $scope.$broadcast("notifyError", response.data)
            }
        )
        .then(function () {
            $scope.isprocessing = false;
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

        $scope.isprocessing = true;

        BlitzAPI.BookSeat(
            BookingState.selectedshow.cinema,
            BookingState.selectedshow.movie,
            BookingState.selectedshow.showdate,
            BookingState.selectedaudi,
            BookingState.selectedshow.showtime,
            selectedseats,
            Settings.PartnerCode
        )
        .then(
            function(response) {
                $scope.$broadcast("notifyError", response.data)
            },
            function(response) {
                $scope.$broadcast("notifyError", response.data)
            }
        )
        .then(function() {
            $scope.isprocessing = false;
        });
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
