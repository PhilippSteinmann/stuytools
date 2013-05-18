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
            </nav> \
            <div class="school-info-area"> \
                <h2>School Info </h2> \
                <div class="today schedule"> \
                    <span class="date"> \
                        <strong>Friday </strong> \
                        (today)  \
                    </span> \
                    <span class="type">Regular | B2 </span> \
                    <span class="period">Period 7 (13 min. left) </span> \
                </div> \
            </div> \
            <div class="personal-info-area"> \
                <h2>Your Info </h2> \
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

make_awesome();
