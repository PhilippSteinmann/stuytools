function make_awesome()
{
    insert_fonts();

    var student_data = false;
    if (logged_in())
        var student_data = get_student_data();

    document.title = "StuyTools";

    insert_page(student_data);

}

function insert_fonts()
{
    var link_node = document.createElement("link");
    link_node.rel = "stylesheet";
    link_node.href = 'https://fonts.googleapis.com/css?family=Open+Sans:400,800,700';
    document.head.appendChild(link_node);
}

function get_student_data()
{
    return {}
}

function logged_in() 
{
    if (document.URL.indexOf("login") == -1)
        return true;
    else
        return false;
}

function insert_page(data)
{
    var login_form = ' \
        <form action="https://students-stuyhs.theschoolsystem.net/login.rb" method="POST"> \
                <label for="username">Username: </label> \
                <input name="username" id="username" autofocus required> \
                <label for="password">Password: </label> \
                <input type="password" id="password"  name="password" required> \
            </form> \
    ';

    $("body").html(' \
        <div class="content"> \
        </div> \
    ');

    insert_nav_area(data);
    insert_school_area(data);
    insert_personal_area(data);
}

function insert_nav_area()
{
    $(".content").append(' \
        <nav> \
            <div class="padding-box"> \
                <h1>Philipp Steinmann </h1> \
                <ul> \
                    <li><a href="https://students-stuyhs.theschoolsystem.net/grade_check.rb">Report Card</a> </li> \
                    <li><a href="https://students-stuyhs.theschoolsystem.net/register2.rb">Elective Classes Signup </a> </li> \
                    <li><a href="https://students-stuyhs.theschoolsystem.net/schedule_check.rb">Schedule </a> </li> \
                    <li><a href="https://students-stuyhs.theschoolsystem.net/attendance.rb">Attendance </a> </li> \
                    <li><a href="https://students-stuyhs.theschoolsystem.net/transcripts.rb">Transcript </a> </li> \
                    <li><a href="https://students-stuyhs.theschoolsystem.net/teacher_rec_check.rb">Teacher Recommendations </a> </li> \
                </ul> \
            </div> \
        </nav> \
    ');
}

function insert_school_area()
{
    $(".content").append(' \
        <div class="school-info-area"> \
            <div class="padding-box"> \ <h2>School Info </h2> \
                <div class="today schedule"> \
                    <span class="date"> \
                        <h3>Friday </h3> \
                        <small>(today) </small> \
                    </span> \
                    <span class="type">Regular | B2 </span> \
                    <span class="period">Period 7 (13 min. left) </span> \
                </div> \
                <div class="tomorrow schedule"> \
                    <span class="date"> \
                        <strong>Monday</strong> \
                    </span> \
                    <span class="type">Homeroom | A2 </span> \
                </div> \
                <div class="announcements"> \
                    <h3>Announcements </h3> \
                    <ul> \
                        <li> \
                            <button>' + title_case("FRESHMAN CAPTURES PSAL BOYS INDIVIDUAL GOLF CROWN") + ' \
                        </li> \
                        <li> \
                            <button>' + title_case("ONLINE PROGRAMMING FOR FALL 2013 PHASE 2") + ' \
                        </li> \
                        <li> \
                            <button>' + title_case("***UPDATED*** LIBRARY SCHEDULE FOR APRIL 29-JUNE 10") + ' \
                        </li> \
                        <li> \
                            <button>' + title_case("REMINDER: TEACHER COMMENT SHEET & EXTRACURRICULAR ACTIVITIES SHEET") + ' \
                        </li> \
                        <li> \
                            <button>' + title_case("APPLICATIONS FOR WORKING PAPERS") + ' \
                        </li> \
                    </ul> \
                </div> \
            </div> \
        </div> \
    ');
}

function insert_personal_area()
{
    $(".content").append(' \
        <aside> \
            <div class="padding-box"> \
                <h2>Your Info </h2> \
                <dl> \
                    <dt>Official Class </dt> \
                        <dd>3GG </dd> \
                    <dt>Homeroom</dt> \
                        <dd>' + title_case("CAFE") + '</dd> \
                    <dt>Homeroom Teacher</dt> \
                        <dd>' + title_case("FANG") + '</dd> \
                    <dt>Advisor</dt> \
                        <dd>' + title_case("PARNES") + '</dd> \
                    <dt>Email Addresses</dt> \
                        <dd>steinmann.philipp@yahoo.com, steinmann.philipp@hotmail.com</dd> \
                    <a href="https://students-stuyhs.theschoolsystem.net/email.rb">Change </a> \
                </dl> \
                <ul> \
                    <li><a href="https://students-stuyhs.theschoolsystem.net/locker_letter.rb">School Locker Info </a> </li> \
                    <li><a href="https://students-stuyhs.theschoolsystem.net/locker_look.rb">PE Locker Info </a> </li> \
                </ul> \
            </div> \
        </div> \
    </aside> \
    ');
}

// from http://stackoverflow.com/a/12533554/805556, lightly modified 
function title_case(e){var t=/^(a|an|and|as|at|but|by|en|for|if|in|of|on|psal|or|the|to|vs?\.?|via)$/i;return e.toLowerCase().replace(/([^\W_]+[^\s-]*) */g,function(e,n,r,i){return r>0&&r+n.length!==i.length&&n.search(t)>-1&&i.charAt(r-2)!==":"&&i.charAt(r-1).search(/[^\s-]/)<0?e.toLowerCase():n.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1)})};

if (document.location.pathname == "/login.rb")
    make_awesome();
