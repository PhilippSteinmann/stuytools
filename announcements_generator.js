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
        var title = $(row).find("a")[0].text;

        var raw_desc = $(row).find("#r").html();
        var description = /<br>([^]+)</.exec(raw_desc)[1].trim();
        description = remove_relative_links(description);

        announcements.push(
            {
                title: title_case(title),
                description: description
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
            var title = announcement["title"];
            var description = announcement["description"];

            html += '\
                <li> \
                    <a href="#' + index + '" class="announcement-title" data-announcement="' + index + '">' + title + '</a> \
                    <div class="announcement-desc" id="announcement-' + index + '">' + description + '</div> \
                </li> \
            ';
        }
    );

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
            $("#announcement-" + id).slideToggle(500);
        }
    );
}
