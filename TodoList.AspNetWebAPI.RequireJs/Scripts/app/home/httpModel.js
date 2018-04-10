// Main viewmodel class
define(['knockout'], function (ko) {
    
    return function httpModel() {
        this.firstName = ko.observable('Bert');
        this.firstNameCaps = ko.pureComputed(function () {
            return this.firstName().toUpperCase();
        }, this);

        this.getData = function (url) {
            return fetch(url)
                .then(response => response)
        };

        this.add = function (url, data) {
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
            //.catch(error => console.log('Error:', error));
        };

        this.save = function (url, data) {
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
            })
                .then(response => response)
        };

        this.delete = function (url) {
            return fetch(url, {
                method: 'delete'
            }).then(response => response);
        };
    };
});
