var Calendar = (function () {

    'use strict';

    /**
     * Method to get the available times for this day
     * @param start {int} - the first hour of the day
     * @param end {int} - the last hour of the day
     * @param intervals {int} - number of intervals per hour
     */
    function calculateTimes (start, end, intervals) {
        var day = new Calendar.Day({
            startHour: start,
            endHour: end,
            hourIntervals: intervals
        });
        return day.getTimes();
    }

    /**
     * Method to create Event objects from the arguments
     * @param events {array} - an array of objects with start and end time
     * @returns {Array|*}
     */
    function constructEvents (events) {
        return events.map(function (event) {
            return new Calendar.Event(event);
        });
    }

    function _resetEvents (eventsContainer) {
        eventsContainer.innerHTML = '';
    }

    /**
     * Method to draw the event elements after resolving any collisions
     * @param events {array} - an array of Event objects
     * @param parentId {int} - the id of the parent element where we want to append the event elements
     */
    function drawEvents (events, parentId) {
        var parent = document.getElementById(parentId),
            computedStyle = window.getComputedStyle(parent, null),
            w = parseInt(computedStyle.getPropertyValue('width'), 10),
            pl = parseInt(computedStyle.getPropertyValue('padding-left'), 10),
            pr = parseInt(computedStyle.getPropertyValue('padding-right'), 10);

        _resetEvents(parent);

        var finalEvents = Calendar.CollisionResolver.resolveCollisions(events, w);

        finalEvents.forEach(function (event) {
            var eventElement = Calendar.UIElements.createEventElement(event, w, pl, pr);
            parent.appendChild(eventElement);
        });
    }

    /**
     * Method that draws the list of time elements
     * @param times {array} - the list of Time objects we want to draw
     * @param parentId {int} - the id of the parent element where we want to append the time elements
     * @param hourInterval {int} - the number of intervals per hour
     */
    function drawTimeList (times, parentId, hourInterval) {
        var parent = document.getElementById(parentId);
        times.forEach(function (time, index) {
            var timeElement = Calendar.UIElements.createTimeElement(time, index, hourInterval);
            parent.appendChild(timeElement);
        });
    }


    return {

        calculateTimes: calculateTimes,

        constructEvents: constructEvents,

        drawEvents: drawEvents,

        drawTimeList: drawTimeList
    };

})();
