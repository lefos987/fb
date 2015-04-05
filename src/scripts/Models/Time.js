var CalendarTime = (function () {

    'use strict';

    function CalendarTime (params) {

        params = params || {};
        this.hours = params.hours || null;
        this.minutes = params.minutes || null;
        this.ampm = params.ampm || null;
        this.isFullHour = params.isFullHour || null;
    }

    CalendarTime.prototype.parseHourMinutes = function (data) {

        var time = data.toString(),
            index = time.length - 2;

        this.hours = time.substring(0, index);
        this.minutes = time.substring(index);
        this.ampm = (this.hours >= 12) ? 'PM' : 'AM';
    };

    return CalendarTime;
})();