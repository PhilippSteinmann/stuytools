//was working on generating HTML, create dictionary for week days to add to html
function make_awesome() 
{
    insert_fonts();
    get_student_data();
}

function insert_fonts()
{
    var link_node = document.createElement("link"); 
    link_node.rel = "stylesheet";
    link_node.href = 'https://fonts.googleapis.com/css?family=Open+Sans:400,800,700';
    console.log(link_node);
    document.head.appendChild(link_node); 
}

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


String.prototype.mindfulLowerCase = function()
{
    var words = this.split(" ");
    var lowercase_str = "";
    var special_words = ["PSAL", "AP", "TEDxStuyvesantHS"];
    for (var i = 0; i < words.length; i++)
    { 
        if (!words[i].in(special_words)) // not a special word
        {
            lowercase_str += words[i].toLowerCase();
            if (i != words.length - 1)
                lowercase_str += " ";
        }
        else // a special word, do not lowercase
        {
            lowercase_str += words[i];
            if (i != words.length - 1)
                lowercase_str += " ";
        }
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
    window.location.pathname = "student_jobs.rb";
}
else
    get_student_data();

/* 
 * DOMParser HTML extension 
 * 2012-02-02 
 * 
 * By Eli Grey, http://eligrey.com 
 * Public domain. 
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK. 
 */  

/*! @source https://gist.github.com/1129031 */  
/*global document, DOMParser*/  

(function(DOMParser) {  
    "use strict";  
    var DOMParser_proto = DOMParser.prototype  
      , real_parseFromString = DOMParser_proto.parseFromString;

    // Firefox/Opera/IE throw errors on unsupported types  
    try {  
        // WebKit returns null on unsupported types  
        if ((new DOMParser).parseFromString("", "text/html")) {  
            // text/html parsing is natively supported  
            return;  
        }  
    } catch (ex) {}  

    DOMParser_proto.parseFromString = function(markup, type) {  
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {  
            var doc = document.implementation.createHTMLDocument("")
              , doc_elt = doc.documentElement
              , first_elt;

            doc_elt.innerHTML = markup;
            first_elt = doc_elt.firstElementChild;

            if (doc_elt.childElementCount === 1
                && first_elt.localName.toLowerCase() === "html") {  
                doc.replaceChild(first_elt, doc_elt);  
            }  

            return doc;  
        } else {  
            return real_parseFromString.apply(this, arguments);  
        }  
    };  
}(DOMParser));
