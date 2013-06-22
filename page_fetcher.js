var PageFetcher = (function() {
    var obj = {};

    obj.add_current_page = function()
    {
        current_doc = document;
        current_text = document.documentElement.innerText;

        if (!current_text)
            StuyTools.logged_in = false;

        var current_path = StuyTools.path;

        StuyTools.tabs[current_path].old_doc = current_doc;
        StuyTools.tabs[current_path].old_text = current_text;
    };

    return obj;
}());
