function layOutEvents (events) {

    var DAY_START = 9;
    var DAY_END = 21;
    var HOUR_INTEVALS = 2;

    events = events || [];

    //events = [
    //    { startTime: 0, endTime: 90 },
    //    { startTime: 30, endTime: 90 },
    //    { startTime: 75, endTime: 180 },
    //    { startTime: 150, endTime: 600 },
    //    { startTime: 610, endTime: 670 },
    //    { startTime: 360, endTime: 390 },
    //    { startTime: 475, endTime: 720 }
    //];

    //layOutEvents([
    //    { startTime: 0, endTime: 90 },
    //    { startTime: 30, endTime: 90 },
    //    { startTime: 75, endTime: 180 },
    //    { startTime: 150, endTime: 600 },
    //    { startTime: 610, endTime: 670 },
    //    { startTime: 360, endTime: 390 },
    //    { startTime: 475, endTime: 750 }
    //]);

    //var events = [
    //    { startTime: 30, endTime: 150 },
    //    { startTime: 540, endTime: 600 },
    //    { startTime: 560, endTime: 620 },
    //    { startTime: 610, endTime: 670 }
    //];
    //var events = [
    //    { startTime: 0, endTime: 120 },
    //    { startTime: 450, endTime: 600 },
    //    { startTime: 390, endTime: 480 },
    //    { startTime: 360, endTime: 480 },
    //    { startTime: 540, endTime: 660 }
    //];

    // 1. Draw the time list
    var times = Calendar.calculateTimes(DAY_START, DAY_END, HOUR_INTEVALS);
    Calendar.drawTimeList(times, 'times', HOUR_INTEVALS);

    // 2. Lay out the events
    var calendarEvents = Calendar.constructEvents(events);
    Calendar.drawEvents(calendarEvents, 'events');

}

layOutEvents();