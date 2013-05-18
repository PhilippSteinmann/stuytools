function make_awesome()
{
    document.title = "StuyTools";
    insert_fonts();
    if (logged_in())
    {
        var student_data = collect_data();
        var student_area_content = "";
    }
    else
    {
        var student_area_content = '\ <form action="https://students-stuyhs.theschoolsystem.net/login.rb" method="POST"> \
                    <label>Username: <input name="username" autofocus> \
                    <label>Password: <input type="password"  name="password"> \
                </form> \
        ';
    }

    $("body").html('\
        <div class="content"> \
            <nav> \
                <div class="padding-box"> \
                    <h1>Philipp Steinmann </h1> \
                    <ul> \
                        <li><a href="#">Report Card</a> </li> \
                        <li><a href="#">AP Classes Signup </a> </li> \
                        <li><a href="#">Schedule </a> </li> \
                        <li><a href="#">Attendance </a> </li> \
                        <li><a href="#">Locker Info </a> </li> \
                        <li><a href="#">Transcript </a> </li> \
                        <li><a href="#">Teacher Recommendations </a> </li> \
                    </ul> \
                </div> \
            </nav> \
            <div class="school-info-area"> \
                <div class="padding-box"> \
                    <h2>School Info </h2> \
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
            <div class="personal-info-area"> \
                <div class="padding-box"> \
                    <h2>Your Info </h2> \
                </div> \
            </div> \
        </div> \
    ');
}

function logged_in()
{

    if (document.URL.indexOf("login") == -1)
        return true;
    else
        return false;
}

function collect_data()
{

}

function insert_fonts()
{
    var link_node = document.createElement("link");
    link_node.rel = "stylesheet";
    link_node.href = 'https://fonts.googleapis.com/css?family=Open+Sans:400,800,700';
    document.head.appendChild(link_node);
}

// from http://stackoverflow.com/a/12533554/805556, lightly modified 
function title_case(e){var t=/^(a|an|and|as|at|but|by|en|for|if|in|of|on|psal|or|the|to|vs?\.?|via)$/i;return e.toLowerCase().replace(/([^\W_]+[^\s-]*) */g,function(e,n,r,i){return r>0&&r+n.length!==i.length&&n.search(t)>-1&&i.charAt(r-2)!==":"&&i.charAt(r-1).search(/[^\s-]/)<0?e.toLowerCase():n.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1)})};

make_awesome();
