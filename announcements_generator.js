function create_announcements_section()
{
    var url = "http://stuy.enschool.org/";
    $.get(url, 
        function(raw_html)
        {
            var num_visible = 6;

            var announcements = parse_announcements(raw_html);
            var announcements_html = generate_announcements_html(announcements, num_visible);
            inject_announcements_html(announcements_html);
            attach_announcements_listeners();
        }
    );
}

function parse_announcements(raw_html)
{
    var announcements = [];

    var parser = new DOMParser();
    var doc = parser.parseFromString(raw_html, "text/html");

    news_rows = doc.querySelectorAll(".HPNews tr");
    for (var i=0; i < news_rows.length; i++)
    {
        var row = news_rows[i];
        
        var link = $(row).find("a")[0];
        var title = link.text;
        var url = $(link).attr("href");

        var raw_desc = $(row).find("#r").html();
        var description = /<br>([^]+)</.exec(raw_desc)[1].trim();
        description = remove_relative_links(description);

        announcements.push(
            {
                title: title_case(title),
                description: description,
                url: "http://stuy.enschool.org" + url
            }
        );
    }

    return announcements;
}

function generate_announcements_html(announcements, num_visible)
{
    var html = "";
    announcements.forEach(
        function(announcement, index)
        {
            var title = announcement.title;
            var description = announcement.description;
            var url = announcement.url;

            var visible = true;
            if (index + 1 > num_visible)
                visible = false;

            html += '\
                <li ' + (visible ? "" : "class='hidden'") + '> \
                    <a href="#' + index + '" class="announcement-title" data-announcement="' + index + '">' + title + '</a> \
                    <div class="announcement-desc" id="announcement-' + index + '">' + description + '\
                        <a href="' + url + '" target="_blank" class="read-story">Read story </a> \
                    </div> \
                </li> \
            ';
        }
    );

    if (num_visible >= announcements.length)
        $(".load-more-announcements").remove();
    else
        $(".load-more-announcements").show();

    return html;
}

function remove_relative_links(text)
{
    var fixed_text = text;
    return fixed_text.replace(/href=["']\.\.([^"']+)["']/, 'href="http://stuy.enschool.org$1"');
}

function inject_announcements_html(announcements_html)
{
    $(".announcements-loading-notice").remove();
    $(".announcements ul").html(announcements_html);
}

function attach_announcements_listeners()
{
    $(".announcement-title").click(
        function()
        {
            var id = $(this).data("announcement");
            $("#announcement-" + id).stop(true, false).slideToggle(500);
        }
    );

    $(".load-more-announcements").click(
        function()
        {
            var button = $(this);
            $(".announcements .hidden").slideDown(500,
                function()
                {
                    button.text("Even More");
                    button.attr("href", "http://stuy.enschool.org/apps/news/index.jsp?id=0");
                }
            );
        }
    );
}
