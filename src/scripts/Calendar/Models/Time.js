(function (Calendar) {

    'use strict';

    Calendar.Time = function (params) {

        params = params || {};
        this.hours = params.hours || null;
        this.minutes = params.minutes || null;
        this.ampm = params.ampm || null;
        this.isFullHour = params.isFullHour || null;
    };

    /**
     * Method to format a Time object
     * @returns {string}
     */
    Calendar.Time.prototype.format = function () {
        var hour = (this.hours > 12) ? this.hours % 12 : this.hours;
        return hour + ':' + this.minutes;
    };

    /**
     * Method to get the hours and minutes from a time string
     * and define if it is a PM or AM time
     * @param data
     */
    Calendar.Time.prototype.parseHourMinutes = function (data) {

        var time = data.toString(),
            index = time.length - 2;

        this.hours = time.substring(0, index);
        this.minutes = time.substring(index);
        this.ampm = (this.hours >= 12) ? 'PM' : 'AM';
    };

    return Calendar;

})(Calendar || {});