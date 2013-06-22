var PageGenerator = (function() {
    var obj = {};

    obj.generate_page = function(path)
    {

        if (path == "student_jobs.rb")
            this.generate_student_jobs_page();

        StuyTools.tabs[path].page_data = true; //clean up
    }

    obj.generate_student_jobs_page = function()
    {
        student_data = StuyTools.tabs["student_jobs.rb"].page_data;
        var restyled_html = "";

        email_html = "";
        student_data["emails"].split(",").forEach(
            function(email)
            {
                email_html += "<span class='block'>" + email + "</span>";
            }
        );

        restyled_html += '\
            <aside> \
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
                            <td class="email-col"> \
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
        ';

        StuyTools.tabs["student_jobs.rb"].restyled_html = restyled_html;
    };

    return obj;
})();
