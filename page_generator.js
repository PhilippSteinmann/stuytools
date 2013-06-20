function insert_page(student_data)
{
    document.title = "Student Tools";

    var previous_content = $("body").html();

    $("body").html(' \
        <div class="content"> \
        </div> \
    ');

    insert_header(student_data);

    if (window.location.hash)
    {
        var hash = window.location.hash.slice(1);
        insert_school_area(student_data, true);
        insert_personal_area(student_data, true);
        insert_page_area(window.location.hash);

        history.pushState("", document.title, hash);
    }

    else
    {
        insert_school_area(student_data);
        insert_personal_area(student_data);
        insert_page_area();
    }


    insert_fonts();
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
            <nav> \
                <ul> \
                    <li><a class="primary-button" target="page-area" href="https://students-stuyhs.theschoolsystem.net/grade_check.rb" target="test">Report Card</a> </li> \
                    <li><a class="primary-button" target="page-area" href="https://students-stuyhs.theschoolsystem.net/register2.rb">Elective Classes Signup </a> </li> \
                    <li><a class="primary-button" target="page-area" href="https://students-stuyhs.theschoolsystem.net/schedule_check.rb">Schedule </a> </li> \
                    <li><a class="primary-button" target="page-area" href="https://students-stuyhs.theschoolsystem.net/attendance.rb">Attendance </a> </li> \
                    <li><a class="primary-button" target="page-area" href="https://students-stuyhs.theschoolsystem.net/transcripts.rb">Transcript </a> </li> \
                    <li><a class="primary-button" target="page-area" href="https://students-stuyhs.theschoolsystem.net/teacher_rec_check.rb">Teacher Recommendations </a> </li> \
                </ul> \
            </nav> \
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
                    <!-- the S.O.B. below caused a day of frustration and fruitless testing. note to anybody out there: make sure to include elements for  hidden and seemingly unrelated form fields! !--> \
                    <input type="hidden" name="button" value="login"> \
                    <input type="submit" class="primary-button" value="Log In"> \
                </form> \
            </div> \
        ');
    }
}

function insert_school_area(student_data, hidden)
{
    window.setTimeout(create_stuy_schedule, 500);
    window.setTimeout(create_announcements_section, 500);
    //to make it load faster at first

     $(".content").append('\
        <div class="school-info-area' + (hidden ? " hidden" : "") + '"> \
            <div class="padding-box"> \
                <h2>School Info </h2> \
                <p class="loading-notice schedule-loading-notice">Loading Schedule... </p> \
                <div class="schedule"> \
                </div> \
                <div class="announcements"> \
                    <h3>Announcements </h3> \
                    <p class="loading-notice announcements-loading-notice">Loading Announcements... </p> \
                    <ul> \
                    </ul> \
                    <a class="secondary-button load-more-announcements">Load More </a> \
                </div> \
            </div> \
        </div> \
    ');
}

function insert_personal_area(student_data, hidden)
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

        $(".content").append(' \
            <aside ' + (hidden ? 'class="hidden"' : '') + '> \
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
                            <td class="email-field"> \
                            ' + email_html + ' \
                                <a class="secondary-button change-email" href="https://students-stuyhs.theschoolsystem.net/email.rb">Change </a> \
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

function insert_page_area(page_url)
{
    $(".content").append(' \
        <iframe class="page-area ' + (page_url ? 'visible" src="' + page_url + '"' : '"') + ' id="page-area" frameBorder="0"> </iframe> \
    ');
}

function insert_fonts()
{
    var link_node = document.createElement("link"); 
    link_node.rel = "stylesheet";
    link_node.href = 'https://fonts.googleapis.com/css?family=Open+Sans:400,800,700';
    document.head.appendChild(link_node); 
}

function attach_listeners()
{
    $(".your-info").click(
        function()
        {
            $("aside").slideToggle(300);
        }
    );

    $("nav a").click(
        function()
        {
            $(".school-info-area").hide();
            $("aside").hide();
            $(".page-area").show();

            var url = this.href;
            history.pushState({}, "", url);
        }
    );

    $(".logo").click(
        function()
        {
            $(".school-info-area").show();
            $("aside").show();
            $(".page-area").hide();
            history.pushState({}, "Student Tools", "/student_jobs.rb");
            return false;
        }
    );

    $(".change-email").click(
        function(e)
        {
            e.preventDefault();

            history.pushState({}, "Change email address - Student Tools", this.href);
            this.parentElement.innerHTML = '<iframe class="change-email-iframe" src="https://students-stuyhs.theschoolsystem.net/email.rb"> </iframe>';
            restyle_email_form();
        }
    );
}
