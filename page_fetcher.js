function initialize_tabs(path)
{
    var path = get_path();

    var tabs = {};
    var pages = ["student_jobs.rb", "grade_check.rb"];

    pages.forEach(
        function(page)
        {
            tabs[page] = {
                old_doc: false,
                page_data: {},
                restyled_html: ""
            };
        }
    );

    return tabs;
}

function add_current_page_to_tabs(tabs, path)
{
    var page_content = document;

    tabs[path] = {
        old_doc: page_content,
        page_data: {},
        restyled_html: ""
    };

    return tabs;
}
