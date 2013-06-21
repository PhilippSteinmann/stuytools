function restyle_page(html)
{
    $(".page-area").show();
    var path = window.location.pathname;
    if (path == "/grade_check.rb")
        restyle_grade_check(html);
    else
        inject_into_page_area(html);
}

function restyle_grade_check(html)
{
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");

    var body = doc.body;

    var tables = body.querySelectorAll("table");
    if (tables.length == 0)
    {
        inject_into_page_area(html);
        return;
    }
        
    navigation_table = tables[0];
    report_card_table = tables[1];

    var nav_row = $(navigation_table).find("tr")[0];
    var nav_cols = $(nav_row).find("td");

    var previous_term = nav_cols[0];
    var next_term = nav_cols[2];

    var prev_href = "";
    var next_href = "";

    if (previous_term.innerText)
        prev_href = $(previous_term).find("a")[0].href;

    if (next_term.innerText)
        next_href = $(next_term).find("a")[0].href;

    var nav_html = '\
        <nav> \
            <a href="' + prev_href + '" class="secondary-button ' + (prev_href ? "" : "disabled") + '" >Prev. Term </a> \
            <a href="' + next_href + '" class="secondary-button ' + (next_href ? "" : "disabled") + '" >Next Term </a> \
        </nav> \
    ';

    inject_into_page_area(nav_html);
}

function inject_into_page_area(html)
{
    $(".page-area .padding-box").html(html);
}
