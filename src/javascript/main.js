require("jquery.cookie");
var $ = require("jquery");

var DATE_SEPARATOR = "/";
var RELEASE_DATE_YEAR = 2014;
var RELEASE_DATE_MONTH = 8;
var RELEASE_DATE_DAY = 22;
var RELEASE_DATE_HOUR = 0;
var RELEASE_DATE_MINUTE = 0;

var DECIMAL_PRECISION_MINUTES = 1;
var DECIMAL_PRECISION_HOURS = 2;
var DECIMAL_PRECISION_DAYS = 3;

var UPDATE_INTERVAL_MILLISECONDS = 100;
var UPDATE_INTERVAL_SECONDS = 1000;
var UPDATE_INTERVAL_MINUTES = (UPDATE_INTERVAL_SECONDS * 60) / Math.pow(10, DECIMAL_PRECISION_MINUTES);
var UPDATE_INTERVAL_HOURS = (UPDATE_INTERVAL_MINUTES * 60) / Math.pow(10, DECIMAL_PRECISION_HOURS);
var UPDATE_INTERVAL_DAYS = (UPDATE_INTERVAL_HOURS * 24) / Math.pow(10, DECIMAL_PRECISION_DAYS);

var MILLISECONDS_IN_A_SECOND = 1000;
var SECONDS_IN_A_MINUTE = 60;
var MINUTES_IN_AN_HOUR = 60;
var HOURS_IN_A_DAY = 24;

var COOKIE_EXPIRATION_DAYS = 365;

var releaseDate;
var lastVisitDate;

var initialize = function () {
    releaseDate = getReleaseDate();
    lastVisitDate = getLastVisitDate();

    showReleaseDate();

    showRemainingTimeInMilliseconds();
    showRemainingTimeInSeconds();
    showRemainingTimeInMinutes();
    showRemainingTimeInHours();
    showRemainingTimeInDays();

    updateRemainingTimeInMilliseconds();
    updateRemainingTimeInSeconds();
    updateRemainingTimeInMinutes();
    updateRemainingTimeInHours();
    updateRemainingTimeInDays();

    if (lastVisitDate !== null) {
        showTimePassedSinceLastVisitInMilliseconds();
        showTimePassedSinceLastVisitInSeconds();
        showTimePassedSinceLastVisitInMinutes();
        showTimePassedSinceLastVisitInHours();
        showTimePassedSinceLastVisitInDays();

        updateTimePassedSinceLastVisitInMilliseconds();
        updateTimePassedSinceLastVisitInSeconds();
        updateTimePassedSinceLastVisitInMinutes();
        updateTimePassedSinceLastVisitInHours();
        updateTimePassedSinceLastVisitInDays();

        $('#time-since-last-visit').show();
    }

    saveCookie();
};

var getReleaseDate = function () {
    return new Date(Date.UTC(
        RELEASE_DATE_YEAR,
        RELEASE_DATE_MONTH,
        RELEASE_DATE_DAY,
        RELEASE_DATE_HOUR,
        RELEASE_DATE_MINUTE
    ));
};

var getReleaseDateFormatted = function () {
    return releaseDate.getDate() +
        DATE_SEPARATOR +
        (releaseDate.getMonth() + 1) +
        DATE_SEPARATOR +
        releaseDate.getFullYear();
};

var getLastVisitDate = function() {
    var lastVisitTimestamp = $.cookie("lastVisit");

    if (typeof lastVisitTimestamp == "undefined") {
        return null;
    }
    else {
        return new Date(parseInt(lastVisitTimestamp));
    }
};

var saveCookie = function() {
    $.cookie("lastVisit", new Date().getTime(), {
        expires: COOKIE_EXPIRATION_DAYS
    });
};

var getRemainingTimeInMilliseconds = function () {
    return releaseDate - new Date().getTime();
};

var getRemainingTimeInSeconds = function () {
    return getRemainingTimeInMilliseconds() / MILLISECONDS_IN_A_SECOND;
};

var getRemainingTimeInMinutes = function () {
    return getRemainingTimeInSeconds() / SECONDS_IN_A_MINUTE;
};

var getRemainingTimeInHours = function () {
    return getRemainingTimeInMinutes() / MINUTES_IN_AN_HOUR;
};

var getRemainingTimeInDays = function () {
    return getRemainingTimeInHours() / HOURS_IN_A_DAY;
};

var getTimePassedSinceLastVisitInMilliseconds = function () {
    return new Date().getTime() - lastVisitDate;
};

var getTimePassedSinceLastVisitInSeconds = function () {
    return getTimePassedSinceLastVisitInMilliseconds() / 1000;
};

var getTimePassedSinceLastVisitInMinutes = function () {
    return getTimePassedSinceLastVisitInSeconds() / 60;
};

var getTimePassedSinceLastVisitInHours = function () {
    return getTimePassedSinceLastVisitInMinutes() / 60;
};

var getTimePassedSinceLastVisitInDays = function () {
    return getTimePassedSinceLastVisitInHours() / 24;
};

var showReleaseDate = function () {
    $("#date-of-release").text(getReleaseDateFormatted());
};

var showRemainingTimeInMilliseconds = function () {
    $("#time-remaining-in-milliseconds").text(getRemainingTimeInMilliseconds());
};

var showRemainingTimeInSeconds = function () {
    $("#time-remaining-in-seconds").text(Math.round(getRemainingTimeInSeconds()));
};

var showRemainingTimeInMinutes = function () {
    $("#time-remaining-in-minutes").text(
            Math.round(
                    getRemainingTimeInMinutes() * Math.pow(10, DECIMAL_PRECISION_MINUTES)
            ) / Math.pow(10, DECIMAL_PRECISION_MINUTES)
    );
};

var showRemainingTimeInHours = function () {
    $("#time-remaining-in-hours").text(
            Math.round(
                    getRemainingTimeInHours() * Math.pow(10, DECIMAL_PRECISION_HOURS)
            ) / Math.pow(10, DECIMAL_PRECISION_HOURS)
    );
};

var showRemainingTimeInDays = function () {
    $("#time-remaining-in-days").text(
            Math.round(
                    getRemainingTimeInDays() * Math.pow(10, DECIMAL_PRECISION_DAYS)
            ) / Math.pow(10, DECIMAL_PRECISION_DAYS)
    );
};

var showTimePassedSinceLastVisitInMilliseconds = function() {
    $("#time-since-last-visit-in-milliseconds").text(getTimePassedSinceLastVisitInMilliseconds());
};

var showTimePassedSinceLastVisitInSeconds = function () {
    $("#time-since-last-visit-in-seconds").text(Math.round(getTimePassedSinceLastVisitInSeconds()));
};

var showTimePassedSinceLastVisitInMinutes = function () {
    $("#time-since-last-visit-in-minutes").text(
            Math.round(
                    getTimePassedSinceLastVisitInMinutes() * Math.pow(10, DECIMAL_PRECISION_MINUTES)
            ) / Math.pow(10, DECIMAL_PRECISION_MINUTES)
    );
};

var showTimePassedSinceLastVisitInHours = function () {
    $("#time-since-last-visit-in-hours").text(
            Math.round(
                    getTimePassedSinceLastVisitInHours() * Math.pow(10, DECIMAL_PRECISION_HOURS)
            ) / Math.pow(10, DECIMAL_PRECISION_HOURS)
    );
};

var showTimePassedSinceLastVisitInDays = function () {
    $("#time-since-last-visit-in-days").text(
            Math.round(
                    getTimePassedSinceLastVisitInDays() * Math.pow(10, DECIMAL_PRECISION_DAYS)
            ) / Math.pow(10, DECIMAL_PRECISION_DAYS)
    );
};

var updateRemainingTimeInMilliseconds = function () {
    setInterval(function () {
        showRemainingTimeInMilliseconds();
    }, UPDATE_INTERVAL_MILLISECONDS);
};

var updateRemainingTimeInSeconds = function () {
    setInterval(function () {
        showRemainingTimeInSeconds();
    }, UPDATE_INTERVAL_SECONDS);
};

var updateRemainingTimeInMinutes = function () {
    setInterval(function () {
        showRemainingTimeInMinutes();
    }, UPDATE_INTERVAL_MINUTES);
};

var updateRemainingTimeInHours = function () {
    setInterval(function () {
        showRemainingTimeInHours();
    }, UPDATE_INTERVAL_HOURS);
};

var updateRemainingTimeInDays = function () {
    setInterval(function () {
        showRemainingTimeInDays();
    }, UPDATE_INTERVAL_DAYS);
};

var updateTimePassedSinceLastVisitInMilliseconds = function () {
    setInterval(function () {
        showTimePassedSinceLastVisitInMilliseconds();
    }, UPDATE_INTERVAL_MILLISECONDS);
};

var updateTimePassedSinceLastVisitInSeconds = function () {
    setInterval(function () {
        showTimePassedSinceLastVisitInSeconds();
    }, UPDATE_INTERVAL_SECONDS);
};

var updateTimePassedSinceLastVisitInMinutes = function () {
    setInterval(function () {
        showTimePassedSinceLastVisitInMinutes();
    }, UPDATE_INTERVAL_MINUTES);
};

var updateTimePassedSinceLastVisitInHours = function () {
    setInterval(function () {
        showTimePassedSinceLastVisitInHours();
    }, UPDATE_INTERVAL_HOURS);
};

var updateTimePassedSinceLastVisitInDays = function () {
    setInterval(function () {
        showTimePassedSinceLastVisitInDays();
    }, UPDATE_INTERVAL_DAYS);
};

$(function () {
    initialize();
});