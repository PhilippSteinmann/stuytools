var redirect_to_home = ["login.rb", "logoff.rb"];
var path = get_path();

if (path.in(redirect_to_home))
    window.location.href = "/student_jobs.rb";

var tabs = initialize_tabs(path);
tabs = add_current_page_to_tabs(tabs, path);
tabs = parse_page(tabs, path);

log(tabs);
