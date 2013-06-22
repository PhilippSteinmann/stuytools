var StuyTools = (function() {
    var obj = {};

    obj.tabs = {};
    obj.tabs_to_preload = ["student_jobs.rb", "grade_check.rb"];
    obj.tab_dependencies = {
        "student_jobs.rb": ["locker_letter.rb", "locker_look.rb"]
    };
    obj.logged_in = true;
    obj.student_name = false;

    obj.init = function()
    {
        current_path = Utils.get_path();
        this.path = current_path;

        this.initialize_tabs();

        PageFetcher.add_current_page();

        PageParser.parse_page(current_path);
        
        PageGenerator.generate_page(current_path);
        
        PageRenderer.setup_page();
        PageRenderer.render_page(current_path);
    }

    obj.initialize_tabs = function()
    {
        var self = this;
        this.tabs_to_preload.forEach(
            function(path)
            {
                self.tabs[path] = {
                    old_doc: false,
                    old_text: "",
                    page_data: {},
                    restyled_html: ""
                };
            }
        );
    };

    return obj;
}());
