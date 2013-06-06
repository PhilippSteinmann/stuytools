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

function get_period_times(bell_schedule)
{
    var periods = 
    {
        Regular:
        {
            1: [0,2700000],
            2: [2700000,5400000],
            3: [5400000,8100000],
            4: [8100000,10800000],
            5: [10800000,13500000],
            6: [13500000,16200000],
            7: [16200000,18900000],
            8: [18900000,21600000],
            9: [21600000, 2430000],
            10: [2430000, 2700000]
        },

        Conference:
        {
            1: [0, 2460000],
            2: [2460000, 4920000],
            3: [4920000, 7380000],
            4: [7380000, 9840000],
            5: [9840000, 12300000],
            6: [12300000, 14760000],
            7: [14760000, 17220000],
            8: [17220000, 19680000],
            9: [19680000, 22140000],
            10: [22140000, 24600000]
        },

        Special:
        {
            1: [0, 2520000],
            2: [2520000, 5040000],
            3: [5040000, 7560000],
            4: [7560000, 10080000],
            5: [10080000, 12600000],
            6: [12600000, 15120000],
            7: [15120000, 17640000],
            8: [17640000, 20160000],
            9: [20160000, 22680000],
            10: [22680000, 25200000]
        },

        Homeroom:
        {
            1: [0, 2640000],
            2: [2640000, 5280000],
            3: [5280000, 7920000],
            4: [8760000, 11400000],
            5: [11400000, 14040000],
            6: [14040000, 16680000],
            7: [16680000, 19320000],
            8: [19320000, 21960000],
            9: [21960000, 24600000],
            10: [24600000, 27240000],
            "Homeroom": [7920000, 8760000]
        }
    }

    var period_offsets = periods[bell_schedule];
    var period_times = {}

    var today = new Date();
    var start_of_school = new Date(
            today.getFullYear(), today.getMonth(), today.getDate(), 8, 0).getTime();

    for (var period in period_offsets)
    {
        if (period_offsets.hasOwnProperty(period))
        {   
            period_offset = period_offsets[period];
            period_times[period] = 
                [
                    new Date(start_of_school + period_offset[0]),
                    new Date(start_of_school + period_offset[1])
                ];
        }
    }

    return period_times
}


function generate_schedule_clock(bell_schedule)
{
    var period_times = get_period_times(bell_schedule);
    console.log(period_times);

    setInterval(
        function()
        {
            updateClock(period_times)
        }, 
        1 * 1000
    );

    return ' \
    <span class="clock"> \
        Period <span class="period"> </span> \
        (<span class="time-left"> </span> \
         <span class="time-sec-or-min"></span> \
         <span class="time-left-text"></span>) \
    </span> \
    '
}

function updateClock(period_times)
{
    var clock = $(".clock");
    var now = new Date();

    for (var period in period_times)
    {
        if (period_times.hasOwnProperty(period))
        {
            period_time = period_times[period];
            start = period_time[0];
            end = period_time[1]

            if (now > start && now < end)
            {
                seconds_left = Math.round((end - now) / 1000); // in seconds
                minutes_left = Math.round(seconds_left / 60); //in minutes

                if (minutes_left >= 5)
                {
                    minutes_left -= 4;
                    clock.find(".period").text(period);
                    clock.find(".time-left").text(minutes_left);
                    clock.find(".time-sec-or-min").text("min.");
                    clock.find(".time-left-text").text("left");
                }

                else if (minutes_left >= 4)
                {
                    seconds_left -= 4 * 60;
                    clock.find(".period").text(period);
                    clock.find(".time-left").text(seconds_left);
                    clock.find(".time-sec-or-min").text("sec.");
                    clock.find(".time-left-text").text("left");
                }

                else if (minutes_left >= 1)
                {
                    if (period == 10)
                    {
                        clock.find(".period").text("none")
                        clock.find(".time-left").text("School's out");
                        clock.find(".time-sec-or-min").text("");
                        clock.find(".time-left-text").text("");
                    }
                    else
                    {
                        clock.find(".period").html(parseInt(period) + 1);
                        clock.find(".time-left").text(minutes_left);
                        clock.find(".time-sec-or-min").text("min.");
                        clock.find(".time-left-text").text("until start");
                    }
                }

                else
                {
                    if (period == 10)
                    {
                        clock.find(".period").text("none")
                        clock.find(".time-left").text("School's out");
                        clock.find(".time-sec-or-min").text("");
                        clock.find(".time-left-text").text("");
                    }

                    else
                    {
                        clock.find(".period").html(parseInt(period) + 1);
                        clock.find(".time-left").text(seconds_left);
                        clock.find(".time-sec-or-min").text("sec.");
                        clock.find(".time-left-text").text("until start");
                    }
                }
            } 
        }
    }
}
