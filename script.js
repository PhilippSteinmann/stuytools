function make_awesome() 
{
    var student_data = get_student_data();
    alert("we're at " + document.URL + "\n\nstudent_data = " + student_data);

    insert_fonts();
    insert_page(student_data);
}

function insert_fonts()
{
    var link_node = document.createElement("link");
    link_node.rel = "stylesheet";
    link_node.href = 'https://fonts.googleapis.com/css?family=Open+Sans:400,800,700';
    document.head.appendChild(link_node); }

function get_student_data()
{
    if ($("body").text() == "")
        return false
    else
    {
        return {}
    }
}

function logged_in() 
{
    var daedalusID_exists = false;
    return daedalusID_exists;
}

function insert_page(student_data)
{
    document.title = "StuyTools";
    
    $("body").html(' \
        <div class="content"> \
        </div> \
    ');

    insert_nav_area(student_data);
    insert_school_area(student_data);
    insert_personal_area(student_data);
}

function insert_nav_area(student_data)
{
    $(".content").append('\
            <nav> \
                <div class="padding-box"> </div> \
            </nav> \
    ');

    if (student_data)
    {
        $("nav .padding-box").append(' \
            <h1>Philipp Steinmann </h1> \
            <a class="secondary-button log-out" href="https://students-stuyhs.theschoolsystem.net/logoff.rb">Log Out </a> \
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
        $("nav .padding-box").append(' \
            <div class="form-wrapper"> \
                <form action="https://students-stuyhs.theschoolsystem.net/login.rb" method="POST"> \
                    <label for="username">Username: </label> \
                    <input type="text" name="username" id="username" autofocus required autocomplete="off" > \
                    <label for="password">Password: </label> \
                    <input type="password" id="password"  name="password" required> \
                    \
                    <a href="https://students-stuyhs.theschoolsystem.net/reset_password.rb">Forgot your password? </a> \
                    <input type="submit" class="primary-button" value="Log In"> \
                </form> \
            </div> \
        ');
    }
}

function insert_school_area(student_data)
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
                            <a href="">' + title_case("FRESHMAN CAPTURES PSAL BOYS INDIVIDUAL GOLF CROWN") + ' \
                        </li> \
                        <li> \
                            <a href="">' + title_case("ONLINE PROGRAMMING FOR FALL 2013 PHASE 2") + ' \
                        </li> \
                        <li> \
                            <a href="">' + title_case("***UPDATED*** LIBRARY SCHEDULE FOR APRIL 29-JUNE 10") + ' \
                        </li> \
                        <li> \
                            <a href="">' + title_case("REMINDER: TEACHER COMMENT SHEET & EXTRACURRICULAR ACTIVITIES SHEET") + ' \
                        </li> \
                        <li> \
                            <a href="">' + title_case("APPLICATIONS FOR WORKING PAPERS") + ' \
                        </li> \
                        <li> \
                            <a href="">' + title_case("AP EXAM SCHEDULE UPDATE") + ' \
                        </li> \
                    </ul> \
                </div> \
            </div> \
        </div> \
    ');
}

function insert_personal_area(student_data)
{
    if (student_data)
    {
        $(".content").append(' \
            <aside> \
                <div class="padding-box"> \
                    <h2>Your Info </h2> \
                    <table> \
                        <tr> \
                            <td>Official Class</td> \
                            <td>3GG </td> \
                         </tr> \
                        <tr> \
                            <td>Homeroom </td> \
                            <td>' + title_case("CAFE") + ' </td> \
                         </tr> \
                        <tr> \
                            <td>Homeroom Teacher </td> \
                            <td>' + title_case("FANG") + ' </td> \
                         </tr> \
                        <tr> \
                            <td>Advisor </td> \
                            <td>' + title_case("PARNES") + ' </td> \
                         </tr> \
                        <tr> \
                            <td>Email Addresses </td> \
                            <td>steinmann.philipp@yahoo.com, steinmann.philipp@hotmail.com <a class="secondary-button" href="https://students-stuyhs.theschoolsystem.net/email.rb">Change </a> </td> \
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
    else
    {
    
    }
}

String.prototype.mindfulLowerCase = function()
{
    var words = this.split(" ");
    var lowercase_str = "";
    var special_words = ["PSAL", "AP"];
    for (var i = 0; i < words.length; i++)
    { 
        if (special_words.indexOf(words[i]) == -1) // not a special word
            lowercase_str += words[i].toLowerCase() + " ";
        else // a special word, do not lowercase
            lowercase_str += words[i] + " ";
    }

    return lowercase_str;
}

String.prototype.in = function(arr)
{
    return (arr.indexOf(this.toString()) != -1)
}

// from http://stackoverflow.com/a/12533554/805556, lightly modified 
function title_case(e){var t=/^(a|an|and|as|at|but|by|en|for|if|in|of|on|psal|or|the|to|vs?\.?|via)$/i;return e.mindfulLowerCase().replace(/([^\W_]+[^\s-]*) */g,function(e,n,r,i){return r>0&&r+n.length!==i.length&&n.search(t)>-1&&i.charAt(r-2)!==":"&&i.charAt(r-1).search(/[^\s-]/)<0?e:n.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1)})};

var redirect_paths = ["/login.rb", "/logoff.rb"];

if (window.location.pathname.in(redirect_paths))
{   
    alert("redirecting...");
    window.location.pathname = "student_jobs.rb";
}

make_awesome();
