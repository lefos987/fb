function layOutDay (events) {


    var DAY_START = 9;
    var DAY_END = 21;
    var HOUR_INTEVALS = 2;

    var times = Calendar.calculateTimes(DAY_START, DAY_END, HOUR_INTEVALS);
    Calendar.drawTimeList(times, 'times', HOUR_INTEVALS);

    events = events || [];

    var calendarEvents = Calendar.constructEvents(events);
    Calendar.drawEvents(calendarEvents, 'events');

}

layOutDay([
    { start: 30, end: 150 },
    { start: 540, end: 600 },
    { start: 560, end: 620 },
    { start: 610, end: 670 }
]);

//layOutDay([
//    { start: 0, end: 120 },
//    { start: 450, end: 600 },
//    { start: 390, end: 480 },
//    { start: 360, end: 480 },
//    { start: 540, end: 660 }
//]);

//layOutDay([
//    { start: 0, end: 90 },
//    { start: 30, end: 90 },
//    { start: 75, end: 180 },
//    { start: 150, end: 600 },
//    { start: 610, end: 670 },
//    { start: 360, end: 390 },
//    { start: 475, end: 720 }
//]);