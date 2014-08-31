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

var releaseDate;

var initialize = function () {
    releaseDate = getReleaseDate();

    $("#date-of-release").text(getReleaseDateFormatted());

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

var getRemainingTimeInMilliseconds = function () {
    return releaseDate - new Date().getTime();
};

var getRemainingTimeInSeconds = function () {
    return getRemainingTimeInMilliseconds() / 1000;
};

var getRemainingTimeInMinutes = function () {
    return getRemainingTimeInSeconds() / 60;
};

var getRemainingTimeInHours = function () {
    return getRemainingTimeInMinutes() / 60;
};

var getRemainingTimeInDays = function () {
    return getRemainingTimeInHours() / 24;
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

$(function () {
    initialize();
});