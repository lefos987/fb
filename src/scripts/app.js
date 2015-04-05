var Calendar = (function (Day, Event) {

    function calculateTimes (start, end, intervals) {
        var day = new Day({
            startHour: start,
            endHour: end,
            hourIntervals: intervals
        });
        var times = day.getTimes();
        drawTimes(times, 'times', day);
    }

    function constructEvents (events) {
        var lefos = events.map(function (event) {
            return new Event(event);
        });
    }

    function formatTime (time) {
        var hour = (time.hours > 12) ? time.hours % 12 : time.hours;
        return hour + ':' + time.minutes;
    }

    function drawTimes (times, id, day) {
        var parent = document.getElementById(id);
        var height = day.getDuration() / times.length;

        times.forEach(function (time) {
            var li = document.createElement('li'),
                p = document.createElement('p'),
                span = document.createElement('span');

            li.classList.add('time-interval');
            p.classList.add('time');
            li.style.height = height + 'px';

            p.innerHTML = formatTime(time);
            span.innerHTML = time.ampm;

            if (time.isFullHour) {
                p.classList.add('full-hour');
                span.classList.add('ampm');
                p.appendChild(span);
            }
            li.appendChild(p);
            parent.appendChild(li);
        });
    }

    return {
        calculateTimes: calculateTimes,
        constructEvents: constructEvents
    };

})(CalendarDay, CalendarEvent);

function layOutEvents () {

    var DAY_START = 9;
    var DAY_END = 21;
    var HOUR_INTEVALS = 2;

    var events = [
        { startTime: 10, endTime: 25 },
        { startTime: 15, endTime: 45 },
        { startTime: 18, endTime: 65 }
    ];


    // 1. Draw the day layout
    Calendar.calculateTimes(DAY_START, DAY_END, HOUR_INTEVALS);

    // 2. Construct the events
    Calendar.constructEvents(events);
    // 3. Check for conflicts

    // 4. Resolve conflicts

    // 5. Layout the events
}

layOutEvents();