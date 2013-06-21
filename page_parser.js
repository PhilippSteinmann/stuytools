function parse_page(tabs, path)
{
    var old_doc = tabs[path]["old_doc"];

    if (path == "student_jobs.rb")
    {
        var page_data = parse_student_jobs_page(old_doc);
        tabs[path]["page_data"] = page_data;
        tabs[path]["old_doc"] = true; //no longer need it, let's free up memory
    }

    return tabs;
}

function parse_student_jobs_page(old_doc)
{
    var page_text = old_doc.body.innerText;
    console.log(page_text);

    var name_results = /Current user: (\w+, \w+)[.\n]*/.exec(page_text);
    var class_results = /Official Class: (.{3})([ \n]*)/.exec(page_text);
    var room_results = /Official Class Room: (\w+)/.exec(page_text);
    var teacher_results = /Official Class Teacher: (\w+)/.exec(page_text);
    var advisor_results = /Advisor: (\w+)/.exec(page_text);
    var email_results = /email address as: (.*)/.exec(page_text);
    
    var name = parse_student_name(name_results[1]);
    var off_class = class_results[1];
    var off_room = title_case(room_results[1]);
    var hr_teacher = title_case(teacher_results[1]);
    var advisor = title_case(advisor_results[1]);
    var emails = email_results[1];


    return { 
        name: name,
        off_class: off_class,
        off_room: off_room,
        hr_teacher: hr_teacher,
        advisor: advisor,
        emails: emails
    }
}
