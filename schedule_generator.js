function fetch_stuy_schedule()
{
    return "";
}

function generate_schedule_html(schedules)
{
    var html = "";

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var weekday = today.getDay();

    var today_str = year + "-" + month + "-" + day;
    if (today_str in schedules)
    {
        var today_schedule = schedules[today_str];
        var bell_schedule = today_schedule["bell_schedule"];
        var block = today_schedule["block"];

        var human_weekday = get_human_weekday(weekday);

        html += '\
                <div class="schedule today"> \
                    <span class="date"> \
                        <h3>' + human_weekday + '</h3> \
                        <small>(today) </small> \
                    </span> \
                    <span class="type">' + bell_schedule + ' | ' + block + '</span> \
                ';

        if (today.getHours() <= 16)
            html += generate_schedule_clock(bell_schedule);
        html += "</div>";
            
    }
    else
    {

    }
    return html;
}

function get_human_weekday(weekday_number)
{
    human_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return human_weekdays[weekday_number];
}

function get_schedule_times(bell_schedule)
{
    var today = new Date();
    var start_of_school = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0).getTime();

    var period_durations = {
        "Regular": 45 * 60 * 1000,
        "Conference": 41 * 60 * 1000,
        "Special": 42 * 60 * 1000,
        "Homeroom": 44 * 60 * 1000
    };

    var today_period_duration = period_durations[bell_schedule];

    var schedule_time = [];
    var last_period_ends = start_of_school;
    
    for (period = 1; period <= 10; period++)
    {
        if (bell_schedule == "Homeroom" && period == 4)
        {
            last_period_ends += 18 * 60 * 1000;
        }

        schedule_time.push(
            {
                start: last_period_ends,
                end: last_period_ends + today_period_duration
            }
        );

        last_period_ends = schedule_time.slice(-1)[0]["end"]; //last element
    }

    if (bell_schedule == "Homeroom")
        schedule_time.push(
            {
                start: start_of_school + 128 * 60 * 1000,
                end: start_of_school + 146 * 60 * 1000
            }
        );

    return schedule_time;
}

function generate_schedule_clock(bell_schedule)
{
    var schedule_times = get_schedule_times(bell_schedule);

    setInterval(
        function()
        {
            updateClock(schedule_times)
        }, 
        30 * 1000
    );

    return ' \
    <span class="clock"> \
        Period <span class="period">X </span> \
        (<span class="minutes">XX </span> min. left) \
    </span> \
    '
}

function updateClock(schedule_times)
{
    var clock = $(".clock");
}
