var PageParser = (function() {
    var obj = {};

    obj.parse_page = function(path)
    {
        if (path == "student_jobs.rb")
        {
            this.parse_student_jobs_page();
        }
        StuyTools.tabs[path].old_doc = true; //no longer need it, let's free up memory
        StuyTools.tabs[path].old_text = true; //no longer need it, let's free up memory
    };

    obj.parse_student_jobs_page = function()
    {
        var page_text = StuyTools.tabs["student_jobs.rb"].old_text;
        if (! page_text)
            return;

        var name_results = /Current user: (\w+, \w+)[.\n]*/.exec(page_text);
        var class_results = /Official Class: (.{3})([ \n]*)/.exec(page_text);
        var room_results = /Official Class Room: (\w+)/.exec(page_text);
        var teacher_results = /Official Class Teacher: (\w+)/.exec(page_text);
        var advisor_results = /Advisor: (\w+)/.exec(page_text);
        var email_results = /email address as: (.*)/.exec(page_text);
        
        var name = Utils.parse_student_name(name_results[1]);
        var off_class = class_results[1];
        var off_room = title_case(room_results[1]);
        var hr_teacher = title_case(teacher_results[1]);
        var advisor = title_case(advisor_results[1]);
        var emails = email_results[1];

        StuyTools.student_name = name;

        page_data = { 
            name: name,
            off_class: off_class,
            off_room: off_room,
            hr_teacher: hr_teacher,
            advisor: advisor,
            emails: emails
        }

        StuyTools.tabs["student_jobs.rb"].page_data = page_data;
    }

    return obj;
}());
