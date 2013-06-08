function insert_page(student_data)
{
    document.title = "StuyTools";

    previous_content = $("body").html();
    
    $("body").html(' \
        <div class="content"> \
        </div> \
    ');

    insert_header(student_data); 
    if (window.location.pathname == "/student_jobs.rb")
    {
        insert_school_area(student_data);
        insert_personal_area(student_data, false);
    }
    else
    {
        insert_content(student_data, previous_content);
        insert_personal_area(student_data, true);
    } 
    attach_listeners();
}

function insert_header(student_data)
{
    $(".content").append('\
            <header> \
                <div class="padding-box"> \
                    <a href="https://students-stuyhs.theschoolsystem.net/student_jobs.rb" class="logo"> \
                        <span class="stuy">Stuy </span> \
                        Tools \
                    </a> \
                </div> \
            </header> \
    ');

    if (student_data)
    {
        $("header .padding-box").append(' \
            <a class="secondary-button logout" href="https://students-stuyhs.theschoolsystem.net/logoff.rb">Log Out </a> \
            <button class="secondary-button your-info" href="#">Your Info </button> \
            <h1>' + student_data["name"]["first"] + " " + student_data["name"]["last"] + '</h1> \
            <ul> \
                <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/grade_check.rb">Report Card</a> </li> \
                <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/register2.rb">Elective Classes Signup </a> </li> \
                <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/schedule_check.rb">Schedule </a> </li> \
                <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/attendance.rb">Attendance </a> </li> \
                <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/transcripts.rb">Transcript </a> </li> \
                <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/teacher_rec_check.rb">Teacher Recommendations </a> </li> \
            </ul> \
        ');
    }
    else
    {
        $("header .padding-box").append(' \
            <div class="form-wrapper"> \
                <form action="https://students-stuyhs.theschoolsystem.net/login.rb" method="POST"> \
                    <label for="username">Username: </label> \
                    <input type="text" name="username" id="username" autofocus required autocomplete="off" > \
                    <label for="password">Password: </label> \
                    <input type="password" id="password"  name="password" required> \
                    \
                    <a href="https://students-stuyhs.theschoolsystem.net/reset_password.rb">Forgot your password? </a> \
                    <!-- the S.O.B. below caused a day of frustration and fruitless testing. note to anybody out there: make sure to include hidden and seemingly unrelated form fields! !--> \
                    <input type="hidden" name="button" value="login"> \
                    <input type="submit" class="primary-button" value="Log In"> \
                </form> \
            </div> \
        ');
    }
}

function insert_school_area(student_data)
{
    window.setTimeout(create_stuy_schedule, 500);
    window.setTimeout(create_announcements_section, 500);
    //to make it load faster at first

     $(".content").append('\
        <div class="school-info-area"> \
            <div class="padding-box"> \
                <h2>School Info </h2> \
                <p class="loading-notice schedule-loading-notice">Loading... </p> \
                <div class="schedule"> \
                </div> \
                <div class="announcements"> \
                    <h3>Announcements </h3> \
                    <p class="loading-notice announcements-loading-notice">Loading... </p> \
                    <ul> \
                    </ul> \
                    <a class="secondary-button load-more-announcements">Load More </a> \
                </div> \
            </div> \
        </div> \
    ');
}

function insert_content(student_data, previous_content)
{
    $(".content").append(' \
        <div class="page-area"> \
            <div class="padding-box"> \
            ' + previous_content + ' \
            </div> \
        </div> \
    ');
}

function insert_personal_area(student_data, popup)
{
    if (student_data)
    {
        email_html = "";
        student_data["emails"].split(",").forEach(
            function(email)
            {
                email_html += "<span class='block'>" + email + "</span>";
            }
        );

        if (popup)
            $(".your-info").addClass("aside-is-popup");

        $(".content").append(' \
            <aside ' + (popup ? 'class="popup"' : '') + '> \
                <div class="padding-box"> \
                    <h2>Your Info </h2> \
                    <table> \
                        <tr> \
                            <td>Official Class</td> \
                            <td>' + student_data["off_class"] + '</td> \
                         </tr> \
                        <tr> \
                            <td>Homeroom </td> \
                            <td>' + student_data["off_room"] + ' </td> \
                         </tr> \
                        <tr> \
                            <td>Homeroom Teacher </td> \
                            <td>' + student_data["hr_teacher"] + ' </td> \
                         </tr> \
                        <tr> \
                            <td>Advisor </td> \
                            <td>' + student_data["advisor"] + ' </td> \
                         </tr> \
                        <tr> \
                            <td>Email Addresses </td> \
                            <td> \
                            ' + email_html + ' \
                                <a class="secondary-button" href="https://students-stuyhs.theschoolsystem.net/email.rb">Change </a> \
                            </td> \
                         </tr> \
                    </table> \
                    <ul> \
                        <li><a class="secondary-button" href="https://students-stuyhs.theschoolsystem.net/locker_letter.rb">School Locker Info </a> </li> \
                        <li><a class="secondary-button" href="https://students-stuyhs.theschoolsystem.net/locker_look.rb">PE Locker Info </a> </li> \
                    </ul> \
                </div> \
            </div> \
        </aside> \
        ');
    }
}

function attach_listeners()
{
    $(".your-info").click(
        function()
        {
            $("aside").slideToggle(300);
        }
    );
}
