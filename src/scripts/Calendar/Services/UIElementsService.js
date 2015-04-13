(function (Calendar) {

    'use strict';

    var _eventElement = '' +
        '<div class="event-info">' +
            '<h2 class="event-title"></h2>' +
            '<h4 class="event-location"></h4>' +
        '</div>';

    /**
     * Method to create an Event Dom element
     * The top position of each event is easily calculated by the start time of it
     * The height of each Event is also easily calculated by the Event's duration
     * The left and right position though is calculated after we resolve any time
     * collisions in order to define exactly where the event will start in the horizontal
     * axis and how wide it can be, depending on how many events are in progress during
     * the same time
     * @param event {obj} - an Event obj
     * @param w {int} - the width of the parent container
     * @param pl {int} - the left padding of the parent container
     * @param pr {int} - the right padding of the parent container
     * @returns {Element}
     */
    function createEventElement (event, w, pl, pr) {

        var eventContainer = document.createElement('div');

        eventContainer.classList.add('event');
        eventContainer.innerHTML = _eventElement;
        eventContainer.style.top = event.start + 'px';
        eventContainer.style.left = event.startPosition + pl + 'px';
        eventContainer.style.right = (w - event.startPosition - event.width) + pr + 'px';
        eventContainer.style.height = (event.end - event.start) + 'px';

        var eventTitle = eventContainer.getElementsByClassName('event-title')[0],
            eventLocation = eventContainer.getElementsByClassName('event-location')[0];

        eventTitle.innerHTML = event.title;
        eventLocation.innerHTML = event.location;

        return eventContainer;
    }

    /**
     * Method to create the DOM element for a specific time
     * @param time {obj} - the Time object that we want to create
     * @param index {int} - the index of this Time object in the times list
     * @param hourInterval {int} - the number of intervals per hour
     * @returns {Element}
     */
    function createTimeElement (time, index, hourInterval) {

        var intervalDuration = 60 / hourInterval,
            timeContainer = document.createElement('li'),
            timeValue = document.createElement('p'),
            ampm = document.createElement('span');

        timeContainer.classList.add('time-interval');
        timeContainer.style.top = (index * intervalDuration) + 'px';

        timeValue.classList.add('time');
        timeValue.innerHTML = time.format();

        ampm.innerHTML = time.ampm;
        ampm.classList.add('ampm');

        if(time.isFullHour) {
            timeValue.classList.add('full-hour');
            timeValue.appendChild(ampm);
        }

        timeContainer.appendChild(timeValue);

        return timeContainer;

    }

    Calendar.UIElements = {

        createEventElement: createEventElement,

        createTimeElement: createTimeElement

    };

})(Calendar || {});