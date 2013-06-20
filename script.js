function get_student_data()
{
    var runtime_or_extension = chrome.runtime && chrome.runtime.sendMessage ?
                                            'runtime': 'extension'; //Chrome 26+ uses runtime

    var page_content = $("body").text();
    if (page_content == "")
        insert_page(false)

    else
    {
        if (window.location.pathname == "/student_jobs.rb")
        {
            var name_results = scan_page(/Current user: (\w+, \w+)[.\n]*/, page_content);

            var class_results = scan_page(/Official Class: (.{3})([ \n]*)/, page_content);

            var room_results = scan_page(/Official Class Room: (\w+)/, page_content);

            var teacher_results = scan_page(/Official Class Teacher: (\w+)/, page_content);

            var advisor_results = scan_page(/Advisor: (\w+)/, page_content);

            var email_results = scan_page(/email address as: (.*)If/, page_content);
            
            var name = parse_student_name(name_results[1]);
            var off_class = class_results[1];
            var off_room = title_case(room_results[1]);
            var hr_teacher = title_case(teacher_results[1]);
            var advisor = title_case(advisor_results[1]);
            var emails = email_results[1];
       

            var student_data = { 
                name: name,
                off_class: off_class,
                off_room: off_room,
                hr_teacher: hr_teacher,
                advisor: advisor,
                emails: emails
            }

            chrome[runtime_or_extension].sendMessage({type: "set", student_data: student_data});
            insert_page(student_data);
        }
        else
        {
            chrome[runtime_or_extension].sendMessage({type: "get"},
                function(response)
                {   
                    insert_page(JSON.parse(response));
                }
            );
        }
    }
}

function scan_page(regex, page_content)
{
    return regex.exec(page_content);
}

function parse_student_name(name)
{
    var split_name = name.split(",");
    var first = split_name[1].slice(1);
    var last = split_name[0];

    first = title_case(first);
    last = title_case(last);

    return {
        first: first,
        last: last
    }
}

function logged_in() {
    var daedalusID_exists = false;
    return daedalusID_exists;
}


var do_not_load = ["/login.rb", "/logoff.rb", "/email.rb"];

if (window == window.top)
{
    if (window.location.pathname != "/student_jobs.rb")
    {
        if (window.location.pathname.in(do_not_load))
            window.location.href = "/student_jobs.rb";
        else
            window.location.href = "/student_jobs.rb#" + window.location.pathname;
    }

    else
        get_student_data();
}

else
    console.log("hello");
