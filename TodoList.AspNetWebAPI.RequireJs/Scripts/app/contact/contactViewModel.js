// Main viewmodel class
define(['knockout'], function (ko) {
    return function contactViewModel() {
        this.firstName = ko.observable('Bert');
        this.firstNameCaps = ko.pureComputed(function () {
            return this.firstName().toUpperCase();
        }, this);
    };
});
