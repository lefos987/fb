(function (Calendar) {

    'use strict';

    Calendar.Event = function (params) {

        params = params || {};

        this.start = params.start || 0;
        this.end = params.end || 0;
        this.startPosition = params.startPosition || 0;
        this.width = params.width || 0;
        this.title = params.title || 'Sample Item';
        this.location = params.location || 'Sample Location';
    };

    return Calendar;

})(Calendar || {});