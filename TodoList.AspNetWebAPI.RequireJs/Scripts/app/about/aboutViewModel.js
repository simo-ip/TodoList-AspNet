// Main viewmodel class
define(['knockout'], function (ko) {

    return function aboutViewModel() {
        this.title = ko.observable('About');
    };
});