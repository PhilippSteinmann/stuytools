function restyle_page()
{
    var path = window.location.pathname;
    if (path == "/grade_check.rb")
        restyle_grade_check();
    else
        $(".page-area-iframe").show();
}

function restyle_grade_check()
{
    var iframe = $(".page-area-iframe")[0];
    var body = iframe.contentDocument.querySelector("body");

    var tables = body.querySelectorAll("table");
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
            <a href="' + prev_href + '" class="secondary-button ' + (prev_href ? "" : "disabled") + '" target="page-area-iframe">Prev. Term </a> \
            <a href="' + next_href + '" class="secondary-button ' + (next_href ? "" : "disabled") + '" target="page-area-iframe">Next Term </a> \
        </nav> \
    ';

    inject_into_page_area(nav_html);
    $(".page-area").show();
    $(".page-area-iframe").hide();
}

function inject_into_page_area(html)
{
    $(".page-area .padding-box").html(html);
}
