function get_path()
{
    return window.location.pathname.slice(1);
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

function log(x)
{
    console.log(x);
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
