define([], function () {
    
    var HttpModel = {
        getData: function (url) {
            return fetch(url)
                .then(response => response)
        },
        add: function (url, data) {
            // Default options are marked with *
            return fetch(url, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, same-origin, *omit
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json'
                },
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // *manual, follow, error
                referrer: 'no-referrer', // *client, no-referrer
            })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
        },
        save: function (url, data) {
            return fetch(url, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, same-origin, *omit
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json'
                },
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // *manual, follow, error
                referrer: 'no-referrer', // *client, no-referrer
            }).then(response => response)
        },
        delete: function (url) {
            return fetch(url, {
                method: 'delete'
            }).then(response => response);
        }
    };

    return HttpModel;
});