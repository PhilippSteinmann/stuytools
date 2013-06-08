function create_stuy_schedule()
{
    var url = "http://stuy.enschool.org/apps/events/show_event.jsp?REC_ID=927665&id=1";
    $.get(url, 
        function(raw_html)
        {
            var schedule = parse_stuy_schedule(raw_html);
            var schedule_html = generate_schedule_html(schedule);
            inject_schedule_html(schedule_html);
        }
    );
}

function parse_stuy_schedule(raw_html)
{
    var schedule = {};

    var parser = new DOMParser();
    var doc = parser.parseFromString(raw_html, "text/html");
    var text = doc.querySelector("body").innerText;

    var today = new Date();
    var tomorrow = new Date(
            today.getFullYear(), today.getMonth(), today.getDate() + 1);


    days_to_check = [today, tomorrow];

    days_to_check.forEach(
        function(day)
        {
            var year = day.getFullYear();
            var month = day.getMonth();
            var date = day.getDate();

            var human_month = get_human_month(month).toUpperCase();
            var regex = new RegExp(human_month + " " + date + "\\s(.+) Bell Schedule.*(\\D\\d)");
            var results = scan_page(regex, text);
            if (results)
            {
                var bell_schedule = results[1];
                var block = results[2];
                
                var human_date = day.toDateString();

                schedule[human_date] = 
                {
                    bell_schedule: bell_schedule,
                    block: block
                }
            }
        }
    );
    return schedule
}

function generate_schedule_html(schedule)
{
    var html = "";

    var today = new Date();
    var today_str = today.toDateString();

    var tomorrow = new Date(
            today.getFullYear(), today.getMonth(), today.getDate() + 1);
    var tomorrow_str = tomorrow.toDateString();


    for (date_str in schedule)
    {
        if (schedule.hasOwnProperty(date_str))
        {
            var day = schedule[date_str];
            var bell_schedule = day["bell_schedule"];
            var block = day["block"];

            var weekday = new Date(date_str).getDay();

            var human_weekday = title_case(get_human_weekday(weekday));

            if (date_str == today_str)
            {
                html += '\
                        <div class="day today"> \
                            <span class="date"> \
                                <h3>' + human_weekday + '</h3> \
                                <small>(today) </small> \
                            </span> \
                            <span class="type">' + bell_schedule + ' | ' + block + '</span> \
                        ';

                if (today.getHours() < 16)
                    html += generate_clock(bell_schedule);

                html += "</div>";
            }
            else if (date_str == tomorrow_str)
            {
                html += '\
                    <div class="day tomorrow"> \
                        <span class="date"> \
                            <strong>' + human_weekday + '</strong> \
                                <small>(tomorrow) </small> \
                        </span> \
                        <span class="type">' + bell_schedule + ' | ' + block + '</span> \
                    </div> \
                        ';
            }
        }
    }
    return html;
}


function generate_clock(bell_schedule)
{
    var period_times = get_period_times(bell_schedule);

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

                seconds_in = Math.round((now - start) / 1000); // in seconds
                minutes_in = Math.round(seconds_in / 60); //in minutes

                if (seconds_in <= 180)
                {
                    var seconds_until_start = 4 * 60 - seconds_in;
                    var minutes_until_start = Math.round(seconds_until_start / 60);

                    clock.find(".period").html(period);
                    clock.find(".time-left").text(minutes_until_start);
                    clock.find(".time-sec-or-min").text("min.");
                    clock.find(".time-left-text").text("until start");
                }

                else if (seconds_in <= 240)
                {
                    var seconds_until_start = 4 * 60 - seconds_in;

                    clock.find(".period").html(period);
                    clock.find(".time-left").text(seconds_until_start);
                    clock.find(".time-sec-or-min").text("sec.");
                    clock.find(".time-left-text").text("until start");
                }

                else if (seconds_left >= 60)
                {
                    clock.find(".period").text(period);
                    clock.find(".time-left").text(minutes_left);
                    clock.find(".time-sec-or-min").text("min.");
                    clock.find(".time-left-text").text("left");
                }

                else
                {
                    clock.find(".period").text(period);
                    clock.find(".time-left").text(seconds_left);
                    clock.find(".time-sec-or-min").text("sec.");
                    clock.find(".time-left-text").text("left");
                }
            } 
        }
    }
}

function get_human_weekday(weekday_number)
{
    human_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return human_weekdays[weekday_number];
}

function get_human_month(month_number)
{
    human_months = [ "January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December" ];

    return human_months[month_number];
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

function inject_schedule_html(schedule_html)
{
    $(".schedule-loading-notice").remove();
    $(".schedule").html(schedule_html);
}
