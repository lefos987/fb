(function (Calendar) {

    'use strict';

    Calendar.Event = function (params) {

        params = params || {};

        this.startTime = params.startTime || null;
        this.endTime = params.endTime || null;
        this.title = params.title || 'Sample Item';
        this.location = params.location || 'Sample Location';
    };

    return Calendar;

})(Calendar || {});