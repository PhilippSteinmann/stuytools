chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) 
    {
        if (request["type"] == "set")
        {
            var cookie_data = JSON.stringify(request["student_data"]);
            chrome.cookies.set(
                {
                    url: "https://students-stuyhs.theschoolsystem.net/",
                    name: "student_data",
                    value: cookie_data
                },
                function(cookie) 
                {
                    console.log(cookie); 
                }
            );
        }

        else if (request["type"] == "get")
        {
            chrome.cookies.get(
                {
                    url: "https://students-stuyhs.theschoolsystem.net/",
                    name: "student_data"
                },
                function(cookie)
                {
                    sendResponse(cookie.value);
                }
            );
        }
        return true; //required if we want to sendResponse from a callback
    } 
);
