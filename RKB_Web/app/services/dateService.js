

(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.factory("dateService", function () {
        var days = [];
        for (var i = 1; i <= 31; i++) {
            if (i < 10)
                days.push("0" + i);
            else
                days.push(i.toString());
        };
        var months = [];
        for (var i = 1; i <= 12; i++) {
            if (i < 10)
                months.push("0" + i);
            else
                months.push(i.toString());
        };
        var currentYear = new Date().getFullYear();
        var years = [];
        for (var i = 1950; i <= currentYear; i++) {
            years.push(i.toString());
        };
        var day = "01";
        var month = "01";
        var year = currentYear.toString();
        return {
            days: days,
            months: months,
            years: years,
            day: day,
            month: month,
            year: year
        };
            
    });
}());