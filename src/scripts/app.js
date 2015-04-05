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
    var calendarEvents = Calendar.constructEvents(events);
    // 3. Check for conflicts

    // 4. Resolve conflicts

    // 5. Layout the events
}

layOutEvents();