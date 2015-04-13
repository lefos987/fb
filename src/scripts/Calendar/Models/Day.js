(function (Calendar) {

    'use strict';

    Calendar.Day = function (params) {

        params = params || {};
        this.startHour = params.startHour || null;
        this.endHour = params.endHour || null;
        this.hourIntervals = params.hourIntervals || null;
    };

    /**
     * Method to generate the list of Time objects for this Day
     * @returns {Array}
     */
    Calendar.Day.prototype.getTimes = function () {
        var times = [],
            dayDuration = (this.endHour - this.startHour) * 60,
            start = this.startHour,
            step = 60 / this.hourIntervals;

        for (var i=0; i<= dayDuration; i+= step) {
            var time = new Calendar.Time();
            if (i % 60 === 0) {
                start = (i === 0) ? start : (start + 1);
                time.parseHourMinutes(start * 100);
                time.isFullHour = true;
            }
            else if (i % 60 > 0) {
                time.parseHourMinutes((start * 100) + (i % 60));
                time.isFullHour = false;
            }
            times.push(time);
        }
        return times;

    };

    return Calendar;

})(Calendar || {});