function layOutEvents (events) {

    var DAY_START = 9;
    var DAY_END = 21;
    var HOUR_INTEVALS = 2;

    events = events || [];

    //events = [
    //    { start: 0, end: 90 },
    //    { start: 30, end: 90 },
    //    { start: 75, end: 180 },
    //    { start: 150, end: 600 },
    //    { start: 610, end: 670 },
    //    { start: 360, end: 390 },
    //    { start: 475, end: 720 }
    //];

    //layOutEvents([
    //    { start: 30, end: 150 },
    //    { start: 540, end: 600 },
    //    { start: 560, end: 620 },
    //    { start: 610, end: 670 }
    //]);

    //layOutEvents([
    //    { start: 0, end: 90 },
    //    { start: 30, end: 90 },
    //    { start: 75, end: 180 },
    //    { start: 150, end: 600 },
    //    { start: 610, end: 670 },
    //    { start: 360, end: 390 },
    //    { start: 475, end: 720 }
    //]);

    //var events = [
    //    { start: 30, end: 150 },
    //    { start: 540, end: 600 },
    //    { start: 560, end: 620 },
    //    { start: 610, end: 670 }
    //];
    //var events = [
    //    { start: 0, end: 120 },
    //    { start: 450, end: 600 },
    //    { start: 390, end: 480 },
    //    { start: 360, end: 480 },
    //    { start: 540, end: 660 }
    //];

    // 1. Draw the time list
    var times = Calendar.calculateTimes(DAY_START, DAY_END, HOUR_INTEVALS);
    Calendar.drawTimeList(times, 'times', HOUR_INTEVALS);

    // 2. Lay out the events
    var calendarEvents = Calendar.constructEvents(events);
    Calendar.drawEvents(calendarEvents, 'events');

}

layOutEvents();