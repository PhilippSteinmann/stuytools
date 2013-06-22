var PageRenderer = (function(){
    var obj = {};

    obj.setup_page = function()
    {
        this.insert_sidebar();

        if (StuyTools.logged_in)
            this.insert_navigation();
        else
            this.insert_loginform();
    };

    obj.insert_sidebar = function()
    {
        document.body.innerHTML = ' \
            <div class="content"> \
                <header> \
                    <div class="padding-box"> \
                        <a href="https://students-stuyhs.theschoolsystem.net/student_jobs.rb" class="logo"> \
                            <span class="stuy">Stuy </span> \
                            Tools \
                        </a> \
                    </div> \
                </header> \
                <div class="tab-content"> </div> \
            </div> \
        ';
    };

    obj.insert_navigation = function()
    {
        var name = StuyTools.student_name;
        var name_string = "";
        if (name)
            name_string = name["first"] + " " + name["last"];

        document.body.querySelector("header .padding-box").innerHTML += ' \
            <a class="secondary-button logout" href="https://students-stuyhs.theschoolsystem.net/logoff.rb">Log Out </a> \
            <button class="secondary-button your-info" href="#">Your Info </button> \
            <h1>' + name_string  + '</h1> \
            <nav> \
                <ul> \
                    <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/grade_check.rb" target="test">Report Card</a> </li> \
                    <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/register2.rb">Elective Classes Signup </a> </li> \
                    <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/schedule_check.rb">Schedule </a> </li> \
                    <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/attendance.rb">Attendance </a> </li> \
                    <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/transcripts.rb">Transcript </a> </li> \
                    <li><a class="primary-button" href="https://students-stuyhs.theschoolsystem.net/teacher_rec_check.rb">Teacher Recommendations </a> </li> \
                </ul> \
            </nav> \
        ';
    };

    obj.render_page = function()
    {
        var path = Utils.get_path();
        var html = StuyTools.tabs[path].restyled_html;
        document.body.querySelector(".tab-content").innerHTML += html;
    };

    return obj;
})();
