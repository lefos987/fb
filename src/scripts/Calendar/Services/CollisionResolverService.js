(function (Calendar) {

    'use strict';

    /**
     * Method to calculate the dimensions of each Event
     * @param columns {array} - a collection of columns that store the Events
     * @param w {int} - the width of the parent container
     * @private
     */
    function _calculateEventDimensions (columns, w) {

        var columnsLength = columns.length;

        columns.forEach(function (column, columnIndex) {

            column.forEach(function (event) {

                var colSpan = _expandEvent(event, columnIndex, columns);
                event.startPosition = (columnIndex / columnsLength) * w;
                event.width = w * colSpan / columnsLength;
            });
        });
    }

    /**
     * Method to calculate the max number of columns an event
     * can expand to
     * @param event - an Event object
     * @param columnIndex - the column that the current Event belongs to
     * @param columns - the collection of columns that hold all the Event objects
     * @returns {number}
     * @private
     */
    function _expandEvent (event, columnIndex, columns) {
        var colSpan = 1;

        for (var i = columnIndex + 1; i < columns.length; i++) {

            var col = columns[i];

            for (var j= 0; j < col.length; j++) {

                var e = col[j];
                if (_haveCollision(event, e)) {
                    return colSpan;
                }
            }
            colSpan ++;
        }

        return colSpan;

    }

    /**
     * Method to check if two events have time collision
     * @param eventOne - first Event object to check
     * @param eventTwo - second Event object to check
     * @returns {boolean}
     * @private
     */
    function _haveCollision (eventOne, eventTwo) {
        return eventOne.endTime > eventTwo.startTime &&
            eventOne.startTime < eventTwo.endTime;
    }

    /**
     * Method to sort the events by start time and end time
     * @param events {array} - a list of Event objects
     * @returns {array}
     * @private
     */
    function _sortEvents (events) {
        return events.sort(function (a, b) {
            if (a.startTime < b.startTime) {
                return -1;
            }
            if (a.startTime > b.startTime) {
                return 1;
            }
            if (a.endTime < b.endTime) {
                return -1;
            }
            if (a.endTime > b.endTime) {
                return 1;
            }
            return 0;
        });

    }

    /**
     * Method to resolve any time collisions for a list of events
     * 1. We sort the events by start time and then by end time
     * 2. Initially we add an event to a column
     * 3. If the next event starts after the first one has finished
     *    we reset the columns and calculate the event dimensions
     * 4. If not we check if the event conflicts with the previously added one.
     *    If it does we create an extra column for the event. If not then we just add
     *    it to the same column as previous one
     * 5. After we assign the events in columns we calculate the dimensions of each event
     *    We make sure to allow for events to expand to the maximum possible width
     * @param calendarEvents {array} - a list of Event objects
     * @param w {int} - the width of the parent container
     * @returns {*}
     */
    function resolveCollisions (calendarEvents, w) {

        var columns = [],
            endOfLastAddedEvent = null,
            sortedEvents = _sortEvents(calendarEvents);

        sortedEvents.forEach(function (event) {

            var isPlaced = false;

            if (endOfLastAddedEvent !== null && event.startTime >= endOfLastAddedEvent) {
                _calculateEventDimensions(columns, w);
                columns = [];
                endOfLastAddedEvent = null;
            }

            columns.some(function (column) {
                var lastEventInColumn =  column[column.length - 1];
                if (!_haveCollision(lastEventInColumn, event)) {
                    isPlaced = true;
                    column.push(event);
                }
                return !!isPlaced;

            });

            if (!isPlaced) {
                columns.push([event]);
            }

            if (endOfLastAddedEvent === null || event.endTime > endOfLastAddedEvent) {
                endOfLastAddedEvent = event.endTime;
            }

        });

        if (columns.length > 0) {
            _calculateEventDimensions(columns, w);
        }

        return sortedEvents;

    }

    Calendar.CollisionResolver = {

        resolveCollisions: resolveCollisions

    };

})(Calendar || {});