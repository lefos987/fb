var Calendar = (function () {

    function constructEvents (events) {
        return events.map(function (event) {
            return new Calendar.Event(event);
        });
    }

    function calculateTimes (start, end, intervals) {
        var day = new Calendar.Day({
            startHour: start,
            endHour: end,
            hourIntervals: intervals
        });
        var times = day.getTimes();
        drawTimes(times, 'times', day);
    }

    function checkForConflicts (events) {

    }

    function drawTimes (times, id, day) {
        var parent = document.getElementById(id);
        var height = day.getDuration() / times.length;

        times.forEach(function (time, index) {
            var li = document.createElement('li'),
                p = document.createElement('p'),
                span = document.createElement('span');

            li.classList.add('time-interval');
            p.classList.add('time');
            li.style.top = (index * 30) + 'px';
            p.innerHTML = time.format();
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

})();
